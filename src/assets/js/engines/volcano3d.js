/* ==========================================================================
   Engine: volcano3d — pressure dial on a cel-shaded volcano (three.js)
   The child raises the magma pressure and watches the mountain wake up:
   glow, trembles, smoke, eruption. Cases are predictions committed before
   the dial reveals the result. Requires assets/vendor/three.min.js (local).
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Volcano3D(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.pressure = 1;
    this.solved = {};
    this.activeCase = 0;
    this.destroyFns = [];

    var wrap = PYP.el('div', 'spatial-wrap');
    var caseTabs = PYP.el('div', 'ml-case-tabs');
    caseTabs.setAttribute('role', 'tablist');
    this.caseTabs = caseTabs;
    var box = PYP.el('div', 'spatial-canvas-box');
    this.box = box;
    wrap.appendChild(box);
    root.appendChild(caseTabs);
    root.appendChild(wrap);

    var panel = PYP.el('div', 'lab-panel');
    panel.style.maxWidth = '560px';
    panel.style.margin = '10px auto 0';
    var dial = PYP.el('div', 'lab-dial');
    var head = PYP.el('div', 'lab-dial-head');
    head.appendChild(PYP.el('span', 'lab-dial-label', 'Magma pressure'));
    this.pressureVal = PYP.el('span', 'lab-dial-value', '1');
    head.appendChild(this.pressureVal);
    var input = document.createElement('input');
    input.type = 'range';
    input.min = 1; input.max = 5; input.step = 1;
    input.value = 1;
    input.setAttribute('aria-label', 'Magma pressure');
    input.addEventListener('input', function () { self.setPressure(Number(input.value)); });
    dial.appendChild(head);
    dial.appendChild(input);
    panel.appendChild(dial);
    var actions = PYP.el('div', 'lab-actions');
    var commit = PYP.el('button', 'ml-control ml-control--primary');
    commit.type = 'button';
    commit.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Commit answer</span>';
    commit.addEventListener('click', function () { self.commit(); });
    actions.appendChild(commit);
    panel.appendChild(actions);
    root.appendChild(panel);

    if (!window.THREE) {
      box.appendChild(PYP.el('div', 'spatial-fallback',
        'This 3D world needs its local three.js file, which could not load. The other games below still work.'));
      return;
    }
    this.renderTabs();
    try { this.init3D(); } catch (e) {
      box.innerHTML = '';
      box.appendChild(PYP.el('div', 'spatial-fallback', '3D could not start on this device (WebGL unavailable). Try the other games instead.'));
      return;
    }
    this.setCase(0);
  }

  Volcano3D.prototype.renderTabs = function () {
    var self = this;
    this.caseTabs.innerHTML = '';
    (this.config.cases || []).forEach(function (c, i) {
      var tab = PYP.el('button', 'ml-control ml-case-tab');
      tab.type = 'button';
      tab.innerHTML = '<span aria-hidden="true">' + (self.solved[i] ? '✅' : '🌋') + '</span><span class="ml-button-label">Case ' + (i + 1) + '</span>';
      if (self.solved[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.setCase(i);
      });
      self.caseTabs.appendChild(tab);
    });
  };

  Volcano3D.prototype.setCase = function (i) {
    this.activeCase = i;
    this.renderTabs();
    var c = (this.config.cases || [])[i];
    this.ctx.instruct(c ? c.prompt : 'Move the pressure dial and watch the mountain.');
  };

  Volcano3D.prototype.setPressure = function (v) {
    this.pressure = v;
    if (this.pressureVal) this.pressureVal.textContent = String(v);
  };

  Volcano3D.prototype.commit = function () {
    var c = (this.config.cases || [])[this.activeCase];
    if (!c) return;
    var p = this.pressure;
    var op = c.predict || 'erupt'; // 'erupt' (>=4) | 'calm' (<=2)
    var truth = op === 'erupt' ? p >= 4 : p <= 2;
    var said = c.predictLabel || (op === 'erupt' ? 'It will erupt' : 'It will stay calm');
    if (truth) {
      this.solved[this.activeCase] = true;
      this.ctx.sfx.playCorrect();
      this.ctx.instruct((c.why || 'Pressure wins —') + ' at pressure ' + p + ': ' + (p >= 4 ? 'the mountain cannot hold — eruption!' : 'the magma rests — quiet mountain.'), { isFeedback: true });
      this.renderTabs();
      var self = this;
      var next = (this.config.cases || []).findIndex(function (x, i) { return !self.solved[i]; });
      if (next >= 0) setTimeout(function () { self.setCase(next); }, 3200);
      else setTimeout(function () {
        self.ctx.instruct('All cases solved — you know what wakes a volcano!', { isFeedback: true });
        self.ctx.sfx.playFanfare();
      }, 3200);
    } else {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct(c.nudge || 'Watch the smoke and glow, then try another pressure.', { isFeedback: true });
    }
  };

  Volcano3D.prototype.init3D = function () {
    var self = this;
    var THREE = window.THREE;
    var OrbitControls = window.THREE_ORBIT;
    var w = this.box.clientWidth || 560, h = this.box.clientHeight || 380;
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
    scene.background = new THREE.Color('#1a1420');
    scene.fog = new THREE.Fog('#1a1420', 40, 120);
    var camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 300);
    camera.position.set(0, 21, 46);
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 16;
    controls.maxDistance = 70;
    controls.target.set(0, 10, 0);
    this.destroyFns.push(function () { controls.dispose(); });

    var grad = document.createElement('canvas');
    grad.width = 4; grad.height = 1;
    var gc = grad.getContext('2d');
    ['#241d2b', '#4d4054', '#9b8ba3', '#ffffff'].forEach(function (c, i) { gc.fillStyle = c; gc.fillRect(i, 0, 1, 1); });
    var gradientMap = new THREE.CanvasTexture(grad);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;

    scene.add(new THREE.AmbientLight('#5a4a6b', 1.1));
    var moon = new THREE.DirectionalLight('#ffe9d0', 1.6);
    moon.position.set(-18, 26, 12);
    moon.castShadow = true;
    moon.shadow.mapSize.set(1024, 1024);
    moon.shadow.camera.left = -34; moon.shadow.camera.right = 34;
    moon.shadow.camera.top = 34; moon.shadow.camera.bottom = -34;
    moon.shadow.radius = 3;
    moon.shadow.bias = -0.0004;
    scene.add(moon);

    // Ground (receives soft shadows)
    var ground = new THREE.Mesh(new THREE.CircleGeometry(60, 48), new THREE.MeshToonMaterial({ color: '#3d4a3a', gradientMap: gradientMap }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Volcano: layered cones for a stepped cel look + inverted-hull outline
    function cone(rTop, rBottom, h, y, color) {
      var geo = new THREE.CylinderGeometry(rTop, rBottom, h, 24);
      var m = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: color, gradientMap: gradientMap }));
      m.position.y = y;
      m.castShadow = true;
      var out = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: '#0d0a10', side: THREE.BackSide }));
      out.scale.setScalar(1.035);
      m.add(out);
      scene.add(m);
      return m;
    }
    cone(9.2, 14, 8, 4, '#5c4a44');
    cone(6.2, 10.4, 7, 9.5, '#6b554d');
    cone(3.4, 7.4, 6, 16, '#4e3f3a');
    // Crater magma pool sits inside the truncated summit
    var magma = new THREE.Mesh(new THREE.CircleGeometry(3.1, 24), new THREE.MeshBasicMaterial({ color: '#ff7a29' }));
    magma.rotation.x = -Math.PI / 2;
    magma.position.y = 19.02;
    scene.add(magma);
    // Crater rim ring
    var rim = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.42, 10, 32), new THREE.MeshToonMaterial({ color: '#3c2f2b', gradientMap: gradientMap }));
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 19.0;
    scene.add(rim);

    // Lava light at the crater — flickers with pressure
    var lavaLight = new THREE.PointLight('#ff8c2e', 2, 60, 1.6);
    lavaLight.position.set(0, 20.5, 0);
    scene.add(lavaLight);

    // Glowing lava streaks oozing down the slope
    var streaks = [];
    [[0.9, 0.4], [2.4, 1.5], [4.2, 2.6]].forEach(function (cfg) {
      var len = 7 + cfg[0] * 2;
      var streak = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.5, len, 8, 1, true),
        new THREE.MeshBasicMaterial({ color: '#ff6a1f', transparent: true, opacity: 0.85 })
      );
      var ang = cfg[1];
      var rr2 = 4.6 + len * 0.42;
      streak.position.set(Math.cos(ang) * rr2, 16.5 - len / 2 * 0.55, Math.sin(ang) * rr2);
      streak.rotation.z = Math.cos(ang) * 0.42;
      streak.rotation.x = -Math.sin(ang) * 0.42;
      scene.add(streak);
      streaks.push(streak);
    });

    // Smoke: billboard sprites with a soft radial-gradient canvas texture
    function blobTexture(inner, outer) {
      var c = document.createElement('canvas');
      c.width = c.height = 128;
      var g2 = c.getContext('2d');
      var grad = g2.createRadialGradient(64, 64, 8, 64, 64, 64);
      grad.addColorStop(0, inner);
      grad.addColorStop(1, outer);
      g2.fillStyle = grad;
      g2.fillRect(0, 0, 128, 128);
      var tex = new THREE.CanvasTexture(c);
      return tex;
    }
    var smokeTex = blobTexture('rgba(190,183,196,0.85)', 'rgba(190,183,196,0)');
    var puffs = [];
    for (var i = 0; i < 12; i++) {
      var puff = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeTex, transparent: true, opacity: 0.5, depthWrite: false }));
      puff.position.set((Math.random() - 0.5) * 3, 19.2 + Math.random() * 4, (Math.random() - 0.5) * 3);
      puff.scale.setScalar(2.2);
      puff.userData.seed = Math.random() * 10;
      scene.add(puff);
      puffs.push(puff);
    }
    // Lava bombs for eruption
    var bombs = [];
    for (var b = 0; b < 8; b++) {
      var bomb = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffb347' }));
      bomb.visible = false;
      bomb.userData.t = 0;
      scene.add(bomb);
      bombs.push(bomb);
    }

    var onResize = function () {
      var nw = self.box.clientWidth, nh = self.box.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);
    this.destroyFns.push(function () { window.removeEventListener('resize', onResize); });

    var clock = new THREE.Clock();
    var shakeSeed = 0;
    function loop() {
      self.raf = requestAnimationFrame(loop);
      var t = clock.getElapsedTime();
      var p = self.pressure;
      var erupting = p >= 4;
      var restless = p >= 3;
      // Glow follows pressure — magma, lava light flicker, streaks pulse
      magma.material.color.setHSL(0.06 - p * 0.006, 1, 0.35 + p * 0.09);
      magma.scale.setScalar(0.7 + p * 0.09 + Math.sin(t * (2 + p)) * 0.03 * p);
      lavaLight.intensity = 0.6 + p * 0.9 + Math.sin(t * 9) * 0.25 * p;
      streaks.forEach(function (st, i2) {
        st.material.opacity = Math.min(1, 0.25 + p * 0.14) + Math.sin(t * 5 + i2 * 2) * 0.06;
        st.visible = p >= 3;
      });
      // Tremble with pressure
      var amp = (restless ? 0.12 : 0.02) * p * 0.3;
      scene.position.x = Math.sin(t * 31 + shakeSeed) * amp;
      scene.position.z = Math.cos(t * 27 + shakeSeed) * amp;
      // Puffs rise faster with pressure
      puffs.forEach(function (pf) {
        var s = pf.userData.seed;
        var speed = 0.5 + p * 0.55;
        var y = 19.2 + ((t * speed + s) % 9);
        pf.position.y = y;
        pf.position.x = Math.sin(t + s) * (0.8 + y * 0.09);
        pf.material.opacity = Math.max(0, 0.55 - (y - 19.2) * 0.05) * (0.3 + p * 0.2);
        var sc = 2.2 + (y - 19.2) * 0.5;
        pf.scale.set(sc, sc, 1);
        pf.visible = p >= 2;
      });
      // Eruption bombs
      bombs.forEach(function (bomb, i) {
        if (erupting) {
          bomb.userData.t += 0.016;
          if (bomb.userData.t > 2.2) {
            bomb.userData.t = 0;
            bomb.position.set(0, 19.2, 0);
            bomb.userData.vx = (Math.random() - 0.5) * 12;
            bomb.userData.vz = (Math.random() - 0.5) * 12;
            bomb.userData.vy = 9 + Math.random() * 6;
          }
          if (bomb.userData.t === 0 || bomb.visible) {
            bomb.visible = true;
            bomb.userData.vy -= 0.3;
            bomb.position.x += bomb.userData.vx * 0.016;
            bomb.position.y += bomb.userData.vy * 0.016;
            bomb.position.z += bomb.userData.vz * 0.016;
            if (bomb.position.y < 0.4) { bomb.visible = false; bomb.userData.t = 99; }
          }
        } else {
          bomb.visible = false;
        }
      });
      controls.update();
      renderer.render(scene, camera);
    }
    loop();
  };

  Volcano3D.prototype.destroy = function () {
    this.destroyFns.forEach(function (fn) { fn(); });
    if (this.raf) cancelAnimationFrame(this.raf);
    this.root.innerHTML = '';
  };

  PYP.engines['volcano3d'] = Volcano3D;
})();
