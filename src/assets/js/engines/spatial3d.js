/* ==========================================================================
   Engine: spatial3d — cel-shaded Earth, Sun & Moon (three.js, bundled locally)
   Marble 3D rules: crafted cel look (flat color bands + black outlines via
   inverted hulls), interaction on the objects (drag the Earth), predict →
   commit → reveal assessment, bounded orbit camera with reset, honest
   WebGL failure message. Requires assets/vendor/three.min.js (local, no CDN)
   — the page only references it when this engine is mapped.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Spatial3D(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.solved = {};
    this.activeCase = 0;
    this.prediction = null;
    this.destroyFns = [];

    var wrap = PYP.el('div', 'spatial-wrap');
    var caseTabs = PYP.el('div', 'ml-case-tabs');
    caseTabs.setAttribute('role', 'tablist');
    caseTabs.setAttribute('aria-label', 'Cases');
    this.caseTabs = caseTabs;
    var box = PYP.el('div', 'spatial-canvas-box');
    this.box = box;
    wrap.appendChild(caseTabs);
    wrap.appendChild(box);

    var panelRow = PYP.el('div', 'lab-actions');
    panelRow.style.marginTop = '10px';
    this.predictWrap = PYP.el('div', 'lab-actions');
    this.commitBtn = PYP.el('button', 'ml-control ml-control--primary');
    this.commitBtn.type = 'button';
    this.commitBtn.innerHTML = PYP.icon('check') + '<span class="ml-button-label">Commit answer</span>';
    this.commitBtn.addEventListener('click', function () { self.commit(); });
    this.resetBtn = PYP.el('button', 'ml-control');
    this.resetBtn.type = 'button';
    this.resetBtn.innerHTML = PYP.icon('replay') + '<span class="ml-button-label">Reset Earth</span>';
    this.resetBtn.addEventListener('click', function () {
      if (self.earth) self.earth.rotation.y = self.baseRotation;
      self.ctx.sfx.playClick();
      self.ctx.instruct(self.casePrompt());
    });
    panelRow.appendChild(this.predictWrap);
    panelRow.appendChild(this.commitBtn);
    panelRow.appendChild(this.resetBtn);
    wrap.appendChild(panelRow);
    root.appendChild(caseTabs);
    root.appendChild(wrap);
    root.appendChild(panelRow);

    if (!window.THREE) {
      box.appendChild(PYP.el('div', 'spatial-fallback',
        'This 3D world needs its local three.js file, which could not load. The other games below still work.'));
      return;
    }

    this.renderTabs();
    try {
      this.init3D();
    } catch (e) {
      box.innerHTML = '';
      box.appendChild(PYP.el('div', 'spatial-fallback',
        '3D could not start on this device (WebGL unavailable). Try the other games instead.'));
      return;
    }
    this.setCase(0);
  }

  Spatial3D.prototype.renderTabs = function () {
    var self = this;
    this.caseTabs.innerHTML = '';
    (this.config.cases || []).forEach(function (c, i) {
      var tab = PYP.el('button', 'ml-control ml-case-tab');
      tab.type = 'button';
      tab.innerHTML = '<span aria-hidden="true">' + (self.solved[i] ? '✅' : '🧩') + '</span><span class="ml-button-label">Case ' + (i + 1) + '</span>';
      if (self.solved[i]) tab.classList.add('is-solved');
      tab.addEventListener('click', function () {
        self.ctx.sfx.playClick();
        self.setCase(i);
      });
      self.caseTabs.appendChild(tab);
    });
  };

  Spatial3D.prototype.setCase = function (i) {
    this.activeCase = i;
    this.prediction = null;
    this.renderTabs();
    this.renderPredict();
    this.ctx.instruct(this.casePrompt());
  };

  Spatial3D.prototype.casePrompt = function () {
    var c = (this.config.cases || [])[this.activeCase];
    return c ? c.prompt : 'Drag the Earth to explore day and night.';
  };

  Spatial3D.prototype.renderPredict = function () {
    var self = this;
    this.predictWrap.innerHTML = '';
    var c = (this.config.cases || [])[this.activeCase];
    var options = c && c.predict ? c.predict : ['Day', 'Night'];
    options.forEach(function (opt) {
      var btn = PYP.el('button', 'ml-control');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.innerHTML = '<span aria-hidden="true">❓</span><span class="ml-button-label">' + opt + '</span>';
      btn.addEventListener('click', function () {
        self.prediction = opt;
        self.predictWrap.querySelectorAll('.ml-control').forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        self.ctx.sfx.playClick();
        self.ctx.instruct('You picked “' + opt + '”. Press “Commit answer” to find out.');
      });
      self.predictWrap.appendChild(btn);
    });
  };

  /* ---------------- three.js scene ---------------- */

  Spatial3D.prototype.init3D = function () {
    var self = this;
    var THREE = window.THREE;
    var OrbitControls = window.THREE_ORBIT;
    var w = this.box.clientWidth || 560, h = this.box.clientHeight || 360;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    this.box.appendChild(renderer.domElement);
    this.destroyFns.push(function () { renderer.dispose(); });

    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a1428');

    var camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 200);
    camera.position.set(0, 6, 16);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 8;
    controls.maxDistance = 40;
    controls.target.set(0, 0, 0);
    this.destroyFns.push(function () { controls.dispose(); });

    // Stars
    var starGeo = new THREE.BufferGeometry();
    var starPos = [];
    for (var i = 0; i < 420; i++) {
      var r = 60 + Math.random() * 40;
      var th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      starPos.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#cfe3ff', size: 0.35 })));

    // Cel gradient map (3 bands)
    var gradCanvas = document.createElement('canvas');
    gradCanvas.width = 4; gradCanvas.height = 1;
    var gctx = gradCanvas.getContext('2d');
    gctx.fillStyle = '#3a3f4a'; gctx.fillRect(0, 0, 1, 1);
    gctx.fillStyle = '#7a8194'; gctx.fillRect(1, 0, 1, 1);
    gctx.fillStyle = '#c9cfdc'; gctx.fillRect(2, 0, 1, 1);
    gctx.fillStyle = '#ffffff'; gctx.fillRect(3, 0, 1, 1);
    var gradientMap = new THREE.CanvasTexture(gradCanvas);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;

    function toon(color) {
      return new THREE.MeshToonMaterial({ color: color, gradientMap: gradientMap });
    }
    function outline(mesh, scale) {
      var out = new THREE.Mesh(mesh.geometry, new THREE.MeshBasicMaterial({ color: '#05070d', side: THREE.BackSide }));
      out.scale.setScalar(scale || 1.045);
      mesh.add(out);
      return out;
    }

    // Sun (far left, emissive)
    var sun = new THREE.Mesh(new THREE.SphereGeometry(4.4, 32, 24), new THREE.MeshBasicMaterial({ color: '#ffd75e' }));
    sun.position.set(-25, 6.5, -4);
    scene.add(sun);
    var sunHalo = new THREE.Mesh(new THREE.SphereGeometry(5.4, 24, 18), new THREE.MeshBasicMaterial({ color: '#ffb347', transparent: true, opacity: 0.25 }));
    sun.add(sunHalo);

    // Earth with painted texture
    var earthTex = this.makeEarthTexture();
    var earth = new THREE.Mesh(
      new THREE.SphereGeometry(3, 48, 32),
      new THREE.MeshToonMaterial({ map: earthTex, gradientMap: gradientMap })
    );
    scene.add(earth);
    outline(earth, 1.04);
    this.earth = earth;
    this.baseRotation = earth.rotation.y = 0.6;

    // Clouds band (visual interest, thin)
    var clouds = new THREE.Mesh(
      new THREE.SphereGeometry(3.09, 32, 24),
      new THREE.MeshToonMaterial({ color: '#ffffff', gradientMap: gradientMap, transparent: true, opacity: 0.16 })
    );
    earth.add(clouds);
    this.clouds = clouds;

    // Atmosphere: Fresnel rim glow — BackSide sphere slightly larger than the
    // globe, additive blending (the standard globe-atmosphere recipe).
    var atmoGeo = new THREE.SphereGeometry(3.45, 48, 32);
    var atmoMat = new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color('#7fc4ff') } },
      vertexShader: [
        'varying vec3 vNormal;',
        'varying vec3 vView;',
        'void main() {',
        '  vNormal = normalize(normalMatrix * normal);',
        '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
        '  vView = normalize(-mv.xyz);',
        '  gl_Position = projectionMatrix * mv;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform vec3 glowColor;',
        'varying vec3 vNormal;',
        'varying vec3 vView;',
        'void main() {',
        '  float fres = pow(1.0 - abs(dot(vNormal, vView)), 2.6);',
        '  gl_FragColor = vec4(glowColor, 1.0) * fres * 0.9;',
        '}'
      ].join('\n'),
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Moon orbiting
    var moonPivot = new THREE.Group();
    scene.add(moonPivot);
    var moon = new THREE.Mesh(new THREE.SphereGeometry(0.8, 24, 16), toon('#cfcfd6'));
    moon.position.set(7.5, 1.4, 0);
    moonPivot.add(moon);
    outline(moon, 1.07);
    this.moonPivot = moonPivot;

    // Light from the sun
    var sunLight = new THREE.DirectionalLight('#fff3c4', 3.2);
    sunLight.position.copy(sun.position);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight('#28304a', 0.4));

    // City markers from config
    this.markers = (this.config.cases || []).map(function (c, i) {
      var lat = (c.lat || 0) * Math.PI / 180;
      var lon = (c.lon || 0) * Math.PI / 180;
      var r = 3.08;
      var pos = new THREE.Vector3(
        r * Math.cos(lat) * Math.sin(lon),
        r * Math.sin(lat),
        r * Math.cos(lat) * Math.cos(lon)
      );
      var pin = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 8), new THREE.MeshBasicMaterial({ color: '#f42324' }));
      pin.position.copy(pos);
      earth.add(pin);
      var chip = PYP.el('span', 'ml-chip ml-control ml-chip-marker');
      chip.style.position = 'absolute';
      chip.style.pointerEvents = 'none';
      chip.style.fontSize = '13px';
      chip.style.padding = '3px 8px';
      chip.style.minHeight = '0';
      chip.textContent = c.city || ('Place ' + (i + 1));
      self.box.appendChild(chip);
      return { caseIndex: i, pin: pin, chip: chip, local: pos.clone() };
    });

    // Drag the Earth (raycast on earth sphere)
    var raycaster = new THREE.Raycaster();
    var dragging = false;
    var lastX = 0, draggingMoved = 0;
    var dom = renderer.domElement;
    function pointerPos(e) {
      var rect = dom.getBoundingClientRect();
      var cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      var cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      return new THREE.Vector2((cx / rect.width) * 2 - 1, -(cy / rect.height) * 2 + 1);
    }
    function onDown(e) {
      raycaster.setFromCamera(pointerPos(e), camera);
      var hit = raycaster.intersectObject(earth, false);
      if (hit.length) { dragging = true; lastX = (e.touches ? e.touches[0].clientX : e.clientX); draggingMoved = 0; }
    }
    function onMove(e) {
      if (!dragging) return;
      var x = (e.touches ? e.touches[0].clientX : e.clientX);
      var dx = x - lastX;
      lastX = x;
      draggingMoved += Math.abs(dx);
      earth.rotation.y += dx * 0.011;
      e.preventDefault();
    }
    function onUp() { dragging = false; }
    dom.addEventListener('mousedown', onDown);
    dom.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    dom.addEventListener('touchstart', onDown, { passive: true });
    dom.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    this.destroyFns.push(function () {
      dom.removeEventListener('mousedown', onDown);
      dom.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      dom.removeEventListener('touchstart', onDown);
      dom.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
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
    var self2 = this;
    function loop() {
      self.raf = requestAnimationFrame(loop);
      var t = clock.getElapsedTime();
      if (!dragging) earth.rotation.y += 0.0016;
      if (self.clouds) self.clouds.rotation.y = t * 0.01;
      moonPivot.rotation.y = t * 0.12;
      // Project marker chips
      self.markers.forEach(function (m) {
        var world = m.local.clone().applyEuler(earth.rotation).multiplyScalar(1.0);
        world.applyMatrix4(earth.matrixWorld);
        var v = world.clone().project(camera);
        var vis = world.clone().normalize().dot(new THREE.Vector3().subVectors(camera.position, earth.position).normalize()) > 0.08;
        if (vis && v.z < 1) {
          m.chip.style.display = '';
          m.chip.style.left = ((v.x * 0.5 + 0.5) * self.box.clientWidth) + 'px';
          m.chip.style.top = ((-v.y * 0.5 + 0.5) * self.box.clientHeight) + 'px';
          m.chip.style.transform = 'translate(-50%, -130%)';
        } else {
          m.chip.style.display = 'none';
        }
      });
      controls.update();
      renderer.render(scene, camera);
    }
    loop();
  };

  Spatial3D.prototype.makeEarthTexture = function () {
    var c = document.createElement('canvas');
    c.width = 512; c.height = 256;
    var g = c.getContext('2d');
    var ocean = g.createLinearGradient(0, 0, 0, 256);
    ocean.addColorStop(0, '#2f6fb4');
    ocean.addColorStop(0.5, '#3f9edb');
    ocean.addColorStop(1, '#2f6fb4');
    g.fillStyle = ocean;
    g.fillRect(0, 0, 512, 256);
    // Continent clusters: overlapping lobes read as landmasses
    function land(cx, cy, r, lobes) {
      g.fillStyle = '#4caf6d';
      for (var i = 0; i < lobes; i++) {
        var a = (i / lobes) * Math.PI * 2;
        g.beginPath();
        g.ellipse(cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.45, r * 0.55, r * 0.4, a, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = '#5dbd7a';
      g.beginPath();
      g.ellipse(cx, cy, r * 0.62, r * 0.45, 0.3, 0, Math.PI * 2);
      g.fill();
    }
    land(105, 95, 44, 6);
    land(150, 165, 30, 5);
    land(320, 85, 50, 7);
    land(420, 150, 34, 5);
    land(235, 120, 26, 4);
    // Deserts + tundra accents
    g.fillStyle = '#d9c07a';
    g.beginPath(); g.ellipse(330, 80, 22, 12, 0.4, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#7fb069';
    g.beginPath(); g.ellipse(445, 165, 18, 10, 0.2, 0, Math.PI * 2); g.fill();
    // Polar ice
    g.fillStyle = '#eef7ff';
    g.fillRect(0, 0, 512, 16);
    g.fillRect(0, 240, 512, 16);
    // Subtle outline shading at terminator edge handled by lighting
    var tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  Spatial3D.prototype.commit = function () {
    var self = this;
    var c = (this.config.cases || [])[this.activeCase];
    if (!c) return;
    if (this.prediction == null) {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct('👆 Choose “Day” or “Night” first, then commit!');
      return;
    }
    // Ground truth from the live scene: is the marker lit by the sun?
    var sunDir = new THREE.Vector3(-25, 6.5, -4).normalize();
    var m = this.markers[this.activeCase];
    var worldNormal = m.local.clone().applyEuler(this.earth.rotation).normalize();
    var lit = worldNormal.dot(sunDir) > 0.05;
    var truth = lit ? 'Day' : 'Night';
    if (this.prediction === truth) {
      this.solved[this.activeCase] = true;
      this.ctx.sfx.playCorrect();
      this.ctx.instruct(c.why ? c.why + ' ' + truth + ' is right — ' + (truth === 'Day' ? 'this side faces the Sun.' : 'this side faces away from the Sun.') : 'Yes! ' + truth + '.');
      this.renderTabs();
      var next = (this.config.cases || []).findIndex(function (x, i) { return !self.solved[i]; });
      if (next >= 0) setTimeout(function () { self.setCase(next); }, 3200);
      else setTimeout(function () {
        self.ctx.instruct('Every case solved — you can steer a planet!');
        self.ctx.sfx.playFanfare();
      }, 3200);
    } else {
      this.ctx.sfx.playBuzz();
      this.ctx.instruct('Not yet — ' + (truth === 'Day'
        ? 'that side is turned toward the Sun right now. Spin the Earth and look again.'
        : 'that side is facing the Sun, so it is bright there. Try another spin.'));
    }
  };

  Spatial3D.prototype.destroy = function () {
    this.destroyFns.forEach(function (fn) { fn(); });
    if (this.raf) cancelAnimationFrame(this.raf);
    Array.prototype.forEach.call(this.box.querySelectorAll('.ml-chip-marker'), function (c) { c.remove(); });
    this.root.innerHTML = '';
  };

  PYP.engines['spatial3d'] = Spatial3D;
})();
