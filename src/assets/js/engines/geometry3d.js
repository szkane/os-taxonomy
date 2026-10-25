/* ==========================================================================
   Engine: geometry3d — 3D Solid Geometry & Polyhedra Inspector (three.js)
   Orbit cel-shaded 3D solids (Cube, Triangular prism, Square pyramid,
   Cylinder, Cone, Sphere), highlight faces/edges/vertices, and solve spatial
   geometry cases. Starts in Explore mode (commit hidden).
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  var SOLIDS = [
    { id: 'cube', name: 'Cube', emoji: '🧊', faces: 6, edges: 12, vertices: 8, color: '#4ECDC4', fact: 'Cube: 6 equal square faces, 12 edges, and 8 corner vertices.' },
    { id: 'prism', name: 'Triangular prism', emoji: '⛺', faces: 5, edges: 9, vertices: 6, color: '#FFE156', fact: 'Triangular prism: 2 triangle ends + 3 rectangle sides = 5 faces, 9 edges, 6 vertices.' },
    { id: 'pyramid', name: 'Square pyramid', emoji: '🔺', faces: 5, edges: 8, vertices: 5, color: '#FF6584', fact: 'Square pyramid: 1 square base + 4 triangle faces meeting at 1 top apex = 5 faces, 8 edges, 5 vertices.' },
    { id: 'cylinder', name: 'Cylinder', emoji: '🥫', faces: 3, edges: 2, vertices: 0, color: '#38B6FF', fact: 'Cylinder: 2 flat circular ends and 1 curved surface — 0 corner vertices!' },
    { id: 'cone', name: 'Cone', emoji: '🍦', faces: 2, edges: 1, vertices: 1, color: '#B388FF', fact: 'Cone: 1 flat circular base, 1 curved surface, and 1 pointed apex.' },
    { id: 'sphere', name: 'Sphere', emoji: '⚽', faces: 1, edges: 0, vertices: 0, color: '#86EFAC', fact: 'Sphere: 1 continuous curved surface with 0 flat faces, 0 edges, and 0 vertices.' }
  ];

  function Geometry3D(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.activeCase = -1;
    this.solved = {};
    this.currentSolid = SOLIDS[0];
    this.destroyFns = [];

    var caseTabs = PYP.el('div', 'ml-case-tabs');
    caseTabs.setAttribute('role', 'tablist');
    this.caseTabs = caseTabs;

    var wrap = PYP.el('div', 'spatial-wrap');
    var box = PYP.el('div', 'spatial-canvas-box');
    this.box = box;
    wrap.appendChild(box);

    var selectorRow = PYP.el('div', 'lab-actions');
    selectorRow.style.marginTop = '8px';
    this.solidBtns = {};
    SOLIDS.forEach(function (s) {
      var btn = PYP.el('button', 'ml-control');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', s.id === self.currentSolid.id ? 'true' : 'false');
      btn.innerHTML = '<span aria-hidden="true">' + s.emoji + '</span><span class="ml-button-label">' + s.name + '</span>';
      btn.addEventListener('click', function () {
        self.selectSolid(s.id, true);
      });
      selectorRow.appendChild(btn);
      self.solidBtns[s.id] = btn;
    });

    var actionRow = PYP.el('div', 'lab-actions');
    actionRow.style.marginTop = '8px';
    this.readoutChip = PYP.el('span', 'ml-chipstat', '');
    this.commitBtn = PYP.el('button', 'ml-control ml-control--primary');
    this.commitBtn.type = 'button';
    this.commitBtn.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Commit answer</span>';
    this.commitBtn.addEventListener('click', function () { self.commit(); });
    actionRow.appendChild(this.readoutChip);
    actionRow.appendChild(this.commitBtn);

    root.appendChild(caseTabs);
    root.appendChild(wrap);
    root.appendChild(selectorRow);
    root.appendChild(actionRow);

    if (!window.THREE) {
      box.appendChild(PYP.el('div', 'spatial-fallback', 'This 3D solid inspector requires local three.js.'));
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

  Geometry3D.prototype.renderTabs = function () {
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
      tab.innerHTML = '<span aria-hidden="true">' + (self.solved[i] ? '✅' : '🧊') + '</span><span class="ml-button-label">Case ' + (i + 1) + '</span>';
      if (self.solved[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () { self.ctx.sfx.playClick(); self.setCase(i); });
      self.caseTabs.appendChild(tab);
    });
  };

  Geometry3D.prototype.selectSolid = function (id, fromUser) {
    var found = SOLIDS.filter(function (s) { return s.id === id; })[0] || SOLIDS[0];
    this.currentSolid = found;
    var self = this;
    Object.keys(this.solidBtns).forEach(function (k) {
      self.solidBtns[k].setAttribute('aria-pressed', k === found.id ? 'true' : 'false');
    });
    if (this.buildMesh) this.buildMesh(found);
    this.syncReadout();
    if (fromUser) {
      this.ctx.sfx.playClick();
      if (this.activeCase < 0) {
        this.ctx.instruct(found.fact, { isFeedback: true });
      } else {
        this.ctx.instruct('Selected ' + found.name + ' — rotate in 3D to count its parts, then press Commit answer!', { isFeedback: true });
      }
    }
  };

  Geometry3D.prototype.syncReadout = function () {
    var s = this.currentSolid;
    var openCase = this.activeCase >= 0 && !this.solved[this.activeCase];
    if (openCase) {
      this.readoutChip.textContent = '🔍 Rotate ' + s.name + ' in 3D to inspect & commit!';
    } else {
      this.readoutChip.textContent = s.emoji + ' ' + s.name + ': ' + s.faces + ' faces · ' + s.edges + ' edges · ' + s.vertices + ' vertices';
    }
  };

  Geometry3D.prototype.setCase = function (i) {
    this.activeCase = i;
    this.renderTabs();
    this.commitBtn.hidden = i < 0;
    this.syncReadout();
    if (i < 0) {
      this.ctx.instruct(this.config.explorePrompt || 'Tap any 3D solid and drag to rotate it — count its faces, edges, and vertices!');
    } else {
      var c = (this.config.cases || [])[i];
      if (c) this.ctx.instruct(c.prompt);
    }
  };

  Geometry3D.prototype.commit = function () {
    var c = (this.config.cases || [])[this.activeCase];
    if (!c) return;
    if (this.currentSolid.id === c.answer) {
      this.solved[this.activeCase] = true;
      this.ctx.sfx.playCorrect();
      this.ctx.instruct('Yes — ' + this.currentSolid.name + '! ' + (c.why || this.currentSolid.fact), { isFeedback: true });
      this.renderTabs();
      this.syncReadout();
      var self = this;
      var next = (this.config.cases || []).findIndex(function (x, idx) { return !self.solved[idx]; });
      if (next >= 0) setTimeout(function () { self.setCase(next); }, 2800);
      else setTimeout(function () {
        self.ctx.sfx.playFanfare();
        if (window.PYP) PYP.celebrate();
        self.ctx.instruct('All 3D geometry cases solved!', { isFeedback: true });
      }, 2600);
    } else {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct('That is ' + this.currentSolid.name + '. ' + (c.nudge || 'Rotate the solids and count their faces, edges, and vertices carefully!'), { isFeedback: true });
    }
  };

  Geometry3D.prototype.init3D = function () {
    var self = this;
    var THREE = window.THREE;
    var OrbitControls = window.THREE_ORBIT;
    var w = this.box.clientWidth || 560, h = this.box.clientHeight || 340;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.box.appendChild(renderer.domElement);
    this.destroyFns.push(function () { renderer.dispose(); });

    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#131c31');
    var camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 200);
    camera.position.set(6, 5.5, 9);
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 22;
    this.destroyFns.push(function () { controls.dispose(); });

    var grad = document.createElement('canvas');
    grad.width = 4; grad.height = 1;
    var gc = grad.getContext('2d');
    ['#2b3348', '#5d6b8a', '#b8c4de', '#ffffff'].forEach(function (c, i) { gc.fillStyle = c; gc.fillRect(i, 0, 1, 1); });
    var gradientMap = new THREE.CanvasTexture(grad);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;

    scene.add(new THREE.AmbientLight('#8fa8d6', 1.2));
    var dir = new THREE.DirectionalLight('#fff5d6', 2.2);
    dir.position.set(8, 14, 10);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    scene.add(dir);

    var floor = new THREE.Mesh(new THREE.CircleGeometry(14, 48), new THREE.MeshToonMaterial({ color: '#233252', gradientMap: gradientMap }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.6;
    floor.receiveShadow = true;
    scene.add(floor);

    var holder = new THREE.Group();
    scene.add(holder);

    this.buildMesh = function (solid) {
      while (holder.children.length) holder.remove(holder.children[0]);
      var geo;
      switch (solid.id) {
        case 'cube': geo = new THREE.BoxGeometry(3.2, 3.2, 3.2); break;
        case 'prism': geo = new THREE.CylinderGeometry(2.2, 2.2, 3.4, 3); break;
        case 'pyramid': geo = new THREE.ConeGeometry(2.5, 3.5, 4); break;
        case 'cylinder': geo = new THREE.CylinderGeometry(1.9, 1.9, 3.5, 32); break;
        case 'cone': geo = new THREE.ConeGeometry(2.2, 3.6, 32); break;
        case 'sphere': geo = new THREE.SphereGeometry(2.2, 32, 24); break;
        default: geo = new THREE.BoxGeometry(3, 3, 3);
      }
      var mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: solid.color, gradientMap: gradientMap }));
      mesh.castShadow = true;
      holder.add(mesh);
      var out = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: '#080c14', side: THREE.BackSide }));
      out.scale.setScalar(1.045);
      mesh.add(out);
      if (solid.edges > 0) {
        var edges = new THREE.EdgesGeometry(geo, 15);
        var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#ffffff' }));
        mesh.add(line);
      }
    };
    this.buildMesh(this.currentSolid);

    var clock = new THREE.Clock();
    function loop() {
      self.raf = requestAnimationFrame(loop);
      var t = clock.getElapsedTime();
      holder.rotation.y = t * 0.35;
      holder.position.y = Math.sin(t * 1.8) * 0.15;
      controls.update();
      renderer.render(scene, camera);
    }
    loop();
  };

  Geometry3D.prototype.destroy = function () {
    this.destroyFns.forEach(function (fn) { fn(); });
    if (this.raf) cancelAnimationFrame(this.raf);
    this.root.innerHTML = '';
  };

  PYP.engines['geometry3d'] = Geometry3D;
})();
