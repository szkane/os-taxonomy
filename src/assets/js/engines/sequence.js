/* ==========================================================================
   Engine: sequence — build a timeline or cycle
   Explore: tap cards in the tray to hear each stage.
   Challenge: fill the numbered slots, then verify. The first misordered
   slot earns a targeted clue, not a score. Solving plays the story back.
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

    var wrap = PYP.el('div', 'seq-wrap');
    this.slotsEl = PYP.el('div', 'seq-slots');
    wrap.appendChild(this.slotsEl);
    var actions = PYP.el('div', 'seq-actions');
    var check = PYP.el('button', 'ml-control ml-control--primary');
    check.type = 'button';
    check.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Check the order</span>';
    check.addEventListener('click', function () { self.verify(); });
    actions.appendChild(check);
    var again = PYP.el('button', 'ml-control');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Start over</span>';
    again.addEventListener('click', function () { self.reset(); });
    actions.appendChild(again);
    wrap.appendChild(actions);
    this.tray = PYP.el('div', 'seq-tray');
    this.tray.setAttribute('aria-label', 'Stage cards');
    wrap.appendChild(this.tray);
    root.appendChild(wrap);

    var cards = PYP.shuffle((config.cards || []).map(function (c, i) { return { card: c, order: i }; }));
    var self2 = this;
    cards.forEach(function (entry) {
      var chip = PYP.el('button', 'seq-card');
      chip.type = 'button';
      chip.setAttribute('data-order', String(entry.order));
      chip.draggable = true;
      var em = PYP.el('span', 'seq-emoji');
      em.setAttribute('aria-hidden', 'true');
      em.textContent = entry.card.emoji || '•';
      var lab = PYP.el('span', 'seq-card-label', entry.card.label);
      chip.appendChild(em); chip.appendChild(lab);
      chip.addEventListener('click', function (e) {
        e.stopPropagation();
        self2.pick(entry.order, chip);
      });
      chip.addEventListener('dragstart', function (e) {
        self2.pick(entry.order, chip);
        chip.classList.add('is-dragging');
        try { e.dataTransfer.setData('text/plain', String(entry.order)); } catch (err) {}
      });
      chip.addEventListener('dragend', function () { chip.classList.remove('is-dragging'); });
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
    ctx.instruct(config.explorePrompt || 'Tap a card to hear its part, then tap a slot to place it.');
  }

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
    this.ctx.instruct(card ? card.why || card.label : '');
  };

  Sequence.prototype.place = function (slot) {
    if (this.selected == null || this.checked) return;
    if (slot.querySelector('.seq-card')) return this.ctx.instruct('That slot is full — choose an empty one.');
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
    slot.appendChild(inner);
    chip.remove();
    this.slots[Array.prototype.indexOf.call(this.slotsEl.children, slot)] = order;
    this.selected = null;
    this.ctx.sfx.playClick();
    var remaining = this.tray.querySelectorAll('.seq-card').length;
    this.ctx.instruct(remaining === 0
      ? 'All placed! Press “Check the order”.'
      : remaining + ' card' + (remaining > 1 ? 's' : '') + ' left in the tray.');
  };

  Sequence.prototype.verify = function () {
    var self = this;
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
      this.ctx.instruct('Slot ' + (firstWrong + 1) + ' needs a change. “' + placedCard.label + '” does not go there — ' + (wantCard.clue || 'look at the cards again.'));
    }
  };

  Sequence.prototype.reset = function () {
    this.ctx.sfx.playClick();
    this.checked = false;
    this.selected = null;
    this.slots = [];
    var wrap = PYP.el('div', 'seq-wrap');
    var engine = this;
    // Rebuild by re-mounting the engine with the same config.
    var Ctor = PYP.engines['sequence'];
    this.root.innerHTML = '';
    new Ctor(this.root, this.config, this.ctx);
  };

  Sequence.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['sequence'] = Sequence;
})();
