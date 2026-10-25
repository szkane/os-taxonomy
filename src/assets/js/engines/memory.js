/* ==========================================================================
   Engine: memory — match-the-pairs
   A calm pairing game: flip two cards; matched pairs stay open with their
   connection spoken/shown. Used for vocabulary (word ↔ meaning), animal
   features, symbol ↔ name. Few pairs, big cards, no timer — thinking space.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Memory(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.first = null;
    this.lock = false;
    this.moves = 0;
    this.matched = 0;

    var wrap = PYP.el('div', 'memory-wrap');
    var hud = PYP.el('div', 'fc2-top');
    this.hudChip = PYP.el('span', 'ml-chipstat', 'Pairs 0 of ' + (config.pairs || []).length);
    hud.appendChild(this.hudChip);
    wrap.appendChild(hud);
    this.grid = PYP.el('div', 'memory-grid');
    wrap.appendChild(this.grid);
    var foot = PYP.el('div', 'seq-actions');
    this.resetBtn = PYP.el('button', 'ml-control');
    this.resetBtn.type = 'button';
    this.resetBtn.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Shuffle again</span>';
    this.resetBtn.addEventListener('click', function () { self.ctx.sfx.playClick(); self.build(); });
    foot.appendChild(this.resetBtn);
    wrap.appendChild(foot);
    root.appendChild(wrap);
    this.build();
    ctx.instruct(config.explorePrompt || 'Flip two cards. Find the pairs that belong together!');
  }

  Memory.prototype.build = function () {
    var self = this;
    this.first = null;
    this.lock = false;
    this.moves = 0;
    this.matched = 0;
    this.total = (this.config.pairs || []).length;
    if (this.hudChip) this.hudChip.textContent = 'Pairs 0 of ' + this.total;
    this.grid.innerHTML = '';
    var cards = [];
    (this.config.pairs || []).forEach(function (pair, i) {
      cards.push({ key: String(i), face: pair.a, pair: pair, side: 'a' });
      cards.push({ key: String(i), face: pair.b, pair: pair, side: 'b' });
    });
    PYP.shuffle(cards).forEach(function (card) {
      var btn = PYP.el('button', 'fc-card memory-card');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('data-key', card.key);
      var inner = PYP.el('div', 'fc-inner');
      var back = PYP.el('div', 'fc-face fc-face--front');
      back.appendChild(PYP.el('span', 'memory-back-mark', ''));
      back.setAttribute('aria-label', 'Hidden card');
      var front = PYP.el('div', 'fc-face fc-face--front memory-front');
      var em = PYP.el('span', 'memory-emoji');
      em.setAttribute('aria-hidden', 'true');
      em.textContent = card.face.emoji || '•';
      var lab = PYP.el('span', 'memory-label', card.face.label);
      front.appendChild(em); front.appendChild(lab);
      inner.appendChild(back); inner.appendChild(front);
      btn.appendChild(inner);
      btn.addEventListener('click', function () { self.flip(btn, card); });
      self.grid.appendChild(btn);
    });
  };

  Memory.prototype.flip = function (btn, card) {
    var self = this;
    if (this.lock || btn.classList.contains('is-matched') || btn.getAttribute('aria-pressed') === 'true') return;
    btn.setAttribute('aria-pressed', 'true');
    this.ctx.sfx.playClick();
    if (!this.first) {
      this.first = { btn: btn, card: card };
      this.ctx.instruct(card.face.hint || 'Now find its partner!');
      return;
    }
    this.moves += 1;
    var a = this.first;
    this.first = null;
    var total = (this.config.pairs || []).length;
    if (a.card.key === card.key && a.btn !== btn) {
      a.btn.classList.add('is-matched');
      btn.classList.add('is-matched');
      this.matched += 1;
      if (this.hudChip) this.hudChip.textContent = 'Pairs ' + this.matched + ' of ' + this.total;
      this.ctx.sfx.playCorrect();
      this.ctx.instruct(card.face.why || (a.card.face.label + ' + ' + card.face.label + ' — a pair!'), { isFeedback: true });
      if (this.matched === this.total) {
        this.ctx.sfx.playFanfare();
        if (window.PYP) PYP.celebrate();
        setTimeout(function () { self.finish(); }, 1400);
      }
    } else {
      this.lock = true;
      this.ctx.sfx.playBuzz();
      this.ctx.instruct('Not a pair — remember what you saw, then try again.', { isFeedback: true });
      setTimeout(function () {
        a.btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-pressed', 'false');
        self.lock = false;
      }, 900);
    }
  };

  Memory.prototype.finish = function () {
    var self = this;
    this.root.innerHTML = '';
    var wrap = PYP.el('div', 'mission-end');
    wrap.appendChild(PYP.el('div', 'mission-end-score', '🎉 All ' + this.total + ' pairs found!'));
    var note = PYP.el('p', 'mission-end-note');
    note.textContent = 'You matched every pair in ' + this.moves + ' flips of a pair. ' + (this.config.celebrate || 'Wonderful memory!');
    wrap.appendChild(note);
    var again = PYP.el('button', 'ml-control ml-control--primary');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Shuffle &amp; play again</span>';
    again.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.build();
      self.ctx.instruct(self.config.explorePrompt || 'Flip two cards. Find the pairs that belong together!');
    });
    wrap.appendChild(again);
    this.root.appendChild(wrap);
    this.ctx.instruct('Memory complete — every pair found this session.', { speak: false });
  };

  Memory.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['memory'] = Memory;
})();
