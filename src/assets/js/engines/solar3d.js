/* ==========================================================================
   Engine: solar3d — cel-shaded solar system tour (three.js, bundled locally)
   Planets orbit a toon sun; the child taps planets to inspect them, then
   answers cases by selecting a planet and committing. Bounded orbit camera,
   honest WebGL fallback. Requires assets/vendor/three.min.js (local).
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Solar3D(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.selected = null;
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
    var panelRow = PYP.el('div', 'lab-actions');
    panelRow.style.marginTop = '10px';
    var commit = PYP.el('button', 'ml-control ml-control--primary');
    commit.type = 'button';
    commit.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Commit answer</span>';
    commit.addEventListener('click', function () { self.commit(); });
    panelRow.appendChild(commit);
    this.selectedChip = PYP.el('span', 'ml-chipstat', '❓ Tap to choose a planet');
    panelRow.appendChild(this.selectedChip);
    root.appendChild(caseTabs);
    root.appendChild(wrap);
    root.appendChild(panelRow);

    if (!window.THREE) {
      box.appendChild(PYP.el('div', 'spatial-fallback',
        'This 3D world needs its local three.js file, which could not load. The other games below still work.'));
      return;
    }
    this.commitBtn = commit;
    this.activeCase = -1;
    this.renderTabs();
    try { this.init3D(); } catch (e) {
      box.innerHTML = '';
      box.appendChild(PYP.el('div', 'spatial-fallback', '3D could not start on this device (WebGL unavailable). Try the other games instead.'));
      return;
    }
    this.setCase(-1);
  }

  Solar3D.prototype.renderTabs = function () {
    var self = this;
    this.caseTabs.innerHTML = '';
    var exp = PYP.el('button', 'ml-control ml-case-tab');
    exp.type = 'button';
    exp.setAttribute('aria-pressed', this.activeCase < 0 ? 'true' : 'false');
    exp.innerHTML = '<span aria-hidden="true">🔭</span><span class="ml-button-label">Explore</span>';
    exp.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.setCase(-1);
    });
    this.caseTabs.appendChild(exp);
    (this.config.cases || []).forEach(function (c, i) {
      var tab = PYP.el('button', 'ml-control ml-case-tab');
      tab.type = 'button';
      tab.setAttribute('aria-pressed', self.activeCase === i ? 'true' : 'false');
      tab.innerHTML = '<span aria-hidden="true">' + (self.solved[i] ? '✅' : '🪐') + '</span><span class="ml-button-label">Case ' + (i + 1) + '</span>';
      if (self.solved[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.setCase(i);
      });
      self.caseTabs.appendChild(tab);
    });
  };

  Solar3D.prototype.setCase = function (i) {
    this.activeCase = i;
    this.select(null);
    this.renderTabs();
    if (this.commitBtn) this.commitBtn.hidden = i < 0;
    if (i < 0) {
      this.ctx.instruct(this.config.explorePrompt || 'Orbit the solar system and tap any planet to discover its secrets — then try a Case!');
    } else {
      var c = (this.config.cases || [])[i];
      this.ctx.instruct(c ? c.prompt : 'Tap a planet to inspect it.');
    }
  };

  Solar3D.prototype.select = function (planet) {
    this.selected = planet;
    if (this.selectedChip) {
      this.selectedChip.textContent = planet ? '🪐 ' + planet.data.name : '❓ Tap to choose a planet';
    }
    if (planet) {
      this.ctx.sfx.playClick();
      var c = (this.config.cases || [])[this.activeCase];
      this.ctx.instruct(c && !this.solved[this.activeCase]
        ? planet.data.fact + ' — keep it selected and commit, or tap another planet.'
        : planet.data.fact, { isFeedback: true });
    }
  };

  Solar3D.prototype.commit = function () {
    var c = (this.config.cases || [])[this.activeCase];
    if (!c) return;
    if (!this.selected) {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct('👆 Tap a planet to choose it first, then commit!', { isFeedback: true });
      return;
    }
    var name = this.selected.data.name;
    if (name === c.answer) {
      this.solved[this.activeCase] = true;
      this.ctx.sfx.playCorrect();
      this.ctx.instruct('Yes — ' + name + '! ' + (c.why || ''), { isFeedback: true });
      this.renderTabs();
      var self = this;
      var next = (this.config.cases || []).findIndex(function (x, i) { return !self.solved[i]; });
      if (next >= 0) setTimeout(function () { self.setCase(next); }, 3000);
      else setTimeout(function () {
        self.ctx.instruct('Tour complete — you know your neighborhood in space!', { isFeedback: true });
        self.ctx.sfx.playFanfare();
      }, 3000);
    } else {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct('That is ' + name + '. ' + (c.nudge || 'Look again — read each planet’s fact as you tap.'), { isFeedback: true });
    }
  };

  Solar3D.prototype.init3D = function () {
    var self = this;
    var THREE = window.THREE;
    var OrbitControls = window.THREE_ORBIT;
    var w = this.box.clientWidth || 560, h = this.box.clientHeight || 380;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    this.box.appendChild(renderer.domElement);
    this.destroyFns.push(function () { renderer.dispose(); });

    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#070d1d');
    var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
    camera.position.set(0, 36, 50);
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 12;
    controls.maxDistance = 150;
    this.destroyFns.push(function () { controls.dispose(); });

    var grad = document.createElement('canvas');
    grad.width = 4; grad.height = 1;
    var gc = grad.getContext('2d');
    ['#2c3140', '#5d6478', '#b9c1d4', '#ffffff'].forEach(function (c, i) { gc.fillStyle = c; gc.fillRect(i, 0, 1, 1); });
    var gradientMap = new THREE.CanvasTexture(grad);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;

    // Stars
    var starGeo = new THREE.BufferGeometry();
    var pos = [];
    for (var i = 0; i < 500; i++) {
      var r = 160 + Math.random() * 60;
      var th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pos.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#cfe3ff', size: 0.8 })));

    // Sun with a soft corona sprite (radial-gradient canvas texture)
    var sun = new THREE.Mesh(new THREE.SphereGeometry(4.6, 32, 24), new THREE.MeshBasicMaterial({ color: '#ffd75e' }));
    scene.add(sun);
    var coronaCanvas = document.createElement('canvas');
    coronaCanvas.width = coronaCanvas.height = 256;
    var ccg = coronaCanvas.getContext('2d');
    var cgrad = ccg.createRadialGradient(128, 128, 60, 128, 128, 128);
    cgrad.addColorStop(0, 'rgba(255,214,94,0.9)');
    cgrad.addColorStop(0.4, 'rgba(255,179,71,0.35)');
    cgrad.addColorStop(1, 'rgba(255,179,71,0)');
    ccg.fillStyle = cgrad;
    ccg.fillRect(0, 0, 256, 256);
    var coronaTex = new THREE.CanvasTexture(coronaCanvas);
    var corona = new THREE.Sprite(new THREE.SpriteMaterial({ map: coronaTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.85 }));
    corona.scale.set(17, 17, 1);
    scene.add(corona);
    this.corona = corona;
    var halo = new THREE.Mesh(new THREE.SphereGeometry(5.8, 24, 18), new THREE.MeshBasicMaterial({ color: '#ffb347', transparent: true, opacity: 0.22 }));
    sun.add(halo);
    scene.add(new THREE.PointLight('#fff3c4', 4.5, 600));
    scene.add(new THREE.AmbientLight('#5a6a94', 1.35));

    // Planets
    this.planets = [];
    var self2 = this;
    (this.config.planets || []).forEach(function (p) {
      var mesh = new THREE.Mesh(new THREE.SphereGeometry(p.size * 1.35, 28, 20), new THREE.MeshToonMaterial({ color: p.color, gradientMap: gradientMap }));
      mesh.rotation.z = (p.tilt || 0) * Math.PI / 180;
      var pivot = new THREE.Group();
      pivot.rotation.y = Math.random() * Math.PI * 2;
      mesh.position.x = p.orbit;
      mesh.userData.data = p;
      if (p.name === 'Earth') {
        // Mini atmosphere glow on the home planet (same Fresnel recipe)
        var atmo = new THREE.Mesh(
          new THREE.SphereGeometry(p.size * 1.35 * 1.16, 24, 18),
          new THREE.ShaderMaterial({
            vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
            fragmentShader: 'varying vec3 vN; void main(){ float f = pow(1.0 - abs(vN.z), 2.4); gl_FragColor = vec4(0.5, 0.77, 1.0, 1.0) * f * 0.8; }',
            side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
          })
        );
        mesh.add(atmo);
      }
      pivot.add(mesh);
      // Inverted-hull outline
      var out = new THREE.Mesh(mesh.geometry, new THREE.MeshBasicMaterial({ color: '#04060f', side: THREE.BackSide }));
      out.scale.setScalar(1.06);
      mesh.add(out);
      // Orbit ring
      var ring = new THREE.Mesh(new THREE.TorusGeometry(p.orbit, 0.045, 8, 128), new THREE.MeshBasicMaterial({ color: '#3c4b74' }));
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      scene.add(pivot);
      self2.planets.push({ mesh: mesh, pivot: pivot, data: p, speed: p.speed });
      if (p.ring) {
        var pr = new THREE.Mesh(new THREE.TorusGeometry(p.size * 1.9, p.size * 0.26, 8, 48), new THREE.MeshToonMaterial({ color: '#d8c9a3', gradientMap: gradientMap }));
        pr.rotation.x = Math.PI / 2.4;
        mesh.add(pr);
      }
    });

    // Tap to select
    var raycaster = new THREE.Raycaster();
    var dom = renderer.domElement;
    function onTap(e) {
      var rect = dom.getBoundingClientRect();
      var cx = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - rect.left;
      var cy = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - rect.top;
      // Ignore drags (orbit) — only treat quick taps without movement.
      if (self.moved > 6) return;
      raycaster.setFromCamera(new THREE.Vector2((cx / rect.width) * 2 - 1, -(cy / rect.height) * 2 + 1), camera);
      var meshes = self.planets.map(function (p) { return p.mesh; });
      var hit = raycaster.intersectObjects(meshes, false)[0];
      if (hit) {
        var p = null;
        self.planets.forEach(function (x) { if (x.mesh === hit.object) p = x; });
        self.select(p);
      }
    }
    this.moved = 0;
    function down(e) { self.moved = 0; }
    function move(e) { self.moved += 1; }
    dom.addEventListener('pointerdown', down);
    dom.addEventListener('pointermove', move);
    dom.addEventListener('pointerup', onTap);
    this.destroyFns.push(function () {
      dom.removeEventListener('pointerdown', down);
      dom.removeEventListener('pointermove', move);
      dom.removeEventListener('pointerup', onTap);
    });

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
    function loop() {
      self.raf = requestAnimationFrame(loop);
      var t = clock.getElapsedTime();
      if (self.corona) {
        var csc = 16.5 + Math.sin(t * 1.7) * 1.1;
        self.corona.scale.set(csc, csc, 1);
      }
      self.planets.forEach(function (p) { p.pivot.rotation.y = t * p.speed + 1; p.mesh.rotation.y = t * 0.6; });
      controls.update();
      renderer.render(scene, camera);
    }
    loop();
  };

  Solar3D.prototype.destroy = function () {
    this.destroyFns.forEach(function (fn) { fn(); });
    if (this.raf) cancelAnimationFrame(this.raf);
    this.root.innerHTML = '';
  };

  PYP.engines['solar3d'] = Solar3D;
})();
