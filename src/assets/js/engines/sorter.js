/* ==========================================================================
   Engine: sorter — category bins (IB Two-Step Explore → Sort Challenge)
   Step 1 (🔭 Explore items): tap any item in the tray to inspect its
   spotlight card, category clue, and why-explanation without test pressure.
   Step 2 (🧺 Sort challenge): place every item into a bin (tap item → tap bin,
   or drag), then check. Misplaced items shake, return to the tray with their
   why. Submitting an unfinished tray never penalizes.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Sorter(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.placed = {};        // item index -> bin id
    this.selected = null;
    this.checked = false;
    this.stepMode = 'explore';
    this.inspectedCount = 0;

    this.stepTabs = PYP.el('div', 'ml-case-tabs');
    this.stepTabs.setAttribute('role', 'tablist');
    this.stepTabs.setAttribute('aria-label', 'Sorter steps');
    root.appendChild(this.stepTabs);

    var wrap = PYP.el('div', 'sorter-wrap');
    var trayCol = PYP.el('div');
    this.tray = PYP.el('div', 'sorter-tray');
    this.tray.setAttribute('aria-label', 'Items to sort');
    trayCol.appendChild(this.tray);
    wrap.appendChild(trayCol);

    var rightCol = PYP.el('div');
    this.spotlightEl = PYP.el('div', 'explore-spotlight');
    rightCol.appendChild(this.spotlightEl);

    this.binsCol = PYP.el('div');
    this.binsEl = PYP.el('div', 'sorter-bins');
    this.binRefs = {};
    var self2 = this;
    (config.bins || []).forEach(function (bin) {
      var b = PYP.el('div', 'sorter-bin');
      b.setAttribute('data-bin', bin.id);
      var head = PYP.el('div', 'sorter-bin-head');
      var name = PYP.el('span', null, (bin.emoji ? bin.emoji + ' ' : '') + bin.label);
      var count = PYP.el('span', 'sorter-bin-count', '0');
      head.appendChild(name); head.appendChild(count);
      var drop = PYP.el('div', 'sorter-bin-drop');
      b.appendChild(head); b.appendChild(drop);
      b.addEventListener('click', function () { self2.dropInto(bin.id); });
      self2.binsEl.appendChild(b);
      self2.binRefs[bin.id] = { el: b, count: count, drop: drop, bin: bin };
    });
    this.binsCol.appendChild(this.binsEl);
    var actions = PYP.el('div', 'seq-actions');
    var check = PYP.el('button', 'ml-control ml-control--primary');
    check.type = 'button';
    check.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Check my sorting</span>';
    check.addEventListener('click', function () { self.check(); });
    actions.appendChild(check);
    this.binsCol.appendChild(actions);
    rightCol.appendChild(this.binsCol);
    wrap.appendChild(rightCol);
    root.appendChild(wrap);

    this.items = config.items || [];
    this.items.forEach(function (item, i) {
      var chip = PYP.el('button', 'sorter-item');
      chip.type = 'button';
      chip.setAttribute('aria-pressed', 'false');
      chip.setAttribute('data-index', String(i));
      chip.textContent = (item.emoji ? item.emoji + ' ' : '') + item.label;
      chip.draggable = true;
      chip.addEventListener('click', function (e) {
        e.stopPropagation();
        self.select(i, chip);
      });
      chip.addEventListener('dragstart', function (e) {
        if (self.stepMode === 'explore') self.setStepMode('challenge');
        self.select(i, chip);
        chip.classList.add('is-dragging');
        try { e.dataTransfer.setData('text/plain', String(i)); } catch (err) {}
      });
      chip.addEventListener('dragend', function () { chip.classList.remove('is-dragging'); });
      self.tray.appendChild(chip);
      item._el = chip;
    });
    Object.keys(this.binRefs).forEach(function (id) {
      var b = self.binRefs[id];
      b.el.addEventListener('dragover', function (e) { e.preventDefault(); b.el.classList.add('is-target'); });
      b.el.addEventListener('dragleave', function () { b.el.classList.remove('is-target'); });
      b.el.addEventListener('drop', function (e) {
        e.preventDefault();
        b.el.classList.remove('is-target');
        var idx = Number(e.dataTransfer.getData('text/plain'));
        if (!isNaN(idx)) { self.selected = idx; self.dropInto(id); }
      });
    });

    this.setStepMode('explore');
  }

  Sorter.prototype.renderStepTabs = function () {
    var self = this;
    this.stepTabs.innerHTML = '';
    var expBtn = PYP.el('button', 'ml-control ml-case-tab');
    expBtn.type = 'button';
    expBtn.setAttribute('role', 'tab');
    expBtn.setAttribute('aria-pressed', this.stepMode === 'explore' ? 'true' : 'false');
    expBtn.innerHTML = '<span aria-hidden="true">🔭</span><span class="ml-button-label">Explore items</span>';
    expBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setStepMode('explore');
    });
    this.stepTabs.appendChild(expBtn);

    var chalBtn = PYP.el('button', 'ml-control ml-case-tab');
    chalBtn.type = 'button';
    chalBtn.setAttribute('role', 'tab');
    chalBtn.setAttribute('aria-pressed', this.stepMode === 'challenge' ? 'true' : 'false');
    chalBtn.innerHTML = '<span aria-hidden="true">🧺</span><span class="ml-button-label">Sort challenge</span>';
    chalBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setStepMode('challenge');
    });
    this.stepTabs.appendChild(chalBtn);
  };

  Sorter.prototype.setStepMode = function (mode) {
    this.stepMode = mode;
    this.renderStepTabs();
    if (mode === 'explore') {
      this.spotlightEl.hidden = false;
      this.binsCol.hidden = true;
      var idx = this.selected != null ? this.selected : 0;
      this.renderSpotlight(this.items[idx] || null);
      this.ctx.instruct('🔭 Explore first: tap any item card on the left to inspect its clues before sorting!');
    } else {
      this.spotlightEl.hidden = true;
      this.binsCol.hidden = false;
      this.ctx.instruct(this.config.explorePrompt || 'Tap an item to select it, then tap the matching category bin!');
    }
  };

  Sorter.prototype.renderSpotlight = function (item) {
    var self = this;
    this.spotlightEl.innerHTML = '';
    if (!item) return;
    var badge = PYP.el('div', 'explore-spotlight-badge', '🔍 Inquiry spotlight');
    var head = PYP.el('div', 'explore-spotlight-head', (item.emoji ? item.emoji + ' ' : '') + item.label);
    var body = PYP.el('p', 'explore-spotlight-body', item.why || ('Notice the properties of ' + item.label + ' and think about which group it belongs to.'));
    var binsList = (this.config.bins || []).map(function (b) { return (b.emoji ? b.emoji + ' ' : '') + b.label; }).join('  ·  ');
    var binsNote = PYP.el('div', 'explore-spotlight-meta', 'Categories: ' + binsList);
    var goBtn = PYP.el('button', 'ml-control ml-control--primary');
    goBtn.type = 'button';
    goBtn.innerHTML = '<span aria-hidden="true">🧺</span><span class="ml-button-label">Ready to sort into bins</span>';
    goBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setStepMode('challenge');
    });
    this.spotlightEl.appendChild(badge);
    this.spotlightEl.appendChild(head);
    this.spotlightEl.appendChild(body);
    this.spotlightEl.appendChild(binsNote);
    this.spotlightEl.appendChild(goBtn);
  };

  Sorter.prototype.select = function (i, chip) {
    if (this.placed[i] !== undefined) return;
    if (this.checked) return;
    this.selected = i;
    this.ctx.sfx.playClick();
    Array.prototype.forEach.call(this.tray.querySelectorAll('.sorter-item'), function (el) {
      el.setAttribute('aria-pressed', 'false');
      el.classList.remove('is-target');
    });
    chip.setAttribute('aria-pressed', 'true');
    var item = this.items[i];
    if (this.stepMode === 'explore') {
      this.renderSpotlight(item);
    }
    this.ctx.instruct(item.why || item.label);
  };

  Sorter.prototype.dropInto = function (binId) {
    if (this.stepMode === 'explore') this.setStepMode('challenge');
    if (this.selected == null || this.checked) return;
    var self = this;
    var i = this.selected;
    var item = this.items[i];
    this.placed[i] = binId;
    this.ctx.sfx.playClick();
    item._el.classList.add('is-done');
    item._el.setAttribute('aria-pressed', 'false');
    var ref = this.binRefs[binId];
    var mini = PYP.el('button', 'sorter-item', (item.emoji ? item.emoji + ' ' : '') + item.label);
    mini.type = 'button';
    mini.setAttribute('data-from', String(i));
    mini.title = 'Tap to return to tray';
    mini.addEventListener('click', function (e) {
      e.stopPropagation();
      if (self.checked) return;
      self.ctx.sfx.playClick();
      mini.remove();
      ref.count.textContent = String(ref.drop.children.length);
      item._el.classList.remove('is-done');
      delete self.placed[i];
      self.ctx.instruct('Returned ' + item.label + ' to the tray.');
    });
    ref.drop.appendChild(mini);
    ref.count.textContent = String(ref.drop.children.length);
    this.selected = null;
    var left = this.items.filter(function (x, idx) { return self.placed[idx] === undefined; });
    if (left.length === 0) {
      this.ctx.instruct('Every item is in a bin — press “Check my sorting”.');
    } else if (left.length === 1) {
      this.ctx.instruct('One item left: ' + left[0].label + '.');
    } else {
      this.ctx.instruct(left.length + ' items still waiting. Keep sorting!');
    }
  };

  Sorter.prototype.check = function () {
    var self = this;
    var unplaced = this.items.filter(function (x, idx) { return self.placed[idx] === undefined; });
    if (unplaced.length) {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct('👆 There ' + (unplaced.length === 1 ? 'is 1 item' : 'are ' + unplaced.length + ' items') + ' still in the tray. Sort them first!');
      return;
    }
    this.checked = true;
    var wrong = [];
    this.items.forEach(function (item, i) {
      var ok = self.placed[i] === item.bin;
      var ref = self.binRefs[self.placed[i]];
      var mini = ref.drop.querySelector('[data-from="' + i + '"]');
      if (ok) {
        if (mini) mini.style.background = '#d8f5cd';
      } else {
        wrong.push(i);
        if (mini) mini.remove();
        ref.count.textContent = String(ref.drop.children.length);
        item._el.classList.remove('is-done');
        item._el.classList.add('is-misplaced');
        delete self.placed[i];
      }
    });
    if (wrong.length === 0) {
      this.checked = false;
      this.ctx.sfx.playFanfare();
      if (window.PYP) PYP.celebrate();
      this.ctx.instruct('Perfect sorting! ' + (this.config.celebrate || 'You really know these categories.'));
      var foot = this.binsEl.parentElement.querySelector('.seq-actions') || this.binsEl.parentElement;
      if (!foot.querySelector('.sorter-again')) {
        var again = PYP.el('button', 'ml-control sorter-again');
        again.type = 'button';
        again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Shuffle &amp; play again</span>';
        again.addEventListener('click', function () {
          self.ctx.sfx.playClick();
          var Ctor = PYP.engines['sorter'];
          var cfg = self.config, ctx = self.ctx;
          self.root.innerHTML = '';
          new Ctor(self.root, cfg, ctx);
        });
        foot.appendChild(again);
      }
    } else {
      this.ctx.sfx.playBuzz();
      var first = this.items[wrong[0]];
      this.ctx.instruct((first.emoji || '') + ' ' + first.label + ' does not belong there. ' + (first.why || 'Think again!'));
      setTimeout(function () {
        first._el.classList.remove('is-misplaced');
        self.checked = false;
      }, 500);
    }
  };

  Sorter.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['sorter'] = Sorter;
})();
