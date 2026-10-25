/* ==========================================================================
   PYP Marble Courses — concept-lab scenes (canvas 2D, crafted flat style)
   Each scene: { dials, render(ctx, w, h, vals), readout(vals), exploreHint }
   Style: flat colors, dark outlines, soft ground shadows — 2D Marble look.
   Scenes teach one relationship each; dials are the variables of that
   relationship. Cases (in the course payload) set dial targets to predict.
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  var INK = '#242722';
  var SCENES = {};

  /* ---------- shared illustration helpers ---------- */
  function rr(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function fillStroke(ctx, fill, lw) {
    ctx.fillStyle = fill; ctx.fill();
    ctx.lineWidth = lw || 3; ctx.strokeStyle = INK; ctx.stroke();
  }
  function shadow(ctx, x, y, w) {
    ctx.save();
    ctx.fillStyle = 'rgba(20,20,20,0.12)';
    ctx.beginPath();
    ctx.ellipse(x, y, w, w * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  function emoji(ctx, ch, x, y, size) {
    ctx.save();
    ctx.font = size + 'px "Baloo 2", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(ch, x, y);
    ctx.restore();
  }
  function label(ctx, text, x, y, size, color) {
    ctx.save();
    ctx.font = '600 ' + (size || 16) + 'px "Baloo 2", sans-serif';
    ctx.fillStyle = color || INK;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }
  function sky(ctx, w, h, top, bottom) {
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, top); g.addColorStop(1, bottom);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  function ground(ctx, w, h, y, color) {
    ctx.fillStyle = color || '#b5e48c';
    ctx.fillRect(0, y, w, h - y);
    ctx.lineWidth = 3; ctx.strokeStyle = INK;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  /* ---------- 1. fractions: pizza partitioner ---------- */
  SCENES.fractions = {
    dials: [
      { id: 'parts', label: 'Equal parts', min: 1, max: 12, step: 1, initial: 4 },
      { id: 'shaded', label: 'Parts taken', min: 0, max: 12, step: 1, initial: 1 }
    ],
    readout: function (v) {
      var p = Math.max(1, v.parts | 0), s = Math.min(v.shaded | 0, p);
      return s + '/' + p + ' of the pizza is taken';
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#fdeedd', '#f9d9b8');
      ground(ctx, w, h, h * 0.82, '#e8c99b');
      var cx = w / 2, cy = h * 0.46, R = Math.min(w, h) * 0.34;
      var parts = Math.max(1, v.parts | 0);
      var shaded = Math.min(v.shaded | 0, parts);
      shadow(ctx, cx, cy + R + 10, R * 0.95);
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      fillStroke(ctx, '#f7b84a', 4);
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R - 4, 0, Math.PI * 2); ctx.clip();
      for (var i = 0; i < shaded; i++) {
        var a0 = (i / parts) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R - 4, a0, a0 + Math.PI * 2 / parts);
        ctx.closePath(); ctx.fillStyle = '#e4573d'; ctx.fill();
      }
      ctx.restore();
      for (var j = 0; j < parts; j++) {
        var a = (j / parts) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke();
      emoji(ctx, '🍕', cx, cy, R * 0.5);
    }
  };

  /* ---------- 2. counters: two groups ---------- */
  SCENES.counters = {
    dials: [
      { id: 'a', label: 'Red apples', min: 0, max: 10, step: 1, initial: 3 },
      { id: 'b', label: 'Green apples', min: 0, max: 10, step: 1, initial: 2 }
    ],
    readout: function (v) { return (v.a | 0) + ' + ' + (v.b | 0) + ' = ' + ((v.a | 0) + (v.b | 0)); },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#e3f2fd', '#cbe8f6');
      ground(ctx, w, h, h * 0.8);
      var n = Math.max(v.a | 0, 1), m = Math.max(v.b | 0, 1);
      var boxW = w * 0.38, gap = w * 0.06, bx = (w - boxW * 2 - gap) / 2, by = h * 0.3, bh = h * 0.44;
      [[bx, v.a | 0, '🍎'], [bx + boxW + gap, v.b | 0, '🍏']].forEach(function (box) {
        rr(ctx, box[0], by, boxW, bh, 14); fillStroke(ctx, '#ffffff', 3.5);
        var count = box[1];
        var cols = Math.ceil(Math.sqrt(count)) || 1;
        for (var i = 0; i < count; i++) {
          var cx = box[0] + boxW * ((i % cols) + 0.5) / cols;
          var cy = by + bh * (Math.floor(i / cols) + 0.5) / Math.ceil(count / cols);
          emoji(ctx, box[2], cx, cy, Math.min(34, boxW / cols - 6));
        }
      });
      label(ctx, '+', bx + boxW + gap / 2, by + bh / 2, 40);
    }
  };

  /* ---------- 3. array: rows × columns ---------- */
  SCENES.array = {
    dials: [
      { id: 'rows', label: 'Rows', min: 1, max: 6, step: 1, initial: 2 },
      { id: 'cols', label: 'In each row', min: 1, max: 8, step: 1, initial: 4 }
    ],
    readout: function (v) { return (v.rows | 0) + ' rows of ' + (v.cols | 0) + ' = ' + ((v.rows | 0) * (v.cols | 0)) + ' eggs'; },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#fff7e0', '#ffe9b3');
      ground(ctx, w, h, h * 0.85, '#e8c99b');
      var rows = v.rows | 0, cols = v.cols | 0;
      var cw = Math.min(w * 0.8 / cols, h * 0.6 / rows, 64);
      var x0 = w / 2 - cols * cw / 2, y0 = h * 0.42 - rows * cw / 2;
      for (var r = 0; r < rows; r++) {
        rr(ctx, x0, y0 + r * cw, cols * cw, cw, 10);
        fillStroke(ctx, '#ffffff', 3);
        for (var c = 0; c < cols; c++) emoji(ctx, '🥚', x0 + (c + 0.5) * cw, y0 + (r + 0.5) * cw, cw * 0.52);
      }
    }
  };

  /* ---------- 4. placevalue: base-10 blocks (to 9,999 with Dienes cubes) ---------- */
  function bigCube(ctx, x, yBase, s, fill) {
    var d = s * 0.22;
    ctx.beginPath();
    ctx.moveTo(x + d, yBase - s - d); ctx.lineTo(x + s + d, yBase - s - d);
    ctx.lineTo(x + s, yBase - s); ctx.lineTo(x, yBase - s);
    ctx.closePath(); fillStroke(ctx, fill, 2);
    ctx.beginPath();
    ctx.moveTo(x + s, yBase - s); ctx.lineTo(x + s + d, yBase - s - d);
    ctx.lineTo(x + s + d, yBase - d); ctx.lineTo(x + s, yBase);
    ctx.closePath(); fillStroke(ctx, fill, 2);
    rr(ctx, x, yBase - s, s, s, 3); fillStroke(ctx, fill, 2.5);
    ctx.strokeStyle = 'rgba(36,39,34,.3)'; ctx.lineWidth = 1;
    for (var g = 1; g < 5; g++) {
      ctx.beginPath(); ctx.moveTo(x + (s * g) / 5, yBase - s); ctx.lineTo(x + (s * g) / 5, yBase); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, yBase - s + (s * g) / 5); ctx.lineTo(x + s, yBase - s + (s * g) / 5); ctx.stroke();
    }
  }
  /* Column dials: each place has its OWN control, so the blocks respond
     independently — one slider for the whole number was too coarse. */
  function pvPaint(ctx, w, h, v, hasTh) {
    return pvPaintInner.call(null, ctx, w, h, v, hasTh);
  }
  function pvPaintInner(ctx, w, h, v, hasTh) {
      sky(ctx, w, h, '#eef7ff', '#d9ecff');
      ground(ctx, w, h, h * 0.86, '#cfe3f7');
      var thousands = hasTh ? (v.th | 0) : 0, hundreds = v.h | 0, tens = v.t | 0, ones = v.o | 0;
      var big = thousands > 0;
      // Everything must fit at the WORST count (9 of each), so block size
      // flexes with how many columns are actually in play.
      var u = Math.min(h * 0.16, 52, big ? 34 : 52);
      var x0 = w * 0.05, y = h * 0.74;
      if (big) {
        var cs = u * 1.55;
        for (var k = 0; k < thousands && k < 9; k++) {
          bigCube(ctx, x0 + k * (cs + u * 0.32), y - u * 2.1, cs, '#5aa9e6');
        }
        label(ctx, 'thousands', x0 + Math.min(thousands, 9) * (cs + u * 0.32) / 2, h * 0.88, 14, '#626262');
        y = h * 0.8;
      }
      var rodsUnitsW = u * 2 + u * 0.6 + 3 * (u * 0.5 + 4) + u * 0.6;
      var avail = w * 0.95 - x0 - rodsUnitsW;
      var hc = Math.max(1, Math.min(hundreds, 9));
      var fu = Math.min(u, (avail - 4 * hc) / (2 * hc));
      var fy = big ? y - fu * 2 : y - fu * 2;
      for (var i = 0; i < hundreds && i < 9; i++) {
        var fx = x0 + i * (fu * 2 + 4);
        rr(ctx, fx, fy, fu * 2, fu * 2, 4); fillStroke(ctx, '#8ecdf5', 2.5);
        ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(36,39,34,.5)';
        ctx.strokeRect(fx + fu, fy, 1, fu * 2);
      }
      var x3 = x0 + hc * (fu * 2 + 4) + u * 0.6;
      for (var t = 0; t < tens; t++) {
        rr(ctx, x3, y - fu + t * (fu * 0.28), fu * 2, fu * 0.24, 3); fillStroke(ctx, '#f7a8c4', 2.2);
      }
      var x4 = x3 + fu * 2 + u * 0.6;
      for (var o = 0; o < ones; o++) {
        var ox = x4 + (o % 3) * (u * 0.5 + 4), oy = y - u * 0.5 - Math.floor(o / 3) * (u * 0.5 + 4);
        rr(ctx, ox, oy, u * 0.46, u * 0.46, 3); fillStroke(ctx, '#ffe156', 2.2);
      }
      var labY = h * (big ? 0.92 : 0.83);
      label(ctx, 'hundreds', x0 + hc * (fu * 2 + 4) / 2, labY, 14, '#626262');
      label(ctx, 'tens', x3 + fu, labY, 14, '#626262');
      label(ctx, 'ones', x4 + u * 0.7, labY, 14, '#626262');
  }
  function pvReadout(v, hasTh) {
    var th = hasTh ? (v.th | 0) : 0, hu = v.h | 0, te = v.t | 0, on = v.o | 0;
    var n = th * 1000 + hu * 100 + te * 10 + on;
    var parts = [];
    if (th) parts.push(th + (th === 1 ? ' thousand' : ' thousands'));
    if (hu) parts.push(hu + (hu === 1 ? ' hundred' : ' hundreds'));
    if (te) parts.push(te + (te === 1 ? ' ten' : ' tens'));
    if (on) parts.push(on + (on === 1 ? ' one' : ' ones'));
    return n.toLocaleString() + ' = ' + (parts.length ? parts.join(' + ') : 'zero');
  }
  SCENES.placevalue = {
    dials: [
      { id: 'h', label: 'Hundreds', min: 0, max: 9, step: 1, initial: 2 },
      { id: 't', label: 'Tens', min: 0, max: 9, step: 1, initial: 5 },
      { id: 'o', label: 'Ones', min: 0, max: 9, step: 1, initial: 4 },
    ],
    readout: function (v) { return pvReadout(v, false); },
    render: function (ctx, w, h, v) { pvPaint(ctx, w, h, v, false); },
  };
  SCENES.placevalue2 = {
    dials: [
      { id: 'th', label: 'Thousands', min: 0, max: 9, step: 1, initial: 1 },
      { id: 'h', label: 'Hundreds', min: 0, max: 9, step: 1, initial: 2 },
      { id: 't', label: 'Tens', min: 0, max: 9, step: 1, initial: 0 },
      { id: 'o', label: 'Ones', min: 0, max: 9, step: 1, initial: 5 },
    ],
    readout: function (v) { return pvReadout(v, true); },
    render: function (ctx, w, h, v) { pvPaint(ctx, w, h, v, true); },
  };

  /* ---------- 4b. pvchart: place-value digit chart (to 9,999,999) ---------- */
  var PV_COLS = [
    { id: 'm', short: 'M', full: 'millions', mult: 1000000, color: '#5aa9e6' },
    { id: 'hth', short: 'HTh', full: 'hundred thousands', mult: 100000, color: '#7db8ea' },
    { id: 'tth', short: 'TTh', full: 'ten thousands', mult: 10000, color: '#8ecdf5' },
    { id: 'th', short: 'Th', full: 'thousands', mult: 1000, color: '#a8d8f7' },
    { id: 'h', short: 'H', full: 'hundreds', mult: 100, color: '#f7a8c4' },
    { id: 't', short: 'T', full: 'tens', mult: 10, color: '#ffb3c8' },
    { id: 'o', short: 'O', full: 'ones', mult: 1, color: '#ffe156' },
  ];
  SCENES.pvchart = {
    dials: PV_COLS.map(function (c) {
      return { id: c.id, label: c.full[0].toUpperCase() + c.full.slice(1), min: 0, max: 9, step: 1, initial: 0 };
    }),
    readout: function (v) {
      var n = 0;
      PV_COLS.forEach(function (c) { n += (v[c.id] | 0) * c.mult; });
      return n.toLocaleString('en-US') + ' — every digit is worth its place';
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#eef7ff', '#d9ecff');
      ground(ctx, w, h, h * 0.86, '#cfe3f7');
      var cols = PV_COLS.length;
      var card = Math.min(w * 0.105, 64), gap = Math.min(14, (w * 0.9 - cols * card) / (cols - 1));
      var total = cols * card + (cols - 1) * gap;
      var x0 = (w - total) / 2;
      var cy = h * 0.3, ch = card * 1.15;
      PV_COLS.forEach(function (c, i) {
        var x = x0 + i * (card + gap);
        var digit = v[c.id] | 0;
        label(ctx, c.short, x + card / 2, cy - card * 0.55, 15, '#4a5560');
        ctx.globalAlpha = digit === 0 ? 0.45 : 1;
        rr(ctx, x, cy, card, ch, 10);
        fillStroke(ctx, digit === 0 ? '#ffffff' : c.color, 3);
        ctx.font = '700 ' + Math.round(card * 0.72) + 'px "Baloo 2", sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = INK;
        ctx.fillText(String(digit), x + card / 2, cy + ch / 2 + 2);
        ctx.globalAlpha = 1;
        label(ctx, '×' + c.mult.toLocaleString('en-US'), x + card / 2, cy + ch + 18, 11, '#626262');
      });
      var n = 0;
      PV_COLS.forEach(function (c) { n += (v[c.id] | 0) * c.mult; });
      ctx.font = '700 ' + Math.round(h * 0.085) + 'px "Baloo 2", sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#242722';
      ctx.fillText(n.toLocaleString('en-US'), w / 2, h * 0.72);
      label(ctx, 'read it: millions · thousands · ones', w / 2, h * 0.8, 13, '#626262');
    },
    air: function (ctx, w, h, v, t) {
      driftDots(ctx, w, h, t, '#8ecdf5', 6, 0.5);
    },
  };

  /* ---------- 5. counting: counting jar ---------- */
  SCENES.counting = {
    dials: [{ id: 'n', label: 'How many cookies', min: 0, max: 20, step: 1, initial: 7 }],
    readout: function (v) { return (v.n | 0) + ' cookies in the jar'; },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#fdf3ff', '#f3d9f7');
      ground(ctx, w, h, h * 0.84, '#e5c8ea');
      var cx = w / 2, jarW = Math.min(w * 0.4, h * 0.7), jarH = h * 0.52;
      var jx = cx - jarW / 2, jy = h * 0.78 - jarH;
      rr(ctx, jx, jy, jarW, jarH, 22); fillStroke(ctx, '#e8f4ffcc', 4);
      rr(ctx, cx - jarW * 0.3, jy - jarH * 0.09, jarW * 0.6, jarH * 0.14, 8); fillStroke(ctx, '#f7b84a', 3);
      var n = v.n | 0, cols = 4;
      for (var i = 0; i < n; i++) {
        var px = jx + jarW * ((i % cols) + 0.5) / cols;
        var py = jy + jarH - 14 - Math.floor(i / cols) * (jarH * 0.16) - jarH * 0.05;
        emoji(ctx, '🍪', px, py, Math.min(jarW / cols - 6, jarH * 0.15));
      }
    }
  };

  /* ---------- 6. shape: polygon explorer ---------- */
  var SHAPE_NAMES = { 3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon' };
  SCENES.shape = {
    dials: [{ id: 'sides', label: 'Sides', min: 3, max: 10, step: 1, initial: 5 }],
    readout: function (v) {
      var s = v.sides | 0;
      return 'A ' + (SHAPE_NAMES[s] || s + '-gon') + ' has ' + s + ' sides';
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#fffbe8', '#ffefad');
      ground(ctx, w, h, h * 0.85, '#efe3ae');
      var s = v.sides | 0, cx = w / 2, cy = h * 0.45, R = Math.min(w, h) * 0.3;
      shadow(ctx, cx, cy + R * 0.85, R * 0.9);
      ctx.beginPath();
      for (var i = 0; i <= s; i++) {
        var a = (i / s) * Math.PI * 2 - Math.PI / 2;
        var x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      fillStroke(ctx, '#4ECDC4', 4);
      for (var k = 0; k < s; k++) {
        var aa = (k / s) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath(); ctx.arc(cx + Math.cos(aa) * R, cy + Math.sin(aa) * R, 7, 0, Math.PI * 2);
        fillStroke(ctx, '#f42324', 2.5);
      }
      label(ctx, s + ' corners', cx, cy, 22);
    }
  };

  /* ---------- 7. measure: ruler ---------- */
  SCENES.measure = {
    dials: [{ id: 'cm', label: 'Pencil length', min: 1, max: 30, step: 1, unit: 'cm', initial: 8 }],
    readout: function (v) { return 'The pencil is ' + (v.cm | 0) + ' cm long'; },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#f4f9ff', '#dfeeff');
      ground(ctx, w, h, h * 0.86, '#cfe3f7');
      var y = h * 0.7, x0 = w * 0.06, x1 = w * 0.94;
      rr(ctx, x0, y, x1 - x0, h * 0.14, 8); fillStroke(ctx, '#ffe9b3', 3.5);
      var span = x1 - x0 - 20, cm0 = 30;
      for (var i = 0; i <= cm0; i++) {
        var tx = x0 + 10 + (i / cm0) * span;
        var tall = i % 5 === 0;
        ctx.beginPath(); ctx.moveTo(tx, y); ctx.lineTo(tx, y + (tall ? 18 : 10));
        ctx.lineWidth = tall ? 2.5 : 1.5; ctx.strokeStyle = INK; ctx.stroke();
        if (tall) label(ctx, String(i), tx, y + 30, 11, '#626262');
      }
      var len = v.cm | 0, px = x0 + 10 + (len / cm0) * span;
      var py = y - 34;
      rr(ctx, x0 + 10, py, px - x0 - 10, 26, 10); fillStroke(ctx, '#f7b84a', 3);
      ctx.beginPath(); ctx.moveTo(px - 14, py); ctx.lineTo(px, py + 13); ctx.lineTo(px - 14, py + 26);
      fillStroke(ctx, '#f4d0a4', 2.5);
      ctx.beginPath();
      ctx.moveTo(x0 + 10, py - 16); ctx.lineTo(px, py - 16);
      ctx.lineTo(px - 8, py - 10); ctx.moveTo(px, py - 16); ctx.lineTo(px - 8, py - 22);
      ctx.lineWidth = 2.5; ctx.strokeStyle = '#f42324'; ctx.stroke();
      label(ctx, len + ' cm', (x0 + 10 + px) / 2, py - 30, 16, '#f42324');
    }
  };

  /* ---------- 8. databar: bar chart builder ---------- */
  SCENES.databar = {
    dials: [
      { id: 'apples', label: 'Apples votes', min: 0, max: 10, step: 1, initial: 7 },
      { id: 'bananas', label: 'Bananas votes', min: 0, max: 10, step: 1, initial: 4 },
      { id: 'grapes', label: 'Grapes votes', min: 0, max: 10, step: 1, initial: 5 },
      { id: 'strawberries', label: 'Strawberry votes', min: 0, max: 10, step: 1, initial: 4 }
    ],
    readout: function (v) {
      var vals = [v.apples | 0, v.bananas | 0, v.grapes | 0, v.strawberries | 0];
      var names = ['Apples', 'Bananas', 'Grapes', 'Strawberries'];
      var best = vals.indexOf(Math.max.apply(null, vals));
      return names[best] + ' are winning with ' + vals[best];
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#f6fff2', '#e2f6d8');
      ground(ctx, w, h, h * 0.84, '#b5e48c');
      var names = ['🍎', '🍌', '🍇', '🍓'];
      var vals = [v.apples | 0, v.bananas | 0, v.grapes | 0, v.strawberries | 0];
      var base = h * 0.8, bw = w * 0.14, gap = w * 0.06, x0 = w / 2 - (bw * 4 + gap * 3) / 2;
      for (var i = 0; i < 4; i++) {
        var x = x0 + i * (bw + gap);
        var bh = (vals[i] / 10) * (base - h * 0.22);
        if (vals[i] > 0) { rr(ctx, x, base - bh, bw, bh, 6); fillStroke(ctx, '#4ECDC4', 3); }
        ctx.beginPath(); ctx.moveTo(x - 4, base); ctx.lineTo(x + bw + 4, base);
        ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
        emoji(ctx, names[i], x + bw / 2, base + 24, 24);
        if (vals[i] > 0) label(ctx, String(vals[i]), x + bw / 2, base - bh - 14, 16);
      }
    }
  };

  /* ---------- 9. pattern: bead machine ---------- */
  SCENES.pattern = {
    dials: [
      { id: 'start', label: 'Start number', min: 0, max: 12, step: 1, initial: 2 },
      { id: 'step', label: 'Jump size', min: 1, max: 6, step: 1, initial: 3 }
    ],
    readout: function (v) {
      var out = [];
      for (var i = 0; i < 5; i++) out.push((v.start | 0) + i * (v.step | 0));
      return out.join(', ') + ', …';
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#fff4f4', '#ffdfe0');
      ground(ctx, w, h, h * 0.84, '#f7c8cc');
      var colors = ['#f42324', '#fdae1c', '#4ECDC4', '#B388FF', '#86EFAC'];
      var n = 6, cw = Math.min(w * 0.85 / n, 74);
      var x0 = w / 2 - (n - 1) * cw / 2, cy = h * 0.45;
      for (var i = 0; i < n; i++) {
        var x = x0 + i * cw;
        var num = (v.start | 0) + i * (v.step | 0);
        ctx.beginPath(); ctx.arc(x, cy, cw * 0.36, 0, Math.PI * 2);
        fillStroke(ctx, colors[i % colors.length], 3.5);
        label(ctx, String(num), x, cy, cw * 0.4, '#ffffff');
        if (i < n - 1) {
          ctx.beginPath();
          ctx.moveTo(x + cw * 0.42, cy); ctx.lineTo(x + cw * 0.58, cy);
          ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke();
        }
      }
      label(ctx, 'add ' + (v.step | 0) + ' each jump', w / 2, cy + cw * 0.75, 17, '#626262');
    }
  };

  /* ---------- 10. sound: drum force + tightness ---------- */
  SCENES.sound = {
    dials: [
      { id: 'force', label: 'Hit softly ↔ hard', min: 1, max: 5, step: 1, initial: 3 },
      { id: 'tight', label: 'Loose ↔ tight skin', min: 1, max: 5, step: 1, initial: 3 }
    ],
    readout: function (v) {
      var vol = ['', 'very quiet', 'quiet', 'medium', 'loud', 'very loud'][v.force | 0];
      var pitch = ['', 'very low', 'low', 'medium', 'high', 'very high'][v.tight | 0];
      return 'Volume: ' + vol + ' · Pitch: ' + pitch;
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#2a3350', '#141b30');
      var cx = w * 0.36, cy = h * 0.55, R = Math.min(w, h) * 0.26;
      shadow(ctx, cx, cy + R * 0.9, R);
      ctx.beginPath();
      ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.lineTo(cx + R * 0.8, cy + R * 0.9); ctx.lineTo(cx - R * 0.8, cy + R * 0.9);
      ctx.closePath(); fillStroke(ctx, '#a05a2c', 3.5);
      ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.32, 0, 0, Math.PI * 2);
      fillStroke(ctx, '#f4e3c2', 3.5);
      var f = v.force | 0;
      for (var i = 0; i < f * 3; i++) {
        var a = Math.random() * Math.PI * 2;
        var dist = R * (0.25 + 0.6 * Math.random()) * (0.4 + f * 0.14);
        var rx = cx + Math.cos(a) * dist, ry = cy + Math.sin(a) * dist * 0.32 - 8 - Math.random() * f * 6;
        ctx.save(); ctx.fillStyle = '#fff'; ctx.beginPath();
        ctx.arc(rx, ry, 2.6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      var stickX = cx + R * 0.55 - f * 4, stickY = cy - 26 + f * 5;
      ctx.save(); ctx.translate(stickX, stickY); ctx.rotate(-0.7 + f * 0.1);
      rr(ctx, 0, -3, 66, 6, 3); fillStroke(ctx, '#d9a066', 2.5);
      ctx.restore();
      var wx = w * 0.72, wmid = h * 0.45, amp = 8 + f * 9, freq = 3 + v.tight * 1.6;
      ctx.beginPath();
      for (var x = wx - w * 0.2; x <= wx + w * 0.2; x += 2) {
        var yy = wmid + Math.sin((x - (wx - w * 0.2)) / w * freq * Math.PI * 2) * amp;
        x === wx - w * 0.2 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      ctx.lineWidth = 4; ctx.strokeStyle = '#8bc8fa'; ctx.stroke();
      label(ctx, '🔊', wx, wmid - 46, 26);
      label(ctx, 'the wave you hear', wx, h * 0.86, 15, '#9fb6d9');
    }
  };

  /* ---------- 11. light: torch & shadow on a bright wall ---------- */
  SCENES.light = {
    dials: [
      { id: 'dist', label: 'Torch distance', min: 1, max: 5, step: 1, initial: 2 },
      { id: 'size', label: 'Object size', min: 1, max: 4, step: 1, initial: 2 }
    ],
    readout: function (v) {
      var d = v.dist | 0, s = v.size | 0;
      if (d <= 2 && s >= 3) return 'Close torch + big object → a LONG, dark shadow';
      if (d >= 4 && s <= 2) return 'Far torch + small object → a short, faint shadow';
      return 'Shadow length: ' + Math.round(90 * s * (6 - d) / 3) + ' cm';
    },
    air: function (ctx, w, h, v, t) {
      // dust motes drifting inside the light beam
      ctx.save();
      var objX = w * 0.5, gy = h * 0.78, s = v.size | 0, d = v.dist | 0;
      var torchX = objX - (d + 1) * w * 0.075 - 20;
      for (var i = 0; i < 7; i++) {
        var seed = i * 61.7;
        var px = torchX + ((seed * 3.1 + t * 11) % (objX - torchX));
        var py = h * 0.3 + ((seed * 1.9 + t * 6) % (gy - h * 0.3));
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#fff6d8';
        ctx.beginPath(); ctx.arc(px, py, 2.4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    },
    render: function (ctx, w, h, v) {
      // Bright daytime room: the shadow lands on a LIGHT wall, so it reads.
      sky(ctx, w, h, '#fdf3d8', '#f7e3b0');
      var gy = h * 0.78;
      ground(ctx, w, h, gy, '#e2c893');
      var s = v.size | 0, d = v.dist | 0;
      var objX = w * 0.5, objH = 60 + s * 30, objW = 36 + s * 12;
      var wallX = w * 0.8;
      // Wall (light cream, outlined)
      ctx.beginPath();
      ctx.moveTo(wallX, 0); ctx.lineTo(w, 0); ctx.lineTo(w, gy); ctx.lineTo(wallX, gy);
      ctx.closePath(); ctx.fillStyle = '#fff8ec'; ctx.fill();
      ctx.lineWidth = 3.5; ctx.strokeStyle = INK; ctx.stroke();
      var torchX = objX - (d + 1) * w * 0.075 - 20;
      var torchY = gy - 70;
      // Light beam: torch → past the object onto the wall (translucent warm)
      var spreadTop = gy - objH - 30, spreadBot = gy - 6;
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(torchX + 46, torchY - 6);
      ctx.lineTo(wallX, Math.max(10, spreadTop - 60));
      ctx.lineTo(wallX, gy);
      ctx.lineTo(torchX + 46, torchY + 26);
      ctx.closePath();
      ctx.fillStyle = '#ffe9a8'; ctx.fill();
      ctx.restore();
      // Torch body
      rr(ctx, torchX - 12, torchY - 12, 48, 24, 9); fillStroke(ctx, '#f4e3c2', 3);
      ctx.beginPath(); ctx.moveTo(torchX + 34, torchY - 19); ctx.lineTo(torchX + 34, torchY + 31); ctx.lineTo(torchX + 62, torchY + 6);
      ctx.closePath(); fillStroke(ctx, '#ffd75e', 3);
      var glow = 0.35 + Math.sin((v.__t || 0) * 3) * 0.1;
      ctx.save(); ctx.globalAlpha = glow;
      ctx.beginPath(); ctx.arc(torchX + 62, torchY + 6, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#fff3a3'; ctx.fill(); ctx.restore();
      // Object (teal blocker)
      shadow(ctx, objX, gy + 6, objW);
      rr(ctx, objX - objW / 2, gy - objH, objW, objH, 8); fillStroke(ctx, '#4ECDC4', 3.5);
      // Projected shadow on the wall: silhouette scaled by torch distance
      var scale = 1 + (5 - d) * 0.28 + s * 0.12;
      var shH = objH * scale, shW = objW * scale;
      var shCenterY = gy - objH / 2;
      var darkness = Math.max(0.18, 0.75 - d * 0.12);
      ctx.save();
      ctx.globalAlpha = darkness;
      rr(ctx, wallX + 14, shCenterY - shH / 2, Math.min(shW, w - wallX - 30), Math.min(shH, gy - 14), 10);
      ctx.fillStyle = '#1f3d3a'; ctx.fill();
      ctx.restore();
      label(ctx, 'shadow', wallX + 14 + Math.min(shW, w - wallX - 30) / 2, gy + 20, 14, '#6b5b32');
      // Size markers
      label(ctx, (90 * s * (6 - d) / 3).toFixed(0) + ' cm', wallX + 20, shCenterY - shH / 2 - 14, 15, '#8a5a2f');
    }
  };

  /* ---------- 12. forces: ramp & car ---------- */
  SCENES.forces = {
    dials: [
      { id: 'height', label: 'Ramp height', min: 0, max: 5, step: 1, initial: 3 },
      { id: 'surface', label: 'Bumpy ↔ smooth', min: 0, max: 4, step: 1, initial: 2 }
    ],
    readout: function (v) {
      var dist = Math.round((v.height | 0) * 18 * (1 - (v.surface | 0) * 0.18));
      return 'The car rolls about ' + Math.max(dist, 0) + ' cm';
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#e8f7ff', '#cfeaff');
      var gy = h * 0.82;
      ground(ctx, w, h, gy, '#b5e48c');
      var hgt = (v.height | 0) / 5, rampH = hgt * h * 0.4;
      var x0 = w * 0.1, x1 = w * 0.42;
      ctx.beginPath();
      ctx.moveTo(x0, gy - rampH); ctx.lineTo(x1, gy); ctx.lineTo(x0, gy);
      ctx.closePath(); fillStroke(ctx, '#d9a066', 3.5);
      var carX = x0 + (1 - hgt) * 20 + 24, carY = gy - rampH - 12;
      if (v.height === 0) { carX = x0 + 24; carY = gy - 12; }
      ctx.save(); ctx.translate(carX, carY); ctx.rotate(hgt * 0.42);
      rr(ctx, -26, -14, 52, 20, 8); fillStroke(ctx, '#f42324', 3);
      ctx.beginPath(); ctx.arc(-14, 8, 8, 0, Math.PI * 2); fillStroke(ctx, '#242722', 2.5);
      ctx.beginPath(); ctx.arc(14, 8, 8, 0, Math.PI * 2); fillStroke(ctx, '#242722', 2.5);
      ctx.restore();
      var rough = v.surface | 0;
      for (var i = 0; i < 8; i++) {
        var sx = x1 + 20 + i * (w * 0.5 / 8);
        ctx.beginPath();
        ctx.moveTo(sx, gy); ctx.lineTo(sx + 8, gy - rough * 2.4);
        ctx.lineWidth = 2.4; ctx.strokeStyle = '#7a9b56'; ctx.stroke();
      }
      emoji(ctx, '🏎️', x1 + w * 0.24, gy - 40, 34);
    }
  };

  /* ---------- 13. circuit: batteries & bulbs ---------- */
  SCENES.circuit = {
    dials: [
      { id: 'bat', label: 'Batteries', min: 1, max: 4, step: 1, initial: 2 },
      { id: 'bulbs', label: 'Bulbs', min: 1, max: 3, step: 1, initial: 1 }
    ],
    readout: function (v) {
      var power = (v.bat | 0) / (v.bulbs | 0);
      var glow = power >= 2 ? 'bright' : power >= 1 ? 'glowing' : 'dim';
      return 'The bulb(s) are ' + glow;
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#fffde9', '#fff3b8');
      var cx = w / 2, cy = h * 0.5, rw = w * 0.56, rh = h * 0.5;
      ctx.lineWidth = 5; ctx.strokeStyle = INK;
      rr(ctx, cx - rw / 2, cy - rh / 2, rw, rh, 12); ctx.stroke();
      var bat = v.bat | 0, bulbs = v.bulbs | 0;
      var bw = Math.min(56, rw / (bat + 1));
      for (var i = 0; i < bat; i++) {
        var bx = cx - (bat * (bw + 8) - 8) / 2 + i * (bw + 8);
        rr(ctx, bx, cy - bw * 0.28, bw, bw * 0.56, 4); fillStroke(ctx, '#ffe156', 2.8);
        label(ctx, '+', bx + bw - 9, cy, 13);
      }
      for (var b = 0; b < bulbs; b++) {
        var ang = Math.PI / 2 + (b - (bulbs - 1) / 2) * 0.55;
        var gx = cx + Math.cos(ang) * rw / 2, gyy = cy + Math.sin(ang) * rh / 2;
        var power = bat / bulbs;
        var glowR = 12 + Math.min(power, 2.5) * 9;
        ctx.beginPath(); ctx.arc(gx, gyy, glowR, 0, Math.PI * 2);
        fillStroke(ctx, power >= 2 ? '#fff3a3' : '#f5f0dc', 3);
        for (var r = 0; r < 8; r++) {
          var ra = (r / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(gx + Math.cos(ra) * (glowR + 4), gyy + Math.sin(ra) * (glowR + 4));
          ctx.lineTo(gx + Math.cos(ra) * (glowR + 12 + power * 4), gyy + Math.sin(ra) * (glowR + 12 + power * 4));
          ctx.lineWidth = 2.4; ctx.strokeStyle = '#fdae1c'; ctx.stroke();
        }
      }
      label(ctx, '⚡', cx, cy, 26);
    }
  };

  /* ---------- 14. states: temperature ---------- */
  SCENES.states = {
    dials: [{ id: 'temp', label: 'Temperature', min: -20, max: 120, step: 1, unit: '°C', initial: 40 }],
    readout: function (v) {
      var t = v.temp | 0;
      return t < 0 ? 'Solid ice ❄️' : t === 0 ? 'Melting point' : t < 100 ? 'Liquid water 💧' : t === 100 ? 'Boiling!' : 'Steam ☁️';
    },
    render: function (ctx, w, h, v) {
      var t = v.temp | 0;
      sky(ctx, w, h, t > 60 ? '#ffe3c2' : t < 0 ? '#dff1ff' : '#e8f7ff', t > 60 ? '#ffd3a1' : t < 0 ? '#c3e4ff' : '#cfeaff');
      ground(ctx, w, h, h * 0.84, t < 0 ? '#eaf6ff' : '#b5e48c');
      var cx = w / 2;
      rr(ctx, cx - 40, h * 0.3, 80, h * 0.4, 14); fillStroke(ctx, '#ffffffee', 3.5);
      var fill = t <= 0 ? 1 : t < 100 ? 1 - (t / 100) * 0.75 : 0.2;
      var fh = h * 0.36 * fill;
      rr(ctx, cx - 32, h * 0.7 - fh, 64, fh, 10);
      ctx.fillStyle = t <= 0 ? '#a8dcf7' : '#4aa8e8'; ctx.fill();
      ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
      if (t < 0) {
        for (var i = 0; i < 5; i++) emoji(ctx, '❄️', cx - 26 + (i % 3) * 24, h * 0.44 + Math.floor(i / 3) * 26, 20);
      } else if (t < 100) {
        emoji(ctx, '💧', cx, h * 0.52, 30);
      } else {
        for (var s = 0; s < 4; s++) emoji(ctx, '☁️', cx - 60 + s * 40, h * 0.2 + (s % 2) * 22, 30);
        emoji(ctx, '🔥', cx, h * 0.76, 32);
      }
      label(ctx, t + '°C', cx, h * 0.24, 26);
    }
  };

  /* ---------- 15. numberline: frog hops (signed jumps) ---------- */
  SCENES.numberline = {
    dials: [
      { id: 'start', label: 'Start at', min: 0, max: 14, step: 1, initial: 2 },
      { id: 'step', label: 'Jump (back = negative)', min: -6, max: 6, step: 1, initial: 3 }
    ],
    readout: function (v) {
      var seq = [];
      for (var i = 0; i < 4; i++) seq.push((v.start | 0) + i * (v.step | 0));
      return seq.join(', ') + '…';
    },
    air: function (ctx, w, h, v, t) {
      // lily pads bob gently
      ctx.save();
      for (var i = 0; i < 3; i++) {
        var x = w * (0.2 + i * 0.3), y = h * 0.16 + Math.sin(t * 1.4 + i * 2) * 4;
        ctx.beginPath(); ctx.ellipse(x, y, 26, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#9fd48a'; ctx.fill();
        ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.stroke();
      }
      ctx.restore();
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#e8f7ff', '#c9ecff');
      ground(ctx, w, h, h * 0.86, '#a8d98a');
      var rng2 = v.__range || { lo: -2, hi: 20 };
      var lo = rng2.lo, hi = rng2.hi;
      var x0 = w * 0.07, x1 = w * 0.93, y = h * 0.62;
      var span = x1 - x0;
      function X(n) { return x0 + ((n - lo) / (hi - lo)) * span; }
      // line
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y);
      ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke();
      var tickRaw = Math.max(1, (hi - lo) / 12);
      var tickPow = Math.pow(10, Math.floor(Math.log(tickRaw) / Math.LN10));
      var tickM = tickRaw / tickPow;
      var tickStep = (tickM <= 1 ? 1 : tickM <= 2 ? 2 : tickM <= 5 ? 5 : 10) * tickPow;
      tickStep = Math.max(1, Math.round(tickStep));
      for (var n = Math.ceil(lo); n <= hi; n += tickStep) {
        var tx = X(n);
        ctx.beginPath(); ctx.moveTo(tx, y - 7); ctx.lineTo(tx, y + 7);
        ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.stroke();
        label(ctx, String(n), tx, y + 22, 13);
      }
      // hop arcs from start
      var start = v.start | 0, step = v.step | 0;
      ctx.lineWidth = 3.5; ctx.strokeStyle = '#f42324';
      for (var k = 0; k < 3; k++) {
        var a = start + k * step, b = a + step;
        if (Math.min(a, b) < lo || Math.max(a, b) > hi) continue;
        var ax = X(a), bx = X(b);
        var mid = (ax + bx) / 2, top = y - 26 - Math.abs(step) * 4.5;
        ctx.beginPath();
        ctx.moveTo(ax, y - 4);
        ctx.quadraticCurveTo(mid, top, bx, y - 4);
        // arrowhead
        var dir = step >= 0 ? 1 : -1;
        ctx.moveTo(bx, y - 4); ctx.lineTo(bx - dir * 9, y - 12); ctx.moveTo(bx, y - 4); ctx.lineTo(bx - dir * 9, y + 3);
        ctx.stroke();
      }
      var fx = X(start), bob = Math.sin((v.__t || 0) * 2.4) * 3;
      emoji(ctx, '🐸', fx, y - 40 + bob, 34);
      var land = start + step * 3;
      if (land >= lo && land <= hi) {
        ctx.beginPath(); ctx.arc(X(land), y - 3, 6, 0, Math.PI * 2);
        fillStroke(ctx, '#fdae1c', 2.5);
      }
    }
  };

  /* ---------- 15b. numberlineXL: the same frog line, hundreds/1000s scale ---------- */
  SCENES.numberlineXL = {
    dials: [
      { id: 'start', label: 'Start at', min: 0, max: 900, step: 1, initial: 0 },
      { id: 'step', label: 'Jump (back = negative)', min: -500, max: 500, step: 1, initial: 100 },
    ],
    readout: SCENES.numberline.readout,
    air: SCENES.numberline.air,
    render: function (ctx, w, h, v) {
      var vv = Object.assign({}, v, { __range: v.__range || { lo: 0, hi: 1000 } });
      SCENES.numberline.render(ctx, w, h, vv);
    },
  };

  /* ---------- 16. balance: comparing weights ---------- */
  SCENES.balance = {
    dials: [
      { id: 'left', label: 'Left pan apples', min: 0, max: 10, step: 1, initial: 4 },
      { id: 'right', label: 'Right pan apples', min: 0, max: 10, step: 1, initial: 2 }
    ],
    readout: function (v) {
      var d = (v.left | 0) - (v.right | 0);
      return d === 0 ? 'Balanced! Equal weights' : d > 0 ? 'Left is heavier by ' + d : 'Right is heavier by ' + (-d);
    },
    air: function (ctx, w, h, v, t) {
      ctx.save();
      for (var i = 0; i < 4; i++) {
        var sx = (w * 0.15 + i * w * 0.24 + Math.sin(t * 0.9 + i * 1.7) * 12) % w;
        var sy = h * 0.14 + Math.cos(t * 1.1 + i) * 10;
        emoji(ctx, '✨', sx, sy, 16);
      }
      ctx.restore();
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#fdf6e8', '#f3e2bd');
      ground(ctx, w, h, h * 0.86, '#e0c98f');
      var cx = w / 2, topY = h * 0.34;
      var tilt = Math.max(-0.32, Math.min(0.32, ((v.right | 0) - (v.left | 0)) * 0.055));
      var wob = Math.sin((v.__t || 0) * 2.2) * 0.015;
      tilt += wob;
      // pillar + base
      rr(ctx, cx - 9, topY, 18, h * 0.5, 6); fillStroke(ctx, '#c98a4b', 3.5);
      rr(ctx, cx - 60, h * 0.82, 120, 16, 8); fillStroke(ctx, '#a06a38', 3.5);
      ctx.save();
      ctx.translate(cx, topY);
      ctx.rotate(tilt);
      rr(ctx, -w * 0.34, -7, w * 0.68, 14, 7); fillStroke(ctx, '#8a5a2f', 3.5);
      // pans hang from beam ends
      var ex = w * 0.32;
      [-ex, ex].forEach(function (px, side) {
        var py = 7;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + 34);
        ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.stroke();
        var count = side === 0 ? (v.left | 0) : (v.right | 0);
        var py0 = py + 44;
        ctx.beginPath(); ctx.ellipse(px, py0 + 8, 46, 12, 0, 0, Math.PI * 2);
        fillStroke(ctx, '#f4e3c2', 3);
        for (var i = 0; i < count; i++) {
          emoji(ctx, '🍎', px - 24 + (i % 3) * 24, py0 - 2 - Math.floor(i / 3) * 22, 24);
        }
      });
      ctx.restore();
      label(ctx, '⚖️', cx, h * 0.24, 26);
    }
  };

  /* ---------- 17. spinner: chance wheel ---------- */
  SCENES.spinner = {
    dials: [
      { id: 'red', label: 'Red slices', min: 0, max: 8, step: 1, initial: 4 },
      { id: 'blue', label: 'Blue slices', min: 0, max: 8, step: 1, initial: 2 }
    ],
    readout: function (v) {
      var total = (v.red | 0) + (v.blue | 0);
      if (!total) return 'No slices at all!';
      var rp = Math.round((v.red | 0) / total * 100);
      return 'Red ' + rp + '% · Blue ' + (100 - rp) + '% chance';
    },
    air: function (ctx, w, h, v, t) {
      ctx.save();
      var confs = ['🎉', '⭐', '✨'];
      for (var i = 0; i < 3; i++) {
        var sx = w * 0.12 + i * w * 0.36, sy = h * 0.12 + ((t * 26 + i * 47) % (h * 0.3));
        emoji(ctx, confs[i], sx, sy, 18);
      }
      ctx.restore();
    },
    render: function (ctx, w, h, v) {
      sky(ctx, w, h, '#fff4f8', '#ffdfec');
      ground(ctx, w, h, h * 0.86, '#f3c4d4');
      var cx = w / 2, cy = h * 0.46, R = Math.min(w, h) * 0.3;
      var total = (v.red | 0) + (v.blue | 0);
      var spin = (v.__t || 0) * 1.6;
      if (total === 0) {
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
        fillStroke(ctx, '#ffffff', 4);
        label(ctx, 'add slices!', cx, cy, 20, '#626262');
      } else {
        var a0 = spin;
        for (var i = 0; i < total; i++) {
          var a1 = a0 + (Math.PI * 2) / total;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a1); ctx.closePath();
          fillStroke(ctx, i < (v.red | 0) ? '#f42324' : '#38B6FF', 2.5);
          a0 = a1;
        }
      }
      // pointer
      ctx.save();
      ctx.translate(cx, cy - R - 6);
      ctx.beginPath(); ctx.moveTo(0, -2); ctx.lineTo(-11, -22); ctx.lineTo(11, -22); ctx.closePath();
      fillStroke(ctx, '#fdae1c', 2.5);
      ctx.restore();
      ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      fillStroke(ctx, '#fdae1c', 3);
    }
  };

  /* ---------- shared ambient helpers (drawn over scenes) ---------- */
  function driftDots(ctx, w, h, t, color, n, speed) {
    ctx.save();
    ctx.fillStyle = color;
    for (var i = 0; i < n; i++) {
      var seed = i * 97.13;
      var x = (seed * 7.31 + t * 12 * (0.4 + (i % 3) * 0.3) * (speed || 1)) % (w + 30) - 15;
      var y = h * 0.12 + ((seed * 3.7) % (h * 0.6)) + Math.sin(t + seed) * 7;
      var r = 1.6 + (i % 3);
      ctx.globalAlpha = 0.35;
      ctx.beginPath(); ctx.arc(w - x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  // Ambient overlays per scene: keep the world alive between dial changes.
  SCENES.fractions.air = function (ctx, w, h, v, t) { driftDots(ctx, w, h, t, '#ffffff', 8, 0.8); };
  SCENES.counters.air = function (ctx, w, h, v, t) {
    ctx.save(); ctx.globalAlpha = 0.85;
    emoji(ctx, '🍃', (w * 0.2 + t * 26) % (w + 40) - 20, h * 0.2 + Math.sin(t * 1.6) * 14, 20);
    emoji(ctx, '🍃', (w * 0.75 + t * 18) % (w + 40) - 20, h * 0.3 + Math.cos(t * 1.3) * 12, 16);
    ctx.restore();
  };
  SCENES.array.air = function (ctx, w, h, v, t) {
    var hen = Math.sin(t * 1.8) > 0 ? '🐔' : '🐔';
    emoji(ctx, hen, w * 0.88, h * 0.16 + Math.sin(t * 2) * 3, 30);
  };
  SCENES.placevalue.air = function (ctx, w, h, v, t) { driftDots(ctx, w, h, t, '#ffe156', 7, 0.6); };
  SCENES.counting.air = function (ctx, w, h, v, t) { driftDots(ctx, w, h, t, '#ffffff', 9, 0.9); };
  SCENES.shape.air = function (ctx, w, h, v, t) { driftDots(ctx, w, h, t, '#ffffff', 6, 0.7); };
  SCENES.measure.air = function (ctx, w, h, v, t) { driftDots(ctx, w, h, t, '#ffffff', 6, 0.5); };
  SCENES.databar.air = function (ctx, w, h, v, t) { driftDots(ctx, w, h, t, '#ffffff', 8, 0.8); };
  SCENES.pattern.air = function (ctx, w, h, v, t) {
    var pulse = 1 + Math.sin(t * 3) * 0.06;
    ctx.save(); ctx.translate(w / 2, h * 0.45); ctx.scale(pulse, pulse); ctx.translate(-w / 2, -h * 0.45);
    // re-stroke existing beads lightly for a heartbeat effect
    ctx.restore();
    driftDots(ctx, w, h, t, '#ff8fa0', 6, 0.6);
  };
  SCENES.sound.air = function (ctx, w, h, v, t) {
    var cx = w * 0.36, cy = h * 0.55;
    var amp = 8 + (v.force | 0) * 9;
    ctx.save();
    for (var r = 0; r < 2; r++) {
      var rad = 24 + ((t * 40 + r * 30) % 70);
      ctx.globalAlpha = 0.5 - r * 0.18;
      ctx.beginPath(); ctx.arc(cx, cy, rad, -0.5, 0.9);
      ctx.lineWidth = 3; ctx.strokeStyle = '#8bc8fa'; ctx.stroke();
    }
    ctx.restore();
  };
  SCENES.light.air = function (ctx, w, h, v, t) {
    ctx.save();
    for (var i = 0; i < 6; i++) {
      var seed = i * 61.7;
      var x = w * 0.35 + ((seed + t * 9) % (w * 0.45));
      var y = h * 0.35 + ((seed * 1.9 + t * 5) % (h * 0.35));
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#ffe9b3';
      ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  };
  SCENES.forces.air = function (ctx, w, h, v, t) { driftDots(ctx, w, h, t, '#ffffff', 6, 1.4); };
  SCENES.circuit.air = function (ctx, w, h, v, t) {
    // electrons flowing around the loop
    var cx = w / 2, cy = h * 0.5, rw = w * 0.56, rh = h * 0.5;
    ctx.save();
    ctx.fillStyle = '#fdae1c';
    for (var i = 0; i < 8; i++) {
      var p = ((t * 0.35 + i / 8) % 1) * 4;
      var x, y;
      if (p < 1) { x = cx - rw / 2 + rw * p; y = cy - rh / 2; }
      else if (p < 2) { x = cx + rw / 2; y = cy - rh / 2 + rh * (p - 1); }
      else if (p < 3) { x = cx + rw / 2 - rw * (p - 2); y = cy + rh / 2; }
      else { x = cx - rw / 2; y = cy + rh / 2 - rh * (p - 3); }
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  };
  SCENES.states.air = function (ctx, w, h, v, t) {
    // Temperature-reactive ambience: snow sparkles below 0, surface ripples in
    // liquid range, steam above 100 — the lab is alive at EVERY temperature.
    ctx.save();
    var t2 = v.temp | 0;
    var i, seed, x, y;
    if (t2 < 0) {
      for (i = 0; i < 6; i++) {
        seed = i * 37.7;
        x = w * 0.15 + ((seed + t * 14) % (w * 0.7));
        y = h * 0.1 + ((seed * 1.7 + t * 20) % (h * 0.35));
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#dff2ff'; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4);
        ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4); ctx.stroke();
      }
    } else if (t2 < 60) {
      for (i = 0; i < 4; i++) {
        seed = i * 29.1;
        x = w * 0.28 + (seed % (w * 0.44));
        y = h * 0.52 + Math.sin(t * 2.2 + seed) * 5;
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, y, 8 + Math.sin(t * 3 + seed) * 2, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
      }
    } else if (t2 < 100) {
      for (i = 0; i < 4; i++) {
        seed = i * 41.3;
        x = w * 0.3 + (seed % (w * 0.4)) + Math.sin(t * 2.6 + seed) * 8;
        y = h * 0.4 + ((t * 16 + seed * 4) % (h * 0.28));
        ctx.globalAlpha = 0.5;
        ctx.beginPath(); ctx.arc(x, y, 3 + (i % 3), 0, Math.PI * 2);
        ctx.fillStyle = '#e8f7ff'; ctx.fill();
      }
    }
    for (i = 0; i < 7; i++) {
      seed = i * 53.3;
      x = w * 0.3 + (seed % (w * 0.4)) + Math.sin(t * 2 + seed) * 10;
      y = h * 0.75 - ((t * 30 + seed * 5) % (h * 0.5));
      ctx.globalAlpha = 0.45;
      ctx.beginPath(); ctx.arc(x, y, 4 + (i % 3), 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.restore();
  };

  PYP.scenes = SCENES;
})();
