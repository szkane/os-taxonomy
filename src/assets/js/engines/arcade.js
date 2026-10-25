/* ==========================================================================
   Engine: arcade — speed sprint
   Calm warm-up screen first (never auto-start a timer). Once started, facts
   pop up as bubbles; popping the correct one builds a streak with rising
   chimes. Wrong taps buzz and stay. Honest session summary at the end.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Arcade(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.running = false;
    this.correct = 0;
    this.misses = 0;
    this.streak = 0;
    this.best = 0;
    this.queue = [];
    this.timers = [];

    var wrap = PYP.el('div', 'arcade-wrap');
    this.board = PYP.el('div', 'arcade-board');
    wrap.appendChild(this.board);
    root.appendChild(wrap);

    this.startBtn = PYP.el('button', 'ml-control ml-control--primary');
    this.startBtn.type = 'button';
    this.startBtn.innerHTML = PYP.icon('play') + '<span class="ml-button-label">Start the sprint</span>';
    this.startBtn.addEventListener('click', function () { self.start(); });
    var startWrap = PYP.el('div', 'arcade-start');
    var readyEmoji = PYP.el('div');
    readyEmoji.setAttribute('aria-hidden', 'true');
    readyEmoji.style.fontSize = '64px';
    readyEmoji.textContent = (config.emoji || '⚡');
    startWrap.appendChild(readyEmoji);
    startWrap.appendChild(this.startBtn);
    this.board.appendChild(startWrap);
    ctx.instruct(config.warmup || 'Warm up first. Press start only when you are ready!');
  }

  Arcade.prototype.start = function () {
    var self = this;
    this.ctx.sfx.playClick();
    this.running = true;
    this.timeLeft = this.config.seconds || 45;
    this.correct = 0; this.misses = 0; this.streak = 0; this.best = 0;
    this.board.innerHTML = '';
    var hud = PYP.el('div', 'arcade-hud');
    this.timeChip = PYP.el('span', 'ml-chipstat', '⏱ ' + this.timeLeft);
    this.streakChip = PYP.el('span', 'ml-chipstat', '🔥 0');
    this.scoreChip = PYP.el('span', 'ml-chipstat', '⭐ 0');
    hud.appendChild(this.timeChip); hud.appendChild(this.streakChip); hud.appendChild(this.scoreChip);
    this.board.appendChild(hud);
    this.spawnNext();
    this.timers.push(setInterval(function () {
      self.timeLeft -= 1;
      self.timeChip.textContent = '⏱ ' + self.timeLeft;
      if (self.timeLeft <= 0) self.finish();
    }, 1000));
  };

  Arcade.prototype.spawnNext = function () {
    if (!this.running) return;
    var self = this;
    var items = this.config.items || [];
    if (!items.length) return;
    if (this.queue.length === 0) this.queue = PYP.shuffle(items);
    var q = this.queue.pop();
    this.currentQ = q.prompt;
    this.ctx.instruct(q.prompt, { speak: false });
    var picks = PYP.shuffle(q.choices);
    picks.forEach(function (ch, i) {
      var b = PYP.el('button', 'arcade-bubble');
      b.type = 'button';
      // The word is ALWAYS visible — for word questions the word IS the content.
      // An emoji, when present, decorates above it and never replaces it.
      if (ch.emoji) {
        var em = PYP.el('span', 'ab-emoji'); em.setAttribute('aria-hidden', 'true'); em.textContent = ch.emoji;
        b.appendChild(em);
        b.appendChild(PYP.el('span', 'ab-word', ch.text));
      } else {
        b.textContent = ch.text;
      }
      b.style.left = (18 + Math.random() * 64) + '%';
      b.style.top = (24 + Math.random() * 58) + '%';
      b.style.animationDelay = (Math.random() * 1.6) + 's';
      b.addEventListener('click', function () { self.tap(b, ch); });
      self.board.appendChild(b);
    });
  };

  Arcade.prototype.tap = function (bubble, ch) {
    if (!this.running) return;
    // Early readers connect sound ↔ symbol by HEARING the word they tapped.
    if (this.ctx.course && this.ctx.course.band === 'early' && ch.text) {
      this.ctx.tts.speak(ch.text);
    }
    if (ch.correct) {
      bubble.classList.add('is-popped');
      this.correct += 1;
      this.streak += 1;
      this.best = Math.max(this.best, this.streak);
      this.scoreChip.textContent = '⭐ ' + this.correct;
      this.streakChip.textContent = '🔥 ' + this.streak;
      if (this.streak >= 3) this.ctx.sfx.playStreak(this.streak); else this.ctx.sfx.playCorrect();
      var self = this;
      setTimeout(function () { bubble.remove(); self.clearOthers(); self.spawnNext(); }, 300);
    } else {
      this.misses += 1;
      this.streak = 0;
      this.streakChip.textContent = '🔥 0';
      this.ctx.sfx.playBuzz();
      bubble.classList.add('is-popped');
      var self2 = this;
      setTimeout(function () { bubble.remove(); }, 300);
      this.ctx.instruct(ch.why || 'Not that one — try another bubble!', { isFeedback: true });
      // The instruction bar IS the question — bring it back so the child
      // never loses what they are answering.
      setTimeout(function () {
        if (self2.running && self2.currentQ) self2.ctx.instruct(self2.currentQ, { speak: false });
      }, 1600);
    }
  };

  Arcade.prototype.clearOthers = function () {
    Array.prototype.forEach.call(this.board.querySelectorAll('.arcade-bubble'), function (b) { b.remove(); });
  };

  Arcade.prototype.finish = function () {
    this.running = false;
    this.timers.forEach(clearInterval);
    this.clearOthers();
    this.board.innerHTML = '';
    var end = PYP.el('div', 'arcade-start');
    end.appendChild(PYP.el('div', 'mission-end-score', '⭐ ' + this.correct + ' facts'));
    var note = PYP.el('p', 'mission-end-note');
    note.textContent = 'Best streak: ' + this.best + '. ' +
      (this.misses ? 'You tapped ' + this.misses + ' wrong bubbles — the explore mode can help those stick.' : 'No wrong taps — super careful and quick!');
    end.appendChild(note);
    var again = PYP.el('button', 'ml-control ml-control--primary');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Sprint again</span>';
    var self = this;
    again.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.board.innerHTML = '';
      self.running = false;
      self.correct = 0; self.streak = 0; self.best = 0; self.misses = 0; self.queue = [];
      self.start();
    });
    end.appendChild(again);
    this.board.appendChild(end);
    this.ctx.instruct('Sprint finished — here is your score for this round.', { speak: false });
    this.ctx.sfx.playFanfare();
    if (window.PYP) PYP.celebrate();
  };

  Arcade.prototype.destroy = function () {
    this.timers.forEach(clearInterval);
    this.running = false;
    this.root.innerHTML = '';
  };

  PYP.engines['arcade'] = Arcade;
})();
