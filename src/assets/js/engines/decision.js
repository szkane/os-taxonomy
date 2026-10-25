/* ==========================================================================
   Engine: decision — scenario dilemmas with meters (IB Two-Step Explore → Quest)
   Step 1 (🔭 Explore meters): test-drive the well-being / system meters to see
   how choices push meters up and down before entering the dilemma quest.
   Step 2 (🧭 Choice quest): 3–5 scenes, each with 3 choices that move the meters.
   Every choice is formative: the reflection explains the trade-off, never scolds.
   Ends with an IB Learner Profile badge summary.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Decision(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.sceneIdx = -1;
    this.stepMode = 'explore';
    this.meters = {};
    (config.meters || []).forEach(function (m) { self.meters[m.id] = m.start; });
    this.badges = [];

    var wrap = PYP.el('div', 'quest-wrap');
    this.stepTabs = PYP.el('div', 'ml-case-tabs');
    this.stepTabs.setAttribute('role', 'tablist');
    this.stepTabs.setAttribute('aria-label', 'Quest steps');
    wrap.appendChild(this.stepTabs);

    this.metersEl = PYP.el('div', 'quest-meters');
    this.meterRefs = {};
    var self2 = this;
    (config.meters || []).forEach(function (m) {
      var box = PYP.el('div', 'quest-meter');
      var label = PYP.el('div', 'quest-meter-label');
      var name = PYP.el('span', null, (m.emoji ? m.emoji + ' ' : '') + m.label);
      var val = PYP.el('span', 'qm-val', String(m.start));
      label.appendChild(name); label.appendChild(val);
      var bar = PYP.el('div', 'quest-meter-bar');
      var fill = PYP.el('div', 'quest-meter-fill');
      fill.style.width = m.start + '%';
      bar.appendChild(fill);
      box.appendChild(label); box.appendChild(bar);
      self2.metersEl.appendChild(box);
      self2.meterRefs[m.id] = { val: val, fill: fill, def: m };
    });
    wrap.appendChild(this.metersEl);
    this.choicesEl = PYP.el('div', 'quest-choices');
    wrap.appendChild(this.choicesEl);
    root.appendChild(wrap);
    this.wrap = wrap;
    this.setStepMode('explore');
  }

  Decision.prototype.renderStepTabs = function () {
    var self = this;
    this.stepTabs.innerHTML = '';
    var expBtn = PYP.el('button', 'ml-control ml-case-tab');
    expBtn.type = 'button';
    expBtn.setAttribute('role', 'tab');
    expBtn.setAttribute('aria-pressed', this.stepMode === 'explore' ? 'true' : 'false');
    expBtn.innerHTML = '<span aria-hidden="true">🔭</span><span class="ml-button-label">Explore meters</span>';
    expBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setStepMode('explore');
    });
    this.stepTabs.appendChild(expBtn);

    var chalBtn = PYP.el('button', 'ml-control ml-case-tab');
    chalBtn.type = 'button';
    chalBtn.setAttribute('role', 'tab');
    chalBtn.setAttribute('aria-pressed', this.stepMode === 'challenge' ? 'true' : 'false');
    chalBtn.innerHTML = '<span aria-hidden="true">🧭</span><span class="ml-button-label">Choice quest</span>';
    chalBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setStepMode('challenge');
    });
    this.stepTabs.appendChild(chalBtn);
  };

  Decision.prototype.resetMeters = function () {
    var self = this;
    (this.config.meters || []).forEach(function (m) {
      self.meters[m.id] = m.start;
      var ref = self.meterRefs[m.id];
      if (ref) {
        ref.val.textContent = String(m.start);
        ref.fill.style.width = m.start + '%';
        ref.fill.classList.toggle('is-low', m.start < 35);
      }
    });
  };

  Decision.prototype.setStepMode = function (mode) {
    var self = this;
    this.stepMode = mode;
    this.renderStepTabs();
    var reflect = this.wrap.querySelector('.quest-reflect');
    if (reflect) reflect.remove();
    this.resetMeters();
    if (mode === 'explore') {
      this.sceneIdx = -1;
      this.choicesEl.innerHTML = '';
      var card = PYP.el('div', 'explore-spotlight');
      card.appendChild(PYP.el('div', 'explore-spotlight-badge', '🔭 Meter Sandbox — Test how trade-offs work'));
      card.appendChild(PYP.el('p', 'explore-spotlight-body', 'Every decision in life affects our balance. Tap the test buttons below to watch the meters respond before starting the quest!'));
      var btnRow = PYP.el('div', 'seq-actions');
      (this.config.meters || []).forEach(function (m) {
        var b = PYP.el('button', 'ml-control');
        b.type = 'button';
        b.innerHTML = '<span aria-hidden="true">' + (m.emoji || '✨') + '</span><span class="ml-button-label">Boost ' + m.label + ' (+12)</span>';
        b.addEventListener('click', function () {
          self.ctx.sfx.playClick();
          self.meters[m.id] = Math.max(0, Math.min(100, self.meters[m.id] + 12));
          var ref = self.meterRefs[m.id];
          ref.val.textContent = String(self.meters[m.id]);
          ref.fill.style.width = self.meters[m.id] + '%';
          ref.fill.classList.toggle('is-low', self.meters[m.id] < 35);
          self.ctx.instruct((m.emoji || '✨') + ' ' + m.label + ' is now at ' + self.meters[m.id] + '/100! Watch how your choices keep all meters balanced.');
        });
        btnRow.appendChild(b);
      });
      card.appendChild(btnRow);
      var goBtn = PYP.el('button', 'ml-control ml-control--primary');
      goBtn.type = 'button';
      goBtn.innerHTML = '<span aria-hidden="true">🧭</span><span class="ml-button-label">Start Scene 1</span>';
      goBtn.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.setStepMode('challenge');
      });
      card.appendChild(goBtn);
      this.choicesEl.appendChild(card);
      this.ctx.instruct('🔭 Explore first: tap the meter buttons to see how your balance bars move, then start Scene 1!');
    } else {
      this.sceneIdx = -1;
      this.badges = [];
      this.nextScene();
    }
  };

  Decision.prototype.nextScene = function () {
    var self = this;
    this.sceneIdx += 1;
    var scene = (this.config.scenes || [])[this.sceneIdx];
    if (!scene) return this.finish();
    var reflect = this.wrap.querySelector('.quest-reflect');
    if (reflect) reflect.remove();
    this.ctx.instruct(scene.text);
    this.choicesEl.innerHTML = '';
    PYP.shuffle(scene.choices).forEach(function (ch) {
      var btn = PYP.el('button', 'ml-control');
      btn.type = 'button';
      var mark = PYP.el('span');
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = '❓';
      var label = PYP.el('span', 'ml-button-label', ch.label);
      btn.appendChild(mark); btn.appendChild(label);
      btn.addEventListener('click', function () { self.choose(btn, ch, mark); });
      self.choicesEl.appendChild(btn);
    });
  };

  Decision.prototype.choose = function (btn, ch, mark) {
    var self = this;
    this.ctx.sfx.playClick();
    (ch.meters || []).forEach(function (delta) {
      var id = delta[0], d = delta[1];
      if (self.meters[id] === undefined) return;
      self.meters[id] = Math.max(0, Math.min(100, self.meters[id] + d));
      var ref = self.meterRefs[id];
      ref.val.textContent = String(self.meters[id]);
      ref.fill.style.width = self.meters[id] + '%';
      ref.fill.classList.toggle('is-low', self.meters[id] < 35);
    });
    if (ch.profile) this.badges.push(ch.profile);
    mark.textContent = '💡';
    this.choicesEl.querySelectorAll('.ml-control').forEach(function (b) { b.disabled = true; });
    this.ctx.instruct(ch.reflect, { isFeedback: true });
    var card = PYP.el('div', 'quest-reflect');
    var emoji = PYP.el('span');
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = '🌟 ';
    card.appendChild(emoji);
    card.appendChild(document.createTextNode(ch.reflect));
    this.wrap.appendChild(card);
    var next = PYP.el('button', 'ml-control ml-control--primary');
    next.type = 'button';
    next.innerHTML = PYP.icon('next') + '<span class="ml-button-label">' + (this.sceneIdx + 1 >= this.config.scenes.length ? 'See your profile' : 'Next scene') + '</span>';
    next.addEventListener('click', function () { self.ctx.sfx.playClick(); self.nextScene(); });
    card.appendChild(next);
  };

  Decision.prototype.finish = function () {
    var wrap = PYP.el('div', 'mission-end');
    var unique = [];
    this.badges.forEach(function (b) { if (unique.indexOf(b) < 0) unique.push(b); });
    wrap.appendChild(PYP.el('div', 'mission-end-score', unique.length ? unique.join(' · ') : 'Thoughtful chooser'));
    var note = PYP.el('p', 'mission-end-note');
    note.textContent = this.config.outro ||
      'These are your Learner Profile strengths from this session. Every choice moved the meters — small choices add up.';
    wrap.appendChild(note);
    var again = PYP.el('button', 'ml-control ml-control--primary');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Play again</span>';
    var self = this;
    again.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.root.innerHTML = '';
      var Ctor = PYP.engines['decision'];
      new Ctor(self.root, self.config, self.ctx);
    });
    wrap.appendChild(again);
    this.root.innerHTML = '';
    this.root.appendChild(wrap);
    this.ctx.instruct('Quest complete — here are your profile strengths.', { speak: false });
    this.ctx.sfx.playFanfare();
    if (window.PYP) PYP.celebrate();
  };

  Decision.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['decision'] = Decision;
})();
