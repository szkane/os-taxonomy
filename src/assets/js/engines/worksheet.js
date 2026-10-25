/* ==========================================================================
   Engine: worksheet — printable A4 practice
   Screen: configure the sheet (amount / type) and preview the paper.
   Print: @media print keeps only the paper (rules live in stage.css).
   Kinds: 'handwriting' (dashed guide cells with trace letters) and
   'math' (vertical columns with monospace alignment).
   ========================================================================== */
(function () {
  'use strict';
  var PYP = window.PYP = window.PYP || {};

  function Worksheet(root, config, ctx) {
    var self = this;
    this.ctx = ctx;
    this.config = config;
    this.root = root;
    this.count = config.defaultCount || 12;

    var wrap = PYP.el('div', 'ws-wrap');
    var controls = PYP.el('div', 'ws-controls');
    var info = PYP.el('p', null, config.intro || 'Make a worksheet, then print it and practice on paper.');
    info.style.fontWeight = '600';
    controls.appendChild(info);

    var stepper = PYP.el('div', 'lab-dial');
    var head = PYP.el('div', 'lab-dial-head');
    head.appendChild(PYP.el('span', 'lab-dial-label', 'How many items'));
    this.countVal = PYP.el('span', 'lab-dial-value', String(this.count));
    head.appendChild(this.countVal);
    var row = PYP.el('div', 'lab-actions');
    var dec = PYP.el('button', 'ml-control ml-control--icon-only');
    dec.type = 'button'; dec.setAttribute('aria-label', 'Fewer items');
    dec.innerHTML = '−';
    var inc = PYP.el('button', 'ml-control ml-control--icon-only');
    inc.type = 'button'; inc.setAttribute('aria-label', 'More items');
    inc.innerHTML = '+';
    dec.addEventListener('click', function () { self.setCount(self.count - 4); });
    inc.addEventListener('click', function () { self.setCount(self.count + 4); });
    row.appendChild(dec); row.appendChild(inc);
    stepper.appendChild(head); stepper.appendChild(row);
    controls.appendChild(stepper);

    var wordsBox = PYP.el('div', 'lab-dial');
    var wordsHead = PYP.el('div', 'lab-dial-head');
    wordsHead.appendChild(PYP.el('span', 'lab-dial-label', 'Your own words (optional)'));
    wordsBox.appendChild(wordsHead);
    var wordsInput = document.createElement('input');
    wordsInput.type = 'text';
    wordsInput.className = 'ws-custom-words';
    wordsInput.placeholder = 'cat, dog, sun…';
    wordsInput.setAttribute('aria-label', 'Your own practice words, separated by commas');
    wordsInput.style.cssText = 'width:100%;min-height:44px;margin-top:6px;padding:8px 10px;border:2px solid #242722;border-radius:10px;font:600 15px "Baloo 2",sans-serif;';
    var onWords = function () {
      self.customWords = wordsInput.value.split(',').map(function (w) { return w.trim().toLowerCase(); }).filter(function (w) { return w && /^[a-z\s'-]+$/.test(w); });
      self.renderPaper();
    };
    wordsInput.addEventListener('input', onWords);
    wordsBox.appendChild(wordsInput);
    controls.appendChild(wordsBox);

    var print = PYP.el('button', 'ml-control ml-control--primary');
    print.type = 'button';
    print.innerHTML = PYP.icon('print') + '<span class="ml-button-label">Print worksheet</span>';
    print.addEventListener('click', function () {
      self.ctx.sfx.playClick();
      self.renderPrintSheet();
      window.print();
    });
    controls.appendChild(print);
    wrap.appendChild(controls);

    this.paper = PYP.el('div', 'ws-paper');
    wrap.appendChild(this.paper);
    root.appendChild(wrap);
    this.renderPaper();
    ctx.instruct(config.prompt || 'Build your practice sheet, then press print.');
  }

  Worksheet.prototype.setCount = function (n) {
    this.count = Math.max(4, Math.min(24, n));
    this.countVal.textContent = String(this.count);
    this.renderPaper();
  };

  Worksheet.prototype.makeItems = function (n) {
    var cfg = this.config;
    var items = [];
    if (cfg.kind === 'handwriting') {
      var pool = (this.customWords && this.customWords.length) ? this.customWords : (cfg.words || []);
      for (var i = 0; i < n; i++) items.push(pool[i % pool.length]);
    } else {
      var ranges = cfg.ranges || { a: [1, 20], b: [1, 20] };
      var ops = cfg.ops || ['+'];
      for (var j = 0; j < n; j++) {
        var op = ops[j % ops.length];
        var a = rand(ranges.a[0], ranges.a[1]);
        var b = rand(ranges.b[0], ranges.b[1]);
        if (op === '−' && b > a) { var t = a; a = b; b = t; }
        items.push({ a: a, b: b, op: op });
      }
    }
    return items;

    function rand(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  };

  Worksheet.prototype.renderPrintSheet = function () {
    var sheet = document.getElementById('print-sheet');
    if (!sheet) {
      sheet = document.createElement('div');
      sheet.id = 'print-sheet';
      document.body.appendChild(sheet);
    }
    document.body.classList.add('has-print-sheet');
    var cfg = this.config;
    var self = this;
    sheet.innerHTML = '';
    var title = document.createElement('div');
    title.style.cssText = 'font-weight:800;font-size:15px;margin-bottom:12px;';
    title.textContent = (this.ctx.course.title || 'Practice') + ' — name: ________  date: ________';
    sheet.appendChild(title);
    var items = this.makeItems(this.count);
    if (cfg.kind === 'handwriting') {
      var grid = document.createElement('div');
      grid.className = 'ws-grid';
      items.forEach(function (word) {
        ['model', 'trace', 'trace', 'blank'].forEach(function (kind) {
          var cell = document.createElement('div');
          cell.style.cssText = 'aspect-ratio:1.3;border:0;border-bottom:2.5px solid #111;position:relative;display:grid;place-items:end center;font-size:30px;padding-bottom:2px;';
          var mid = document.createElement('div');
          mid.style.cssText = 'position:absolute;left:0;right:0;top:30%;border-top:1.5px dashed #b9c4d6;';
          var top = document.createElement('div');
          top.style.cssText = 'position:absolute;left:0;right:0;top:4%;border-top:1.5px solid #dbe3ee;';
          if (kind !== 'blank') {
            cell.textContent = word;
            if (kind === 'trace') cell.style.color = '#c9c9c9';
          }
          cell.appendChild(mid); cell.appendChild(top);
          grid.appendChild(cell);
        });
      });
      sheet.appendChild(grid);
    } else {
      var math = document.createElement('div');
      math.className = 'ws-math';
      items.forEach(function (it) {
        var d = document.createElement('div');
        d.textContent = '  ' + it.a + '\n' + it.op + ' ' + it.b + '\n------';
        math.appendChild(d);
      });
      sheet.appendChild(math);
    }
  };

  Worksheet.prototype.renderPaper = function () {
    var cfg = this.config;
    var self = this;
    this.paper.innerHTML = '';
    var title = PYP.el('div');
    title.style.fontWeight = '800';
    title.textContent = (this.ctx.course.title || 'Practice') + ' — name: ________  date: ________';
    this.paper.appendChild(title);
    var items = this.makeItems(this.count);
    if (cfg.kind === 'handwriting') {
      var grid = PYP.el('div', 'ws-grid');
      items.forEach(function (word, i) {
        ['model', 'trace', 'trace', 'blank'].forEach(function (kind, k) {
          var cell = PYP.el('div', 'ws-cell' + (kind === 'trace' ? ' ws-cell--trace' : ''));
          if (kind === 'model' || kind === 'trace') cell.textContent = word;
          grid.appendChild(cell);
        });
      });
      this.paper.appendChild(grid);
    } else {
      var math = PYP.el('div', 'ws-math');
      items.forEach(function (it) {
        var d = PYP.el('div');
        d.textContent = '  ' + it.a + '\n' + it.op + ' ' + it.b + '\n------';
        math.appendChild(d);
      });
      this.paper.appendChild(math);
    }
  };

  Worksheet.prototype.destroy = function () { this.root.innerHTML = ''; };

  PYP.engines['worksheet'] = Worksheet;
})();
