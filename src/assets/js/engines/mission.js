/* ==========================================================================
   Engine: mission — the independent check
   Fresh discrimination questions built at generation time from topic
   evidence; distractors are sibling topics' evidence (neighboring concepts).
   First attempts are recorded separately from assisted retries. Progress is
   shown as pips, never as a grade. Zero pre-selection; one question at a time.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Mission(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.bank = PYP.shuffle(config.bank || []);
    this.index = 0;
    this.results = []; // 'first' | 'retried'
    this.locked = false;

    var wrap = PYP.el('div', 'mission-wrap');
    this.pips = PYP.el('div', 'mission-progress');
    this.pips.setAttribute('aria-hidden', 'true');
    wrap.appendChild(this.pips);
    this.choicesEl = PYP.el('div', 'mission-choices');
    wrap.appendChild(this.choicesEl);
    root.appendChild(wrap);
    this.renderPips();
    this.showQuestion();
  }

  Mission.prototype.renderPips = function () {
    this.pips.innerHTML = '';
    var self = this;
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
    this.ctx.instruct('Which one belongs to “' + q.concept + '”?', { speak: false });
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
      this.ctx.instruct(ch.why || 'Yes! That one belongs to ' + q.concept + '.');
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
      this.ctx.instruct(ch.why || 'Not this one — look again.');
    }
  };

  Mission.prototype.finish = function () {
    var first = this.results.filter(function (r) { return r === 'first'; }).length;
    var total = this.bank.length;
    var wrap = PYP.el('div', 'mission-end');
    wrap.appendChild(PYP.el('div', 'mission-end-score', first + ' of ' + total + ' on the first try'));
    var note = PYP.el('p', 'mission-end-note');
    if (first === total) {
      note.textContent = 'You solved every case without help this session. Try the explore mode again to spot the ideas in a new way.';
    } else {
      note.textContent = 'That is your evidence from this session — some cases needed a second look. Replay the explore mode, then come back for fresh cases.';
    }
    wrap.appendChild(note);
    var again = PYP.el('button', 'ml-control ml-control--primary');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Fresh cases</span>';
    var self = this;
    again.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.bank = PYP.shuffle(self.config.bank || []);
      self.index = 0;
      self.results = [];
      self.root.innerHTML = '';
      self.pips = PYP.el('div', 'mission-progress');
      self.choicesEl = PYP.el('div', 'mission-choices');
      var w = PYP.el('div', 'mission-wrap');
      w.appendChild(self.pips); w.appendChild(self.choicesEl);
      self.root.appendChild(w);
      self.showQuestion();
    });
    wrap.appendChild(again);
    this.root.innerHTML = '';
    this.root.appendChild(wrap);
    this.ctx.instruct('Mission complete — here is your session evidence.', { speak: false });
    this.ctx.sfx.playFanfare();
    if (window.PYP) PYP.celebrate();
  };

  Mission.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['mission'] = Mission;
})();
