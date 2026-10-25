/* ==========================================================================
   Engine: sequence — build a timeline or cycle (IB Two-Step Explore → Build)
   Step 1 (🔭 Explore stages): tap cards in the tray to inspect each stage
   and its clues in the spotlight card before ordering.
   Step 2 (🧩 Build order): fill the numbered slots, then verify. The first
   misordered slot earns a targeted clue, not a score. Solving plays the story.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Sequence(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.slots = [];
    this.checked = false;
    this.selected = null;
    this.stepMode = 'explore';

    this.stepTabs = PYP.el('div', 'ml-case-tabs');
    this.stepTabs.setAttribute('role', 'tablist');
    this.stepTabs.setAttribute('aria-label', 'Sequence steps');
    root.appendChild(this.stepTabs);

    var wrap = PYP.el('div', 'seq-wrap');
    this.spotlightEl = PYP.el('div', 'explore-spotlight');
    wrap.appendChild(this.spotlightEl);

    this.slotsEl = PYP.el('div', 'seq-slots');
    wrap.appendChild(this.slotsEl);
    this.actionsEl = PYP.el('div', 'seq-actions');
    var check = PYP.el('button', 'ml-control ml-control--primary');
    check.type = 'button';
    check.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Check the order</span>';
    check.addEventListener('click', function () { self.verify(); });
    this.actionsEl.appendChild(check);
    var again = PYP.el('button', 'ml-control');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Start over</span>';
    again.addEventListener('click', function () { self.reset(); });
    this.actionsEl.appendChild(again);
    wrap.appendChild(this.actionsEl);
    this.tray = PYP.el('div', 'seq-tray');
    this.tray.setAttribute('aria-label', 'Stage cards');
    wrap.appendChild(this.tray);
    root.appendChild(wrap);

    this.shuffledEntries = PYP.shuffle((config.cards || []).map(function (c, i) { return { card: c, order: i }; }));
    var self2 = this;
    this.shuffledEntries.forEach(function (entry) {
      var chip = self2.makeCardChip(entry.order, entry.card);
      self2.tray.appendChild(chip);
      entry.el = chip;
    });

    var n = (config.cards || []).length;
    for (var i = 0; i < n; i++) this.addSlot(i);
    this.slotTargets = Array.prototype.map.call(this.slotsEl.children, function (s) { return s; });
    this.slotTargets.forEach(function (slot) {
      slot.addEventListener('dragover', function (e) { e.preventDefault(); slot.classList.add('is-target'); });
      slot.addEventListener('dragleave', function () { slot.classList.remove('is-target'); });
      slot.addEventListener('drop', function (e) {
        e.preventDefault();
        slot.classList.remove('is-target');
        var order = Number(e.dataTransfer.getData('text/plain'));
        if (!isNaN(order)) { self.selected = order; self.place(slot); }
      });
    });

    this.setStepMode('explore');
  }

  Sequence.prototype.makeCardChip = function (order, card) {
    var self = this;
    var chip = PYP.el('button', 'seq-card');
    chip.type = 'button';
    chip.setAttribute('data-order', String(order));
    chip.draggable = true;
    var em = PYP.el('span', 'seq-emoji');
    em.setAttribute('aria-hidden', 'true');
    em.textContent = card.emoji || '•';
    var lab = PYP.el('span', 'seq-card-label', card.label);
    chip.appendChild(em); chip.appendChild(lab);
    chip.addEventListener('click', function (e) {
      e.stopPropagation();
      self.pick(order, chip);
    });
    chip.addEventListener('dragstart', function (e) {
      if (self.stepMode === 'explore') self.setStepMode('challenge');
      self.pick(order, chip);
      chip.classList.add('is-dragging');
      try { e.dataTransfer.setData('text/plain', String(order)); } catch (err) {}
    });
    chip.addEventListener('dragend', function () { chip.classList.remove('is-dragging'); });
    return chip;
  };

  Sequence.prototype.renderStepTabs = function () {
    var self = this;
    this.stepTabs.innerHTML = '';
    var expBtn = PYP.el('button', 'ml-control ml-case-tab');
    expBtn.type = 'button';
    expBtn.setAttribute('role', 'tab');
    expBtn.setAttribute('aria-pressed', this.stepMode === 'explore' ? 'true' : 'false');
    expBtn.innerHTML = '<span aria-hidden="true">🔭</span><span class="ml-button-label">Explore stages</span>';
    expBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setStepMode('explore');
    });
    this.stepTabs.appendChild(expBtn);

    var chalBtn = PYP.el('button', 'ml-control ml-case-tab');
    chalBtn.type = 'button';
    chalBtn.setAttribute('role', 'tab');
    chalBtn.setAttribute('aria-pressed', this.stepMode === 'challenge' ? 'true' : 'false');
    chalBtn.innerHTML = '<span aria-hidden="true">🧩</span><span class="ml-button-label">Build order</span>';
    chalBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setStepMode('challenge');
    });
    this.stepTabs.appendChild(chalBtn);
  };

  Sequence.prototype.setStepMode = function (mode) {
    this.stepMode = mode;
    this.renderStepTabs();
    var cards = this.config.cards || [];
    if (mode === 'explore') {
      this.spotlightEl.hidden = false;
      this.slotsEl.hidden = true;
      this.actionsEl.hidden = true;
      var firstOrder = this.selected != null ? this.selected : (this.shuffledEntries[0] ? this.shuffledEntries[0].order : 0);
      this.renderSpotlight(cards[firstOrder] || cards[0]);
      this.ctx.instruct('🔭 Explore first: tap any stage card below to discover what happens in that part!');
    } else {
      this.spotlightEl.hidden = true;
      this.slotsEl.hidden = false;
      this.actionsEl.hidden = false;
      this.ctx.instruct(this.config.explorePrompt || 'Tap a stage card, then tap a numbered slot to build the sequence.');
    }
  };

  Sequence.prototype.renderSpotlight = function (card) {
    var self = this;
    this.spotlightEl.innerHTML = '';
    if (!card) return;
    var badge = PYP.el('div', 'explore-spotlight-badge', '🔍 Stage explorer (' + (this.config.mode === 'cycle' ? 'Cycle' : 'Sequence') + ')');
    var head = PYP.el('div', 'explore-spotlight-head', (card.emoji ? card.emoji + ' ' : '') + card.label);
    var body = PYP.el('p', 'explore-spotlight-body', card.why || card.clue || ('Observe what happens during ' + card.label + '.'));
    var goBtn = PYP.el('button', 'ml-control ml-control--primary');
    goBtn.type = 'button';
    goBtn.innerHTML = '<span aria-hidden="true">🧩</span><span class="ml-button-label">Ready to build the order</span>';
    goBtn.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setStepMode('challenge');
    });
    this.spotlightEl.appendChild(badge);
    this.spotlightEl.appendChild(head);
    this.spotlightEl.appendChild(body);
    this.spotlightEl.appendChild(goBtn);
  };

  Sequence.prototype.addSlot = function (i) {
    var slot = PYP.el('div', 'seq-slot');
    slot.setAttribute('data-slot', String(i));
    var num = PYP.el('span', 'seq-slot-num', String(i + 1));
    slot.appendChild(num);
    slot.appendChild(PYP.el('span', 'seq-slot-hint', 'Tap a card, then here'));
    this.slotsEl.appendChild(slot);
    var self = this;
    slot.addEventListener('click', function () { self.place(slot); });
  };

  Sequence.prototype.pick = function (order, chip) {
    if (this.checked) return;
    this.selected = order;
    this.ctx.sfx.playClick();
    Array.prototype.forEach.call(this.tray.querySelectorAll('.seq-card'), function (el) {
      el.classList.remove('is-target');
    });
    chip.classList.add('is-target');
    var card = (this.config.cards || [])[order];
    if (this.stepMode === 'explore') {
      this.renderSpotlight(card);
    }
    this.ctx.instruct(card ? card.why || card.label : '');
  };

  Sequence.prototype.place = function (slot) {
    if (this.stepMode === 'explore') this.setStepMode('challenge');
    if (this.checked) return;
    var self = this;
    var existing = slot.querySelector('.seq-card');
    var slotIdx = Array.prototype.indexOf.call(this.slotsEl.children, slot);
    if (existing && this.selected == null) {
      // Return card to tray so child can rearrange freely
      var prevOrder = Number(existing.getAttribute('data-order'));
      var prevCard = (this.config.cards || [])[prevOrder];
      existing.remove();
      slot.classList.remove('is-wrong-spot');
      if (!slot.querySelector('.seq-slot-hint')) {
        slot.appendChild(PYP.el('span', 'seq-slot-hint', 'Tap a card, then here'));
      }
      delete this.slots[slotIdx];
      if (prevCard) this.tray.appendChild(this.makeCardChip(prevOrder, prevCard));
      this.ctx.sfx.playClick();
      this.ctx.instruct('Moved “' + (prevCard ? prevCard.label : 'card') + '” back to the tray.');
      return;
    }
    if (this.selected == null) return;
    if (existing) return this.ctx.instruct('That slot is full — tap it with nothing selected to move its card back.');
    var order = this.selected;
    var chip = this.tray.querySelector('[data-order="' + order + '"]');
    if (!chip) return;
    var card = (this.config.cards || [])[order];
    var inner = PYP.el('div', 'seq-card');
    inner.setAttribute('data-order', String(order));
    var em = PYP.el('span', 'seq-emoji'); em.setAttribute('aria-hidden', 'true'); em.textContent = card.emoji || '•';
    var lab = PYP.el('span', 'seq-card-label', card.label);
    inner.appendChild(em); inner.appendChild(lab);
    slot.querySelector('.seq-slot-hint') && slot.querySelector('.seq-slot-hint').remove();
    slot.classList.remove('is-wrong-spot');
    slot.appendChild(inner);
    chip.remove();
    this.slots[slotIdx] = order;
    this.selected = null;
    this.ctx.sfx.playClick();
    var remaining = this.tray.querySelectorAll('.seq-card').length;
    this.ctx.instruct(remaining === 0
      ? 'All placed! Press “Check the order”.'
      : remaining + ' card' + (remaining > 1 ? 's' : '') + ' left in the tray.');
  };

  Sequence.prototype.verify = function () {
    if (this.tray.querySelectorAll('.seq-card').length) {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct('👆 Some cards are still in the tray. Place them all first!');
      return;
    }
    var cards = this.config.cards || [];
    var firstWrong = -1;
    for (var i = 0; i < this.slots.length; i++) {
      if (this.slots[i] !== i) { firstWrong = i; break; }
    }
    if (firstWrong === -1) {
      this.checked = true;
      Array.prototype.forEach.call(this.slotsEl.children, function (s) { s.classList.add('is-solved-good'); });
      this.ctx.sfx.playFanfare();
      if (window.PYP) PYP.celebrate();
      var story = cards.map(function (c) { return c.label; }).join(' → ');
      var tail = this.config.mode === 'cycle' ? ' …and around again!' : '. The end!';
      this.ctx.instruct((this.config.celebrate ? this.config.celebrate + ' ' : 'Perfect order! ') + story + tail);
      this.ctx.tts.speak(cards.map(function (c) { return c.label; }).join(', then '));
    } else {
      this.ctx.sfx.playBuzz();
      var slotEl = this.slotsEl.children[firstWrong];
      Array.prototype.forEach.call(this.slotsEl.children, function (s) { s.classList.remove('is-wrong-spot'); });
      slotEl.classList.add('is-wrong-spot');
      var placedCard = cards[this.slots[firstWrong]];
      var wantCard = cards[firstWrong];
      this.ctx.instruct('Slot ' + (firstWrong + 1) + ' needs a change (tap it to return “' + placedCard.label + '”). Clue: ' + (wantCard.clue || wantCard.why || 'look at the cards again.'));
    }
  };

  Sequence.prototype.reset = function () {
    this.ctx.sfx.playClick();
    var Ctor = PYP.engines['sequence'];
    this.root.innerHTML = '';
    new Ctor(this.root, this.config, this.ctx);
  };

  Sequence.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['sequence'] = Sequence;
})();
