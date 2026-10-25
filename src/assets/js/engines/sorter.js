/* ==========================================================================
   Engine: sorter — category bins
   Explore: tap any item in the tray to hear its fact in the instruction slot.
   Challenge: place every item into a bin (tap item → tap bin, or drag),
   then check. Misplaced items shake, return to the tray with their why.
   Warm guard: submitting an unfinished tray never penalizes.
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

    var wrap = PYP.el('div', 'sorter-wrap');
    var trayCol = PYP.el('div');
    this.tray = PYP.el('div', 'sorter-tray');
    this.tray.setAttribute('aria-label', 'Items to sort');
    trayCol.appendChild(this.tray);
    wrap.appendChild(trayCol);

    var binsCol = PYP.el('div');
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
    binsCol.appendChild(this.binsEl);
    var actions = PYP.el('div', 'seq-actions');
    var check = PYP.el('button', 'ml-control ml-control--primary');
    check.type = 'button';
    check.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Check my sorting</span>';
    check.addEventListener('click', function () { self.check(); });
    actions.appendChild(check);
    binsCol.appendChild(actions);
    wrap.appendChild(binsCol);
    root.appendChild(wrap);

    this.items = config.items || [];
    var self = this;
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
    ctx.instruct(this.config.explorePrompt || 'Tap an item to learn about it, then tap a bin to sort it.');
  }

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
    this.ctx.instruct(item.why || item.label);
  };

  Sorter.prototype.dropInto = function (binId) {
    if (this.selected == null || this.checked) return;
    var self = this;
    var i = this.selected;
    var item = this.items[i];
    this.placed[i] = binId;
    this.ctx.sfx.playClick();
    item._el.classList.add('is-done');
    item._el.setAttribute('aria-pressed', 'false');
    var ref = this.binRefs[binId];
    var mini = PYP.el('span', 'sorter-item', (item.emoji ? item.emoji + ' ' : '') + item.label);
    mini.setAttribute('data-from', String(i));
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
      // Offer a fresh round right where the child is.
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
