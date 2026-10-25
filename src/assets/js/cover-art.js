/* ==========================================================================
   Cover art — the course cover as a Stage-Lit Paper Theatre vignette.
   Replaces the emoji-cluster covers: a Rough.js hand-inked backdrop (from
   the course palette) plus three canvas-drawn subject props (no emoji).
   paintCover(course, canvas) is used by core.js when rough.js is available;
   otherwise the legacy emoji cover remains as fallback.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function icons(A, D) {
    var I = {};
    I.pizza = function (c, u) {
      // whole pizza, tilted, with a cut slice removed — reads as FOOD
      c.save(); c.rotate(-0.12);
      c.beginPath(); c.arc(0, 0, u * 0.95, 0, Math.PI * 2); D.fs(c, '#f7b84a');
      c.beginPath(); c.arc(0, 0, u * 0.95, 0, Math.PI * 2); c.lineWidth = u * 0.16; c.strokeStyle = '#e8933f'; c.stroke();
      c.beginPath(); c.arc(0, 0, u * 0.62, 0, Math.PI * 2); c.lineWidth = 2; c.strokeStyle = '#d98a2f'; c.stroke();
      // removed slice (wedge gap)
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, u * 1.02, -0.5, 0.15); c.closePath();
      c.fillStyle = '#fdf6e3'; c.fill();
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, u * 0.95, -0.5, 0.15);
      c.lineTo(0, 0); c.lineWidth = 2.5; c.strokeStyle = D.INK; c.stroke();
      // toppings
      [[0.35, -0.25], [-0.3, 0.3], [0.42, 0.35], [-0.45, -0.15], [0.05, 0.55]].forEach(function (p) {
        D.dot(c, p[0] * u, p[1] * u, u * 0.11, '#e4573d', 1.8);
      });
      c.restore();
      // the cut slice, leaning beside
      c.save(); c.translate(u * 1.05, u * 0.35); c.rotate(0.7);
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, u * 0.55, -0.5, 0.5); c.closePath();
      D.fs(c, '#f7b84a');
      c.beginPath(); c.arc(0, 0, u * 0.34, -0.42, 0.42); c.closePath(); D.fs(c, '#e4573d', 2);
      c.restore();
    };
    I.dice = function (c, u) {
      c.save(); c.rotate(0.18);
      D.rr(c, -u * 0.72, -u * 0.72, u * 1.44, u * 1.44, u * 0.26); D.fs(c, '#ffffff');
      [[-0.34, -0.34], [0, 0], [0.34, 0.34], [0.34, -0.34], [-0.34, 0.34]].forEach(function (p) {
        D.dot(c, p[0] * u, p[1] * u, u * 0.11, D.INK);
      });
      c.restore();
    };
    I.coin = function (c, u) {
      D.ellipse(c, 0, 0, u * 0.6, u * 0.85); D.fs(c, '#ffd75e');
      D.ellipse(c, 0, 0, u * 0.42, u * 0.65); c.lineWidth = 2.2; c.strokeStyle = '#c9a02f'; c.stroke();
      c.font = '700 ' + u * 0.6 + 'px "Baloo 2", sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillStyle = '#c9a02f'; c.fillText('1', 0, u * 0.03);
      c.globalAlpha = 0.35; D.dot(c, -u * 0.18, -u * 0.25, u * 0.12, '#ffffff'); c.globalAlpha = 1;
    };
    I.flask = function (c, u) {
      c.beginPath();
      c.moveTo(-u * 0.22, -u * 0.85); c.lineTo(u * 0.22, -u * 0.85);
      c.lineTo(u * 0.22, -u * 0.2); c.lineTo(u * 0.72, u * 0.7);
      c.lineTo(-u * 0.72, u * 0.7); c.lineTo(-u * 0.22, -u * 0.2);
      c.closePath(); D.fs(c, 'rgba(200,235,250,0.75)');
      c.beginPath();
      c.moveTo(-u * 0.5, u * 0.28); c.lineTo(u * 0.5, u * 0.28);
      c.lineTo(u * 0.72, u * 0.7); c.lineTo(-u * 0.72, u * 0.7);
      c.closePath(); D.fs(c, '#b388ff', 2.2);
      D.dot(c, -u * 0.1, u * 0.45, u * 0.07, '#8bc8fa');
      D.dot(c, u * 0.25, u * 0.52, u * 0.05, '#8bc8fa');
      c.lineWidth = 2.4; c.strokeStyle = D.INK;
      c.beginPath(); c.moveTo(-u * 0.32, -u * 0.85); c.lineTo(u * 0.32, -u * 0.85); c.stroke();
    };
    I.leaf = function (c, u) {
      c.beginPath();
      c.moveTo(0, u * 0.85);
      c.quadraticCurveTo(-u * 0.95, u * 0.1, 0, -u * 0.85);
      c.quadraticCurveTo(u * 0.95, u * 0.1, 0, u * 0.85);
      c.closePath(); D.fs(c, '#58b368');
      D.line(c, 0, u * 0.7, 0, -u * 0.7, 2.2);
      for (var i = 0; i < 3; i++) {
        D.line(c, 0, u * (0.3 - i * 0.4), (i % 2 ? 1 : -1) * u * 0.35, u * (0.1 - i * 0.4), 2, 'rgba(36,39,34,0.35)');
      }
    };
    I.magnet = function (c, u) {
      c.beginPath();
      c.moveTo(-u * 0.6, -u * 0.7); c.lineTo(u * 0.05, -u * 0.7);
      c.lineTo(u * 0.05, u * 0.25); c.quadraticCurveTo(u * 0.05, u * 0.7, -u * 0.35, u * 0.7);
      c.quadraticCurveTo(-u * 0.6, u * 0.7, -u * 0.6, u * 0.4);
      c.closePath(); D.fs(c, '#f42324');
      D.rr(c, -u * 0.6, -u * 0.7, u * 0.32, u * 0.28, u * 0.04); D.fs(c, '#ffffff', 2.2);
      D.rr(c, -u * 0.27, -u * 0.7, u * 0.32, u * 0.28, u * 0.04); D.fs(c, '#ffffff', 2.2);
      c.strokeStyle = '#8bc8fa'; c.lineWidth = 2.2;
      [[-0.9, -0.4], [-1.05, 0.1]].forEach(function (a) {
        c.beginPath(); c.arc(a[0] * u, a[1] * u + u * 0.5, u * 0.14, -0.8, 0.8); c.stroke();
      });
    };
    I.book = function (c, u) {
      D.rr(c, -u * 0.85, -u * 0.65, u * 1.7, u * 1.3, u * 0.12); D.fs(c, '#4ecdc4');
      c.beginPath(); c.moveTo(0, -u * 0.6); c.lineTo(0, u * 0.62); c.lineWidth = W25(c); c.strokeStyle = D.INK; c.stroke();
      c.fillStyle = '#ffffff';
      [[-0.55], [0.15]].forEach(function (x) {
        c.fillRect(x[0] * u, -u * 0.4, u * 0.32, u * 0.08);
        c.fillRect(x[0] * u, -u * 0.15, u * 0.32, u * 0.08);
        c.fillRect(x[0] * u, u * 0.1, u * 0.22, u * 0.08);
      });
      D.dot(c, u * 0.55, -u * 0.5, u * 0.14, '#ffd75e', 2);
    };
    I.pencil = function (c, u) {
      c.save(); c.rotate(-0.5);
      D.rr(c, -u * 0.18, -u * 0.7, u * 0.36, u * 1.05, u * 0.03); D.fs(c, '#ffd75e');
      c.beginPath();
      c.moveTo(-u * 0.18, u * 0.35); c.lineTo(0, u * 0.8); c.lineTo(u * 0.18, u * 0.35);
      c.closePath(); D.fs(c, '#e8c99b', 2.2);
      D.dot(c, 0, u * 0.62, u * 0.05, D.INK);
      D.rr(c, -u * 0.18, -u * 0.82, u * 0.36, u * 0.16, u * 0.03); D.fs(c, '#ff9fb2', 2);
      c.restore();
    };
    I.speech = function (c, u) {
      c.beginPath();
      c.moveTo(-u * 0.9, -u * 0.55); c.lineTo(u * 0.9, -u * 0.55);
      c.quadraticCurveTo(u * 1.0, -u * 0.55, u * 1.0, -u * 0.35);
      c.lineTo(u * 1.0, u * 0.25); c.quadraticCurveTo(u * 1.0, u * 0.45, u * 0.8, u * 0.45);
      c.lineTo(-u * 0.25, u * 0.45); c.lineTo(-u * 0.55, u * 0.8); c.lineTo(-u * 0.55, u * 0.45);
      c.quadraticCurveTo(-u * 0.9, u * 0.45, -u * 0.9, u * 0.25);
      c.quadraticCurveTo(-u * 0.9, -u * 0.55, -u * 0.9, -u * 0.55);
      c.closePath(); D.fs(c, '#ffffff');
      c.fillStyle = D.INK;
      c.font = '700 ' + u * 0.42 + 'px "Baloo 2", sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('Aa', 0.05 * u, -u * 0.05);
    };
    I.pyramid = function (c, u) {
      c.beginPath();
      c.moveTo(0, -u * 0.85); c.lineTo(u * 0.95, u * 0.6); c.lineTo(-u * 0.95, u * 0.6);
      c.closePath(); D.fs(c, '#e0b45c');
      D.line(c, 0, -u * 0.85, u * 0.15, u * 0.6, 2.2, 'rgba(36,39,34,0.35)');
      c.beginPath();
      c.moveTo(-u * 0.95, u * 0.6); c.lineTo(-u * 0.7, u * 0.78); c.lineTo(-u * 0.3, u * 0.6);
      c.closePath(); D.fs(c, '#c9973f', 2);
    };
    I.vase = function (c, u) {
      c.beginPath();
      c.moveTo(-u * 0.18, -u * 0.7); c.lineTo(u * 0.18, -u * 0.7);
      c.quadraticCurveTo(u * 0.75, -u * 0.2, u * 0.5, u * 0.55);
      c.quadraticCurveTo(u * 0.4, u * 0.78, 0, u * 0.78);
      c.quadraticCurveTo(-u * 0.4, u * 0.78, -u * 0.5, u * 0.55);
      c.quadraticCurveTo(-u * 0.75, -u * 0.2, -u * 0.18, -u * 0.7);
      c.closePath(); D.fs(c, '#c97fa0');
      c.strokeStyle = '#8a4a68'; c.lineWidth = 2.2;
      c.beginPath(); c.arc(0, u * 0.2, u * 0.28, 0.3, Math.PI - 0.3); c.stroke();
      c.beginPath(); c.arc(0, u * 0.45, u * 0.2, 0.3, Math.PI - 0.3); c.stroke();
    };
    I.heart = function (c, u) {
      c.beginPath();
      c.moveTo(0, u * 0.75);
      c.bezierCurveTo(-u * 1.1, -u * 0.1, -u * 0.5, -u * 0.95, 0, -u * 0.35);
      c.bezierCurveTo(u * 0.5, -u * 0.95, u * 1.1, -u * 0.1, 0, u * 0.75);
      c.closePath(); D.fs(c, '#ff6584');
      c.globalAlpha = 0.5; D.dot(c, -u * 0.3, -u * 0.25, u * 0.12, '#ffffff'); c.globalAlpha = 1;
    };
    I.rainbow = function (c, u) {
      var cols = ['#f42324', '#ffd75e', '#58b368', '#38b6ff', '#b388ff'];
      c.lineWidth = u * 0.22;
      for (var i = 0; i < 5; i++) {
        c.beginPath();
        c.arc(0, u * 0.55, u * (0.95 - i * 0.22), Math.PI, 0);
        c.strokeStyle = cols[i]; c.stroke();
      }
      c.lineWidth = 2.2; c.strokeStyle = D.INK;
      c.beginPath(); c.arc(0, u * 0.55, u * 1.06, Math.PI, 0); c.stroke();
      c.beginPath(); c.arc(0, u * 0.55, u * 0.06, Math.PI, 0); c.stroke();
      [[-1.06], [1.06]].forEach(function (x) {
        D.dot(c, x[0] * u, u * 0.58, u * 0.1, '#ffffff', 2);
      });
    };
    I.laptop = function (c, u) {
      D.rr(c, -u * 0.7, -u * 0.55, u * 1.4, u * 0.95, u * 0.1); D.fs(c, '#c9c9c2');
      D.rr(c, -u * 0.58, -u * 0.44, u * 1.16, u * 0.72, u * 0.05); D.fs(c, '#38b6ff', 2);
      c.fillStyle = '#ffffff';
      c.font = '700 ' + u * 0.3 + 'px "Baloo 2", sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('</>', 0, -u * 0.08);
      c.beginPath();
      c.moveTo(-u * 0.95, u * 0.4); c.lineTo(u * 0.95, u * 0.4); c.lineTo(u * 0.8, u * 0.62); c.lineTo(-u * 0.8, u * 0.62);
      c.closePath(); D.fs(c, '#a8a8a0');
    };
    I.robot = function (c, u) {
      D.rr(c, -u * 0.62, -u * 0.5, u * 1.24, u * 1.0, u * 0.18); D.fs(c, '#9aa5b8');
      D.rr(c, -u * 0.44, -u * 0.3, u * 0.88, u * 0.5, u * 0.08); D.fs(c, '#e8eef4', 2.2);
      D.dot(c, -u * 0.18, -u * 0.05, u * 0.08, '#38b6ff');
      D.dot(c, u * 0.18, -u * 0.05, u * 0.08, '#38b6ff');
      c.beginPath(); c.arc(0, u * 0.12, u * 0.08, 0.2, Math.PI - 0.2);
      c.lineWidth = 2; c.strokeStyle = D.INK; c.stroke();
      D.line(c, 0, -u * 0.5, 0, -u * 0.75, 2.4);
      D.dot(c, 0, -u * 0.82, u * 0.09, '#f42324', 2);
      [-1, 1].forEach(function (sd) {
        D.line(c, sd * u * 0.62, -u * 0.1, sd * u * 0.85, -u * 0.1, 2.6, D.INK);
        D.dot(c, sd * u * 0.92, -u * 0.1, u * 0.08, '#ffd75e', 1.8);
        D.rr(c, sd * u * 0.25 - u * 0.12, u * 0.5, u * 0.24, u * 0.2, u * 0.06); D.fs(c, '#7d8899', 2);
      });
    };
    I.gear = function (c, u) {
      for (var i = 0; i < 8; i++) {
        var a = (i / 8) * Math.PI * 2;
        c.save(); c.translate(Math.cos(a) * u * 0.78, Math.sin(a) * u * 0.78); c.rotate(a);
        D.rr(c, -u * 0.14, -u * 0.14, u * 0.28, u * 0.28, u * 0.05); D.fs(c, '#b388ff', 2.2);
        c.restore();
      }
      D.dot(c, 0, 0, u * 0.72, '#b388ff', W25(c));
      D.dot(c, 0, 0, u * 0.28, '#f4efe4', 2.2);
    };
    I.compass = function (c, u) {
      D.dot(c, 0, 0, u * 0.9, '#f4efe4', W25(c));
      D.dot(c, 0, 0, u * 0.68, '#ffffff', 2);
      c.beginPath();
      c.moveTo(0, -u * 0.55); c.lineTo(u * 0.16, 0); c.lineTo(0, u * 0.55); c.lineTo(-u * 0.16, 0);
      c.closePath(); D.fs(c, '#f42324', 2);
      c.beginPath();
      c.moveTo(0, -u * 0.55); c.lineTo(u * 0.16, 0); c.lineTo(0, 0);
      c.closePath(); D.fs(c, '#242722', 1.6);
      D.dot(c, 0, 0, u * 0.07, '#ffd75e', 1.6);
      c.fillStyle = D.INK; c.font = '700 ' + u * 0.2 + 'px "Baloo 2", sans-serif';
      c.textAlign = 'center'; c.fillText('N', 0, -u * 0.72);
    };
    I.map = function (c, u) {
      c.save(); c.rotate(-0.06);
      c.beginPath();
      c.moveTo(-u * 0.9, -u * 0.55); c.lineTo(-u * 0.3, -u * 0.7); c.lineTo(u * 0.3, -u * 0.5);
      c.lineTo(u * 0.9, -u * 0.68); c.lineTo(u * 0.9, u * 0.6); c.lineTo(u * 0.3, u * 0.75);
      c.lineTo(-u * 0.3, u * 0.5); c.lineTo(-u * 0.9, u * 0.68);
      c.closePath(); D.fs(c, '#f4e3c2');
      c.strokeStyle = '#4a9a58'; c.lineWidth = 2.4;
      c.beginPath();
      c.moveTo(-u * 0.7, u * 0.2); c.quadraticCurveTo(0, -u * 0.3, u * 0.7, -u * 0.1);
      c.stroke();
      D.dot(c, u * 0.4, -u * 0.25, u * 0.09, '#f42324', 1.8);
      D.dot(c, -u * 0.4, u * 0.1, u * 0.07, '#38b6ff', 1.6);
      c.restore();
    };
    I.apple = function (c, u) {
      c.beginPath();
      c.moveTo(0, -u * 0.35);
      c.bezierCurveTo(-u * 1.0, -u * 0.8, -u * 0.95, u * 0.5, 0, u * 0.8);
      c.bezierCurveTo(u * 0.95, u * 0.5, u * 1.0, -u * 0.8, 0, -u * 0.35);
      c.closePath(); D.fs(c, '#f42324');
      D.line(c, 0, -u * 0.4, u * 0.12, -u * 0.85, 3, '#8a5a2f');
      c.beginPath();
      D.ellipse(c, u * 0.32, -u * 0.72, u * 0.22, u * 0.1, 0.5); D.fs(c, '#58b368', 2);
      c.globalAlpha = 0.4; D.dot(c, -u * 0.35, -u * 0.15, u * 0.1, '#ffffff'); c.globalAlpha = 1;
    };
    I.ladder = function (c, u) {
      c.save(); c.rotate(0.08);
      D.line(c, -u * 0.4, -u * 0.85, -u * 0.4, u * 0.85, 4, '#8a5a2f');
      D.line(c, u * 0.4, -u * 0.85, u * 0.4, u * 0.85, 4, '#8a5a2f');
      for (var i = 0; i < 4; i++) D.line(c, -u * 0.4, -u * 0.5 + i * u * 0.36, u * 0.4, -u * 0.5 + i * u * 0.36, 3.2, '#c98a4b');
      c.restore();
      D.dot(c, u * 0.9, -u * 0.5, u * 0.14, '#ffd75e', 2);
    };
    I.brain = function (c, u) {
      D.dot(c, 0, 0, u * 0.85, '#ffb8c8', W25(c));
      c.strokeStyle = '#e26a92'; c.lineWidth = 2.4;
      [[-0.35, -0.3, 0.3], [0.25, -0.35, 0.28], [-0.1, 0.15, 0.3], [0.4, 0.2, 0.24], [-0.45, 0.25, 0.22]].forEach(function (g) {
        c.beginPath();
        c.arc(g[0] * u, g[1] * u, g[2] * u, 0.4, Math.PI * 1.6);
        c.stroke();
      });
      D.line(c, 0, -u * 0.8, 0, u * 0.8, 2.4, '#e26a92');
    };
    I.dino = function (c, u) {
      D.ellipse(c, 0.05, u * 0.3, u * 0.72, u * 0.45); D.fs(c, '#7cb56a');
      c.beginPath();
      c.moveTo(-u * 0.5, u * 0.15); c.quadraticCurveTo(-u * 0.95, -u * 0.15, -u * 0.85, -u * 0.55);
      c.quadraticCurveTo(-u * 0.6, -u * 0.35, -u * 0.42, -u * 0.3);
      c.closePath(); D.fs(c, '#6aa35a', 2.4);
      D.ellipse(c, u * 0.68, -u * 0.15, u * 0.3, u * 0.26); D.fs(c, '#7cb56a');
      D.dot(c, u * 0.78, -u * 0.2, u * 0.05);
      [[-0.1], [0.25]].forEach(function (x) {
        c.beginPath();
        c.moveTo(x[0] * u, -u * 0.35); c.lineTo((x[0] + 0.08) * u, -u * 0.62); c.lineTo((x[0] + 0.18) * u, -u * 0.33);
        c.closePath(); D.fs(c, '#6aa35a', 2);
      });
      [-1, 1].forEach(function (sd) {
        D.rr(c, sd * u * 0.3 - u * 0.09, u * 0.65, u * 0.18, u * 0.22, u * 0.06); D.fs(c, '#6aa35a', 2.2);
      });
      D.dot(c, u * 0.85, -u * 0.05, u * 0.04);
    };
    function W25() { return 2.5; }
    return I;
  }

  /* Arrangement: props STAND on the near-hill ground line like a still life.
     [icon, xFrac, scale] — painted at the shared ground line with shadows. */
  var ARRANGE = {
    'Mathematics': [['pizza', 0.34, 168], ['dice', 0.58, 96], ['coin', 0.78, 74]],
    'Science': [['flask', 0.32, 170], ['leaf', 0.56, 100], ['magnet', 0.78, 96]],
    'English': [['book', 0.34, 170], ['pencil', 0.58, 120], ['speech', 0.79, 104]],
    'History': [['pyramid', 0.32, 180], ['vase', 0.58, 110], ['coin', 0.79, 74]],
    'Personal & Social Development': [['heart', 0.34, 150], ['rainbow', 0.6, 130], ['spark', 0.81, 90]],
    'Computing': [['laptop', 0.34, 170], ['robot', 0.62, 130], ['gear', 0.82, 86]],
    'Geography': [['compass', 0.34, 150], ['map', 0.62, 140], ['earth', 0.83, 96]],
    'Life Skills': [['apple', 0.34, 140], ['bag', 0.6, 130], ['coin', 0.81, 72]],
    'Learning to Learn': [['ladder', 0.32, 180], ['brain', 0.6, 120], ['sprout', 0.82, 90]],
  };

  var KITS = {
    'Mathematics': ['pizza', 'dice', 'coin'],
    'Science': ['flask', 'leaf', 'magnet'],
    'English': ['book', 'pencil', 'speech'],
    'History': ['pyramid', 'vase', 'coin'],
    'Personal & Social Development': ['heart', 'rainbow', 'spark'],
    'Computing': ['laptop', 'robot', 'gear'],
    'Geography': ['compass', 'map', 'earth'],
    'Life Skills': ['apple', 'bag', 'coin'],
    'Learning to Learn': ['ladder', 'brain', 'sprout'],
  };

  PYP.coverArt = {
    paint: function (course, canvas) {
      var D = PYP.draw;
      if (!D || !window.rough) return false;
      var I = icons(PYP.actors || {}, D);
      var kitNames = KITS[course.subject] || KITS.English;
      var fns = kitNames.map(function (k) { return I[k] || (PYP.actors && PYP.actors[k]); });
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = 520, h = 640;
      canvas.width = w * dpr; canvas.height = h * dpr;
      var c = canvas.getContext('2d');
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      var pal = (course.artPalette && course.artPalette.length >= 3) ? course.artPalette : ['#FFE156', '#4ECDC4', '#FF6584', '#B388FF'];
      var seed = (course.slug || 'c').split('').reduce(function (a, ch) { return a + ch.charCodeAt(0); }, 11);
      var rand = mulberry(seed);
      function mix(hex, hex2, amt) {
        var a2 = parseInt(hex.slice(1), 16), b2 = parseInt(hex2.slice(1), 16);
        if (isNaN(a2) || isNaN(b2)) return hex2;
        var r = Math.round(((a2 >> 16) & 255) * (1 - amt) + ((b2 >> 16) & 255) * amt);
        var g2 = Math.round(((a2 >> 8) & 255) * (1 - amt) + ((b2 >> 8) & 255) * amt);
        var b3 = Math.round((a2 & 255) * (1 - amt) + (b2 & 255) * amt);
        return 'rgb(' + r + ',' + g2 + ',' + b3 + ')';
      }
      var rc = rough.canvas(canvas);
      // ---- Nine stages: the backdrop IS the subject (see DESIGN-PHILOSOPHY) ----
      var gy = h * 0.6;                       // shelf / ground line for props
      var inkLight = 'rgba(36,39,34,0.55)';
      var i2;

      function hachure(fill, gap, ang) {
        return { stroke: '#242722', strokeWidth: 2.2, roughness: 1.8, fill: fill, fillStyle: 'hachure', fillWeight: 0.9, hachureGap: gap || 8, hachureAngle: ang == null ? -38 : ang };
      }
      function solid(fill) { return { stroke: '#242722', strokeWidth: 2.2, roughness: 1.4, fill: fill, fillStyle: 'solid' }; }

      if (course.subject === 'Mathematics') {
        // Blueprint: graph paper + floating construction sketches
        c.fillStyle = '#eef4fb'; c.fillRect(0, 0, w, h);
        c.strokeStyle = 'rgba(90,140,200,0.3)'; c.lineWidth = 1.4;
        for (var gx = 0; gx <= w; gx += 34) { c.beginPath(); c.moveTo(gx, 0); c.lineTo(gx, h); c.stroke(); }
        for (var gy2 = 0; gy2 <= h; gy2 += 34) { c.beginPath(); c.moveTo(0, gy2); c.lineTo(w, gy2); c.stroke(); }
        c.strokeStyle = 'rgba(90,140,200,0.5)'; c.lineWidth = 1.8;
        c.beginPath(); c.moveTo(0, h * 0.32); c.lineTo(w, h * 0.32); c.stroke();
        rc.circle(w * 0.2, h * 0.2, 60, { stroke: '#38b6ff', strokeWidth: 2.4, roughness: 1.5 });
        rc.polygon([[w * 0.72, h * 0.12], [w * 0.62, h * 0.3], [w * 0.84, h * 0.3]], { stroke: '#f42324', strokeWidth: 2.4, roughness: 1.5 });
        rc.rectangle(w * 0.44, h * 0.1, 44, 44, { stroke: '#b388ff', strokeWidth: 2.4, roughness: 1.5 });
        gy = h * 0.7;
        rc.line(0, gy, w, gy, { stroke: '#242722', strokeWidth: 2.6, roughness: 1.4 });
        rc.rectangle(-20, gy, w + 40, h, { stroke: '#5a8cc8', strokeWidth: 2, roughness: 1.6, fill: '#dbe9f7', fillStyle: 'hachure', fillWeight: 0.6, hachureGap: 9, hachureAngle: -42 });
        c.fillStyle = 'rgba(90,140,200,0.5)';
        for (i2 = 0; i2 < 8; i2++) {
          var px2 = rand() * w, py2 = h * 0.78 + rand() * h * 0.16;
          c.fillRect(px2, py2, 5, 5);
        }
      } else if (course.subject === 'Science') {
        // Laboratory: mint air, bench, bubbles, molecule clusters
        var lg = c.createLinearGradient(0, 0, 0, h);
        lg.addColorStop(0, '#eafaf2'); lg.addColorStop(1, '#d2efe2');
        c.fillStyle = lg; c.fillRect(0, 0, w, h);
        gy = h * 0.66;
        rc.line(0, gy, w, gy, { stroke: '#242722', strokeWidth: 2.6, roughness: 1.5 });
        rc.rectangle(-20, gy, w + 40, h - gy + 20, hachure('#bfe3d2', 9));
        // molecule cluster
        var mpts = [[0.2, 0.2], [0.3, 0.32], [0.14, 0.38]];
        c.strokeStyle = 'rgba(36,39,34,0.4)'; c.lineWidth = 2;
        for (i2 = 1; i2 < mpts.length; i2++) {
          c.beginPath(); c.moveTo(mpts[0][0] * w, mpts[0][1] * h); c.lineTo(mpts[i2][0] * w, mpts[i2][1] * h); c.stroke();
        }
        mpts.forEach(function (p2) { D.dot(c, p2[0] * w, p2[1] * h, 8, '#4ecdc4', 2.2); });
        // rising bubbles
        c.strokeStyle = 'rgba(90,160,140,0.6)'; c.lineWidth = 1.8;
        for (i2 = 0; i2 < 9; i2++) {
          var bx2 = rand() * w, by2 = h * (0.42 + rand() * 0.2), br2 = 3 + rand() * 5;
          c.beginPath(); c.arc(bx2, by2, br2, 0, Math.PI * 2); c.stroke();
        }
      } else if (course.subject === 'English') {
        // Notebook: ruled paper, margin, ink flourishes, drifting letters
        c.fillStyle = '#fdfaf1'; c.fillRect(0, 0, w, h);
        c.strokeStyle = 'rgba(90,140,200,0.35)'; c.lineWidth = 1.4;
        for (i2 = 0; i2 < 9; i2++) {
          var ry3 = h * 0.12 + i2 * (h * 0.1);
          c.beginPath(); c.moveTo(0, ry3); c.lineTo(w, ry3); c.stroke();
        }
        c.strokeStyle = 'rgba(244,35,36,0.45)'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(w * 0.12, 0); c.lineTo(w * 0.12, h); c.stroke();
        c.strokeStyle = 'rgba(36,39,34,0.4)'; c.lineWidth = 2.2;
        c.beginPath();
        c.moveTo(w * 0.6, h * 0.18);
        c.bezierCurveTo(w * 0.75, h * 0.05, w * 0.85, h * 0.3, w * 0.7, h * 0.34);
        c.stroke();
        c.font = '700 ' + h * 0.07 + 'px "Baloo 2", sans-serif';
        c.fillStyle = 'rgba(36,39,34,0.28)';
        c.textAlign = 'center'; c.textBaseline = 'middle';
        [['A', 0.3, 0.2], ['b', 0.75, 0.52], ['e', 0.45, 0.62]].forEach(function (L) {
          c.save(); c.rotate((L[1] - 0.5) * 0.3);
          c.fillText(L[0], L[1] * w, L[2] * h);
          c.restore();
        });
        gy = h * 0.78;
        rc.line(0, gy, w, gy, { stroke: '#242722', strokeWidth: 2.6, roughness: 1.5 });
        rc.rectangle(-20, gy, w + 40, h - gy + 20, hachure('#e8d9b8', 9));
      } else if (course.subject === 'History') {
        // Parchment dunes with a distant pyramid trio
        var pg = c.createLinearGradient(0, 0, 0, h);
        pg.addColorStop(0, '#f2e2bd'); pg.addColorStop(1, '#e3c795');
        c.fillStyle = pg; c.fillRect(0, 0, w, h);
        c.save(); c.globalAlpha = 0.5; c.fillStyle = '#d9b978';
        for (i2 = 0; i2 < 40; i2++) c.fillRect(rand() * w, rand() * h, 2.5, 2.5);
        c.restore();
        rc.polygon([[w * 0.2, h * 0.44], [w * 0.34, h * 0.2], [w * 0.48, h * 0.44]], solid('#d9a95c'));
        rc.polygon([[w * 0.44, h * 0.46], [w * 0.62, h * 0.16], [w * 0.8, h * 0.46]], solid('#cf9c4e'));
        var dy = h * 0.62;
        rc.path('M0,' + dy + ' C' + w * 0.3 + ',' + (dy - 34) + ' ' + w * 0.6 + ',' + (dy + 10) + ' ' + w + ',' + (dy - 18) + ' L' + w + ',' + h + ' L0,' + h + ' Z', hachure('#d9b978', 9, -30));
        var dy2 = h * 0.78;
        rc.path('M0,' + dy2 + ' C' + w * 0.35 + ',' + (dy2 - 20) + ' ' + w * 0.6 + ',' + (dy2 + 14) + ' ' + w + ',' + (dy2 - 6) + ' L' + w + ',' + h + ' L0,' + h + ' Z', hachure('#cfa566', 9, -35));
        gy = h * 0.74;
      } else if (course.subject === 'Personal & Social Development') {
        // Sunrise meadow with heart balloons
        var sg = c.createLinearGradient(0, 0, 0, h);
        sg.addColorStop(0, '#ffe3c9'); sg.addColorStop(0.55, '#ffd3d8'); sg.addColorStop(1, '#ffc9d6');
        c.fillStyle = sg; c.fillRect(0, 0, w, h);
        rc.circle(w * 0.5, h * 0.34, 76, solid('#ffd75e'));
        c.strokeStyle = 'rgba(255,150,140,0.6)'; c.lineWidth = 2;
        for (i2 = 0; i2 < 6; i2++) {
          var hx = w * (0.12 + i2 * 0.15), hy = h * (0.14 + (i2 % 3) * 0.08);
          c.beginPath();
          c.moveTo(hx, hy + 14);
          c.bezierCurveTo(hx - 12, hy, hx - 10, hy - 14, hx, hy - 12);
          c.bezierCurveTo(hx + 10, hy - 14, hx + 12, hy, hx, hy + 14);
          c.closePath(); c.fillStyle = 'rgba(255,101,132,0.55)'; c.fill();
          c.beginPath(); c.moveTo(hx, hy + 14); c.quadraticCurveTo(hx + 3, hy + 30, hx - 2, hy + 44); c.stroke();
        }
        var mgy = h * 0.68;
        rc.path('M0,' + mgy + ' C' + w * 0.3 + ',' + (mgy - 26) + ' ' + w * 0.62 + ',' + (mgy + 12) + ' ' + w + ',' + (mgy - 12) + ' L' + w + ',' + h + ' L0,' + h + ' Z', solid('#a8d98a'));
        rc.path('M0,' + (mgy + 36) + ' C' + w * 0.3 + ',' + (mgy + 6) + ' ' + w * 0.62 + ',' + (mgy + 40) + ' ' + w + ',' + (mgy + 20) + ' L' + w + ',' + h + ' L0,' + h + ' Z', hachure('#8fce74', 9));
        gy = h * 0.74;
      } else if (course.subject === 'Computing') {
        // Circuit board night
        c.fillStyle = '#0d1626'; c.fillRect(0, 0, w, h);
        c.fillStyle = 'rgba(120,160,255,0.07)';
        for (i2 = 0; i2 < 60; i2++) c.fillRect(Math.round(rand() * w / 22) * 22, Math.round(rand() * h / 22) * 22, 3, 3);
        c.lineWidth = 2.4; c.lineJoin = 'round';
        for (i2 = 0; i2 < 6; i2++) {
          var tx2 = 0.1 + (i2 % 3) * 0.32, ty2 = 0.12 + Math.floor(i2 / 3) * 0.3;
          c.strokeStyle = 'rgba(90,200,250,0.5)';
          c.beginPath();
          c.moveTo(tx2 * w, ty2 * h);
          c.lineTo(tx2 * w, (ty2 + 0.12) * h);
          c.lineTo((tx2 + 0.16) * w, (ty2 + 0.12) * h);
          c.stroke();
          c.fillStyle = '#5ac8fa';
          c.beginPath(); c.arc(tx2 * w, ty2 * h, 4, 0, Math.PI * 2); c.fill();
        }
        gy = h * 0.68;
        rc.rectangle(-20, gy, w + 40, h - gy + 20, { stroke: '#24405e', strokeWidth: 2.4, roughness: 1.6, fill: '#16233a', fillStyle: 'hachure', fillWeight: 0.7, hachureGap: 9, hachureAngle: -42 });
        c.fillStyle = 'rgba(90,200,250,0.5)';
        for (i2 = 0; i2 < 10; i2++) c.fillRect(rand() * w, gy + 10 + rand() * (h - gy - 20), 6, 6);
      } else if (course.subject === 'Geography') {
        // The map: parchment, route, compass rose
        var mpg = c.createLinearGradient(0, 0, 0, h);
        mpg.addColorStop(0, '#f4e8cf'); mpg.addColorStop(1, '#ecd9b0');
        c.fillStyle = mpg; c.fillRect(0, 0, w, h);
        c.strokeStyle = 'rgba(36,39,34,0.35)'; c.lineWidth = 2;
        rc.polygon([[w * 0.14, h * 0.18], [w * 0.4, h * 0.12], [w * 0.52, h * 0.34], [w * 0.2, h * 0.4]], hachure('#b8d4a8', 8));
        rc.polygon([[w * 0.6, h * 0.4], [w * 0.86, h * 0.3], [w * 0.9, h * 0.56], [w * 0.66, h * 0.6]], hachure('#a8c8e0', 8));
        c.setLineDash([9, 7]);
        c.strokeStyle = '#b3402a'; c.lineWidth = 2.6;
        c.beginPath();
        c.moveTo(w * 0.12, h * 0.72);
        c.quadraticCurveTo(w * 0.4, h * 0.56, w * 0.52, h * 0.68);
        c.quadraticCurveTo(w * 0.66, h * 0.78, w * 0.84, h * 0.62);
        c.stroke();
        c.setLineDash([]);
        c.font = '900 ' + h * 0.08 + 'px "Baloo 2", sans-serif';
        c.fillStyle = '#b3402a'; c.textAlign = 'center';
        c.fillText('X', w * 0.86, h * 0.66);
        c.font = '700 ' + h * 0.05 + 'px "Baloo 2", sans-serif';
        c.fillStyle = '#242722';
        c.fillText('N', w * 0.88, h * 0.14);
        c.beginPath(); c.moveTo(w * 0.88, h * 0.17); c.lineTo(w * 0.88, h * 0.09); c.lineWidth = 2; c.stroke();
        gy = h * 0.82;
      } else if (course.subject === 'Life Skills') {
        // Kitchen counter: cream wall, tile band, shelf jars, steam
        c.fillStyle = '#fbf2df'; c.fillRect(0, 0, w, h);
        var tileY = h * 0.62;
        c.fillStyle = '#ffd9a8';
        for (var trow = 0; trow < 2; trow++) {
          for (var tcol = 0; tcol < 8; tcol++) {
            c.fillRect(10 + tcol * ((w - 20) / 8) + 2, tileY + trow * ((h - tileY) / 2) + 2, (w - 20) / 8 - 4, (h - tileY) / 2 - 4);
          }
        }
        c.strokeStyle = 'rgba(36,39,34,0.4)'; c.lineWidth = 2;
        rc.line(0, tileY, w, tileY, { stroke: '#242722', strokeWidth: 2.4, roughness: 1.4 });
        rc.line(0, h * 0.3, w, h * 0.3, { stroke: '#242722', strokeWidth: 2.4, roughness: 1.4 });
        [[0.2, '#8bc8fa'], [0.35, '#b388ff'], [0.5, '#86efac']].forEach(function (j) {
          D.rr(c, j[0] * w - 16, h * 0.3 - 44, 32, 44, 5); D.fs(c, j[1], 2.2);
          D.rr(c, j[0] * w - 10, h * 0.3 - 52, 20, 9, 3); D.fs(c, '#8a5a2f', 2);
        });
        c.strokeStyle = 'rgba(120,120,120,0.5)'; c.lineWidth = 2.2;
        for (i2 = 0; i2 < 3; i2++) {
          var sx3 = w * (0.3 + i2 * 0.2);
          c.beginPath();
          c.moveTo(sx3, h * 0.56);
          c.bezierCurveTo(sx3 - 10, h * 0.5, sx3 + 10, h * 0.44, sx3, h * 0.38);
          c.stroke();
        }
        gy = tileY;
      } else {
        // Learning to Learn: growth garden — morning sky, soil rows, sprout steps
        var gg = c.createLinearGradient(0, 0, 0, h);
        gg.addColorStop(0, '#fdf3d8'); gg.addColorStop(1, '#e8f4d8');
        c.fillStyle = gg; c.fillRect(0, 0, w, h);
        rc.circle(w * 0.22, h * 0.16, 54, solid('#ffd75e'));
        var soil = h * 0.6;
        for (i2 = 0; i2 < 3; i2++) {
          var sy3 = soil + i2 * (h * 0.13);
          rc.path('M0,' + sy3 + ' C' + w * 0.3 + ',' + (sy3 - 14) + ' ' + w * 0.6 + ',' + (sy3 + 10) + ' ' + w + ',' + (sy3 - 6) + ' L' + w + ',' + h + ' L0,' + h + ' Z', hachure(i2 % 2 ? '#a4753f' : '#b98a4f', 8, -28));
          for (var sp2 = 0; sp2 < 4; sp2++) {
            var spx = w * (0.14 + sp2 * 0.22), spy = sy3 - 4;
            c.strokeStyle = '#4a9a58'; c.lineWidth = 3; c.lineCap = 'round';
            c.beginPath(); c.moveTo(spx, spy); c.lineTo(spx, spy - (14 + i2 * 12)); c.stroke();
            D.ellipse(c, spx - 7, spy - (14 + i2 * 12), 8, 4, -0.5); D.fs(c, '#58b368', 1.8);
            D.ellipse(c, spx + 7, spy - (14 + i2 * 12) - 4, 8, 4, 0.5); D.fs(c, '#58b368', 1.8);
            c.lineCap = 'butt';
          }
        }
        c.font = '700 ' + h * 0.055 + 'px "Baloo 2", sans-serif';
        c.fillStyle = 'rgba(36,39,34,0.5)'; c.textAlign = 'center';
        for (i2 = 0; i2 < 3; i2++) c.fillText(i2 + 1, w * (0.14 + i2 * 0.22), soil - h * 0.13 * (2 - i2) + 30);
        gy = soil + h * 0.34;
      }

      // ---- Still-life arrangement: props STAND on the stage line ----      // Still-life arrangement: each prop STANDS on the near hill, biggest at
      // the left third, contact shadows scaled to mass.
      var gyLine = gy + 52;
      var arr = ARRANGE[course.subject] || ARRANGE.English;
      var icons2 = icons(PYP.actors || {}, D);
      arr.forEach(function (slot, i) {
        var fn = icons2[slot[0]];
        if (!fn) return;
        var x = slot[1] * w, size = Math.round(slot[2] * 1.25);
        var y = gyLine - size * 0.42;
        c.save();
        c.globalAlpha = 0.17; c.fillStyle = '#1a1a1a';
        c.beginPath(); c.ellipse(x, gyLine + 6, size * 0.34, size * 0.09, 0, 0, Math.PI * 2); c.fill();
        c.restore();
        c.save(); c.translate(x, y); c.rotate((i % 2 ? 1 : -1) * 0.04);
        fn(c, size / 2);
        c.restore();
      });
      var vg = c.createRadialGradient(w / 2, h * 0.45, h * 0.35, w / 2, h * 0.5, h * 0.95);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(30,25,10,0.12)');
      c.fillStyle = vg; c.fillRect(0, 0, w, h);
      return true;

      function mulberry(a2) {
        return function () {
          a2 |= 0; a2 = (a2 + 0x6D2B79F5) | 0;
          var t = Math.imul(a2 ^ (a2 >>> 15), 1 | a2);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
      }
    },
  };
})();
