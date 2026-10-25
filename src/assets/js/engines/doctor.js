/* ==========================================================================
   Engine: doctor — diagnostic sentence clinic
   "Patient" sentences made of clickable word tokens. Injured tokens (a
   lowercase start, a missing period, a tense slip…) get a bandage when
   tapped; healthy tokens give a gentle buzz. All patients healed = fanfare.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Doctor(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.patient = 0;
    this.healedCount = 0;
    this.mistakes = 0;

    var wrap = PYP.el('div', 'doctor-wrap');
    var tabs = PYP.el('div', 'ml-case-tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Patients');
    this.tabs = tabs;
    wrap.appendChild(tabs);
    this.sentenceEl = PYP.el('div', 'doctor-sentence');
    wrap.appendChild(this.sentenceEl);
    var foot = PYP.el('div', 'doctor-foot');
    this.resetBtn = PYP.el('button', 'ml-control');
    this.resetBtn.type = 'button';
    this.resetBtn.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Start over</span>';
    this.resetBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.loadPatient(self.patient, true);
    });
    foot.appendChild(this.resetBtn);
    wrap.appendChild(foot);
    root.appendChild(wrap);
    this.renderTabs();
    this.loadPatient(0);
  }

  Doctor.prototype.renderTabs = function () {
    var self = this;
    this.tabs.innerHTML = '';
    (this.config.patients || []).forEach(function (p, i) {
      var tab = PYP.el('button', 'ml-control ml-case-tab');
      tab.type = 'button';
      tab.innerHTML = '<span aria-hidden="true">' + (self.solvedState && self.solvedState[i] ? '✅' : '🩺') + '</span><span class="ml-button-label">Patient ' + (i + 1) + '</span>';
      if (self.solvedState && self.solvedState[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.loadPatient(i);
      });
      self.tabs.appendChild(tab);
    });
  };

  Doctor.prototype.loadPatient = function (i, reroll) {
    this.patient = i;
    this.healedCount = 0;
    this.solvedState = this.solvedState || {};
    var slot = (this.config.patients || [])[i];
    if (!slot) return;
    // A patient slot may hold several sentence variants — pick one at random,
    // never the same one twice in a row.
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
    p.tokens.forEach(function (tok) {
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
    var space = function () { self.sentenceEl.appendChild(document.createTextNode(' ')); };
    // Re-insert with spaces between tokens.
    var kids = Array.prototype.slice.call(this.sentenceEl.children);
    this.sentenceEl.innerHTML = '';
    kids.forEach(function (k, idx) {
      if (idx > 0) self.sentenceEl.appendChild(document.createTextNode(' '));
      self.sentenceEl.appendChild(k);
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
      // Support after repeated misses: gently pulse the remaining injuries.
      var self = this;
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
