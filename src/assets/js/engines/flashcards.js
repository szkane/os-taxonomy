/* ==========================================================================
   Engine: flashcards v2 — Inquiry Wonder Cards ("Wonder → Discover → Try")
   One big inquiry card at a time:
   - Front poses an Inquiry Wonder prompt + visual emoji
   - Flip reveals the Discovery explanation + a hands-on "Try noticing" prompt
   No assessment lives here — the mission engine carries the independent check.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Flashcards(root, config, ctx) {
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.deck = config.deck || [];
    this.index = 0;
    this.flipped = false;
    this.build();
    this.show(0);
  }

  Flashcards.prototype.build = function () {
    var self = this;
    this.root.innerHTML = '';
    var wrap = PYP.el('div', 'fc2-wrap');

    var top = PYP.el('div', 'fc2-top');
    this.progress = PYP.el('span', 'ml-chipstat fc2-progress', '');
    top.appendChild(this.progress);
    wrap.appendChild(top);

    var stage = PYP.el('div', 'fc2-stage');
    this.card = PYP.el('button', 'fc-card fc2-card');
    this.card.type = 'button';
    this.card.setAttribute('aria-pressed', 'false');
    var inner = PYP.el('div', 'fc-inner fc2-inner');
    this.front = PYP.el('div', 'fc-face fc-face--front fc2-front');
    this.back = PYP.el('div', 'fc-face fc-face--back fc2-back');
    inner.appendChild(this.front);
    inner.appendChild(this.back);
    this.card.appendChild(inner);
    this.card.addEventListener('click', function () { self.flip(); });
    stage.appendChild(this.card);
    wrap.appendChild(stage);

    var controls = PYP.el('div', 'fc2-controls');
    var back = PYP.el('button', 'ml-control ml-control--icon-only');
    back.type = 'button';
    back.setAttribute('aria-label', 'Previous card');
    back.innerHTML = PYP.icon('back');
    back.addEventListener('click', function () { self.step(-1); });
    controls.appendChild(back);

    var speak = PYP.el('button', 'ml-control ml-control--icon-only fc2-speak');
    speak.type = 'button';
    speak.setAttribute('aria-label', 'Read this card aloud');
    speak.innerHTML = PYP.icon('sound');
    speak.addEventListener('click', function () {
      var card = self.deck[self.index] || {};
      self.ctx.tts.speak((card.front || '') + '. ' + (card.back || ''), null, speak);
    });
    controls.appendChild(speak);

    var flipBtn = PYP.el('button', 'ml-control');
    flipBtn.type = 'button';
    flipBtn.innerHTML = '<span aria-hidden="true">🔄</span><span class="ml-button-label">Flip card</span>';
    flipBtn.addEventListener('click', function () { self.flip(); });
    controls.appendChild(flipBtn);

    this.nextBtn = PYP.el('button', 'ml-control ml-control--primary');
    this.nextBtn.type = 'button';
    this.nextBtn.innerHTML = PYP.icon('next') + '<span class="ml-button-label">Next card</span>';
    this.nextBtn.addEventListener('click', function () { self.step(1); });
    controls.appendChild(this.nextBtn);

    wrap.appendChild(controls);
    this.root.appendChild(wrap);
  };

  Flashcards.prototype.show = function (index) {
    var total = this.deck.length;
    if (index >= total) return this.finish();
    if (index < 0) index = 0;
    this.index = index;
    this.flipped = false;
    var card = this.deck[index];
    this.progress.textContent = '🤔 Wonder card ' + (index + 1) + ' of ' + total;

    this.card.setAttribute('aria-pressed', 'false');
    this.front.innerHTML = '';
    var em = PYP.el('div', 'fc2-emoji');
    em.setAttribute('aria-hidden', 'true');
    em.textContent = card.emoji || '💡';
    var name = PYP.el('div', 'fc2-name', card.front);
    var hint = PYP.el('div', 'fc2-hint');
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = '👆 Tap to flip & discover';
    this.front.appendChild(em);
    this.front.appendChild(name);
    this.front.appendChild(hint);

    this.back.innerHTML = '';
    var backEm = PYP.el('div', 'fc2-back-emoji');
    backEm.setAttribute('aria-hidden', 'true');
    backEm.textContent = '💡 ' + (card.emoji || '✨');
    var meaning = PYP.el('div', 'fc2-meaning', card.back);
    this.back.appendChild(backEm);
    this.back.appendChild(meaning);
    if (card.tryIt) {
      var tryIt = PYP.el('div', 'fc2-try', '🔬 Try noticing: ' + card.tryIt);
      this.back.appendChild(tryIt);
    }

    this.ctx.instruct('Wonder ' + (index + 1) + ' of ' + total + ': “' + card.front + '”. What do you think it means? Tap the card to flip and discover!');
    this.nextBtn.querySelector('.ml-button-label').textContent = index + 1 === total ? 'Finish cards' : 'Next card';
  };

  Flashcards.prototype.flip = function () {
    this.flipped = !this.flipped;
    this.card.setAttribute('aria-pressed', this.flipped ? 'true' : 'false');
    this.ctx.sfx.playClick();
    var card = this.deck[this.index] || {};
    if (this.flipped) {
      this.ctx.instruct('💡 Discovery — ' + card.front + ': ' + card.back, { isFeedback: true });
      if (!(window.PYP && PYP.ttsIsMuted && PYP.ttsIsMuted())) {
        this.ctx.tts.speak((card.front || '') + '. ' + (card.back || ''));
      }
    } else {
      this.ctx.instruct('Tap “Next card” when you are ready, or flip back to look again.', { isFeedback: true });
    }
  };

  Flashcards.prototype.step = function (dir) {
    this.ctx.sfx.playClick();
    var next = this.index + dir;
    if (next < 0) next = 0;
    this.show(next);
  };

  Flashcards.prototype.finish = function () {
    var self = this;
    this.root.innerHTML = '';
    var wrap = PYP.el('div', 'mission-end');
    wrap.appendChild(PYP.el('div', 'mission-end-score', '🎉 You explored all ' + this.deck.length + ' wonder cards!'));
    var note = PYP.el('p', 'mission-end-note');
    note.textContent = 'Flip through them again any time — or take the Mission check to test your inquiry skills.';
    wrap.appendChild(note);
    var again = PYP.el('button', 'ml-control ml-control--primary');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Explore them again</span>';
    again.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.build();
      self.show(0);
    });
    wrap.appendChild(again);
    this.root.appendChild(wrap);
    this.ctx.instruct('Wonder cards complete! You can review the deck or try the mission.', { speak: false });
    this.ctx.sfx.playFanfare();
    if (window.PYP) PYP.celebrate();
  };

  Flashcards.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['flashcards'] = Flashcards;
})();
