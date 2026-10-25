/* ==========================================================================
   Engine: storybook — read-along picture books with strategy stop-points
   Public-domain tales retold for this course. The book pauses where meaning
   matters: a mentor owl models the reader move once (think-aloud), then the
   CHILD makes the move at the next stop. One page = one sentence + a staged
   canvas illustration. Random book on entry; 🎲 swaps books; recap names the
   strategies used. Early band: every page is read aloud automatically.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Storybook(root, config, ctx) {
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.books = config.books || [];
    this.bookIndex = Math.floor(Math.random() * this.books.length);
    this.build();
    this.openBook(this.bookIndex);
  }

  Storybook.prototype.build = function () {
    var self = this;
    this.root.innerHTML = '';
    var wrap = PYP.el('div', 'sb-wrap');

    var top = PYP.el('div', 'sb-top');
    this.titleChip = PYP.el('span', 'ml-chipstat sb-title', '');
    top.appendChild(this.titleChip);
    var dice = PYP.el('button', 'ml-control ml-control--icon-only');
    dice.type = 'button';
    dice.setAttribute('aria-label', 'Read a different story');
    dice.title = 'Another story';
    dice.innerHTML = '<span aria-hidden="true" style="font-size:19px">🎲</span>';
    dice.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      var next = self.bookIndex;
      if (self.books.length > 1) {
        while (next === self.bookIndex) next = Math.floor(Math.random() * self.books.length);
      }
      self.openBook(next);
    });
    top.appendChild(dice);
    wrap.appendChild(top);

    var page = PYP.el('div', 'sb-page');
    this.art = document.createElement('canvas');       // scenery (Rough.js)
    page.appendChild(this.art);
    this.actorBox = PYP.el('div', 'sb-actors');        // actors (Konva shapes)
    page.appendChild(this.actorBox);
    this.dots = PYP.el('div', 'sb-dots');
    page.appendChild(this.dots);
    wrap.appendChild(page);
    this.hybrid = !!(window.Konva && window.rough && PYP.actors);
    if (this.hybrid) {
      this.kStage = new Konva.Stage({ container: this.actorBox, width: 640, height: 372 });
      this.kLayer = new Konva.Layer();
      this.kStage.add(this.kLayer);
      this.kIdle = new Konva.Animation(frame => {
        this.kLayer.getChildren().forEach(node => {
          if (node.getAttr('baseY') == null) return;
          node.y(node.getAttr('baseY') + Math.sin(frame.time * 0.002 + node.getAttr('seed')) * 4);
        });
      }, this.kLayer);
      this.kIdle.start();
      requestAnimationFrame(() => this.fitStage());
      this.onResize = () => this.fitStage();
      window.addEventListener('resize', this.onResize);
    }

    this.textEl = PYP.el('p', 'sb-text');
    wrap.appendChild(this.textEl);

    this.stopEl = PYP.el('div', 'sb-stop');
    wrap.appendChild(this.stopEl);

    var controls = PYP.el('div', 'fc2-controls');
    this.backBtn = PYP.el('button', 'ml-control ml-control--icon-only');
    this.backBtn.type = 'button';
    this.backBtn.setAttribute('aria-label', 'Previous page');
    this.backBtn.innerHTML = PYP.icon('back');
    this.backBtn.addEventListener('click', function () { self.go(self.pageIndex - 1); });
    controls.appendChild(this.backBtn);

    var speak = PYP.el('button', 'ml-control ml-control--icon-only');
    speak.type = 'button';
    speak.setAttribute('aria-label', 'Read this page aloud');
    speak.innerHTML = PYP.icon('sound');
    speak.addEventListener('click', function () {
      self.ctx.tts.speak(self.book.pages[self.pageIndex].text, null, speak);
    });
    controls.appendChild(speak);

    this.nextBtn = PYP.el('button', 'ml-control ml-control--primary');
    this.nextBtn.type = 'button';
    this.nextBtn.innerHTML = PYP.icon('next') + '<span class="ml-button-label">Next page</span>';
    this.nextBtn.addEventListener('click', function () { self.go(self.pageIndex + 1); });
    controls.appendChild(this.nextBtn);

    wrap.appendChild(controls);
    this.root.appendChild(wrap);
  };

  Storybook.prototype.openBook = function (i) {
    this.bookIndex = i;
    this.book = this.books[i];
    this.pageIndex = 0;
    this.stopsDone = {};
    this.titleChip.textContent = '📖 ' + this.book.title;
    this.render();
    this.ctx.instruct('Story time! Read along — the story will STOP and ask you to think like a reader.');
  };

  Storybook.prototype.go = function (i) {
    if (i < 0) i = 0;
    if (i >= this.book.pages.length) return this.finish();
    this.pageIndex = i;
    this.ctx.sfx.playClick();
    this.render();
  };

  Storybook.prototype.render = function () {
    var self = this;
    var page = this.book.pages[this.pageIndex];
    var last = this.pageIndex === this.book.pages.length - 1;

    this.drawArt(page);
    this.textEl.innerHTML = this.ctx.vocab
      ? this.ctx.vocab.enrich(page.text)
      : PYP.esc(page.text);
    this.nextBtn.querySelector('.ml-button-label').textContent = last ? 'The end 🎉' : 'Next page';
    this.backBtn.disabled = this.pageIndex === 0;

    this.dots.innerHTML = '';
    this.book.pages.forEach(function (p, i) {
      var d = PYP.el('span', 'sb-dot' + (i === self.pageIndex ? ' is-now' : ''));
      self.dots.appendChild(d);
    });

    this.stopEl.innerHTML = '';
    this.nextBtn.hidden = false;
    if (page.stop && !this.stopsDone[this.pageIndex]) {
      this.nextBtn.hidden = true;
      this.renderStop(page.stop);
    }

    if (this.ctx.course.band === 'early' && !(window.PYP && PYP.ttsIsMuted && PYP.ttsIsMuted())) {
      this.ctx.tts.speak(page.text);
    }
  };

  Storybook.prototype.renderStop = function (stop) {
    var self = this;
    var box = this.stopEl;
    if (stop.kind === 'model') {
      box.appendChild(PYP.el('div', 'sb-owl', '🦉'));
      var bubble = PYP.el('div', 'sb-mentor');
      bubble.textContent = stop.mentor;
      box.appendChild(bubble);
      var go = PYP.el('button', 'ml-control ml-control--primary');
      go.type = 'button';
      go.innerHTML = PYP.icon('next') + '<span class="ml-button-label">Got it — keep reading</span>';
      go.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.stopsDone[self.pageIndex] = true;
        self.render();
      });
      box.appendChild(go);
      this.ctx.instruct('Owl is showing you a reader move. Read the thought, then keep going!');
    } else {
      var q = PYP.el('div', 'sb-question');
      q.textContent = '🦉 ' + stop.prompt;
      box.appendChild(q);
      var chips = PYP.el('div', 'sb-choices');
      PYP.shuffle(stop.choices).forEach(function (ch) {
        var b = PYP.el('button', 'ml-control sb-choice');
        b.type = 'button';
        b.textContent = ch.label;
        b.addEventListener('click', function () { self.pickStop(b, ch); });
        chips.appendChild(b);
      });
      box.appendChild(chips);
      this.ctx.instruct('Your turn to think like a reader — pick the best answer!');
    }
  };

  Storybook.prototype.pickStop = function (btn, ch) {
    var self = this;
    if (ch.correct) {
      this.ctx.sfx.playCorrect();
      btn.classList.add('is-correct');
      Array.prototype.forEach.call(this.stopEl.querySelectorAll('.sb-choice'), function (b) { b.disabled = true; });
      var why = PYP.el('div', 'sb-mentor sb-why');
      why.textContent = '🦉 ' + ch.why;
      this.stopEl.appendChild(why);
      var go = PYP.el('button', 'ml-control ml-control--primary');
      go.type = 'button';
      go.innerHTML = PYP.icon('next') + '<span class="ml-button-label">Keep reading</span>';
      go.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.stopsDone[self.pageIndex] = true;
        self.render();
      });
      this.stopEl.appendChild(go);
    } else {
      this.ctx.sfx.playBuzz();
      btn.classList.add('is-wrong');
      btn.disabled = true;
      this.ctx.instruct(ch.why, { isFeedback: true });
    }
  };

  Storybook.prototype.drawArt = function (page) {
    if (this.hybrid) return this.drawHybrid(page);
    this.drawLegacy(page);
  };

  Storybook.prototype.fitStage = function () {
    if (!this.kStage) return;
    var box = this.actorBox.parentElement;
    var scale = (box.clientWidth || 640) / 640;
    if (!scale || !isFinite(scale) || scale <= 0) scale = 1;
    this.kStage.scale({ x: scale, y: scale });
    this.kStage.size({ width: 640, height: 372 });
    this.kStage.batchDraw();
  };

  Storybook.prototype.drawHybrid = function (page) {
    this.fitStage();
    // Scenery: hand-inked Rough.js theatre (seeded per page)
    var canvas = this.art;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 640, h = 372;
    canvas.width = w * dpr; canvas.height = h * dpr;
    var c = canvas.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    var pal = this.book.palette || { sky: ['#e8f7ff', '#cfeaff'], ground: '#a8d98a' };
    var kind = pal.kind || 'meadow';
    var night = !!pal.night;
    var INK2 = '#242722';
    var rc = rough.canvas(canvas);
    var seed = this.bookIndex * 971 + this.pageIndex * 131 + 7;
    var rand = mulberry(seed);
    function mix(hex, toward, amt) {
      var a2 = parseInt(hex.slice(1), 16), b2 = parseInt(toward.slice(1), 16);
      var r = Math.round(((a2 >> 16) & 255) * (1 - amt) + ((b2 >> 16) & 255) * amt);
      var g2 = Math.round(((a2 >> 8) & 255) * (1 - amt) + ((b2 >> 8) & 255) * amt);
      var b3 = Math.round((a2 & 255) * (1 - amt) + (b2 & 255) * amt);
      return 'rgb(' + r + ',' + g2 + ',' + b3 + ')';
    }
    var g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, pal.sky[0]); g.addColorStop(1, pal.sky[1]);
    c.fillStyle = g; c.fillRect(0, 0, w, h);

    var lx = (this.pageIndex % 2 === 0 ? 0.84 : 0.16) * w, ly = h * 0.16;
    c.save(); c.globalAlpha = 0.3;
    c.beginPath(); c.arc(lx, ly, 46, 0, Math.PI * 2);
    c.fillStyle = night ? '#cfe3ff' : '#ffd75e'; c.fill(); c.restore();
    if (night) {
      for (var st = 0; st < 16; st++) {
        c.globalAlpha = 0.4 + rand() * 0.6; c.fillStyle = '#e8eefc';
        c.beginPath(); c.arc(rand() * w, rand() * h * 0.4, 0.8 + rand() * 1.6, 0, Math.PI * 2); c.fill();
      }
      c.globalAlpha = 1;
    } else if (kind !== 'water') {
      rc.circle(lx, ly, 44, { stroke: INK2, strokeWidth: 2.4, roughness: 1.3, fill: '#ffd75e', fillStyle: 'solid' });
      for (var ray = 0; ray < 10; ray++) {
        var ra = (ray / 10) * Math.PI * 2 + 0.15;
        rc.line(lx + Math.cos(ra) * 30, ly + Math.sin(ra) * 30, lx + Math.cos(ra) * 46, ly + Math.sin(ra) * 46,
          { stroke: INK2, strokeWidth: 2.2, roughness: 1.1 });
      }
      [[0.3, 0.14], [0.6, 0.08]].forEach(function (cl) {
        var cx2 = cl[0] * w, cy2 = cl[1] * h;
        c.fillStyle = 'rgba(255,255,255,0.85)';
        [[0, 0, 14], [12, 3, 10], [-12, 4, 9], [5, -6, 8]].forEach(function (b4) {
          c.beginPath(); c.arc(cx2 + b4[0], cy2 + b4[1], b4[2], 0, Math.PI * 2); c.fill();
        });
      });
    } else {
      c.fillStyle = 'rgba(255,255,255,0.13)';
      for (var shaft = 0; shaft < 3; shaft++) {
        var sx0 = (0.18 + shaft * 0.3 + (rand() - 0.5) * 0.06) * w, sw = 16 + rand() * 10;
        c.beginPath();
        c.moveTo(sx0, 0); c.lineTo(sx0 + sw, 0);
        c.lineTo(sx0 + sw * 2.6 + 40, h * 0.62); c.lineTo(sx0 + sw * 1.2 + 40, h * 0.62);
        c.closePath(); c.fill();
      }
    }

    var gy = h * 0.74;
    rc.path(
      'M0,' + gy + ' C' + w * 0.25 + ',' + (gy - 62) + ' ' + w * 0.55 + ',' + (gy - 14) + ' ' + w * 0.78 + ',' + (gy - 44) +
      ' C' + w * 0.9 + ',' + (gy - 30) + ' ' + w + ',' + (gy - 34) + ' ' + w + ',' + (gy - 26) +
      ' L' + w + ',' + h + ' L0,' + h + ' Z',
      { stroke: INK2, strokeWidth: 1.6, roughness: 1.6, fill: night ? '#3c4a6b' : mix(pal.ground, '#ffffff', 0.45), fillStyle: 'hachure', fillWeight: 0.7, hachureGap: 7, hachureAngle: -42 }
    );
    rc.path(
      'M0,' + (gy + 26) + ' C' + w * 0.3 + ',' + (gy - 8) + ' ' + w * 0.62 + ',' + (gy + 22) + ' ' + w + ',' + (gy + 2) +
      ' L' + w + ',' + h + ' L0,' + h + ' Z',
      { stroke: INK2, strokeWidth: 2.4, roughness: 1.9, fill: pal.ground, fillStyle: 'hachure', fillWeight: 0.9, hachureGap: 8, hachureAngle: -38 }
    );
    if (kind === 'water') {
      for (var rp = 0; rp < 4; rp++) {
        rc.arc((0.12 + rp * 0.24) * w, h * (0.82 + (rp % 2) * 0.07), 16 + rand() * 8, Math.PI * 1.12, Math.PI * 1.88, false,
          { stroke: 'rgba(255,255,255,0.75)', strokeWidth: 1.8, roughness: 1.2 });
      }
    } else if (kind === 'moon') {
      for (var pb = 0; pb < 8; pb++) {
        rc.circle(rand() * w, h * (0.83 + rand() * 0.13), 3 + rand() * 5,
          { stroke: '#8b93a8', strokeWidth: 1.2, roughness: 1.4, fill: '#3a4763', fillStyle: 'hachure', fillWeight: 0.6, hachureGap: 4 });
      }
    } else {
      for (var tx = 10; tx < w; tx += 20 + rand() * 16) {
        var ty = gy + 34 + Math.sin(tx * 0.02) * 8 + rand() * 22;
        if (ty > h - 4) continue;
        rc.line(tx, ty, tx + 2, ty - (6 + rand() * 5), { stroke: tx % 3 === 0 ? INK2 : '#5c7a44', strokeWidth: 1.5, roughness: 1.1 });
      }
    }
    var vg = c.createRadialGradient(w / 2, h * 0.45, h * 0.35, w / 2, h * 0.5, h * 0.95);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, night ? 'rgba(0,0,10,0.25)' : 'rgba(30,25,10,0.12)');
    c.fillStyle = vg; c.fillRect(0, 0, w, h);

    // Actors: canvas-drawn cast as draggable Konva shapes
    this.kLayer.destroyChildren();
    var self = this;
    var items = (page.items || []).slice().sort(function (a2, b2) { return (a2.y || 0) - (b2.y || 0); });
    items.forEach(function (it, idx) {
      var artFn = PYP.actors[it.art];
      if (!artFn) {
        console.warn('storybook: unknown actor "' + it.art + '"');
        artFn = function (ctx2, u2) { ctx2.beginPath(); ctx2.arc(0, 0, u2 * 0.5, 0, Math.PI * 2); ctx2.fillStyle = '#c9b8a0'; ctx2.fill(); ctx2.lineWidth = 2.5; ctx2.strokeStyle = '#242722'; ctx2.stroke(); };
      }
      var size = it.s || 80;
      var node = new Konva.Shape({
        sceneFunc: function (ctx2) {
          ctx2.save();
          artFn(ctx2, size / 2, it);
          ctx2.restore();
        },
        hitFunc: function (ctx2, shape) {
          ctx2.beginPath();
          ctx2.rect(-size / 2, -size / 2, size, size);
          ctx2.closePath();
          ctx2.fillStrokeShape(shape);
        },
        x: it.x * w, y: it.y * h,
        draggable: !it.fixed,
        shadowColor: 'rgba(20,20,20,0.25)', shadowBlur: 3, shadowOffsetY: it.y > 0.6 ? 8 : 3,
        opacity: 0, scaleX: 0.5, scaleY: 0.5, rotation: idx % 2 ? 2.5 : -2.5,
      });
      node.setAttr('baseY', it.y * h);
      node.setAttr('seed', idx * 1.7);
      node.on('dragstart', function () { self.actorBox.style.cursor = 'grabbing'; node.to({ shadowOffsetY: 14, scaleX: 1.06, scaleY: 1.06, duration: 0.15 }); });
      node.on('dragend', function () { self.actorBox.style.cursor = 'grab'; node.to({ shadowOffsetY: it.y > 0.6 ? 8 : 3, scaleX: 1, scaleY: 1, duration: 0.2 }); });
      self.kLayer.add(node);
      node.to({ opacity: 1, scaleX: 1, scaleY: 1, duration: 0.5, easing: Konva.Easings.BackEaseOut, delay: idx * 0.09 });
    });
    this.kLayer.draw();

    function mulberry(a2) {
      return function () {
        a2 |= 0; a2 = (a2 + 0x6D2B79F5) | 0;
        var t = Math.imul(a2 ^ (a2 >>> 15), 1 | a2);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
  };

  Storybook.prototype.drawLegacy = function (page) {
    // Fallback when Konva/Rough are unavailable: plain gradient theatre and
    // canvas-drawn actors (still no emoji). Deterministic per page.
    var canvas = this.art;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 640, h = 372;
    canvas.width = w * dpr; canvas.height = h * dpr;
    var c = canvas.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    var pal = this.book.palette || { sky: ['#e8f7ff', '#cfeaff'], ground: '#a8d98a' };
    var g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, pal.sky[0]); g.addColorStop(1, pal.sky[1]);
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    var gy = h * 0.74;
    c.fillStyle = pal.ground;
    c.beginPath();
    c.moveTo(0, gy + 20);
    c.bezierCurveTo(w * 0.3, gy - 8, w * 0.62, gy + 20, w, gy);
    c.lineTo(w, h); c.lineTo(0, h); c.closePath(); c.fill();
    c.lineWidth = 2.5; c.strokeStyle = '#242722'; c.stroke();
    (page.items || []).forEach(function (it) {
      var artFn = PYP.actors && PYP.actors[it.art];
      var x = (it.x || 0.5) * w, y = (it.y || 0.5) * h, size = it.s || 80;
      c.save(); c.translate(x, y);
      if (artFn) artFn(c, size / 2, it);
      else { c.beginPath(); c.arc(0, 0, size / 4, 0, Math.PI * 2); c.fillStyle = '#c9b8a0'; c.fill(); }
      c.restore();
    });
  };

  Storybook.prototype.finish = function () {
    var self = this;
    this.root.innerHTML = '';
    var wrap = PYP.el('div', 'mission-end');
    wrap.appendChild(PYP.el('div', 'mission-end-score', '🎉 The end!'));
    var moves = PYP.el('p', 'mission-end-note');
    moves.textContent = 'Reader moves you used in “' + this.book.title + '”: ' + this.book.strategies.join(' · ');
    wrap.appendChild(moves);
    var row = PYP.el('div', 'fc2-controls');
    var again = PYP.el('button', 'ml-control');
    again.type = 'button';
    again.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Read it again</span>';
    again.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.build();
      self.openBook(self.bookIndex);
    });
    row.appendChild(again);
    if (this.books.length > 1) {
      var dice = PYP.el('button', 'ml-control ml-control--primary');
      dice.type = 'button';
      dice.innerHTML = '<span aria-hidden="true">🎲</span><span class="ml-button-label">Another story</span>';
      dice.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        var next = self.bookIndex;
        while (next === self.bookIndex) next = Math.floor(Math.random() * self.books.length);
        self.build();
        self.openBook(next);
      });
      row.appendChild(dice);
    }
    wrap.appendChild(row);
    this.root.appendChild(wrap);
    this.ctx.instruct('Story finished! You used real reader moves: ' + this.book.strategies.join(', ') + '.', { isFeedback: true });
    this.ctx.sfx.playFanfare();
    if (window.PYP) PYP.celebrate();
  };

  Storybook.prototype.destroy = function () {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.kIdle) this.kIdle.stop();
    if (this.kStage) this.kStage.destroy();
    if (this.onResize) window.removeEventListener('resize', this.onResize);
    this.root.innerHTML = '';
  };

  PYP.engines['storybook'] = Storybook;
})();
