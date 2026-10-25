/* ==========================================================================
   Story actors — the picture-book cast, drawn with canvas code (no emoji).
   Style: flat cel fills + 2.5–3px ink outlines, matching Rough.js scenery.
   Each actor: fn(ctx, u, it) where u = half-size, it = item (opts: cap,
   angry, laugh, spots, kind, girl). Register on PYP.actors.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};
  var INK = '#242722';
  var W3 = 3, W25 = 2.5;

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function fs(ctx, fill, lw) {
    ctx.fillStyle = fill; ctx.fill();
    ctx.lineWidth = lw || W3; ctx.strokeStyle = INK; ctx.stroke();
  }
  function dot(ctx, x, y, r, fill, lw) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); }
  }
  function line(ctx, x1, y1, x2, y2, lw, col) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.lineWidth = lw || 2.2; ctx.strokeStyle = col || INK; ctx.stroke();
  }
  function ellipse(ctx, x, y, rx, ry, rot) {
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot || 0, 0, Math.PI * 2);
  }
  function eyes(ctx, dx, y, r, pupilR) {
    [-1, 1].forEach(function (sd) {
      ellipse(ctx, sd * dx, y, r, r); fs(ctx, '#ffffff', 2);
      dot(ctx, sd * dx + r * 0.2, y, pupilR || r * 0.42);
    });
  }

  var A = {};

  /* ---------------- weather & sky ---------------- */
  A.sun = function (ctx, u) {
    ctx.strokeStyle = INK; ctx.lineWidth = W25;
    for (var i = 0; i < 10; i++) {
      var a = (i / 10) * Math.PI * 2 + 0.15;
      line(ctx, Math.cos(a) * u * 0.62, Math.sin(a) * u * 0.62, Math.cos(a) * u * 0.92, Math.sin(a) * u * 0.92, W25);
    }
    dot(ctx, 0, 0, u * 0.55, '#ffd75e', W3);
    ctx.lineWidth = 2.4;
    [-1, 1].forEach(function (sd) {
      ctx.beginPath(); ctx.arc(sd * u * 0.2, -u * 0.06, u * 0.09, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
    });
    ctx.beginPath(); ctx.arc(0, u * 0.14, u * 0.2, 0.3, Math.PI - 0.3); ctx.stroke();
  };
  A.moon = function (ctx, u) {
    dot(ctx, 0, 0, u * 0.85, '#d8dbe2', W3);
    [[-0.3, -0.25, 0.2], [0.3, 0.05, 0.14], [-0.05, 0.4, 0.11], [0.45, -0.4, 0.09]].forEach(function (cr) {
      ellipse(ctx, cr[0] * u, cr[1] * u, cr[2] * u, cr[2] * u * 0.8); fs(ctx, '#b9bec9', 2.2);
    });
  };
  A.gust = function (ctx, u) {
    ctx.lineCap = 'round';
    for (var i = 0; i < 3; i++) {
      var y = -u * 0.35 + i * u * 0.35;
      ctx.beginPath();
      ctx.moveTo(-u * 0.9, y);
      ctx.quadraticCurveTo(0, y - u * 0.28, u * 0.9, y);
      ctx.lineWidth = W3 - i * 0.4; ctx.strokeStyle = '#8bc8fa'; ctx.stroke();
    }
    ctx.lineCap = 'butt';
  };
  A.snowflake = function (ctx, u) {
    ctx.strokeStyle = '#e8f4ff'; ctx.lineWidth = 2.6;
    for (var i = 0; i < 6; i++) {
      var a = (i / 6) * Math.PI * 2;
      var cx = Math.cos(a), cy = Math.sin(a);
      line(ctx, 0, 0, cx * u, cy * u, 2.6, '#e8f4ff');
      line(ctx, cx * u * 0.55, cy * u * 0.55, cx * u * 0.55 - cy * u * 0.22, cy * u * 0.55 + cx * u * 0.22, 2, '#e8f4ff');
      line(ctx, cx * u * 0.55, cy * u * 0.55, cx * u * 0.55 + cy * u * 0.22, cy * u * 0.55 - cx * u * 0.22, 2, '#e8f4ff');
    }
    dot(ctx, 0, 0, u * 0.14, '#e8f4ff');
  };
  A.confetti = function (ctx, u) {
    var cols = ['#f42324', '#ffd75e', '#4ecdc4', '#b388ff', '#ff9fb2'];
    for (var i = 0; i < 10; i++) {
      var a = (i / 10) * Math.PI * 2;
      var d = u * (0.35 + (i % 3) * 0.22);
      ctx.save();
      ctx.translate(Math.cos(a) * d, Math.sin(a) * d * 0.7);
      ctx.rotate(a * 2);
      rr(ctx, -u * 0.08, -u * 0.14, u * 0.16, u * 0.28, u * 0.05);
      fs(ctx, cols[i % 5], 1.6);
      ctx.restore();
    }
  };
  A.spark = function (ctx, u) {
    ctx.beginPath();
    for (var i = 0; i < 8; i++) {
      var a = (i / 8) * Math.PI * 2;
      var r = i % 2 ? u * 0.32 : u * 0.95;
      var fn2 = i === 0 ? 'moveTo' : 'lineTo';
      ctx[fn2](Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath(); fs(ctx, '#ffd75e', 2.4);
    dot(ctx, 0, 0, u * 0.2, '#fff6d8');
  };
  A.sleepZ = function (ctx, u) {
    ctx.font = '700 ' + u * 0.55 + 'px "Baloo 2", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#8bc8fa'; ctx.strokeStyle = INK; ctx.lineWidth = 2;
    ctx.strokeText('Z', 0, -u * 0.3); ctx.fillText('Z', 0, -u * 0.3);
    ctx.font = '700 ' + u * 0.35 + 'px "Baloo 2", sans-serif';
    ctx.strokeText('z', u * 0.45, u * 0.25); ctx.fillText('z', u * 0.45, u * 0.25);
  };
  A.mountain = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u, u * 0.7); ctx.lineTo(-u * 0.15, -u * 0.85); ctx.lineTo(u * 0.35, u * 0.05); ctx.lineTo(u * 0.6, -u * 0.3); ctx.lineTo(u, u * 0.7);
    ctx.closePath(); fs(ctx, '#9aa5b8');
    ctx.beginPath();
    ctx.moveTo(-u * 0.32, -u * 0.35); ctx.lineTo(-u * 0.15, -u * 0.85); ctx.lineTo(u * 0.02, -u * 0.35);
    ctx.lineTo(-u * 0.06, -u * 0.22); ctx.lineTo(-u * 0.18, -u * 0.38); ctx.closePath(); fs(ctx, '#f2f6ff', 2.2);
  };

  /* ---------------- houses & props ---------------- */
  A.house = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u * 0.88, -u * 0.1); ctx.lineTo(0, -u * 0.95); ctx.lineTo(u * 0.88, -u * 0.1);
    ctx.closePath(); fs(ctx, '#c98a4b');
    ctx.strokeStyle = '#8a5a2f'; ctx.lineWidth = 2.4;
    for (var i = -3; i <= 3; i++) {
      line(ctx, i * u * 0.22, -u * 0.1 - Math.abs(i) * u * 0.02, i * u * 0.22 + u * 0.06, u * 0.1, 2.4, '#8a5a2f');
    }
    rr(ctx, -u * 0.68, -u * 0.12, u * 1.36, u * 1.02, u * 0.08); fs(ctx, '#e9c46a');
    ctx.strokeStyle = 'rgba(36,39,34,0.16)'; ctx.lineWidth = 2;
    for (var hx = -u * 0.5; hx < u * 0.6; hx += u * 0.22) line(ctx, hx, u * 0.05, hx + u * 0.16, u * 0.8, 2, 'rgba(36,39,34,0.16)');
    ctx.beginPath();
    ctx.moveTo(-u * 0.2, u * 0.9); ctx.lineTo(-u * 0.2, u * 0.35);
    ctx.arc(0, u * 0.35, u * 0.2, Math.PI, 0);
    ctx.lineTo(u * 0.2, u * 0.9); ctx.closePath(); fs(ctx, '#6b4a2f', 2.6);
  };
  A.stickHouse = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u * 0.85, -u * 0.1); ctx.lineTo(0, -u * 0.8); ctx.lineTo(u * 0.85, -u * 0.1);
    ctx.closePath(); fs(ctx, '#a9825a');
    line(ctx, -u * 0.6, -u * 0.38, u * 0.6, -u * 0.38, 2.2);
    line(ctx, -u * 0.35, -u * 0.6, u * 0.35, -u * 0.6, 2.2);
    rr(ctx, -u * 0.62, -u * 0.12, u * 1.24, u * 0.92, u * 0.06); fs(ctx, '#d9b98a');
    ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 3;
    for (var i = 0; i < 4; i++) line(ctx, -u * 0.55, -u * 0.02 + i * u * 0.22, u * 0.55, -u * 0.02 + i * u * 0.22, 3, '#8a6a44');
    ctx.beginPath();
    ctx.moveTo(-u * 0.18, u * 0.8); ctx.lineTo(-u * 0.18, u * 0.3);
    ctx.arc(0, u * 0.3, u * 0.18, Math.PI, 0);
    ctx.lineTo(u * 0.18, u * 0.8); ctx.closePath(); fs(ctx, '#5c4028', 2.4);
  };
  A.brickHouse = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u * 0.85, -u * 0.1); ctx.lineTo(0, -u * 0.8); ctx.lineTo(u * 0.85, -u * 0.1);
    ctx.closePath(); fs(ctx, '#b3593f');
    rr(ctx, -u * 0.62, -u * 0.12, u * 1.24, u * 0.94, u * 0.05); fs(ctx, '#d97b5a');
    ctx.strokeStyle = 'rgba(36,39,34,0.35)'; ctx.lineWidth = 1.8;
    for (var row = 0; row < 4; row++) {
      var y = u * 0.02 + row * u * 0.2;
      line(ctx, -u * 0.58, y, u * 0.58, y, 1.8, 'rgba(36,39,34,0.35)');
      var off = row % 2 ? u * 0.2 : 0;
      for (var cx = -u * 0.4 + off; cx < u * 0.55; cx += u * 0.4) line(ctx, cx, y, cx, y + u * 0.2, 1.8, 'rgba(36,39,34,0.35)');
    }
    ctx.beginPath();
    ctx.moveTo(-u * 0.18, u * 0.82); ctx.lineTo(-u * 0.18, u * 0.3);
    ctx.arc(0, u * 0.3, u * 0.18, Math.PI, 0);
    ctx.lineTo(u * 0.18, u * 0.82); ctx.closePath(); fs(ctx, '#4a2e1e', 2.4);
    dot(ctx, u * 0.1, u * 0.58, u * 0.03);
  };
  A.cottage = function (ctx, u) {
    A.house(ctx, u * 0.85);
    dot(ctx, -u * 0.85, u * 0.55, u * 0.1, '#ff9fb2', 1.8);
    dot(ctx, u * 0.88, u * 0.5, u * 0.1, '#ff9fb2', 1.8);
    ctx.font = '600 ' + u * 0.3 + 'px "Baloo 2", sans-serif';
    ctx.fillStyle = '#6b4a2f'; ctx.textAlign = 'center';
    ctx.fillText('HOME', 0, u * 0.62);
  };
  A.village = function (ctx, u) {
    [[-0.55, 0.15, 0.5], [0.05, 0.2, 0.65], [0.55, 0.1, 0.45]].forEach(function (h) {
      ctx.save();
      ctx.translate(h[0] * u, h[1] * u);
      ctx.scale(h[2], h[2]);
      A.house(ctx, u);
      ctx.restore();
    });
  };
  A.door = function (ctx, u) {
    rr(ctx, -u * 0.45, -u * 0.8, u * 0.9, u * 1.6, u * 0.18); fs(ctx, '#8a5a2f');
    ctx.strokeStyle = '#6b4a2f'; ctx.lineWidth = 2;
    line(ctx, 0, -u * 0.72, 0, u * 0.72, 2, '#6b4a2f');
    dot(ctx, -u * 0.18, 0, u * 0.05, '#ffd75e', 1.6);
    dot(ctx, u * 0.18, 0, u * 0.05, '#ffd75e', 1.6);
  };
  A.wall = function (ctx, u) {
    rr(ctx, -u, -u * 0.35, u * 2, u * 0.7, u * 0.06); fs(ctx, '#c9b8a0');
    ctx.strokeStyle = 'rgba(36,39,34,0.3)'; ctx.lineWidth = 1.8;
    line(ctx, -u, 0, u, 0, 1.8, 'rgba(36,39,34,0.3)');
    for (var cx = -u * 0.66; cx < u * 0.9; cx += u * 0.66) {
      line(ctx, cx, -u * 0.35, cx, 0, 1.8, 'rgba(36,39,34,0.3)');
      line(ctx, cx + u * 0.33, 0, cx + u * 0.33, u * 0.35, 1.8, 'rgba(36,39,34,0.3)');
    }
  };
  A.bed = function (ctx, u) {
    rr(ctx, -u * 0.95, -u * 0.1, u * 1.9, u * 0.75, u * 0.12); fs(ctx, '#c98a4b');
    rr(ctx, -u * 0.88, -u * 0.02, u * 1.76, u * 0.5, u * 0.08); fs(ctx, '#f4e3c2', 2.2);
    rr(ctx, -u * 0.78, -u * 0.32, u * 0.55, u * 0.34, u * 0.1); fs(ctx, '#ffffff', 2.2);
    rr(ctx, -u * 0.1, -u * 0.42, u * 0.95, u * 0.5, u * 0.14); fs(ctx, '#ff9fb2', 2.2);
    rr(ctx, u * 0.68, u * 0.55, u * 0.18, u * 0.45, u * 0.05); fs(ctx, '#8a5a2f', 2.2);
    rr(ctx, -u * 0.92, u * 0.55, u * 0.18, u * 0.45, u * 0.05); fs(ctx, '#8a5a2f', 2.2);
  };
  A.porridge = function (ctx, u) {
    ellipse(ctx, 0, u * 0.15, u * 0.9, u * 0.42); fs(ctx, '#e8b46a');
    ctx.beginPath();
    ctx.moveTo(-u * 0.85, u * 0.05);
    ctx.quadraticCurveTo(0, -u * 0.5, u * 0.85, u * 0.05);
    ctx.quadraticCurveTo(0, u * 0.28, -u * 0.85, u * 0.05);
    ctx.closePath(); fs(ctx, '#f6dfb8', 2.2);
    line(ctx, u * 0.95, u * 0.05, u * 1.15, -u * 0.25, 3.4, '#8a5a2f');
  };
  A.soupPot = function (ctx, u) {
    ellipse(ctx, 0, u * 0.1, u * 0.85, u * 0.72); fs(ctx, '#8a8f9a');
    ellipse(ctx, 0, -u * 0.45, u * 0.8, u * 0.24); fs(ctx, '#5c616b', 2.2);
    ellipse(ctx, 0, -u * 0.46, u * 0.62, u * 0.15); fs(ctx, '#e8933f', 2);
    line(ctx, -u * 0.85, 0, -u * 1.05, -u * 0.3, 3.2, '#5c616b');
    line(ctx, u * 0.85, 0, u * 1.05, -u * 0.3, 3.2, '#5c616b');
    dot(ctx, 0, -u * 0.44, u * 0.2, '#f4c07a');
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(-u * 0.15, -u * 0.85, u * 0.16, 0.3, 1.4); ctx.stroke();
  };
  A.basket = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u * 0.8, -u * 0.3);
    ctx.quadraticCurveTo(-u * 0.95, u * 0.55, 0, u * 0.65);
    ctx.quadraticCurveTo(u * 0.95, u * 0.55, u * 0.8, -u * 0.3);
    ctx.closePath(); fs(ctx, '#c98a4b');
    ctx.strokeStyle = '#8a5a2f'; ctx.lineWidth = 2.2;
    line(ctx, -u * 0.7, 0, u * 0.7, 0, 2.2, '#8a5a2f');
    line(ctx, -u * 0.72, u * 0.28, u * 0.72, u * 0.28, 2.2, '#8a5a2f');
    ctx.beginPath();
    ctx.arc(0, -u * 0.3, u * 0.5, Math.PI, 0);
    ctx.lineWidth = W25; ctx.strokeStyle = INK; ctx.stroke();
    dot(ctx, -u * 0.3, -u * 0.45, u * 0.16, '#e26a5a', 1.8);
    dot(ctx, u * 0.28, -u * 0.48, u * 0.14, '#ffd75e', 1.8);
  };
  A.veg = function (ctx, u, it) {
    var kind = (it && it.kind) || 0;
    if (kind === 0) { // carrot
      ctx.beginPath();
      ctx.moveTo(0, u * 0.9);
      ctx.quadraticCurveTo(-u * 0.5, u * 0.1, -u * 0.28, -u * 0.45);
      ctx.lineTo(u * 0.28, -u * 0.45);
      ctx.quadraticCurveTo(u * 0.5, u * 0.1, 0, u * 0.9);
      ctx.closePath(); fs(ctx, '#e8792f');
      line(ctx, -u * 0.22, -u * 0.1, u * 0.18, -u * 0.16, 1.8, 'rgba(36,39,34,0.3)');
      [[-0.15], [0], [0.15]].forEach(function (lx) {
        line(ctx, lx[0] * u, -u * 0.45, lx[0] * u * 1.8, -u * 0.85, 2.4, '#4a9a58');
      });
    } else { // potato
      ellipse(ctx, 0, 0, u * 0.7, u * 0.52, 0.3); fs(ctx, '#c9a06a');
      dot(ctx, -u * 0.2, -u * 0.1, u * 0.05, 'rgba(36,39,34,0.4)');
      dot(ctx, u * 0.18, u * 0.12, u * 0.05, 'rgba(36,39,34,0.4)');
    }
  };
  A.spoon = function (ctx, u) {
    ellipse(ctx, 0, -u * 0.5, u * 0.3, u * 0.42, 0.2); fs(ctx, '#d8d8d2', 2.4);
    rr(ctx, -u * 0.08, -u * 0.15, u * 0.16, u * 1.1, u * 0.08); fs(ctx, '#d8d8d2', 2.4);
  };
  A.stone = function (ctx, u) {
    ellipse(ctx, 0, 0, u * 0.8, u * 0.62, 0.2); fs(ctx, '#9aa0a8');
    ellipse(ctx, -u * 0.2, -u * 0.15, u * 0.28, u * 0.18, 0.4); fs(ctx, '#b8bec6', 1.8);
  };
  A.bag = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u * 0.6, -u * 0.35);
    ctx.quadraticCurveTo(-u * 0.85, u * 0.6, 0, u * 0.75);
    ctx.quadraticCurveTo(u * 0.85, u * 0.6, u * 0.6, -u * 0.35);
    ctx.closePath(); fs(ctx, '#8a6a44');
    line(ctx, -u * 0.6, -u * 0.35, u * 0.6, -u * 0.35, 2.4);
    line(ctx, -u * 0.35, -u * 0.35, -u * 0.35, -u * 0.62, 2.4);
    line(ctx, u * 0.35, -u * 0.35, u * 0.35, -u * 0.62, 2.4);
    line(ctx, -u * 0.35, -u * 0.62, u * 0.35, -u * 0.62, 2.4);
  };
  A.scroll = function (ctx, u) {
    rr(ctx, -u * 0.75, -u * 0.6, u * 1.5, u * 1.2, u * 0.1); fs(ctx, '#f4e3c2', 2.4);
    [-1, 1].forEach(function (sd) {
      rr(ctx, sd * u * 0.75 - u * 0.14, -u * 0.72, u * 0.28, u * 1.44, u * 0.12); fs(ctx, '#c98a4b', 2.2);
    });
    ctx.strokeStyle = 'rgba(36,39,34,0.35)'; ctx.lineWidth = 1.8;
    for (var i = 0; i < 3; i++) line(ctx, -u * 0.5, -u * 0.3 + i * u * 0.3, u * 0.5, -u * 0.3 + i * u * 0.3, 1.8, 'rgba(36,39,34,0.35)');
  };
  A.flag = function (ctx, u) {
    line(ctx, -u * 0.1, u * 0.95, -u * 0.1, -u * 0.95, 4);
    ctx.beginPath();
    ctx.moveTo(-u * 0.1, -u * 0.9);
    ctx.quadraticCurveTo(u * 0.45, -u * 0.75, u * 0.95, -u * 0.55);
    ctx.lineTo(-u * 0.1, -u * 0.2);
    ctx.closePath(); fs(ctx, '#f42324', 2.4);
    line(ctx, -u * 0.35, u * 0.95, u * 0.35, u * 0.95, 3.4);
  };
  A.magnifier = function (ctx, u) {
    dot(ctx, -u * 0.15, -u * 0.15, u * 0.55, 'rgba(190,230,250,0.55)', 3);
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(-u * 0.3, -u * 0.32, u * 0.25, Math.PI * 0.9, Math.PI * 1.4); ctx.stroke();
    line(ctx, u * 0.25, u * 0.25, u * 0.8, u * 0.8, 5.5, '#8a5a2f');
  };
  A.teeth = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u * 0.8, -u * 0.4);
    ctx.quadraticCurveTo(0, -u * 0.7, u * 0.8, -u * 0.4);
    ctx.lineTo(u * 0.55, u * 0.7);
    ctx.lineTo(0, u * 0.15);
    ctx.lineTo(-u * 0.55, u * 0.7);
    ctx.closePath(); fs(ctx, '#ffffff');
    line(ctx, 0, -u * 0.55, 0, u * 0.1, 1.8, 'rgba(36,39,34,0.3)');
  };

  /* ---------------- nature ---------------- */
  A.tree = function (ctx, u) {
    rr(ctx, -u * 0.14, u * 0.05, u * 0.28, u * 0.85, u * 0.06); fs(ctx, '#8a5a2f', 2.4);
    [[0, -0.35, 0.55], [-0.42, 0.0, 0.38], [0.42, 0.0, 0.38], [0, -0.75, 0.34]].forEach(function (c) {
      dot(ctx, c[0] * u, c[1] * u, c[2] * u, '#58a05c', 2.4);
    });
  };
  A.tuft = function (ctx, u) {
    ctx.strokeStyle = '#5c7a44'; ctx.lineWidth = 3;
    for (var i = -2; i <= 2; i++) {
      var a = -Math.PI / 2 + i * 0.28;
      ctx.beginPath();
      ctx.moveTo(0, u * 0.6);
      ctx.quadraticCurveTo(i * u * 0.18, u * 0.05, i * u * 0.34, -u * 0.42);
      ctx.stroke();
      dot(ctx, i * u * 0.34, -u * 0.44, u * 0.06, '#d9b64f');
    }
  };
  A.sprout = function (ctx, u) {
    line(ctx, 0, u * 0.8, 0, u * 0.05, 3, '#4a9a58');
    ctx.beginPath();
    ctx.moveTo(0, u * 0.05);
    ctx.quadraticCurveTo(-u * 0.6, -u * 0.1, -u * 0.5, -u * 0.55);
    ctx.quadraticCurveTo(-u * 0.05, -u * 0.4, 0, u * 0.05);
    ctx.closePath(); fs(ctx, '#58b368', 2.2);
    ctx.beginPath();
    ctx.moveTo(0, u * 0.05);
    ctx.quadraticCurveTo(u * 0.6, -u * 0.1, u * 0.5, -u * 0.55);
    ctx.quadraticCurveTo(u * 0.05, -u * 0.4, 0, u * 0.05);
    ctx.closePath(); fs(ctx, '#4a9a58', 2.2);
  };
  A.lily = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, u * 0.85, 0.42, Math.PI * 2 - 0.42);
    ctx.closePath(); fs(ctx, '#58b368');
    ctx.strokeStyle = 'rgba(36,39,34,0.35)'; ctx.lineWidth = 2;
    for (var i = 1; i <= 3; i++) {
      var a = 0.42 + (i * (Math.PI * 2 - 0.84)) / 4;
      line(ctx, 0, 0, Math.cos(a) * u * 0.7, Math.sin(a) * u * 0.7, 2, 'rgba(36,39,34,0.35)');
    }
    for (var p2 = 0; p2 < 5; p2++) {
      var pa = (p2 / 5) * Math.PI * 2;
      ellipse(ctx, Math.cos(pa) * u * 0.2, -u * 0.85 + Math.sin(pa) * u * 0.12, u * 0.16, u * 0.09, pa); fs(ctx, '#ff9fb2', 2);
    }
    dot(ctx, 0, -u * 0.85, u * 0.07, '#ffd75e');
  };
  A.eggs = function (ctx, u) {
    for (var i = 0; i < 5; i++) {
      var a = (i / 5) * Math.PI * 2;
      ellipse(ctx, Math.cos(a) * u * 0.4, Math.sin(a) * u * 0.3, u * 0.26, u * 0.2, a); fs(ctx, 'rgba(105,180,120,0.5)', 2);
      dot(ctx, Math.cos(a) * u * 0.4, Math.sin(a) * u * 0.3, u * 0.07, '#2e4a36');
    }
  };
  A.legs = function (ctx, u) {
    [-1, 1].forEach(function (sd) {
      ctx.beginPath();
      ctx.moveTo(sd * u * 0.15, -u * 0.3);
      ctx.quadraticCurveTo(sd * u * 0.7, u * 0.1, sd * u * 0.5, u * 0.55);
      ctx.lineWidth = u * 0.22; ctx.lineCap = 'round';
      ctx.strokeStyle = '#4a9a58'; ctx.stroke();
      ellipse(ctx, sd * u * 0.55, u * 0.6, u * 0.2, u * 0.1, sd * 0.4); fs(ctx, '#58b368', 2.2);
    });
    ctx.lineCap = 'butt';
  };
  A.bubbles = function (ctx, u) {
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    for (var i = 0; i < 4; i++) {
      ctx.lineWidth = 2;
      dot(ctx, -u * 0.3 + i * u * 0.22, Math.sin(i * 2.1) * u * 0.3, u * (0.07 + (i % 3) * 0.05), null, 2);
    }
  };
  A.bug = function (ctx, u) {
    ellipse(ctx, 0, 0, u * 0.55, u * 0.42); fs(ctx, '#d97b5a', 2.4);
    line(ctx, 0, -u * 0.4, 0, u * 0.4, 2, INK);
    dot(ctx, -u * 0.16, u * 0.05, u * 0.09, '#8a3a20');
    dot(ctx, u * 0.16, -u * 0.08, u * 0.09, '#8a3a20');
    line(ctx, -u * 0.4, -u * 0.35, -u * 0.6, -u * 0.6, 1.8);
    line(ctx, u * 0.4, -u * 0.35, u * 0.6, -u * 0.6, 1.8);
    dot(ctx, -u * 0.55, -u * 0.62, u * 0.05);
    dot(ctx, u * 0.55, -u * 0.62, u * 0.05);
  };
  A.tadpole = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u * 0.1, 0);
    ctx.bezierCurveTo(-u * 0.5, -u * 0.35, -u * 0.8, u * 0.35, -u * 0.98, -u * 0.1);
    ctx.strokeStyle = '#57493e'; ctx.lineWidth = u * 0.16; ctx.lineCap = 'round';
    ctx.stroke(); ctx.lineCap = 'butt';
    ellipse(ctx, u * 0.22, 0, u * 0.42, u * 0.34); fs(ctx, '#57493e', 2.6);
    dot(ctx, u * 0.3, -u * 0.08, u * 0.08, '#ffffff', 1.6);
    dot(ctx, u * 0.32, -u * 0.08, u * 0.04);
  };
  A.frog = function (ctx, u) {
    ellipse(ctx, 0, u * 0.25, u * 0.72, u * 0.5); fs(ctx, '#58b368');
    ellipse(ctx, 0, u * 0.38, u * 0.44, u * 0.28); fs(ctx, '#a8e0b0', 2);
    [-1, 1].forEach(function (sd) {
      dot(ctx, sd * u * 0.34, -u * 0.34, u * 0.2, '#58b368', 2.6);
      dot(ctx, sd * u * 0.34, -u * 0.34, u * 0.12, '#ffffff', 1.8);
      dot(ctx, sd * u * 0.34, -u * 0.34, u * 0.055);
      ellipse(ctx, sd * u * 0.5, u * 0.68, u * 0.2, u * 0.1, sd * 0.4); fs(ctx, '#4a9a58', 2.4);
    });
    ctx.lineWidth = 2.6; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, u * 0.1, u * 0.34, 0.4, Math.PI - 0.4); ctx.stroke();
  };
  A.earth = function (ctx, u) {
    dot(ctx, 0, 0, u * 0.85, '#3f9edb', W3);
    [[-0.25, -0.2, 0.32], [0.3, 0.1, 0.26], [-0.1, 0.45, 0.2]].forEach(function (lb) {
      ellipse(ctx, lb[0] * u, lb[1] * u, lb[2] * u, lb[2] * u * 0.7, 0.4); fs(ctx, '#4caf6d', 2);
    });
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(-u * 0.2, -u * 0.3, u * 0.3, 0.4, 1.6); ctx.stroke();
  };
  A.satellite = function (ctx, u) {
    rr(ctx, -u * 0.25, -u * 0.35, u * 0.5, u * 0.7, u * 0.1); fs(ctx, '#d8d8d2', 2.4);
    dot(ctx, 0, 0, u * 0.1, '#38b6ff', 1.8);
    [-1, 1].forEach(function (sd) {
      line(ctx, sd * u * 0.25, 0, sd * u * 0.45, 0, 2.4);
      rr(ctx, sd * u * 0.45 - (sd < 0 ? u * 0.4 : 0), -u * 0.3, u * 0.4, u * 0.6, u * 0.04); fs(ctx, '#38b6ff', 2.2);
    });
    line(ctx, 0, -u * 0.35, 0, -u * 0.65, 2.2);
    dot(ctx, 0, -u * 0.72, u * 0.07, '#ffd75e');
  };
  A.lavaFlow = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(-u * 0.7, -u * 0.5);
    ctx.quadraticCurveTo(-u * 0.2, u * 0.1, -u * 0.45, u * 0.8);
    ctx.lineTo(-u * 0.05, u * 0.5);
    ctx.quadraticCurveTo(u * 0.2, u * 0.9, u * 0.5, u * 0.4);
    ctx.quadraticCurveTo(u * 0.55, -u * 0.3, u * 0.15, -u * 0.55);
    ctx.closePath(); fs(ctx, '#ff6a1f', 2.6);
    ctx.strokeStyle = '#ffd75e'; ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-u * 0.4, -u * 0.3);
    ctx.quadraticCurveTo(-u * 0.15, u * 0.2, -u * 0.25, u * 0.55);
    ctx.stroke();
  };
  A.prints = function (ctx, u) {
    for (var i = 0; i < 3; i++) {
      var x = (i - 1) * u * 0.55, y = i * u * 0.18;
      ellipse(ctx, x, y, u * 0.16, u * 0.24, 0.2); fs(ctx, 'rgba(60,70,90,0.5)', 1.6);
      line(ctx, x - u * 0.12, y - u * 0.2, x - u * 0.2, y - u * 0.3, 2, 'rgba(60,70,90,0.5)');
      line(ctx, x, y - u * 0.26, x, y - u * 0.38, 2, 'rgba(60,70,90,0.5)');
      line(ctx, x + u * 0.12, y - u * 0.2, x + u * 0.2, y - u * 0.3, 2, 'rgba(60,70,90,0.5)');
    }
  };
  A.rocket = function (ctx, u) {
    ctx.beginPath();
    ctx.moveTo(0, -u * 0.95);
    ctx.quadraticCurveTo(u * 0.45, -u * 0.3, u * 0.32, u * 0.5);
    ctx.lineTo(-u * 0.32, u * 0.5);
    ctx.quadraticCurveTo(-u * 0.45, -u * 0.3, 0, -u * 0.95);
    ctx.closePath(); fs(ctx, '#f4f4f0');
    dot(ctx, 0, -u * 0.3, u * 0.16, '#38b6ff', 2.2);
    ctx.beginPath();
    ctx.moveTo(u * 0.32, u * 0.1); ctx.lineTo(u * 0.62, u * 0.55); ctx.lineTo(u * 0.32, u * 0.5);
    ctx.closePath(); fs(ctx, '#f42324', 2.2);
    ctx.beginPath();
    ctx.moveTo(-u * 0.32, u * 0.1); ctx.lineTo(-u * 0.62, u * 0.55); ctx.lineTo(-u * 0.32, u * 0.5);
    ctx.closePath(); fs(ctx, '#f42324', 2.2);
    rr(ctx, -u * 0.22, u * 0.5, u * 0.44, u * 0.28, u * 0.06); fs(ctx, '#c9c9c2', 2.2);
    ctx.strokeStyle = '#ffd75e'; ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(0, u * 0.8); ctx.lineTo(-u * 0.14, u * 1.05); ctx.lineTo(0, u * 1.18); ctx.lineTo(u * 0.14, u * 1.05);
    ctx.closePath(); ctx.fillStyle = '#ffd75e'; ctx.fill();
  };

  /* ---------------- animals ---------------- */
  A.pig = function (ctx, u) {
    [-1, 1].forEach(function (sd) {
      rr(ctx, sd * u * 0.42 - u * 0.12, u * 0.52, u * 0.24, u * 0.3, u * 0.1); fs(ctx, '#ef9db5', 2.6);
      ctx.beginPath();
      ctx.moveTo(sd * u * 0.5, -u * 0.42); ctx.lineTo(sd * u * 0.72, -u * 0.72); ctx.lineTo(sd * u * 0.22, -u * 0.66);
      ctx.closePath(); fs(ctx, '#f28cae', 2.6);
    });
    ellipse(ctx, 0, u * 0.18, u * 0.8, u * 0.62); fs(ctx, '#f6b3c7');
    ellipse(ctx, 0, u * 0.1, u * 0.36, u * 0.26); fs(ctx, '#f28cae', 2.6);
    dot(ctx, -u * 0.13, u * 0.1, u * 0.045);
    dot(ctx, u * 0.13, u * 0.1, u * 0.045);
    eyes(ctx, u * 0.34, -u * 0.22, u * 0.11);
    ctx.lineWidth = 2.4; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, u * 0.16, u * 0.16, 0.35, Math.PI - 0.35); ctx.stroke();
    ctx.globalAlpha = 0.4; dot(ctx, -u * 0.56, -u * 0.02, u * 0.09, '#e26a92'); dot(ctx, u * 0.56, -u * 0.02, u * 0.09, '#e26a92');
    ctx.globalAlpha = 1;
  };
  A.wolf = function (ctx, u, it) {
    if (it && it.cap) {
      ctx.beginPath();
      ctx.moveTo(-u * 0.15, -u * 0.85); ctx.lineTo(u * 0.4, -u * 1.1); ctx.lineTo(u * 0.5, -u * 0.6);
      ctx.closePath(); fs(ctx, '#f4e3c2', 2.2);
      dot(ctx, u * 0.44, -u * 1.1, u * 0.12, '#ffd75e', 2);
    }
    ctx.save();
    ctx.rotate(0.06);
    ellipse(ctx, u * 0.1, u * 0.15, u * 0.82, u * 0.52, -0.08); fs(ctx, '#8d93a3');
    ctx.beginPath();
    ctx.moveTo(-u * 0.6, u * 0.1); ctx.quadraticCurveTo(-u * 1.05, -u * 0.15, -u * 0.95, -u * 0.5);
    ctx.quadraticCurveTo(-u * 0.7, -u * 0.3, -u * 0.5, -u * 0.25);
    ctx.closePath(); fs(ctx, '#767c8c', 2.4);
    ellipse(ctx, u * 0.6, -u * 0.1, u * 0.4, u * 0.32, 0.15); fs(ctx, '#8d93a3');
    dot(ctx, u * 0.88, -u * 0.06, u * 0.1, INK);
    ellipse(ctx, u * 0.78, u * 0.08, u * 0.14, u * 0.1); fs(ctx, '#4a4f5c', 2);
    [-1, 1].forEach(function (sd) {
      ctx.beginPath();
      ctx.moveTo(u * 0.35 + sd * u * 0.12, -u * 0.35); ctx.lineTo(u * 0.3 + sd * u * 0.3, -u * 0.75); ctx.lineTo(u * 0.5 + sd * u * 0.08, -u * 0.4);
      ctx.closePath(); fs(ctx, '#767c8c', 2.2);
    });
    eyes(ctx, u * 0.5, -u * 0.2, u * 0.09, u * 0.045);
    [-1, 1].forEach(function (sd) {
      rr(ctx, sd * u * 0.4 - u * 0.1, u * 0.55, u * 0.2, u * 0.32, u * 0.08); fs(ctx, '#767c8c', 2.4);
    });
    ctx.restore();
  };
  A.bear = function (ctx, u) {
    [-1, 1].forEach(function (sd) {
      dot(ctx, sd * u * 0.52, -u * 0.55, u * 0.22, '#b98a5a', 2.6);
      dot(ctx, sd * u * 0.6, -u * 0.35, u * 0.1, '#f4d0a4', 1.8);
    });
    ellipse(ctx, 0, u * 0.2, u * 0.78, u * 0.62); fs(ctx, '#b98a5a');
    ellipse(ctx, 0, u * 0.35, u * 0.44, u * 0.34); fs(ctx, '#e8caa0', 2.2);
    ellipse(ctx, 0, -u * 0.15, u * 0.5, u * 0.42); fs(ctx, '#c99a68');
    ellipse(ctx, 0, u * 0.02, u * 0.2, u * 0.14); fs(ctx, '#8a6a44', 2);
    dot(ctx, -u * 0.06, u * 0.0, u * 0.035);
    dot(ctx, u * 0.06, u * 0.0, u * 0.035);
    eyes(ctx, u * 0.2, -u * 0.28, u * 0.08, u * 0.04);
    ctx.lineWidth = 2.2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, u * 0.06, u * 0.1, 0.3, Math.PI - 0.3); ctx.stroke();
  };
  A.sheep = function (ctx, u) {
    for (var i = 0; i < 6; i++) {
      var a = (i / 6) * Math.PI * 2;
      dot(ctx, Math.cos(a) * u * 0.45, u * 0.15 + Math.sin(a) * u * 0.3, u * 0.26, '#f4f0e6', 2.2);
    }
    ellipse(ctx, 0, u * 0.2, u * 0.6, u * 0.45); fs(ctx, '#f4f0e6');
    ellipse(ctx, u * 0.62, u * 0.0, u * 0.26, u * 0.24); fs(ctx, '#e8d9c0', 2.4);
    dot(ctx, u * 0.72, -u * 0.02, u * 0.04);
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(u * 0.62, u * 0.1, u * 0.08, 0.2, Math.PI - 0.2); ctx.stroke();
    [-1, 1].forEach(function (sd) {
      line(ctx, sd * u * 0.25, u * 0.6, sd * u * 0.25, u * 0.85, 3, '#4a3a2a');
    });
  };
  A.shark = function (ctx, u, it) {
    ctx.save();
    ctx.rotate(0.05);
    ellipse(ctx, u * 0.05, u * 0.1, u * 0.85, u * 0.42, -0.06); fs(ctx, '#7d93a8');
    ctx.beginPath();
    ctx.moveTo(-u * 0.25, -u * 0.28); ctx.lineTo(-u * 0.05, -u * 0.75); ctx.lineTo(u * 0.2, -u * 0.26);
    ctx.closePath(); fs(ctx, '#6a8298', 2.4);
    ctx.beginPath();
    ctx.moveTo(-u * 0.75, u * 0.05); ctx.lineTo(-u * 1.1, -u * 0.4); ctx.lineTo(-u * 0.95, u * 0.12);
    ctx.closePath(); fs(ctx, '#6a8298', 2.4);
    ctx.beginPath();
    ctx.moveTo(-u * 0.75, u * 0.12); ctx.lineTo(-u * 1.05, u * 0.45); ctx.lineTo(-u * 0.8, u * 0.3);
    ctx.closePath(); fs(ctx, '#6a8298', 2.4);
    ctx.beginPath();
    ctx.moveTo(u * 0.15, u * 0.28);
    ctx.quadraticCurveTo(u * 0.05, u * 0.6, -u * 0.4, u * 0.42);
    ctx.quadraticCurveTo(u * 0.1, u * 0.28, u * 0.15, u * 0.28);
    ctx.closePath(); fs(ctx, '#e8eef4', 2);
    dot(ctx, u * 0.68, -u * 0.08, u * 0.07);
    ctx.beginPath(); ctx.arc(u * 0.66, -u * 0.12, u * 0.12, 0.3, 1.2); ctx.lineWidth = 2; ctx.stroke();
    for (var g = 0; g < 3; g++) line(ctx, u * 0.3 - g * u * 0.14, -u * 0.1, u * 0.3 - g * u * 0.14, u * 0.15, 1.8, 'rgba(36,39,34,0.35)');
    ctx.beginPath();
    ctx.moveTo(u * 0.85, u * 0.02);
    ctx.lineTo(u * 0.72, u * 0.16); ctx.lineTo(u * 0.85, u * 0.14);
    ctx.lineTo(u * 0.97, u * 0.16);
    ctx.closePath(); fs(ctx, '#ffffff', 2);
    if (it && it.spots) {
      for (var sp = 0; sp < 8; sp++) {
        dot(ctx, -u * 0.6 + (sp % 4) * u * 0.3, -u * 0.05 + Math.floor(sp / 4) * u * 0.22, u * 0.05, '#5d7488');
        dot(ctx, -u * 0.6 + (sp % 4) * u * 0.3, -u * 0.05 + Math.floor(sp / 4) * u * 0.22, u * 0.05, 'rgba(255,255,255,0.6)');
      }
    }
    ctx.restore();
  };
  A.fish = function (ctx, u) {
    ellipse(ctx, u * 0.1, 0, u * 0.55, u * 0.34); fs(ctx, '#ff9fb2', 2.4);
    ctx.beginPath();
    ctx.moveTo(-u * 0.35, 0); ctx.lineTo(-u * 0.7, -u * 0.3); ctx.lineTo(-u * 0.7, u * 0.3);
    ctx.closePath(); fs(ctx, '#e26a92', 2.2);
    dot(ctx, u * 0.38, -u * 0.06, u * 0.06);
    ctx.strokeStyle = 'rgba(36,39,34,0.3)'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.arc(u * 0.05, 0, u * 0.18, -0.9, 0.9); ctx.stroke();
  };
  A.krill = function (ctx, u) {
    ctx.strokeStyle = '#ff9fb2'; ctx.lineWidth = u * 0.22; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-u * 0.5, u * 0.2);
    ctx.quadraticCurveTo(0, -u * 0.5, u * 0.5, u * 0.05);
    ctx.stroke(); ctx.lineCap = 'butt';
    dot(ctx, u * 0.55, 0, u * 0.16, '#ff9fb2', 2);
    dot(ctx, u * 0.6, -u * 0.04, u * 0.035);
  };
  A.tortoise = function (ctx, u) {
    ellipse(ctx, -u * 0.75, u * 0.05, u * 0.24, u * 0.18); fs(ctx, '#7a9b56', 2.4);
    dot(ctx, -u * 0.88, 0, u * 0.045);
    [-1, 1].forEach(function (sd) {
      ellipse(ctx, sd * u * 0.25, u * 0.5, u * 0.18, u * 0.12, sd * 0.4); fs(ctx, '#7a9b56', 2.2);
    });
    ctx.beginPath();
    ctx.moveTo(-u * 0.8, u * 0.15);
    ctx.quadraticCurveTo(0, -u * 0.85, u * 0.8, u * 0.15);
    ctx.quadraticCurveTo(0, u * 0.45, -u * 0.8, u * 0.15);
    ctx.closePath(); fs(ctx, '#5c8a4a');
    line(ctx, -u * 0.35, -u * 0.05, u * 0.35, -u * 0.05, 2, 'rgba(36,39,34,0.35)');
    line(ctx, 0, -u * 0.42, 0, u * 0.3, 2, 'rgba(36,39,34,0.35)');
    ctx.lineWidth = 2.2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(-u * 0.78, u * 0.1, u * 0.06, 0.2, Math.PI - 0.2); ctx.stroke();
  };
  A.hare = function (ctx, u) {
    [-1, 1].forEach(function (sd) {
      ellipse(ctx, sd * u * 0.18, -u * 0.72, u * 0.14, u * 0.38, sd * 0.15); fs(ctx, '#f4f0e6', 2.4);
      ellipse(ctx, sd * u * 0.18, -u * 0.72, u * 0.06, u * 0.26, sd * 0.15); fs(ctx, '#ffb8c8', 1.6);
    });
    ellipse(ctx, 0, u * 0.1, u * 0.52, u * 0.5); fs(ctx, '#f4f0e6');
    dot(ctx, 0, u * 0.2, u * 0.14, '#ffb8c8', 1.8);
    ellipse(ctx, u * 0.45, -u * 0.25, u * 0.28, u * 0.24); fs(ctx, '#f4f0e6', 2.4);
    eyes(ctx, u * 0.5, -u * 0.32, u * 0.075, u * 0.035);
    ctx.lineWidth = 2.2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(u * 0.45, -u * 0.14, u * 0.08, 0.2, Math.PI - 0.2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-u * 0.5, u * 0.25); ctx.quadraticCurveTo(-u * 0.85, u * 0.0, -u * 0.75, -u * 0.35);
    ctx.closePath(); fs(ctx, '#f4f0e6', 2.2);
    ellipse(ctx, u * 0.3, u * 0.58, u * 0.3, u * 0.12, 0.2); fs(ctx, '#f4f0e6', 2.2);
  };

  /* ---------------- people ---------------- */
  function kidBody(ctx, u, shirt) {
    [-1, 1].forEach(function (sd) {
      rr(ctx, sd * u * 0.3 - u * 0.09, u * 0.55, u * 0.18, u * 0.34, u * 0.08); fs(ctx, '#4a6a9a', 2.4);
    });
    rr(ctx, -u * 0.42, -u * 0.05, u * 0.84, u * 0.68, u * 0.16); fs(ctx, shirt, 2.6);
  }
  A.boy = function (ctx, u) {
    kidBody(ctx, u, '#e8792f');
    [-1, 1].forEach(function (sd) {
      ctx.save(); ctx.translate(sd * u * 0.45, u * 0.15); ctx.rotate(sd * 0.4);
      rr(ctx, -u * 0.08, 0, u * 0.16, u * 0.4, u * 0.07); fs(ctx, '#e8792f', 2.4);
      ctx.restore();
    });
    dot(ctx, 0, -u * 0.5, u * 0.36, '#f4c07a', 2.6);
    ctx.beginPath();
    ctx.arc(0, -u * 0.62, u * 0.36, Math.PI * 1.05, Math.PI * 1.95);
    ctx.closePath(); fs(ctx, '#8a5a2f', 2.2);
    eyes(ctx, u * 0.14, -u * 0.5, u * 0.06, u * 0.03);
    ctx.lineWidth = 2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, -u * 0.4, u * 0.09, 0.3, Math.PI - 0.3); ctx.stroke();
    ctx.globalAlpha = 0.4; dot(ctx, -u * 0.26, -u * 0.38, u * 0.06, '#e26a92'); dot(ctx, u * 0.26, -u * 0.38, u * 0.06, '#e26a92');
    ctx.globalAlpha = 1;
  };
  A.girl = function (ctx, u) {
    kidBody(ctx, u, '#4ecdc4');
    ctx.beginPath();
    ctx.moveTo(-u * 0.42, u * 0.62);
    ctx.quadraticCurveTo(0, u * 0.95, u * 0.42, u * 0.62);
    ctx.lineTo(u * 0.42, u * 0.3); ctx.lineTo(-u * 0.42, u * 0.3);
    ctx.closePath(); fs(ctx, '#4ecdc4', 2.4);
    dot(ctx, 0, -u * 0.5, u * 0.36, '#f4c07a', 2.6);
    ctx.beginPath();
    ctx.arc(0, -u * 0.45, u * 0.42, Math.PI * 0.85, Math.PI * 2.15);
    ctx.closePath(); fs(ctx, '#ffd75e', 2.4);
    [-1, 1].forEach(function (sd) {
      ctx.beginPath();
      ctx.arc(sd * u * 0.42, -u * 0.3, u * 0.14, 0, Math.PI * 2);
      fs(ctx, '#ffd75e', 2.2);
    });
    eyes(ctx, u * 0.14, -u * 0.5, u * 0.06, u * 0.03);
    ctx.lineWidth = 2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, -u * 0.4, u * 0.09, 0.3, Math.PI - 0.3); ctx.stroke();
    ctx.globalAlpha = 0.4; dot(ctx, -u * 0.26, -u * 0.38, u * 0.06, '#e26a92'); dot(ctx, u * 0.26, -u * 0.38, u * 0.06, '#e26a92');
    ctx.globalAlpha = 1;
  };
  A.redRiding = function (ctx, u) {
    kidBody(ctx, u, '#f4f0e6');
    ctx.beginPath();
    ctx.moveTo(-u * 0.42, u * 0.62);
    ctx.quadraticCurveTo(0, u * 0.95, u * 0.42, u * 0.62);
    ctx.lineTo(u * 0.42, u * 0.3); ctx.lineTo(-u * 0.42, u * 0.3);
    ctx.closePath(); fs(ctx, '#4a6a9a', 2.4);
    dot(ctx, 0, -u * 0.5, u * 0.36, '#f4c07a', 2.6);
    ctx.beginPath();
    ctx.moveTo(-u * 0.5, -u * 0.05);
    ctx.quadraticCurveTo(-u * 0.55, -u * 0.75, 0, -u * 0.78);
    ctx.quadraticCurveTo(u * 0.55, -u * 0.75, u * 0.5, -u * 0.05);
    ctx.quadraticCurveTo(u * 0.3, -u * 0.28, 0, -u * 0.26);
    ctx.quadraticCurveTo(-u * 0.3, -u * 0.28, -u * 0.5, -u * 0.05);
    ctx.closePath(); fs(ctx, '#e03e3e', 2.6);
    eyes(ctx, u * 0.13, -u * 0.42, u * 0.06, u * 0.03);
    ctx.lineWidth = 2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, -u * 0.32, u * 0.08, 0.3, Math.PI - 0.3); ctx.stroke();
  };
  A.grandma = function (ctx, u) {
    rr(ctx, -u * 0.5, -u * 0.1, u, u * 1.0, u * 0.14); fs(ctx, '#9a8bb5', 2.6);
    dot(ctx, 0, -u * 0.5, u * 0.36, '#f4c07a', 2.6);
    ctx.beginPath();
    ctx.arc(0, -u * 0.45, u * 0.42, Math.PI * 0.9, Math.PI * 2.1);
    ctx.closePath(); fs(ctx, '#e8e3ea', 2.4);
    dot(ctx, 0, -u * 0.82, u * 0.16, '#e8e3ea', 2.2);
    [-1, 1].forEach(function (sd) {
      ctx.beginPath();
      ctx.arc(sd * u * 0.15, -u * 0.48, u * 0.11, 0, Math.PI * 2);
      fs(ctx, 'rgba(255,255,255,0.7)', 2);
    });
    eyes(ctx, u * 0.15, -u * 0.48, u * 0.05, u * 0.025);
    ctx.lineWidth = 2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, -u * 0.36, u * 0.08, 0.3, Math.PI - 0.3); ctx.stroke();
  };
  function adultBody(ctx, u, shirt) {
    [-1, 1].forEach(function (sd) {
      rr(ctx, sd * u * 0.3 - u * 0.1, u * 0.6, u * 0.2, u * 0.36, u * 0.08); fs(ctx, '#4a3a2a', 2.4);
    });
    rr(ctx, -u * 0.45, -u * 0.1, u * 0.9, u * 0.78, u * 0.16); fs(ctx, shirt, 2.6);
  }
  A.villager = function (ctx, u, it) {
    adultBody(ctx, u, (it && it.girl) ? '#b388ff' : '#6a8a5a');
    dot(ctx, 0, -u * 0.55, u * 0.34, '#f4c07a', 2.6);
    eyes(ctx, u * 0.13, -u * 0.56, u * 0.055, u * 0.028);
    ctx.lineWidth = 2; ctx.strokeStyle = INK;
    if (it && it.angry) {
      line(ctx, -u * 0.2, -u * 0.68, -u * 0.05, -u * 0.62, 2.2);
      line(ctx, u * 0.2, -u * 0.68, u * 0.05, -u * 0.62, 2.2);
      ctx.beginPath(); ctx.arc(0, -u * 0.3, u * 0.08, Math.PI + 0.4, Math.PI * 2 - 0.4); ctx.stroke();
    } else if (it && it.laugh) {
      ctx.beginPath(); ctx.arc(0, -u * 0.44, u * 0.12, 0.2, Math.PI - 0.2); ctx.closePath(); fs(ctx, INK, 1);
      ctx.fillStyle = INK; ctx.fill();
    } else {
      ctx.beginPath(); ctx.arc(0, -u * 0.44, u * 0.08, 0.3, Math.PI - 0.3); ctx.stroke();
    }
  };
  A.woodcutter = function (ctx, u) {
    adultBody(ctx, u, '#c9533f');
    dot(ctx, 0, -u * 0.55, u * 0.34, '#f4c07a', 2.6);
    ctx.beginPath();
    ctx.arc(0, -u * 0.62, u * 0.36, Math.PI, Math.PI * 2);
    ctx.closePath(); fs(ctx, '#e8792f', 2.2);
    eyes(ctx, u * 0.13, -u * 0.55, u * 0.055, u * 0.028);
    ctx.lineWidth = 2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, -u * 0.44, u * 0.08, 0.3, Math.PI - 0.3); ctx.stroke();
    ctx.save();
    ctx.translate(u * 0.6, u * 0.1); ctx.rotate(0.5);
    line(ctx, 0, -u * 0.5, 0, u * 0.5, 3.4, '#8a5a2f');
    ctx.beginPath();
    ctx.moveTo(-u * 0.08, -u * 0.5); ctx.quadraticCurveTo(u * 0.35, -u * 0.72, u * 0.3, -u * 0.35);
    ctx.quadraticCurveTo(u * 0.1, -u * 0.4, -u * 0.08, -u * 0.3);
    ctx.closePath(); fs(ctx, '#c9c9c2', 2.2);
    ctx.restore();
  };
  A.traveller = function (ctx, u, it) {
    adultBody(ctx, u, (it && it.girl) ? '#4ecdc4' : '#8a7ab5');
    dot(ctx, 0, -u * 0.55, u * 0.34, '#f4c07a', 2.6);
    ctx.beginPath();
    ctx.moveTo(-u * 0.4, -u * 0.72);
    ctx.quadraticCurveTo(0, -u * 1.02, u * 0.4, -u * 0.72);
    ctx.quadraticCurveTo(0, -u * 0.62, -u * 0.4, -u * 0.72);
    ctx.closePath(); fs(ctx, '#c9a06a', 2.4);
    eyes(ctx, u * 0.13, -u * 0.55, u * 0.055, u * 0.028);
    ctx.lineWidth = 2; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.arc(0, -u * 0.44, u * 0.08, 0.3, Math.PI - 0.3); ctx.stroke();
    line(ctx, -u * 0.55, -u * 0.4, -u * 0.62, u * 0.7, 3, '#8a5a2f');
  };
  A.astronaut = function (ctx, u) {
    rr(ctx, -u * 0.55, -u * 0.5, u * 1.1, u * 0.7, u * 0.12); fs(ctx, '#d8d8d2', 2.6);
    [-1, 1].forEach(function (sd) {
      rr(ctx, sd * u * 0.34 - u * 0.14, u * 0.35, u * 0.28, u * 0.5, u * 0.1); fs(ctx, '#f4f4f0', 2.6);
      rr(ctx, sd * u * 0.34 - u * 0.17, u * 0.72, u * 0.34, u * 0.2, u * 0.08); fs(ctx, '#c9c9c2', 2.4);
    });
    rr(ctx, -u * 0.5, -u * 0.28, u, u * 0.75, u * 0.16); fs(ctx, '#f4f4f0');
    dot(ctx, 0, u * 0.08, u * 0.09, '#f42324');
    [-1, 1].forEach(function (sd) {
      ctx.save(); ctx.translate(sd * u * 0.55, -u * 0.05); ctx.rotate(sd * 0.5);
      rr(ctx, -u * 0.12, 0, u * 0.24, u * 0.55, u * 0.1); fs(ctx, '#f4f4f0', 2.6);
      ctx.restore();
    });
    dot(ctx, 0, -u * 0.55, u * 0.42, '#ffffff', W3);
    dot(ctx, 0, -u * 0.55, u * 0.32, '#27405e', 2.2);
    ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(-u * 0.08, -u * 0.6, u * 0.18, Math.PI * 0.9, Math.PI * 1.5); ctx.stroke();
  };

  PYP.actors = A;
  PYP.draw = { rr: rr, fs: fs, dot: dot, line: line, ellipse: ellipse, INK: INK };
})();
