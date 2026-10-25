/* ==========================================================================
   Engine: diorama3d — 3D Interactive World & Layer Diorama (three.js)
   Supports 6 spatial diorama themes (earth, ocean, biome, fossil, landform,
   civilization) with a 4-level elevation/depth/era dial, orbit controls,
   3D cel-shaded tiers, and Explore-first spatial detective cases.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  var THEMES = {
    earth: {
      bg: '#101d33',
      dialLabel: 'Earth sphere layer (1–4)',
      layers: [
        { level: 1, name: 'Geosphere (rock & crust)', color: '#8d6e63', fact: 'Level 1 — Geosphere: solid rock, mountains, soil, and ocean floor crust.' },
        { level: 2, name: 'Hydrosphere (rivers & seas)', color: '#38B6FF', fact: 'Level 2 — Hydrosphere: all liquid water and ice in oceans, rivers, and glaciers.' },
        { level: 3, name: 'Biosphere (living things)', color: '#4ECDC4', fact: 'Level 3 — Biosphere: forests, animals, reefs, and people sharing the planet.' },
        { level: 4, name: 'Atmosphere (air & clouds)', color: '#cfe3ff', fact: 'Level 4 — Atmosphere: the blanket of gases and weather clouds wrapping Earth.' }
      ]
    },
    ocean: {
      bg: '#08182e',
      dialLabel: 'Ocean depth zone (1=top → 4=trench)',
      layers: [
        { level: 1, name: 'Sunlight zone (0–200m)', color: '#38B6FF', fact: 'Zone 1 — Sunlight zone: bright warm surface water where coral, kelp, and dolphins thrive.' },
        { level: 2, name: 'Twilight zone (200–1,000m)', color: '#1d4ed8', fact: 'Zone 2 — Twilight zone: dim blue glow where squid and lanternfish swim.' },
        { level: 3, name: 'Midnight zone (1,000–4,000m)', color: '#1e1b4b', fact: 'Zone 3 — Midnight zone: pitch black and freezing; anglerfish make their own bioluminescent light.' },
        { level: 4, name: 'Abyssal trench (>4,000m)', color: '#312e81', fact: 'Zone 4 — Deep trench: crushing water pressure and hydrothermal vents on the seafloor.' }
      ]
    },
    biome: {
      bg: '#12261e',
      dialLabel: 'Habitat canopy layer (1=floor → 4=emergent)',
      layers: [
        { level: 1, name: 'Forest floor & roots', color: '#78350f', fact: 'Layer 1 — Forest floor: shady, damp ground where fungi, ants, and decomposers recycle leaves.' },
        { level: 2, name: 'Understory shrubs', color: '#15803d', fact: 'Layer 2 — Understory: large-leaved plants, tree frogs, and jaguars hiding in filtered light.' },
        { level: 3, name: 'Leafy canopy roof', color: '#4ade80', fact: 'Layer 3 — Canopy: a thick green roof packed with fruit, monkeys, toucans, and sloths.' },
        { level: 4, name: 'Emergent giant treetops', color: '#fde047', fact: 'Layer 4 — Emergent layer: towering trees facing hot sun, strong wind, and eagles.' }
      ]
    },
    fossil: {
      bg: '#231a14',
      dialLabel: 'Rock dig depth (1=topsoil → 4=deepest strata)',
      layers: [
        { level: 1, name: 'Modern topsoil (youngest)', color: '#65a30d', fact: 'Layer 1 — Topsoil: the youngest surface layer with living roots and recent shells.' },
        { level: 2, name: 'Ice-Age mammoth layer', color: '#d97706', fact: 'Layer 2 — Upper sedimentary rock: Ice-Age mammal bones buried above dinosaur rock.' },
        { level: 3, name: 'Cretaceous dinosaur layer', color: '#b45309', fact: 'Layer 3 — Mesozoic rock: fossilized dinosaur skeletons turned to stone over millions of years.' },
        { level: 4, name: 'Ancient trilobite sea bed (oldest)', color: '#78350f', fact: 'Layer 4 — Deepest strata: the oldest rock at the bottom holds early sea fossils like trilobites.' }
      ]
    },
    landform: {
      bg: '#152538',
      dialLabel: 'Elevation contour (1=coast → 4=peak)',
      layers: [
        { level: 1, name: 'Coastal harbor & delta (0m)', color: '#38B6FF', fact: 'Contour 1 — Coast & delta: where the river slows down, drops silt, and meets the sea.' },
        { level: 2, name: 'Farmland plains & bridge (100m)', color: '#86EFAC', fact: 'Contour 2 — Lowland plains: flat fertile land where towns, roads, and bridges cross the river.' },
        { level: 3, name: 'Forested foothills (400m)', color: '#4ECDC4', fact: 'Contour 3 — Foothills: steeper slopes where fast streams carve V-shaped valleys.' },
        { level: 4, name: 'Alpine mountain peak (1,200m)', color: '#f8fafc', fact: 'Contour 4 — Mountain peak: cold high-altitude summit where snow feeds the river source.' }
      ]
    },
    civilization: {
      bg: '#241b15',
      dialLabel: 'Settlement zone (1=waterway → 4=citadel)',
      layers: [
        { level: 1, name: 'Riverbank & trade harbor', color: '#38B6FF', fact: 'Zone 1 — Waterway & harbor: boats bring timber, grain, and stone; floods leave rich silt.' },
        { level: 2, name: 'Irrigated fields & workshops', color: '#86EFAC', fact: 'Zone 2 — Fields & workshops: farmers and craftspeople grow food and shape pottery and bronze.' },
        { level: 3, name: 'Walled market & homes', color: '#fdae1c', fact: 'Zone 3 — Market & Agora: scribes, traders, and families meet to exchange goods and laws.' },
        { level: 4, name: 'Sacred temple / citadel / pyramid', color: '#FFE156', fact: 'Zone 4 — High monument: stone pyramids, acropolis temples, or castle keeps built to last.' }
      ]
    }
  };

  function Diorama3D(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.themeKey = config.theme || 'earth';
    this.theme = THEMES[this.themeKey] || THEMES.earth;
    this.level = 1;
    this.activeCase = -1;
    this.solved = {};
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
    head.appendChild(PYP.el('span', 'lab-dial-label', config.dialLabel || this.theme.dialLabel));
    this.levelVal = PYP.el('span', 'lab-dial-value', '1 — ' + this.theme.layers[0].name);
    head.appendChild(this.levelVal);
    var input = document.createElement('input');
    input.type = 'range';
    input.min = 1; input.max = 4; input.step = 1; input.value = 1;
    input.setAttribute('aria-label', config.dialLabel || this.theme.dialLabel);
    input.addEventListener('input', function () { self.setLevel(Number(input.value), true); });
    this.levelInput = input;
    dial.appendChild(head);
    dial.appendChild(input);
    panel.appendChild(dial);

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
      box.appendChild(PYP.el('div', 'spatial-fallback', 'This 3D diorama requires local three.js.'));
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

  Diorama3D.prototype.renderTabs = function () {
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
      tab.innerHTML = '<span aria-hidden="true">' + (self.solved[i] ? '✅' : '🧭') + '</span><span class="ml-button-label">Case ' + (i + 1) + '</span>';
      if (self.solved[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () { self.ctx.sfx.playClick(); self.setCase(i); });
      self.caseTabs.appendChild(tab);
    });
  };

  Diorama3D.prototype.setLevel = function (lv, fromUser) {
    this.level = lv;
    var info = this.theme.layers[lv - 1] || this.theme.layers[0];
    var openCase = this.activeCase >= 0 && !this.solved[this.activeCase];
    if (this.levelVal) {
      this.levelVal.textContent = openCase ? ('Level ' + lv) : (lv + ' — ' + info.name);
    }
    if (this.levelInput) this.levelInput.value = String(lv);
    if (fromUser && this.activeCase < 0) {
      this.ctx.instruct(info.fact, { isFeedback: true });
    }
  };

  Diorama3D.prototype.setCase = function (i) {
    this.activeCase = i;
    this.renderTabs();
    this.commitBtn.hidden = i < 0;
    this.setLevel(this.level, false);
    if (i < 0) {
      this.ctx.instruct(this.config.explorePrompt || 'Orbit the 3D diorama and slide the layer dial from 1 to 4 to inspect each level!');
    } else {
      var c = (this.config.cases || [])[i];
      if (c) this.ctx.instruct(c.prompt);
    }
  };

  Diorama3D.prototype.commit = function () {
    var c = (this.config.cases || [])[this.activeCase];
    if (!c) return;
    if (this.level === c.targetLevel) {
      this.solved[this.activeCase] = true;
      this.ctx.sfx.playCorrect();
      var info = this.theme.layers[this.level - 1] || {};
      this.ctx.instruct((c.why || info.fact || 'Correct layer!'), { isFeedback: true });
      this.renderTabs();
      this.setLevel(this.level, false);
      var self = this;
      var next = (this.config.cases || []).findIndex(function (x, idx) { return !self.solved[idx]; });
      if (next >= 0) setTimeout(function () { self.setCase(next); }, 2800);
      else setTimeout(function () {
        self.ctx.sfx.playFanfare();
        if (window.PYP) PYP.celebrate();
        self.ctx.instruct('All 3D diorama cases solved!', { isFeedback: true });
      }, 2600);
    } else {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct(c.nudge || 'Slide the 3D layer dial to inspect another level and try again!', { isFeedback: true });
    }
  };

  Diorama3D.prototype.init3D = function () {
    var self = this;
    var THREE = window.THREE;
    var OrbitControls = window.THREE_ORBIT;
    var w = this.box.clientWidth || 560, h = this.box.clientHeight || 340;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.box.appendChild(renderer.domElement);
    this.destroyFns.push(function () { renderer.dispose(); });

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(this.theme.bg);
    var camera = new THREE.PerspectiveCamera(44, w / h, 0.1, 200);
    camera.position.set(11, 10, 15);
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.target.set(0, 2.5, 0);
    this.destroyFns.push(function () { controls.dispose(); });

    var grad = document.createElement('canvas');
    grad.width = 4; grad.height = 1;
    var gc = grad.getContext('2d');
    ['#2b3040', '#606c88', '#b8c4de', '#ffffff'].forEach(function (c, i) { gc.fillStyle = c; gc.fillRect(i, 0, 1, 1); });
    var gradientMap = new THREE.CanvasTexture(grad);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;

    scene.add(new THREE.AmbientLight('#b8c9e8', 1.15));
    var sun = new THREE.DirectionalLight('#fff2cc', 2.0);
    sun.position.set(10, 18, 12);
    sun.castShadow = true;
    scene.add(sun);

    var tierMeshes = [];
    this.theme.layers.forEach(function (ly, idx) {
      var wSize = 9 - idx * 1.4;
      var geo = new THREE.BoxGeometry(wSize, 1.4, wSize);
      var mat = new THREE.MeshToonMaterial({ color: ly.color, gradientMap: gradientMap });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = idx * 1.65;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      var out = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: '#090d16', side: THREE.BackSide }));
      out.scale.setScalar(1.035);
      mesh.add(out);
      scene.add(mesh);
      tierMeshes.push(mesh);
    });

    // Pointer beacon ring highlighting active level
    var ring = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.16, 12, 48), new THREE.MeshBasicMaterial({ color: '#ffe156' }));
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    var clock = new THREE.Clock();
    function loop() {
      self.raf = requestAnimationFrame(loop);
      var t = clock.getElapsedTime();
      var activeIdx = self.level - 1;
      tierMeshes.forEach(function (m, idx) {
        var targetScale = idx === activeIdx ? 1.12 : 0.96;
        m.scale.x += (targetScale - m.scale.x) * 0.14;
        m.scale.z += (targetScale - m.scale.z) * 0.14;
        m.rotation.y = Math.sin(t * 0.4 + idx * 0.5) * 0.15;
      });
      ring.position.y = activeIdx * 1.65;
      ring.scale.setScalar(1 + Math.sin(t * 4) * 0.04);
      controls.update();
      renderer.render(scene, camera);
    }
    loop();
  };

  Diorama3D.prototype.destroy = function () {
    this.destroyFns.forEach(function (fn) { fn(); });
    if (this.raf) cancelAnimationFrame(this.raf);
    this.root.innerHTML = '';
  };

  PYP.engines['diorama3d'] = Diorama3D;
})();
