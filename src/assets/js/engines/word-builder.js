/* ==========================================================================
   Engine: word-builder — construct the word from scrambled letters
   For spelling fluency: see the picture, hear the word, tap the letters in
   order. Two misses glow the next letter (scaffold fading). Fresh words
   each round; the check is the construction itself.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function WordBuilder(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.queue = PYP.shuffle((config.words || []).slice());
    this.misses = 0;
    this.solved = 0;

    var wrap = PYP.el('div', 'wb-wrap');
    var tabs = PYP.el('div', 'ml-case-tabs');
    tabs.setAttribute('aria-label', 'Words');
    this.tabs = tabs;
    wrap.appendChild(tabs);
    this.promptEl = PYP.el('div', 'wb-prompt');
    this.emojiEl = PYP.el('span', 'wb-emoji');
    this.emojiEl.setAttribute('aria-hidden', 'true');
    this.promptEl.appendChild(this.emojiEl);
    this.slotsEl = PYP.el('div', 'wb-slots');
    this.promptEl.appendChild(this.slotsEl);
    wrap.appendChild(this.promptEl);
    this.trayEl = PYP.el('div', 'wb-tray');
    wrap.appendChild(this.trayEl);
    var foot = PYP.el('div', 'seq-actions');
    var again = PYP.el('button', 'ml-control');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">New word</span>';
    again.addEventListener('click', function () { self.ctx.sfx.playClick(); self.nextWord(true); });
    foot.appendChild(again);
    wrap.appendChild(foot);
    root.appendChild(wrap);
    this.renderTabs();
    this.nextWord(false);
  }

  WordBuilder.prototype.renderTabs = function () {
    var self = this;
    this.tabs.innerHTML = '';
    (this.config.words || []).forEach(function (w, i) {
      var tab = PYP.el('span', 'ml-control ml-case-tab' + (self.doneSet && self.doneSet[i] ? ' is-solved' : ''));
      tab.innerHTML = '<span aria-hidden="true">' + (self.doneSet && self.doneSet[i] ? '✅' : '🔤') + '</span><span class="ml-button-label">Word ' + (i + 1) + '</span>';
      self.tabs.appendChild(tab);
    });
  };

  WordBuilder.prototype.nextWord = function (skip) {
    if (!this.doneSet) this.doneSet = {};
    if (skip && this.current) this.doneSet[this.current.index] = true;
    var all = (this.config.words || []).length;
    if (Object.keys(this.doneSet).length >= all) {
      this.doneSet = {};
      this.ctx.sfx.playFanfare();
    }
    var remaining = (this.config.words || []).map(function (w, i) { return { w: w, i: i }; })
      .filter(function (x) { return !this.doneSet[x.i]; }, this);
    var pick = remaining.length ? remaining[Math.floor(Math.random() * remaining.length)] : null;
    if (!pick) return;
    this.current = { word: pick.w, index: pick.i };
    this.misses = 0;
    this.placed = [];
    this.renderTabs();
    this.render();
    this.ctx.instruct(this.config.prompt || 'Tap the letters in the right order to build the word!');
  };

  WordBuilder.prototype.render = function () {
    var self = this;
    var word = this.current.word.word;
    this.emojiEl.textContent = this.current.word.emoji || '🔤';
    this.slotsEl.innerHTML = '';
    for (var i = 0; i < word.length; i++) {
      var slot = PYP.el('span', 'wb-slot' + (this.placed[i] != null ? ' is-filled' : ''));
      slot.textContent = this.placed[i] != null ? this.placed[i] : '';
      this.slotsEl.appendChild(slot);
    }
    this.trayEl.innerHTML = '';
    var letters = PYP.shuffle(word.split(''));
    letters.forEach(function (ch, idx) {
      var tile = PYP.el('button', 'wb-tile');
      tile.type = 'button';
      tile.textContent = ch;
      tile.setAttribute('data-idx', String(idx));
      tile.addEventListener('click', function () { self.tapTile(tile, ch); });
      self.trayEl.appendChild(tile);
    });
  };

  WordBuilder.prototype.tapTile = function (tile, ch) {
    if (tile.disabled) return;
    var word = this.current.word.word;
    var pos = this.placed.length;
    if (word[pos] === ch) {
      tile.disabled = true;
      tile.classList.add('is-used');
      this.placed.push(ch);
      this.ctx.sfx.playStreak(this.placed.length);
      this.render();
      if (this.placed.length === word.length) {
        this.solved += 1;
        this.ctx.sfx.playFanfare();
        if (window.PYP) PYP.celebrate();
        this.doneSet = this.doneSet || {};
        this.doneSet[this.current.index] = true;
        this.renderTabs();
        var self = this;
        setTimeout(function () {
          self.ctx.instruct('“' + word + '” built! ' + (self.current.word.hint || 'You spelled it.'), { isFeedback: true });
          setTimeout(function () { self.nextWord(true); }, 2200);
        }, 350);
      }
    } else {
      this.misses += 1;
      this.ctx.sfx.playBuzz();
      tile.classList.add('is-wrong');
      var self2 = this;
      setTimeout(function () { tile.classList.remove('is-wrong'); }, 400);
      if (this.misses >= 2) {
        var need = word[this.placed.length];
        this.trayEl.querySelectorAll('.wb-tile').forEach(function (t) {
          if (t.textContent === need && !t.disabled) t.classList.add('is-hinted');
        });
        this.ctx.instruct('Look for the glowing “' + need + '” — it comes next.', { isFeedback: true });
      } else {
        this.ctx.instruct('Not that one yet — say the word slowly and listen for the next sound.', { isFeedback: true });
      }
    }
  };

  WordBuilder.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['word-builder'] = WordBuilder;
})();
