/* ==========================================================================
   Engine: mission — IB PYP Inquiry & POE Check + Learner Profile Reflection
   Questions pose a Predict-Observe-Explain (POE) or diagnostic inquiry prompt
   in the instruction bar while displaying a Concept Focus badge on stage.
   Distractors come from age-matched misconception error patterns or sibling
   topics at the same age (never cross-age, and never matching the prompt text).
   Ends with an interactive IB Learner Profile reflection chip selector.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  var REFLECTION_CHIPS = [
    { id: 'inquirer', label: '🔍 Inquirer — I explored & tested ideas first', reply: 'Wonderful Inquirer! Testing ideas in the lab helps you discover how things truly work.' },
    { id: 'thinker', label: '💡 Thinker — I connected patterns & clues', reply: 'Great Thinker! Spotting patterns helps you solve new problems on your own.' },
    { id: 'reflective', label: '🔄 Reflective — I learned from a second look', reply: 'Thoughtful and Reflective! Every second look makes your brain stronger.' },
    { id: 'communicator', label: '🗣️ Communicator — I can explain why it works', reply: 'Super Communicator! Explaining why an answer works proves deep understanding.' }
  ];

  function Mission(root, config, ctx) {
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.bank = PYP.shuffle(config.bank || []);
    this.index = 0;
    this.results = []; // 'first' | 'retried'
    this.locked = false;
    this.mountStage();
    this.showQuestion();
  }

  Mission.prototype.mountStage = function () {
    var wrap = PYP.el('div', 'mission-wrap');
    this.pips = PYP.el('div', 'mission-progress');
    this.pips.setAttribute('aria-hidden', 'true');
    wrap.appendChild(this.pips);
    this.conceptBadge = PYP.el('div', 'mission-concept-badge');
    wrap.appendChild(this.conceptBadge);
    this.choicesEl = PYP.el('div', 'mission-choices');
    wrap.appendChild(this.choicesEl);
    this.root.innerHTML = '';
    this.root.appendChild(wrap);
  };

  Mission.prototype.renderPips = function () {
    this.pips.innerHTML = '';
    for (var i = 0; i < this.bank.length; i++) {
      var pip = PYP.el('div', 'mission-pip');
      var r = this.results[i];
      if (r === 'first') pip.classList.add('is-first-try');
      else if (r === 'retried') pip.classList.add('is-retried');
      else if (i === this.index) pip.classList.add('is-open');
      this.pips.appendChild(pip);
    }
  };

  Mission.prototype.showQuestion = function () {
    var self = this;
    var q = this.bank[this.index];
    if (!q) return this.finish();
    this.locked = false;
    this.wasWrong = false;
    if (this.conceptBadge) {
      this.conceptBadge.textContent = '🎯 Inquiry focus: ' + (q.concept || 'Concept check');
    }
    this.ctx.instruct(q.prompt || ('Which evidence best shows “' + q.concept + '”?'), { speak: false });
    this.choicesEl.innerHTML = '';
    var choices = PYP.shuffle(q.choices);
    choices.forEach(function (ch) {
      var btn = PYP.el('button', 'ml-control');
      btn.type = 'button';
      var mark = PYP.el('span');
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = '❓';
      var label = PYP.el('span', 'ml-button-label', ch.text);
      btn.appendChild(mark); btn.appendChild(label);
      btn.addEventListener('click', function () { self.pick(btn, ch, mark); });
      self.choicesEl.appendChild(btn);
    });
    this.renderPips();
  };

  Mission.prototype.pick = function (btn, ch, mark) {
    if (this.locked) return;
    var q = this.bank[this.index];
    if (ch.correct) {
      this.locked = true;
      this.results[this.index] = this.wasWrong ? 'retried' : 'first';
      btn.classList.add('is-correct');
      mark.textContent = '✅';
      this.ctx.sfx.playCorrect();
      this.ctx.instruct(ch.why || 'Yes! That evidence shows ' + q.concept + '.');
      this.renderPips();
      setTimeout(function () {
        this.index += 1;
        this.showQuestion();
      }.bind(this), 2200);
    } else {
      this.wasWrong = true;
      btn.classList.add('is-wrong');
      mark.textContent = '🤔';
      btn.disabled = true;
      this.ctx.sfx.playBuzz();
      this.ctx.instruct(ch.why || 'Not this one — look closely at the inquiry question and try another.');
    }
  };

  Mission.prototype.finish = function () {
    var self = this;
    var first = this.results.filter(function (r) { return r === 'first'; }).length;
    var total = this.bank.length;
    var wrap = PYP.el('div', 'mission-end');
    wrap.appendChild(PYP.el('div', 'mission-end-score', first + ' of ' + total + ' on the first try'));
    var note = PYP.el('p', 'mission-end-note');
    if (first === total) {
      note.textContent = 'You solved every inquiry case without help this session! Choose how you learned best today:';
    } else {
      note.textContent = 'That is your inquiry evidence from this session — some cases needed a second look. Choose how you learned today:';
    }
    wrap.appendChild(note);

    var reflectBox = PYP.el('div', 'mission-reflect-box');
    REFLECTION_CHIPS.forEach(function (rc) {
      var chip = PYP.el('button', 'ml-control mission-reflect-chip');
      chip.type = 'button';
      chip.setAttribute('aria-pressed', 'false');
      chip.innerHTML = '<span class="ml-button-label">' + PYP.esc(rc.label) + '</span>';
      chip.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        Array.prototype.forEach.call(reflectBox.querySelectorAll('.mission-reflect-chip'), function (el) {
          el.setAttribute('aria-pressed', 'false');
        });
        chip.setAttribute('aria-pressed', 'true');
        self.ctx.instruct(rc.reply);
      });
      reflectBox.appendChild(chip);
    });
    wrap.appendChild(reflectBox);

    var again = PYP.el('button', 'ml-control ml-control--primary');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Fresh inquiry cases</span>';
    again.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.bank = PYP.shuffle(self.config.bank || []);
      self.index = 0;
      self.results = [];
      self.mountStage();
      self.showQuestion();
    });
    wrap.appendChild(again);
    this.root.innerHTML = '';
    this.root.appendChild(wrap);
    this.ctx.instruct('Mission complete — tap a Learner Profile badge below to reflect on how you learned today!', { speak: false });
    this.ctx.sfx.playFanfare();
    if (window.PYP) PYP.celebrate();
  };

  Mission.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['mission'] = Mission;
})();
