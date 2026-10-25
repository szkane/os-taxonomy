/* ==========================================================================
   Engine: word-builder — construct the word from scrambled letters
   Step 1 (🔭 Explore words): tap any word card to see its emoji, spelling
   chunks, and hint, and hear it spoken aloud.
   Step 2 (🔤 Word 1..N): build each word from scrambled letters; two misses
   glow the next letter (scaffold fading).
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function WordBuilder(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.misses = 0;
    this.solved = 0;
    this.doneSet = {};
    this.exploreMode = true;

    var wrap = PYP.el('div', 'wb-wrap');
    var tabs = PYP.el('div', 'ml-case-tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Words');
    this.tabs = tabs;
    wrap.appendChild(tabs);

    this.exploreEl = PYP.el('div', 'explore-spotlight');
    wrap.appendChild(this.exploreEl);

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
    this.foot = foot;
    var again = PYP.el('button', 'ml-control');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">New word</span>';
    again.addEventListener('click', function () { self.ctx.sfx.playClick(); self.nextWord(true); });
    foot.appendChild(again);
    wrap.appendChild(foot);
    root.appendChild(wrap);
    this.showExplore();
  }

  WordBuilder.prototype.renderTabs = function () {
    var self = this;
    this.tabs.innerHTML = '';
    var expTab = PYP.el('button', 'ml-control ml-case-tab');
    expTab.type = 'button';
    expTab.setAttribute('role', 'tab');
    expTab.setAttribute('aria-pressed', this.exploreMode ? 'true' : 'false');
    expTab.innerHTML = '<span aria-hidden="true">🔭</span><span class="ml-button-label">Explore words</span>';
    expTab.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.showExplore();
    });
    this.tabs.appendChild(expTab);

    (this.config.words || []).forEach(function (w, i) {
      var tab = PYP.el('button', 'ml-control ml-case-tab' + (self.doneSet && self.doneSet[i] ? ' is-solved' : ''));
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      var isCurrent = !self.exploreMode && self.current && self.current.index === i;
      tab.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      tab.innerHTML = '<span aria-hidden="true">' + (self.doneSet && self.doneSet[i] ? '✅' : '🔤') + '</span><span class="ml-button-label">Word ' + (i + 1) + '</span>';
      tab.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.loadWordIndex(i);
      });
      self.tabs.appendChild(tab);
    });
  };

  WordBuilder.prototype.showExplore = function () {
    var self = this;
    this.exploreMode = true;
    this.exploreEl.hidden = false;
    this.promptEl.hidden = true;
    this.trayEl.hidden = true;
    this.foot.hidden = true;
    this.renderTabs();

    this.exploreEl.innerHTML = '';
    this.exploreEl.appendChild(PYP.el('div', 'explore-spotlight-badge', '🔭 Word Pattern Explorer'));
    this.exploreEl.appendChild(PYP.el('p', 'explore-spotlight-body', 'Tap any word below to hear its sound and notice its letter pattern before building it from scrambled tiles!'));
    var row = PYP.el('div', 'seq-actions');
    (this.config.words || []).forEach(function (w, i) {
      var chip = PYP.el('button', 'ml-control');
      chip.type = 'button';
      chip.innerHTML = '<span aria-hidden="true">' + (w.emoji || '🔤') + '</span><span class="ml-button-label">' + PYP.esc(w.word) + '</span>';
      chip.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        var letters = w.word.split('').join(' · ');
        self.ctx.instruct((w.emoji || '🔤') + ' “' + w.word + '” (' + letters + ') — ' + (w.hint || 'Notice the order of the letters!'));
        if (!(window.PYP && PYP.ttsIsMuted && PYP.ttsIsMuted())) {
          self.ctx.tts.speak(w.word);
        }
      });
      row.appendChild(chip);
    });
    this.exploreEl.appendChild(row);

    var goBtn = PYP.el('button', 'ml-control ml-control--primary');
    goBtn.type = 'button';
    goBtn.innerHTML = '<span aria-hidden="true">🔤</span><span class="ml-button-label">Start building words</span>';
    goBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.loadWordIndex(0);
    });
    this.exploreEl.appendChild(goBtn);
    this.ctx.instruct('🔭 Explore first: tap the words to hear them and study their letters, then start building!');
  };

  WordBuilder.prototype.loadWordIndex = function (idx) {
    var words = this.config.words || [];
    if (!words[idx]) return;
    this.exploreMode = false;
    this.exploreEl.hidden = true;
    this.promptEl.hidden = false;
    this.trayEl.hidden = false;
    this.foot.hidden = false;
    this.current = { word: words[idx], index: idx };
    this.misses = 0;
    this.placed = [];
    this.renderTabs();
    this.render();
    this.ctx.instruct(this.config.prompt || ('Tap the letters in order to spell “' + words[idx].word + '”!'));
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
    var pick = remaining.length ? remaining[0] : null;
    if (!pick) return;
    this.loadWordIndex(pick.i);
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
