/* ==========================================================================
   Engine: optics3d — 3D Light, Shadow & Material Optics Studio (three.js)
   Move the 3D light source distance and swap 3D object materials (Opaque,
   Translucent, Transparent) while observing real-time PCFSoftShadowMap
   shadows on a bright wall and floor. Starts in Explore mode.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  var MATERIALS = [
    { id: 'opaque', label: 'Opaque block', emoji: '🧱', opacity: 1.0, desc: 'Blocks all light — casts a dark, sharp shadow.' },
    { id: 'translucent', label: 'Translucent frosted glass', emoji: '🧊', opacity: 0.55, desc: 'Lets some light scatter through — casts a softer, lighter shadow.' },
    { id: 'transparent', label: 'Transparent clear lens', emoji: '🔍', opacity: 0.15, desc: 'Lets almost all light straight through — casts barely any shadow.' }
  ];

  function Optics3D(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.activeCase = -1;
    this.solved = {};
    this.lightDist = 2;
    this.materialId = 'opaque';
    this.destroyFns = [];

    var caseTabs = PYP.el('div', 'ml-case-tabs');
    caseTabs.setAttribute('role', 'tablist');
    this.caseTabs = caseTabs;

    var wrap = PYP.el('div', 'spatial-wrap');
    var box = PYP.el('div', 'spatial-canvas-box');
    this.box = box;
    wrap.appendChild(box);

    var panel = PYP.el('div', 'lab-panel');
    panel.style.maxWidth = '580px';
    panel.style.margin = '8px auto 0';

    var dial = PYP.el('div', 'lab-dial');
    var head = PYP.el('div', 'lab-dial-head');
    head.appendChild(PYP.el('span', 'lab-dial-label', 'Torch distance (1=close, 5=far)'));
    this.distVal = PYP.el('span', 'lab-dial-value', '2');
    head.appendChild(this.distVal);
    var input = document.createElement('input');
    input.type = 'range';
    input.min = 1; input.max = 5; input.step = 1; input.value = 2;
    input.setAttribute('aria-label', 'Torch distance');
    input.addEventListener('input', function () {
      self.setLightDist(Number(input.value));
    });
    this.distInput = input;
    dial.appendChild(head);
    dial.appendChild(input);
    panel.appendChild(dial);

    var matRow = PYP.el('div', 'lab-actions');
    this.matBtns = {};
    MATERIALS.forEach(function (m) {
      var b = PYP.el('button', 'ml-control');
      b.type = 'button';
      b.setAttribute('aria-pressed', m.id === self.materialId ? 'true' : 'false');
      b.innerHTML = '<span aria-hidden="true">' + m.emoji + '</span><span class="ml-button-label">' + m.label + '</span>';
      b.addEventListener('click', function () { self.setMaterial(m.id, true); });
      matRow.appendChild(b);
      self.matBtns[m.id] = b;
    });
    panel.appendChild(matRow);

    var actions = PYP.el('div', 'lab-actions');
    this.commitBtn = PYP.el('button', 'ml-control ml-control--primary');
    this.commitBtn.type = 'button';
    this.commitBtn.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Commit answer</span>';
    this.commitBtn.addEventListener('click', function () { self.commit(); });
    actions.appendChild(this.commitBtn);
    panel.appendChild(actions);

    root.appendChild(caseTabs);
    root.appendChild(wrap);
    root.appendChild(panel);

    if (!window.THREE) {
      box.appendChild(PYP.el('div', 'spatial-fallback', 'This 3D optics bench requires local three.js.'));
      return;
    }
    this.renderTabs();
    try { this.init3D(); } catch (e) {
      box.innerHTML = '';
      box.appendChild(PYP.el('div', 'spatial-fallback', '3D could not start on this device.'));
      return;
    }
    this.setCase(-1);
  }

  Optics3D.prototype.renderTabs = function () {
    var self = this;
    this.caseTabs.innerHTML = '';
    var exp = PYP.el('button', 'ml-control ml-case-tab');
    exp.type = 'button';
    exp.setAttribute('aria-pressed', this.activeCase < 0 ? 'true' : 'false');
    exp.innerHTML = '<span aria-hidden="true">🔭</span><span class="ml-button-label">Explore</span>';
    exp.addEventListener('click', function () { self.ctx.sfx.playClick(); self.setCase(-1); });
    this.caseTabs.appendChild(exp);
    (this.config.cases || []).forEach(function (c, i) {
      var tab = PYP.el('button', 'ml-control ml-case-tab');
      tab.type = 'button';
      tab.setAttribute('aria-pressed', self.activeCase === i ? 'true' : 'false');
      tab.innerHTML = '<span aria-hidden="true">' + (self.solved[i] ? '✅' : '🔦') + '</span><span class="ml-button-label">Case ' + (i + 1) + '</span>';
      if (self.solved[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () { self.ctx.sfx.playClick(); self.setCase(i); });
      self.caseTabs.appendChild(tab);
    });
  };

  Optics3D.prototype.setLightDist = function (v) {
    this.lightDist = v;
    if (this.distVal) this.distVal.textContent = String(v);
    if (this.distInput) this.distInput.value = String(v);
    if (this.updateScene) this.updateScene();
  };

  Optics3D.prototype.setMaterial = function (id, fromUser) {
    this.materialId = id;
    var self = this;
    Object.keys(this.matBtns).forEach(function (k) {
      self.matBtns[k].setAttribute('aria-pressed', k === id ? 'true' : 'false');
    });
    if (this.updateScene) this.updateScene();
    if (fromUser) {
      this.ctx.sfx.playClick();
      var m = MATERIALS.filter(function (x) { return x.id === id; })[0];
      if (this.activeCase < 0 && m) this.ctx.instruct(m.desc, { isFeedback: true });
    }
  };

  Optics3D.prototype.setCase = function (i) {
    this.activeCase = i;
    this.renderTabs();
    this.commitBtn.hidden = i < 0;
    if (i < 0) {
      this.ctx.instruct(this.config.explorePrompt || 'Slide the 3D torch distance and switch materials to see how shadows change on the bright wall!');
    } else {
      var c = (this.config.cases || [])[i];
      if (c) this.ctx.instruct(c.prompt);
    }
  };

  Optics3D.prototype.commit = function () {
    var c = (this.config.cases || [])[this.activeCase];
    if (!c) return;
    var okDist = c.targetDist == null || (c.targetDist === 'close' ? this.lightDist <= 2 : c.targetDist === 'far' ? this.lightDist >= 4 : this.lightDist === c.targetDist);
    var okMat = !c.targetMaterial || this.materialId === c.targetMaterial;
    if (okDist && okMat) {
      this.solved[this.activeCase] = true;
      this.ctx.sfx.playCorrect();
      this.ctx.instruct(c.why || 'Spot on — you matched the 3D light and shadow setup!', { isFeedback: true });
      this.renderTabs();
      var self = this;
      var next = (this.config.cases || []).findIndex(function (x, idx) { return !self.solved[idx]; });
      if (next >= 0) setTimeout(function () { self.setCase(next); }, 2800);
      else setTimeout(function () {
        self.ctx.sfx.playFanfare();
        if (window.PYP) PYP.celebrate();
        self.ctx.instruct('All 3D optics cases solved!', { isFeedback: true });
      }, 2600);
    } else {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct(c.nudge || 'Check both the torch distance and the material type, then watch the shadow on the wall!', { isFeedback: true });
    }
  };

  Optics3D.prototype.init3D = function () {
    var self = this;
    var THREE = window.THREE;
    var OrbitControls = window.THREE_ORBIT;
    var w = this.box.clientWidth || 560, h = this.box.clientHeight || 340;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.box.appendChild(renderer.domElement);
    this.destroyFns.push(function () { renderer.dispose(); });

    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#1e2436');
    var camera = new THREE.PerspectiveCamera(44, w / h, 0.1, 200);
    camera.position.set(0, 8, 22);
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.target.set(0, 2.5, 0);
    this.destroyFns.push(function () { controls.dispose(); });

    scene.add(new THREE.AmbientLight('#fff4d8', 0.85));

    // Bright projection wall + sunlit floor (per 5c contract: light surface so shadows read clearly)
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(32, 20), new THREE.MeshStandardMaterial({ color: '#f3e5c8', roughness: 0.9 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    var wall = new THREE.Mesh(new THREE.BoxGeometry(1.2, 12, 16), new THREE.MeshStandardMaterial({ color: '#fff8ec', roughness: 0.85 }));
    wall.position.set(9, 6, 0);
    wall.receiveShadow = true;
    scene.add(wall);

    // Torch + spot light
    var torchGroup = new THREE.Group();
    var torchBody = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 3, 16), new THREE.MeshBasicMaterial({ color: '#ffd75e' }));
    torchBody.rotation.z = -Math.PI / 2;
    torchGroup.add(torchBody);
    scene.add(torchGroup);

    var spot = new THREE.SpotLight('#fff5c0', 5.5, 45, Math.PI / 4, 0.25, 0.5);
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    spot.target.position.set(9, 3.2, 0);
    scene.add(spot);
    scene.add(spot.target);

    // Blocker object at x = 2
    var blockerMat = new THREE.MeshStandardMaterial({ color: '#4ECDC4', transparent: true, opacity: 1.0, roughness: 0.3 });
    var blocker = new THREE.Mesh(new THREE.BoxGeometry(2.6, 4.4, 2.6), blockerMat);
    blocker.position.set(2, 2.2, 0);
    blocker.castShadow = true;
    scene.add(blocker);

    // Projected shadow preview on the wall (scales with torch distance and material opacity)
    var wallShadowMat = new THREE.MeshBasicMaterial({ color: '#1b263b', transparent: true, opacity: 0.78 });
    var wallShadow = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 5.2), wallShadowMat);
    wallShadow.rotation.y = -Math.PI / 2;
    wallShadow.position.set(8.38, 3.2, 0);
    scene.add(wallShadow);

    this.updateScene = function () {
      var d = self.lightDist;
      var tx = 2 - (d * 2.2 + 2.5);
      torchGroup.position.set(tx, 3.0, 0);
      spot.position.set(tx + 1.2, 3.0, 0);
      var m = MATERIALS.filter(function (x) { return x.id === self.materialId; })[0] || MATERIALS[0];
      blockerMat.opacity = m.opacity;
      blockerMat.color.set(self.materialId === 'opaque' ? '#4ECDC4' : self.materialId === 'translucent' ? '#fdae1c' : '#a8d8f7');
      var scale = 1.0 + (6 - d) * 0.22;
      wallShadow.scale.set(scale, scale, 1);
      wallShadowMat.opacity = m.opacity * (0.85 - d * 0.08);
    };
    this.updateScene();

    function loop() {
      self.raf = requestAnimationFrame(loop);
      controls.update();
      renderer.render(scene, camera);
    }
    loop();
  };

  Optics3D.prototype.destroy = function () {
    this.destroyFns.forEach(function (fn) { fn(); });
    if (this.raf) cancelAnimationFrame(this.raf);
    this.root.innerHTML = '';
  };

  PYP.engines['optics3d'] = Optics3D;
})();
