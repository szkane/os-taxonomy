/* ==========================================================================
   Engine: concept-lab — "dial the world" on a Konva stage
   Rendering: Konva hosts the scene; the 17 scene painters from scenes.js are
   reused verbatim inside a Konva.Shape sceneFunc (zero painter rewrites).
   Dial changes are EASED (displayed values lerp toward targets) so every
   dial move animates smoothly across all scenes. The scene's air() overlay
   runs in the same draw. A lottie burst (locally vendored) celebrates each
   solved case. Explore tab stays commit-free; cases hide the readout.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  var SOLVED_STAR = {
    v: '5.7.4', fr: 30, ip: 0, op: 36, w: 120, h: 120, nm: 'burst', ddd: 0, assets: [],
    layers: [{
      ddd: 0, ind: 1, ty: 4, nm: 'star', sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0] }, { t: 8, s: [100] }, { t: 30, s: [100] }, { t: 36, s: [0] }] },
        r: { a: 1, k: [{ t: 0, s: [-90] }, { t: 36, s: [270] }] },
        p: { a: 0, k: [60, 60, 0] }, a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [20, 20, 100] }, { t: 14, s: [110, 110, 100] }, { t: 36, s: [130, 130, 100] }] },
      }, ao: 0,
      shapes: [
        { ty: 'sr', sy: 1, pt: { a: 0, k: 5 }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 0 }, ir: { a: 0, k: 16 }, is: { a: 0, k: 0 }, or: { a: 0, k: 50 }, os: { a: 0, k: 0 }, nm: 'poly' },
        { ty: 'fl', c: { a: 0, k: [0.29, 0.71, 0.4, 1] }, o: { a: 0, k: 100 }, nm: 'fill' },
      ],
      ip: 0, op: 36, st: 0, bm: 0,
    }],
  };

  function ConceptLab(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.scene = PYP.scenes[config.scene];
    this.solved = {};
    this.misses = {};
    this.destroyFns = [];
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.vals = {};       // dial TARGETS (commit grading reads these)
    this.disp = {};       // eased display values (the painter reads these)
    var overrides = config.dialOverrides || {};
    // Clone the scene dial defs: overrides must never mutate the shared registry
    // (two lab modes on one page can share a scene with different ranges).
    this.dialDefs = (this.scene ? this.scene.dials : []).map(function (d) { return Object.assign({}, d); });
    var self0 = this;
    this.dialDefs.forEach(function (d) {
      var ov = overrides[d.id] || {};
      d.min = ov.min != null ? ov.min : d.min;
      d.max = ov.max != null ? ov.max : d.max;
      var init = config.initials && config.initials[d.id] != null ? config.initials[d.id] : d.initial;
      if (init < d.min) init = d.min;
      if (init > d.max) init = d.max;
      self0.vals[d.id] = init;
      self0.disp[d.id] = init;
    });
    if (this.scene) {
      var rng3 = config.range;
      if (rng3) this.vals.__range = this.disp.__range = rng3;
    }

    var wrap = PYP.el('div', 'lab-wrap');
    var sceneBox = PYP.el('div', 'lab-scene-box');
    this.sceneBox = sceneBox;
    this.readoutEl = PYP.el('div', 'lab-readout');
    this.readoutEl.setAttribute('aria-live', 'polite');
    this.burstEl = PYP.el('div', 'lab-burst');
    wrap.appendChild(sceneBox);

    var panel = PYP.el('div', 'lab-panel');
    var caseTabs = PYP.el('div', 'ml-case-tabs');
    caseTabs.setAttribute('role', 'tablist');
    caseTabs.setAttribute('aria-label', 'Cases');
    this.caseTabs = caseTabs;
    this.buildCaseTabs();

    var dials = PYP.el('div', 'lab-dials');
    if (self.dialDefs.length >= 5) dials.className += ' lab-dials--many';
    this.dialRefs = {};
    this.dialDefs.forEach(function (d) {
      var box = PYP.el('div', 'lab-dial');
      var head = PYP.el('div', 'lab-dial-head');
      head.appendChild(PYP.el('span', 'lab-dial-label', d.label));
      var val = PYP.el('span', 'lab-dial-value');
      head.appendChild(val);
      var input = document.createElement('input');
      input.type = 'range';
      input.min = d.min; input.max = d.max; input.step = d.step || 1;
      input.value = d.initial;
      input.setAttribute('aria-label', d.label);
      input.addEventListener('input', function () {
        self.vals[d.id] = Number(input.value);
        self.syncDialChips();
      });
      box.appendChild(head); box.appendChild(input);
      dials.appendChild(box);
      self.dialRefs[d.id] = { input: input, value: val };
    });
    panel.appendChild(dials);

    var actions = PYP.el('div', 'lab-actions');
    this.commitBtn = PYP.el('button', 'ml-control ml-control--primary');
    this.commitBtn.type = 'button';
    this.commitBtn.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Commit answer</span>';
    this.commitBtn.addEventListener('click', function () { self.commit(); });
    actions.appendChild(this.commitBtn);
    panel.appendChild(actions);
    this.whyEl = PYP.el('div', 'lab-why');
    this.whyEl.hidden = true;
    panel.appendChild(this.whyEl);
    wrap.appendChild(panel);

    root.appendChild(caseTabs);
    root.appendChild(wrap);

    // ---- Konva stage: the 17 painters run verbatim inside a Shape ----
    this.hybrid = !!(window.Konva && window.rough);
    if (this.hybrid) {
      window.Konva.pixelRatio = this.dpr;
      this.kStage = new Konva.Stage({ container: sceneBox, width: 640, height: 372 });
      this.kLayer = new Konva.Layer();
      this.kStage.add(this.kLayer);
      var self2 = this;
      this.sceneShape = new Konva.Shape({
        sceneFunc: function (ctx) {
          ctx.save();
          self2.scene.render(ctx, 640, 372, self2.disp);
          if (self2.scene.air) self2.scene.air(ctx, 640, 372, self2.disp, self2.disp.__t || 0);
          ctx.restore();
        },
      });
      this.kLayer.add(this.sceneShape);
      this.t0 = performance.now();
      var loop = function () {
        self.raf = requestAnimationFrame(loop);
        var t = (performance.now() - self.t0) / 1000;
        self.disp.__t = t;
        // ease displayed dial values toward targets — every dial move animates
        var moving = false;
        Object.keys(self.vals).forEach(function (k) {
          var target = self.vals[k];
          var d = target - self.disp[k];
          if (Math.abs(d) > 0.004) { self.disp[k] += d * 0.16; moving = true; }
          else self.disp[k] = target;
        });
        self.kLayer.batchDraw();
      };
      loop();
      this.destroyFns.push(function () { cancelAnimationFrame(self.raf); });
      this.fitStage();
      this.onResize = function () { self.fitStage(); };
      window.addEventListener('resize', this.onResize);
      this.destroyFns.push(function () { window.removeEventListener('resize', self.onResize); });
    } else {
      // Fallback: plain canvas painter path (same visuals, no easing)
      this.canvas = document.createElement('canvas');
      sceneBox.insertBefore(this.canvas, this.readoutEl);
      this.drawFallback();
    }
    // Readout + burst live INSIDE the scene box, but only after the Konva
    // stage is created: the vendored Konva clears its container, so anything
    // appended earlier is destroyed.
    sceneBox.appendChild(this.readoutEl);
    sceneBox.appendChild(this.burstEl);

    this.activeCase = -1;
    this.buildCaseTabs();
    this.commitBtn.hidden = true;
    this.syncDialChips();
    if (this.hybrid) this.kLayer.batchDraw();
    this.ctx.instruct(this.exploreInstruction());
  }

  ConceptLab.prototype.exploreInstruction = function () {
    return this.config.explorePrompt || 'Move the dials and watch what changes.';
  };

  ConceptLab.prototype.buildCaseTabs = function () {
    var self = this;
    this.caseTabs.innerHTML = '';
    var cases = this.config.cases || [];
    if (!cases.length) return;
    var explore = PYP.el('button', 'ml-control ml-case-tab');
    explore.type = 'button';
    explore.setAttribute('role', 'tab');
    explore.setAttribute('aria-pressed', this.activeCase === -1 ? 'true' : 'false');
    explore.innerHTML = '<span aria-hidden="true">🔭</span><span class="ml-button-label">Explore</span>';
    explore.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setCase(-1);
    });
    this.caseTabs.appendChild(explore);
    cases.forEach(function (c, i) {
      var tab = PYP.el('button', 'ml-control ml-case-tab');
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-pressed', self.activeCase === i ? 'true' : 'false');
      tab.innerHTML = '<span aria-hidden="true">' + (self.solved[i] ? '✅' : '🧩') + '</span><span class="ml-button-label">Case ' + (i + 1) + '</span>';
      if (self.solved[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.setCase(i);
      });
      self.caseTabs.appendChild(tab);
    });
  };

  ConceptLab.prototype.setCase = function (i) {
    this.activeCase = i;
    this.whyEl.hidden = true;
    var self2 = this;
    var init = this.config.initials || {};
    (self2.dialDefs || []).forEach(function (d) {
      if (i < 0 || !self2.solved[i]) {
        var v2 = init[d.id] != null ? init[d.id] : d.initial;
        if (v2 < d.min) v2 = d.min;
        if (v2 > d.max) v2 = d.max;
        self2.vals[d.id] = v2;
      }
    });
    this.commitBtn.hidden = i < 0;
    if (i < 0) this.ctx.instruct(this.exploreInstruction());
    else {
      var c = (this.config.cases || [])[i];
      if (c) this.ctx.instruct(c.prompt);
    }
    this.buildCaseTabs();
    this.syncDialChips();
  };

  ConceptLab.prototype.syncDialChips = function () {
    var self = this;
    if (!this.scene) return;
    this.dialDefs.forEach(function (d) {
      var ref = self.dialRefs[d.id];
      if (!ref) return;
      ref.value.textContent = self.vals[d.id] + (d.unit || '');
      ref.input.value = self.vals[d.id];
    });
    // Live readout in Explore; during an unsolved case it would leak the
    // answer, so it becomes a predict prompt instead.
    if (this.readoutEl) {
      var openCase = this.activeCase >= 0 && !this.solved[this.activeCase];
      this.readoutEl.textContent = openCase
        ? '🔍 Predict with the dials, then commit!'
        : (this.scene.readout ? this.scene.readout(this.vals) : '');
    }
  };

  // Serializable rule DSL — unchanged (evaluated against TARGET values).
  ConceptLab.prototype.checkCase = function (c) {
    var vals = this.vals;
    var targets = c.targets || {};
    var tol = c.tolerance != null ? c.tolerance : 0;
    var keys = Object.keys(targets);
    for (var i = 0; i < keys.length; i++) {
      if (Math.abs((vals[keys[i]] | 0) - (targets[keys[i]] | 0)) > tol) return false;
    }
    var rule = c.rule;
    if (!rule) return true;
    var ids = (this.dialDefs || []).map(function (d) { return d.id; });
    var num = function (x) { return vals[x] | 0; };
    switch (rule.op) {
      case 'sum': { var s2 = 0; ids.forEach(function (k) { s2 += num(k); }); return s2 === rule.value; }
      case 'product': { var p2 = 1; ids.forEach(function (k) { p2 *= num(k); }); return p2 === rule.value; }
      case 'allEqual': {
        var first = num(ids[0]);
        var eq = ids.every(function (k) { return num(k) === first; });
        if (!eq || !first) return false;
        if (rule.minSum) {
          var t2 = 0; ids.forEach(function (k) { t2 += num(k); });
          if (t2 < rule.minSum) return false;
        }
        return true;
      }
      case 'whole': return num('parts') >= 1 && num('shaded') === num('parts');
      case 'lt': return num(rule.dial) < rule.value;
      case 'atLeast': return num(rule.dial) >= rule.value;
      case 'between': return num(rule.dial) > rule.lo && num(rule.dial) < rule.hi;
      case 'digits': {
        var n = num('n');
        if (rule.hundreds != null && Math.floor(n / 100) !== rule.hundreds) return false;
        if (rule.tens != null && Math.floor((n % 100) / 10) !== rule.tens) return false;
        if (rule.ones != null && n % 10 !== rule.ones) return false;
        return true;
      }
      case 'diff': {
        var d2 = Math.abs(num(rule.a) - num(rule.b));
        if (d2 !== rule.value) return false;
        if (rule.minFirst != null && num(rule.a) < rule.minFirst) return false;
        return true;
      }
      case 'affine': return rule.cStart * num('start') + rule.cStep * num('step') === rule.value;
      case 'binary': return (num('b3') || num('b8')) * 8 + (num('b2') || num('b4')) * 4 + (num('b1') || num('b2')) * 2 + (num('b0') || num('b1')) === rule.value;
      case 'pv4': return (num('th') || num('thousands')) * 1000 + (num('h') || num('hundreds')) * 100 + (num('t') || num('tens')) * 10 + (num('o') || num('ones')) === rule.value;
      default: return true;
    }
  };

  ConceptLab.prototype.drawFallback = function () {
    if (!this.canvas || !this.scene || !this.scene.render) return;
    this.canvas.width = 640;
    this.canvas.height = 372;
    var ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    this.scene.render(ctx, 640, 372, this.vals);
    if (this.scene.air) this.scene.air(ctx, 640, 372, this.vals, 0);
    ctx.restore();
  };

  ConceptLab.prototype.commit = function () {
    var self = this;
    var c = (this.config.cases || [])[this.activeCase];
    if (!c) return;
    if (this.checkCase(c)) {
      this.solved[this.activeCase] = true;
      this.misses[this.activeCase] = 0;
      this.ctx.sfx.playCorrect();
      this.ctx.instruct(c.why || 'You found it!', { isFeedback: true });
      this.whyEl.hidden = true;
      this.buildCaseTabs();
      this.showBurst();
      var next = (this.config.cases || []).findIndex(function (x, i) { return !self.solved[i]; });
      if (next >= 0) {
        setTimeout(function () { self.setCase(next); }, 2600);
      } else {
        setTimeout(function () {
          self.ctx.instruct('Every case solved — you really know how ' + (self.ctx.course.shortTitle || 'this works') + ' works!');
          self.ctx.sfx.playFanfare();
          if (window.PYP) PYP.celebrate();
        }, 2600);
      }
    } else {
      var n = (this.misses[this.activeCase] || 0) + 1;
      this.misses[this.activeCase] = n;
      this.ctx.sfx.playBuzz();
      if (n >= 2 && c.support) {
        this.ctx.instruct(c.support, { isFeedback: true });
        this.whyEl.textContent = c.why || '';
        this.whyEl.hidden = false;
      } else {
        this.ctx.instruct(c.nudge || 'Not yet — look again and try once more.', { isFeedback: true });
      }
    }
  };

  // Lottie burst on solve (static fallback when lottie-web is unavailable).
  ConceptLab.prototype.showBurst = function () {
    var box = this.burstEl;
    box.innerHTML = '';
    if (window.lottie) {
      var anim = lottie.loadAnimation({
        container: box, renderer: 'canvas', loop: false, autoplay: true,
        animationData: JSON.parse(JSON.stringify(SOLVED_STAR)),
      });
      anim.addEventListener('complete', function () { box.innerHTML = ''; });
    } else {
      box.textContent = '✅';
      var self = this;
      setTimeout(function () { box.innerHTML = ''; }, 1400);
    }
  };

  ConceptLab.prototype.fitStage = function () {
    if (!this.kStage) return;
    var scale = (this.sceneBox.clientWidth || 640) / 640;
    if (!scale || !isFinite(scale) || scale <= 0) scale = 1;
    // Size the stage AND its box to the scaled canvas: no blank strip below
    // the drawing when the dial panel is taller, and no clipped overflow
    // when the box is narrower than 640.
    this.kStage.scale({ x: scale, y: scale });
    this.kStage.size({ width: 640 * scale, height: 372 * scale });
    this.sceneBox.style.minHeight = '0px';
    this.sceneBox.style.height = Math.round(372 * scale) + 'px';
  };

  ConceptLab.prototype.destroy = function () {
    this.destroyFns.forEach(function (fn) { fn(); });
    if (this.kStage) this.kStage.destroy();
    this.root.innerHTML = '';
  };

  PYP.engines['concept-lab'] = ConceptLab;
})();
