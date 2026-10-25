/* ==========================================================================
   Engine: doctor — diagnostic sentence clinic (IB Two-Step Explore → Clinic)
   Step 1 (🔭 Explore rules): inspect sample injured → healed words from this
   clinic's focus so the child discovers the pattern before diagnosing.
   Step 2 (🩺 Patient 1..N): clickable word tokens. Injured tokens get a
   bandage when tapped; healthy tokens give a gentle hint.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Doctor(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.patient = -1;
    this.healedCount = 0;
    this.mistakes = 0;
    this.solvedState = {};

    var wrap = PYP.el('div', 'doctor-wrap');
    var tabs = PYP.el('div', 'ml-case-tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Patients');
    this.tabs = tabs;
    wrap.appendChild(tabs);
    this.sentenceEl = PYP.el('div', 'doctor-sentence');
    wrap.appendChild(this.sentenceEl);
    var foot = PYP.el('div', 'doctor-foot');
    this.foot = foot;
    this.resetBtn = PYP.el('button', 'ml-control');
    this.resetBtn.type = 'button';
    this.resetBtn.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Start over</span>';
    this.resetBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      if (self.patient < 0) self.loadExplore();
      else self.loadPatient(self.patient, true);
    });
    foot.appendChild(this.resetBtn);
    wrap.appendChild(foot);
    root.appendChild(wrap);
    this.loadExplore();
  }

  Doctor.prototype.renderTabs = function () {
    var self = this;
    this.tabs.innerHTML = '';
    var expTab = PYP.el('button', 'ml-control ml-case-tab');
    expTab.type = 'button';
    expTab.setAttribute('role', 'tab');
    expTab.setAttribute('aria-pressed', this.patient === -1 ? 'true' : 'false');
    expTab.innerHTML = '<span aria-hidden="true">🔭</span><span class="ml-button-label">Explore rules</span>';
    expTab.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.loadExplore();
    });
    this.tabs.appendChild(expTab);

    (this.config.patients || []).forEach(function (p, i) {
      var tab = PYP.el('button', 'ml-control ml-case-tab');
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-pressed', self.patient === i ? 'true' : 'false');
      tab.innerHTML = '<span aria-hidden="true">' + (self.solvedState && self.solvedState[i] ? '✅' : '🩺') + '</span><span class="ml-button-label">Patient ' + (i + 1) + '</span>';
      if (self.solvedState && self.solvedState[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.loadPatient(i);
      });
      self.tabs.appendChild(tab);
    });
  };

  Doctor.prototype.loadExplore = function () {
    var self = this;
    this.patient = -1;
    this.renderTabs();
    this.resetBtn.hidden = true;
    this.sentenceEl.innerHTML = '';

    // Gather sample injured tokens from the patients so child can test-tap them
    var samples = [];
    (this.config.patients || []).forEach(function (slot) {
      var toks = (slot.variants && slot.variants[0]) || slot.tokens || [];
      toks.forEach(function (t) {
        if (t.injured && samples.length < 3) samples.push(t);
      });
    });

    var card = PYP.el('div', 'explore-spotlight');
    card.style.width = '100%';
    card.appendChild(PYP.el('div', 'explore-spotlight-badge', '🔭 Sentence Clinic Guide'));
    card.appendChild(PYP.el('div', 'explore-spotlight-head', 'Tap a sample word below to practice putting on a bandage 🩹'));
    var row = PYP.el('div', 'seq-actions');
    samples.forEach(function (tok) {
      var b = PYP.el('button', 'doctor-token is-injured');
      b.type = 'button';
      b.style.border = '2px dashed #242722';
      b.textContent = tok.text + ' → ?';
      b.addEventListener('click', function () {
        self.ctx.sfx.playCorrect();
        b.classList.remove('is-injured');
        b.classList.add('is-healed');
        b.textContent = tok.text + ' → ' + (tok.fixText || tok.text);
        self.ctx.instruct(tok.why || 'That word needed a bandage!', { isFeedback: true });
      });
      row.appendChild(b);
    });
    card.appendChild(row);
    var startBtn = PYP.el('button', 'ml-control ml-control--primary');
    startBtn.type = 'button';
    startBtn.innerHTML = '<span aria-hidden="true">🩺</span><span class="ml-button-label">Start Patient 1</span>';
    startBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.loadPatient(0);
    });
    card.appendChild(startBtn);
    this.sentenceEl.appendChild(card);
    this.ctx.instruct('🔭 Explore first: tap the sample words to see how a bandage fixes a sentence, then start Patient 1!');
  };

  Doctor.prototype.loadPatient = function (i, reroll) {
    this.patient = i;
    this.healedCount = 0;
    this.mistakes = 0;
    this.resetBtn.hidden = false;
    this.solvedState = this.solvedState || {};
    this.renderTabs();
    var slot = (this.config.patients || [])[i];
    if (!slot) return;
    var variants = slot.variants || [slot.tokens || []];
    if (this.lastVariant == null || variants.length === 1) {
      this.lastVariant = Math.floor(Math.random() * variants.length);
    } else {
      var next = Math.floor(Math.random() * (variants.length - 1));
      if (next >= this.lastVariant) next += 1;
      this.lastVariant = next;
    }
    if (reroll && variants.length === 1) { /* same sentence, fresh state */ }
    var tokens = variants[this.lastVariant];
    var p = { tokens: tokens, brief: slot.brief, celebrate: slot.celebrate };
    this.currentPatient = p;
    var self = this;
    this.sentenceEl.innerHTML = '';
    p.tokens.forEach(function (tok, idx) {
      if (idx > 0) self.sentenceEl.appendChild(document.createTextNode(' '));
      var btn = PYP.el('button', 'doctor-token');
      btn.type = 'button';
      btn.textContent = tok.text;
      if (tok.injured) {
        btn.classList.add('is-injured');
        btn.addEventListener('click', function () { self.tapInjured(btn, tok); });
      } else {
        btn.classList.add('is-healthy');
        btn.addEventListener('click', function () { self.tapHealthy(tok); });
      }
      self.sentenceEl.appendChild(btn);
    });
    this.ctx.instruct(p.brief || 'Find the words that need a bandage and tap them.');
  };

  Doctor.prototype.tapInjured = function (btn, tok) {
    if (btn.classList.contains('is-healed')) return;
    btn.classList.remove('is-injured');
    btn.classList.add('is-healed');
    if (tok.fixText) btn.textContent = tok.fixText;
    this.healedCount += 1;
    this.ctx.sfx.playCorrect();
    this.ctx.instruct(tok.why || 'Healed!', { isFeedback: true });
    var p = this.currentPatient;
    if (!p) return;
    var injuredTotal = p.tokens.filter(function (t) { return t.injured; }).length;
    if (this.healedCount === injuredTotal) {
      this.solvedState[this.patient] = true;
      this.ctx.sfx.playFanfare();
      if (window.PYP) PYP.celebrate();
      this.ctx.instruct('Patient ' + (this.patient + 1) + ' is healthy again! ' + (p.celebrate || 'Great diagnosing.'));
      this.renderTabs();
      var next = (this.config.patients || []).findIndex(function (x, idx) { return !this.solvedState[idx]; }, this);
      if (next >= 0) setTimeout(function () { this.loadPatient(next, true); }.bind(this), 2800);
    }
  };

  Doctor.prototype.tapHealthy = function (tok) {
    this.mistakes += 1;
    this.ctx.sfx.playBuzz();
    if (this.mistakes >= 2) {
      this.sentenceEl.querySelectorAll('.is-injured').forEach(function (el) {
        el.classList.add('hint-pulse');
        setTimeout(function () { el.classList.remove('hint-pulse'); }, 1400);
      });
      this.ctx.instruct('Still stuck? Watch for a little pulse… one of the quiet words needs help.');
    } else {
      this.ctx.instruct('“' + tok.text + '” is already healthy — read the whole sentence again and look for what is missing.');
    }
  };

  Doctor.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['doctor'] = Doctor;
})();
