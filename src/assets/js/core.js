/* ==========================================================================
   PYP Marble Courses — shared runtime core
   Provides: TTS_MANAGER (accent dropdown + fallback), SoundFX (Web Audio),
   vocabulary popover (dashed-underline word help), and the Marble stage
   controller (cover → lesson → modes → replay). Engines register themselves
   on window.PYP.engines.
   Rules honored here: zero sound on load (unlock on first gesture), one
   instruction slot that feedback REPLACES, one vocab popover at a time,
   no vocab triggers inside buttons, replay returns to a fresh cover.
   ========================================================================== */
(function () {
  'use strict';

  var PYP = (window.PYP = window.PYP || {});
  PYP.engines = PYP.engines || {};

  /* ------------------------------------------------------------------ */
  /* SoundFX — pure Web Audio synthesizer, unlocked on first gesture      */
  /* ------------------------------------------------------------------ */
  function SoundFX() { this.ctx = null; this.enabled = true; }
  SoundFX.prototype.init = function () {
    if (!this.enabled) return null;
    try {
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) { this.enabled = false; return null; }
        this.ctx = new AC();
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    } catch (e) { this.enabled = false; return null; }
  };
  SoundFX.prototype._tone = function (type, freq, t0, dur, vol) {
    var ctx = this.ctx; if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  };
  SoundFX.prototype.playClick = function () {
    var ctx = this.init(); if (!ctx) return;
    var t = ctx.currentTime;
    var osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.06);
  };
  SoundFX.prototype.playCorrect = function () {
    var ctx = this.init(); if (!ctx) return;
    var t = ctx.currentTime, self = this;
    [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) {
      self._tone('sine', f, t + i * 0.05, 0.18, 0.16);
    });
  };
  SoundFX.prototype.playBuzz = function () {
    var ctx = this.init(); if (!ctx) return;
    var t = ctx.currentTime;
    this._tone('sawtooth', 160, t, 0.18, 0.09);
  };
  SoundFX.prototype.playFanfare = function () {
    var ctx = this.init(); if (!ctx) return;
    var t = ctx.currentTime, self = this;
    [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) {
      self._tone('triangle', f, t + i * 0.08, 0.55, 0.17);
    });
  };
  SoundFX.prototype.playStreak = function (streak) {
    var ctx = this.init(); if (!ctx) return;
    var t = ctx.currentTime;
    var base = 523.25 * Math.pow(1.0595, Math.min(streak, 12) * 2);
    this._tone('sine', base, t, 0.12, 0.14);
  };
  var sfx = (PYP.sfx = new SoundFX());

  // Central TTS policy: auto-speak ONLY for the early band (ages 5–6), throttled,
  // and never when muted. Mid/upper bands hear text only via explicit speaker
  // buttons. Feedback chimes/buzzes are unaffected.
  var ttsState = { muted: false, lastText: '', lastAt: 0 };
  try { ttsState.muted = localStorage.getItem('ib_pyp_tts_muted') === '1'; } catch (e) {}
  PYP.ttsAuto = function (text, el) {
    if (ttsState.muted) return false;
    var course = PYP.stage && PYP.stage.course;
    if (!course || course.band !== 'early') return false;
    var now = Date.now();
    if (text === ttsState.lastText && now - ttsState.lastAt < 8000) return false;
    if (now - ttsState.lastAt < 2200) return false;
    ttsState.lastText = text;
    ttsState.lastAt = now;
    if (el) PYP.speakFollowAlong(el, String(text).replace(/<[^>]*>/g, ''), null);
    else TTS_MANAGER.speak(String(text).replace(/<[^>]*>/g, ''));
    return true;
  };
  PYP.ttsToggleMute = function () {
    ttsState.muted = !ttsState.muted;
    try { localStorage.setItem('ib_pyp_tts_muted', ttsState.muted ? '1' : '0'); } catch (e) {}
    if (ttsState.muted && window.speechSynthesis) window.speechSynthesis.cancel();
    return ttsState.muted;
  };
  PYP.ttsIsMuted = function () { return ttsState.muted; };

  /* Follow-along reading: wrap the instruction's words, then highlight the
     word the voice is currently on (utterance onboundary gives charIndex).
     Voices that never fire boundary events simply get no highlight. */
  var followCleanup = null;
  PYP.speakFollowAlong = function (el, text, btn) {
    if (followCleanup) { followCleanup(); followCleanup = null; }
    if (!window.speechSynthesis || !el || !text || !text.trim()) {
      TTS_MANAGER.speak(text, null, btn);
      return;
    }
    // Wrap word tokens in spans (vocab spans and other inline markup survive:
    // we only split text nodes). textContent is unchanged, so the offsets we
    // record match the plain string handed to the synthesizer.
    var words = [];
    var offset = 0;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(function (node) {
      var nodeText = node.nodeValue;
      var frag = document.createDocumentFragment();
      var parts = nodeText.split(/(\s+)/);
      var pos = 0;
      parts.forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          var span = document.createElement('span');
          span.className = 'ml-read-word';
          span.textContent = part;
          frag.appendChild(span);
          words.push({ span: span, start: offset + pos, end: offset + pos + part.length });
        }
        pos += part.length;
      });
      offset += nodeText.length;
      node.parentNode.replaceChild(frag, node);
    });
    var clearAll = function () {
      words.forEach(function (w) {
        var p = w.span.parentNode;
        if (!p) return;
        w.span.classList.remove('is-now', 'is-done');
        while (w.span.firstChild) p.insertBefore(w.span.firstChild, w.span);
        p.removeChild(w.span);
      });
    };
    followCleanup = clearAll;
    TTS_MANAGER.speak(text, function () {
      if (followCleanup === clearAll) followCleanup = null;
      clearAll();
    }, btn, function (e) {
      if (e.charIndex == null) return;
      var idx = e.charIndex;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        var isNow = idx >= w.start && idx < w.end;
        w.span.classList.toggle('is-now', isNow);
        w.span.classList.toggle('is-done', !isNow && w.end <= idx);
      }
    });
  };

  // Audio etiquette: nothing plays until a deliberate user gesture occurs.
  function unlock() { sfx.init(); document.removeEventListener('pointerdown', unlock); document.removeEventListener('keydown', unlock); }
  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });

  /* ------------------------------------------------------------------ */
  /* TTS manager — accent dropdown, localStorage memory, robust fallback  */
  /* ------------------------------------------------------------------ */
  var TTS_MANAGER = (PYP.TTS_MANAGER = {
    currentVoiceName: '',
    wrap: null, trigger: null, menu: null, flag: null, label: null, list: null,

    init: function () {
      this.wrap = document.getElementById('ttsDropdownWrap');
      this.trigger = document.getElementById('ttsTrigger');
      this.menu = document.getElementById('ttsMenu');
      this.flag = document.getElementById('ttsFlag');
      this.label = document.getElementById('ttsLabel');
      this.list = document.getElementById('ttsRadioList');
      if (!this.trigger) return;
      var self = this;
      this.trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        self.wrap.classList.toggle('open');
        self.trigger.setAttribute('aria-expanded', self.wrap.classList.contains('open') ? 'true' : 'false');
      });
      document.addEventListener('click', function (e) {
        if (self.wrap && !self.wrap.contains(e.target)) {
          self.wrap.classList.remove('open');
          self.trigger.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && self.wrap) {
          self.wrap.classList.remove('open');
          self.trigger.setAttribute('aria-expanded', 'false');
        }
      });
      if (window.speechSynthesis) {
        this.populateVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = function () { self.populateVoices(); };
        }
      }
    },

    populateVoices: function () {
      if (!window.speechSynthesis || !this.list) return;
      var voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;
      var available = voices.filter(function (v) {
        var lang = (v.lang || '').toLowerCase().replace('_', '-');
        return lang.indexOf('en') === 0;
      });
      var isFallback = false;
      if (available.length === 0) { isFallback = true; available = voices.slice(); }
      if (!isFallback) {
        available.sort(function (a, b) {
          var an = a.name || '', bn = b.name || '';
          var aUKf = an.indexOf('Google UK English Female') >= 0 || (an.indexOf('UK English') >= 0 && an.indexOf('Female') >= 0);
          var bUKf = bn.indexOf('Google UK English Female') >= 0 || (bn.indexOf('UK English') >= 0 && bn.indexOf('Female') >= 0);
          if (aUKf && !bUKf) return -1;
          if (!aUKf && bUKf) return 1;
          var aUS = an.indexOf('Google US English') >= 0 || (an.indexOf('US English') >= 0 && an.indexOf('Female') >= 0);
          var bUS = bn.indexOf('Google US English') >= 0 || (bn.indexOf('US English') >= 0 && bn.indexOf('Female') >= 0);
          if (aUS && !bUS) return -1;
          if (!aUS && bUS) return 1;
          var agb = (a.lang || '').toLowerCase().indexOf('gb') >= 0;
          var bgb = (b.lang || '').toLowerCase().indexOf('gb') >= 0;
          if (agb && !bgb) return -1;
          if (!agb && bgb) return 1;
          var aus = (a.lang || '').toLowerCase().indexOf('us') >= 0;
          var bus = (b.lang || '').toLowerCase().indexOf('us') >= 0;
          if (aus && !bus) return -1;
          if (!aus && bus) return 1;
          return an.localeCompare(bn);
        });
      }
      var saved = null;
      try { saved = localStorage.getItem('ib_pyp_voice_name'); } catch (e) {}
      var selected = saved ? available.filter(function (v) { return v.name === saved; })[0] : null;
      if (!selected && !isFallback) {
        selected =
          available.filter(function (v) { return (v.name || '').indexOf('Google UK English Female') >= 0; })[0] ||
          available.filter(function (v) { return (v.name || '').indexOf('Google US English') >= 0; })[0] ||
          available.filter(function (v) { return (v.lang || '').toLowerCase().indexOf('gb') >= 0; })[0] ||
          available.filter(function (v) { return (v.lang || '').toLowerCase().indexOf('us') >= 0; })[0] ||
          null;
      }
      if (!selected) {
        selected = available.filter(function (v) { return v.default; })[0] || available[0] ||
          voices.filter(function (v) { return v.default; })[0] || voices[0] || null;
      }
      this.currentVoiceName = selected ? selected.name : '';
      this.renderMenu(available);
      this.updateTriggerUI(selected);
    },

    renderMenu: function (voices) {
      this.list.innerHTML = '';
      var self = this;
      voices.slice(0, 15).forEach(function (v) {
        var lang = (v.lang || '').toLowerCase().replace('_', '-');
        var isUK = lang.indexOf('gb') >= 0;
        var isAU = lang.indexOf('au') >= 0;
        var isUS = lang.indexOf('us') >= 0 || lang.indexOf('en') === 0;
        var flag = isAU ? '🇦🇺' : isUK ? '🇬🇧' : isUS ? '🇺🇸' : '🌐';
        var region = isAU ? 'AU' : isUK ? 'UK' : isUS ? 'US' : (v.lang || (v.default ? 'Default' : 'System'));
        var isActive = v.name === self.currentVoiceName;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tts-radio-item' + (isActive ? ' active' : '');
        btn.setAttribute('role', 'menuitemradio');
        btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
        var circle = document.createElement('span'); circle.className = 'tts-radio-circle';
        var flagEl = document.createElement('span'); flagEl.className = 'tts-item-flag'; flagEl.textContent = flag;
        var name = document.createElement('span'); name.className = 'tts-item-name';
        name.textContent = v.name + ' (' + region + ')';
        btn.appendChild(circle); btn.appendChild(flagEl); btn.appendChild(name);
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          self.selectVoice(v);
          self.wrap.classList.remove('open');
          self.trigger.setAttribute('aria-expanded', 'false');
        });
        self.list.appendChild(btn);
      });
    },

    selectVoice: function (v) {
      this.currentVoiceName = v.name;
      try { localStorage.setItem('ib_pyp_voice_name', v.name); } catch (e) {}
      this.updateTriggerUI(v);
      var self = this;
      var items = this.list.querySelectorAll('.tts-radio-item');
      Array.prototype.forEach.call(items, function (btn) {
        var nameEl = btn.querySelector('.tts-item-name');
        var isMatch = nameEl && nameEl.textContent.indexOf(v.name) >= 0;
        btn.classList.toggle('active', !!isMatch);
        btn.setAttribute('aria-checked', isMatch ? 'true' : 'false');
      });
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    },

    updateTriggerUI: function (v) {
      if (!v) {
        if (this.flag) this.flag.textContent = '🌐';
        if (this.label) this.label.textContent = 'Voice';
        return;
      }
      var lang = (v.lang || '').toLowerCase().replace('_', '-');
      var isUK = lang.indexOf('gb') >= 0;
      var isAU = lang.indexOf('au') >= 0;
      var isUS = lang.indexOf('us') >= 0 || lang.indexOf('en') === 0;
      if (this.flag) this.flag.textContent = isAU ? '🇦🇺' : isUK ? '🇬🇧' : isUS ? '🇺🇸' : '🌐';
      if (this.label) {
        var shortName = (v.name || 'Default').replace(/^(Google|Microsoft|Apple)\s+/i, '');
        if (shortName.length > 14) shortName = shortName.substring(0, 12) + '…';
        this.label.textContent = shortName;
      }
    },

    speak: function (text, onEnd, btn, onBoundary) {
      if (!window.speechSynthesis || !text || !text.trim()) { if (onEnd) onEnd(); return; }
      window.speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(text);
      var voices = window.speechSynthesis.getVoices();
      var chosen = null;
      var voiceName = this.currentVoiceName;
      if (!voiceName) { try { voiceName = localStorage.getItem('ib_pyp_voice_name'); } catch (e) {} }
      if (voiceName && voices && voices.length) {
        chosen = voices.filter(function (v) { return v.name === voiceName; })[0];
      }
      if (!chosen && voices && voices.length) {
        chosen = voices.filter(function (v) { return v.default; })[0] || voices[0];
      }
      if (chosen) utterance.voice = chosen;
      utterance.rate = 0.88;
      if (onBoundary) utterance.onboundary = onBoundary;
      if (btn) btn.classList.add('speaking');
      var done = function () { if (btn) btn.classList.remove('speaking'); if (onEnd) onEnd(); };
      utterance.onend = done;
      utterance.onerror = done;
      window.speechSynthesis.speak(utterance);
    }
  });

  /* ------------------------------------------------------------------ */
  /* Vocabulary popover — dashed-underline word help                      */
  /* One popover at a time; hover, tap and keyboard all work; never       */
  /* created inside buttons (engines only mark non-interactive text).     */
  /* ------------------------------------------------------------------ */
  var vocab = (PYP.vocab = {
    lexicon: null,
    pop: null,
    currentTerm: null,

    setLexicon: function (lex) { this.lexicon = lex || {}; },

    // Returns HTML-safe markup with .vocab spans for known terms.
    enrich: function (text) {
      if (!text) return '';
      var esc = this.escapeHtml(text);
      if (!this.lexicon) return esc;
      var self = this;
      var terms = Object.keys(this.lexicon).sort(function (a, b) { return b.length - a.length; });
      terms.forEach(function (term) {
        var re = new RegExp('\\b(' + self.escapeRegExp(term) + '(?:s|es|ed|ing|ly)?)\\b(?!([^<]+)?>)', 'i');
        esc = esc.replace(re, function (m) { return '<span class="vocab" role="button" tabindex="0" data-term="' + term.toLowerCase() + '">' + m + '</span>'; });
      });
      return esc;
    },

    escapeHtml: function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    escapeRegExp: function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); },

    openFor: function (term, anchorEl) {
      this.close();
      var def = this.lexicon && (this.lexicon[term.toLowerCase()] || this.lexicon[term.toLowerCase().replace(/s$/, '')]);
      if (!def) return;
      var pop = document.createElement('div');
      pop.className = 'ml-vocab-pop';
      pop.setAttribute('role', 'dialog');
      pop.setAttribute('aria-label', 'What does ' + term + ' mean?');
      var word = document.createElement('span');
      word.className = 'ml-vocab-word';
      word.textContent = term + ': ';
      var body = document.createElement('span');
      body.textContent = def;
      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'ml-vocab-close';
      close.setAttribute('aria-label', 'Close word help');
      close.textContent = '✕';
      pop.appendChild(word); pop.appendChild(body); pop.appendChild(close);
      document.body.appendChild(pop);
      var rect = anchorEl.getBoundingClientRect();
      var popW = pop.offsetWidth, popH = pop.offsetHeight;
      var left = Math.min(Math.max(8, rect.left + rect.width / 2 - popW / 2), window.innerWidth - popW - 8);
      var top = rect.top - popH - 10;
      if (top < 8) top = rect.bottom + 10;
      // position: fixed + viewport coords — correct even when the page is scrolled.
      pop.style.position = 'fixed';
      pop.style.left = left + 'px';
      pop.style.top = top + 'px';
      this.pop = pop;
      this.currentTerm = term;
      var self = this;
      close.addEventListener('click', function (e) { e.stopPropagation(); self.close(); });
      setTimeout(function () {
        document.addEventListener('click', self._outside = function (e) {
          if (self.pop && !self.pop.contains(e.target)) self.close();
        });
        document.addEventListener('keydown', self._esc = function (e) {
          if (e.key === 'Escape') self.close();
        });
      }, 0);
    },

    close: function () {
      if (this.pop) { this.pop.remove(); this.pop = null; this.currentTerm = null; }
      if (this._outside) { document.removeEventListener('click', this._outside); this._outside = null; }
      if (this._esc) { document.removeEventListener('keydown', this._esc); this._esc = null; }
    },

    // Delegate taps/hovers on .vocab spans inside a container.
    bind: function (root) {
      var self = this;
      root.addEventListener('click', function (e) {
        var t = e.target.closest('.vocab');
        if (t) { e.stopPropagation(); self.openFor(t.getAttribute('data-term') || t.textContent, t); }
      });
      root.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var t = e.target.closest && e.target.closest('.vocab');
        if (t) { e.preventDefault(); e.stopPropagation(); self.openFor(t.getAttribute('data-term') || t.textContent, t); }
      });
      if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
        var hoverTimer = null;
        root.addEventListener('mouseover', function (e) {
          var t = e.target.closest('.vocab');
          if (!t) return;
          clearTimeout(hoverTimer);
          hoverTimer = setTimeout(function () { self.openFor(t.getAttribute('data-term') || t.textContent, t); }, 180);
        });
        root.addEventListener('mouseout', function () { clearTimeout(hoverTimer); });
      }
    }
  });

  /* ------------------------------------------------------------------ */
  /* Small helpers                                                        */
  /* ------------------------------------------------------------------ */
  PYP.esc = vocab.escapeHtml;
  PYP.el = function (tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  PYP.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  };
  PYP.icon = function (name) {
    var icons = {
      play: '<path d="M8 6l10 6-10 6z" fill="currentColor" stroke="none"/>',
      replay: '<path d="M4 12a8 8 0 1 0 2.3-5.6"/><path d="M4 4v5h5"/>',
      next: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
      back: '<path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/>',
      check: '<path d="M4 12l5 5L20 7"/>',
      hand: '<path d="M8 13V5a2 2 0 1 1 4 0v6"/><path d="M12 11V4a2 2 0 1 1 4 0v7"/><path d="M16 11.5a2 2 0 1 1 4 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-7-7v-2a2 2 0 1 1 4 0"/>',
      sparkle: '<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>',
      print: '<path d="M7 8V3h10v5"/><rect x="4" y="8" width="16" height="8" rx="2"/><path d="M7 13h10v8H7z"/>',
      sound: '<path d="M4 10v4h4l5 4V6l-5 4z"/><path d="M16 9a4 4 0 0 1 0 6"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (icons[name] || '') + '</svg>';
  };

  /* ------------------------------------------------------------------ */
  /* Celebration — emoji confetti burst + mascot bounce                    */
  /* Called by engines on genuine success moments. Respects reduced motion */
  /* (spawns nothing; the mascot still bounces once).                      */
  /* ------------------------------------------------------------------ */
  PYP.celebrate = function () {
    var stage = document.querySelector('#marbleStage .ml-stage');
    if (!stage) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var emojis = ['✨', '⭐', '🎉', '🌟', '💫'];
    for (var i = 0; i < 16; i++) {
      var bit = document.createElement('span');
      bit.className = 'ml-confetti';
      bit.textContent = emojis[i % emojis.length];
      bit.style.left = (5 + Math.random() * 90) + '%';
      bit.style.animationDelay = (Math.random() * 0.35) + 's';
      bit.style.fontSize = (16 + Math.random() * 16) + 'px';
      stage.appendChild(bit);
      (function (el) { setTimeout(function () { el.remove(); }, 1900); })(bit);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Stage controller                                                     */
  /* ------------------------------------------------------------------ */
  var Stage = (PYP.stage = {
    course: null,
    root: null,
    activeEngine: null,
    activeModeIndex: 0,

    mount: function (course) {
      this.course = course;
      this.root = document.getElementById('marbleStage');
      if (!this.root) return;
      var self = this;
      if (course.theme3d || course.dark) this.root.setAttribute('data-ml-theme', 'dark');
      vocab.setLexicon(course.vocab || {});
      vocab.bind(this.root);

      // Cover
      this.root.innerHTML = '';
      var stage = PYP.el('div', 'ml-stage');
      var cover = PYP.el('div', 'ml-cover');
      cover.appendChild(this.buildCoverArt(course));
      var copy = PYP.el('div', 'ml-cover-copy');
      var kicker = PYP.el('p', 'ml-cover-kicker');
      kicker.textContent = course.kicker || 'A marble course';
      var q = PYP.el('h2', 'ml-cover-question');
      q.innerHTML = vocab.enrich(course.question);
      var start = PYP.el('button', 'ml-control ml-control--primary');
      start.type = 'button';
      start.innerHTML = PYP.icon('play') + '<span class="ml-button-label">Let’s find out</span>';
      start.addEventListener('click', function () {
        sfx.playClick();
        self.enterLesson();
      });
      copy.appendChild(kicker);
      copy.appendChild(q);
      copy.appendChild(start);
      cover.appendChild(copy);
      stage.appendChild(cover);
      this.root.appendChild(stage);

      // Cover must not leave assessment evidence and must hide lesson UI.
      TTS_MANAGER.init();
    },

    buildCoverArt: function (course) {
      // Hand-inked cover when the art libs are present; emoji cluster fallback.
    if (window.rough && PYP.draw && PYP.coverArt) {
      var box = PYP.el('div', 'ml-cover-art ml-cover-art--painted');
      var cv = document.createElement('canvas');
      box.appendChild(cv);
      if (PYP.coverArt.paint(course, cv)) return box;
    }
    var art = PYP.el('div', 'ml-cover-art');
      var blobs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      blobs.setAttribute('class', 'ml-cover-blobs');
      blobs.setAttribute('viewBox', '0 0 400 400');
      blobs.setAttribute('aria-hidden', 'true');
      var colors = course.artPalette || ['#FFE156', '#4ECDC4', '#FF6584', '#B388FF'];
      var positions = [[60, 70, 90], [300, 90, 70], [90, 300, 66], [310, 300, 84]];
      positions.forEach(function (p, i) {
        var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); c.setAttribute('r', p[2]);
        c.setAttribute('fill', colors[i % colors.length]);
        c.setAttribute('stroke', '#141414');
        c.setAttribute('stroke-width', '3');
        c.setAttribute('opacity', '0.55');
        blobs.appendChild(c);
      });
      art.appendChild(blobs);
      var emoji = PYP.el('div', 'ml-cover-emoji');
      emoji.setAttribute('aria-hidden', 'true');
      var line1 = PYP.el('span'); line1.textContent = (course.coverArt && course.coverArt[0]) || '✨';
      emoji.appendChild(line1);
      if (course.coverArt && course.coverArt.length > 1) {
        var line2 = PYP.el('span', 'ml-cover-emoji-2');
        line2.textContent = course.coverArt.slice(1).join(' ');
        emoji.appendChild(line2);
      }
      art.appendChild(emoji);
      return art;
    },

    enterLesson: function () {
      var course = this.course;
      var self = this;
      this.root.innerHTML = '';
      var stage = PYP.el('div', 'ml-stage');
      var lesson = PYP.el('div', 'ml-lesson');

      var explanation = PYP.el('aside', 'ml-explanation');
      // Speaker button leads the row: read-aloud is the instruction's primary
      // companion action, so it sits at the left edge (owner-set).
      var speakBtn = PYP.el('button', 'ml-control ml-control--icon-only ml-control--quiet ml-speak-instruction');
      speakBtn.type = 'button';
      speakBtn.setAttribute('aria-label', 'Read the instruction aloud');
      speakBtn.innerHTML = PYP.icon('sound');
      speakBtn.addEventListener('click', function () {
        var t = instruction.textContent || '';
        if (t.trim()) PYP.speakFollowAlong(instruction, t, speakBtn);
      });
      explanation.appendChild(speakBtn);
      var instruction = PYP.el('p', 'ml-instruction');
      instruction.setAttribute('role', 'status');
      instruction.setAttribute('aria-live', 'polite');
      explanation.appendChild(instruction);

      var modes = PYP.el('div', 'ml-modes');
      modes.setAttribute('role', 'tablist');
      modes.setAttribute('aria-label', 'Choose a way to play');

      // Learning journey: the four inquiry phases this course offers, filling
      // in as the child visits them (explore → understand → practice →
      // consolidate). Passive visual progress; no scoring.
      this.visitedPhases = {};
      this.journeyDone = false;
      var phases = [];
      course.modes.forEach(function (m) { if (phases.indexOf(m.phase) < 0) phases.push(m.phase); });
      if (phases.length >= 3) {
        var journey = PYP.el('div', 'ml-journey');
        journey.setAttribute('aria-hidden', 'true');
        var PHASE_ICON = { explore: '🔭', understand: '💡', cards: '🗂️', practice: '⚡', consolidate: '🎯' };
        var PHASE_NAME = { explore: 'Explore', understand: 'Understand', cards: 'Words', practice: 'Practice', consolidate: 'Show' };
        phases.forEach(function (ph) {
          var dot = PYP.el('span', 'ml-journey-dot phase-' + ph);
          dot.title = PHASE_NAME[ph];
          dot.textContent = PHASE_ICON[ph];
          journey.appendChild(dot);
        });
        modes.appendChild(journey);
      }

      course.modes.forEach(function (mode, i) {
        var tab = PYP.el('button', 'ml-control ml-mode-tab');
        tab.type = 'button';
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        tab.innerHTML = '<span aria-hidden="true">' + mode.icon + '</span><span class="ml-button-label">' + PYP.esc(mode.label) + '</span>';
        tab.addEventListener('click', function () {
          sfx.playClick();
          self.switchMode(i);
        });
        modes.appendChild(tab);
      });
      var replay = PYP.el('button', 'ml-control ml-control--icon-only ml-replay');
      replay.type = 'button';
      replay.setAttribute('aria-label', 'Back to the start');
      replay.title = 'Back to the start';
      replay.innerHTML = PYP.icon('replay');
      replay.addEventListener('click', function () {
        sfx.playClick();
        self.replay();
      });

      var mute = PYP.el('button', 'ml-control ml-control--icon-only ml-control--quiet ml-mute');
      mute.type = 'button';
      mute.setAttribute('aria-pressed', PYP.ttsIsMuted() ? 'true' : 'false');
      mute.setAttribute('aria-label', PYP.ttsIsMuted() ? 'Turn voice read-aloud on' : 'Turn voice read-aloud off');
      mute.title = 'Voice read-aloud';
      mute.innerHTML = PYP.ttsIsMuted() ? '🔇' : '🔊';
      mute.addEventListener('click', function () {
        var m = PYP.ttsToggleMute();
        mute.setAttribute('aria-pressed', m ? 'true' : 'false');
        mute.setAttribute('aria-label', m ? 'Turn voice read-aloud on' : 'Turn voice read-aloud off');
        mute.innerHTML = m ? '🔇' : '🔊';
        mute.classList.remove('hover-lift');
      });
      // Mute + replay travel as one group so toolbar wrapping never orphans
      // a lone icon button on its own row.
      var tools = PYP.el('span', 'ml-mode-tools');
      tools.appendChild(mute);
      tools.appendChild(replay);
      modes.appendChild(tools);
      // Vertical order: mode tabs (navigation) → instruction band (the current
      // task, changes per mode) → play area. In flow, so nothing can cover
      // the stage.
      stage.appendChild(modes);
      stage.appendChild(explanation);

      var playarea = PYP.el('main', 'ml-playarea');
      lesson.appendChild(playarea);
      stage.appendChild(lesson);
      this.root.appendChild(stage);

      this.instructionEl = instruction;
      this.explanationEl = explanation;
      this.playareaEl = playarea;
      this.modesEl = modes;
      this.instruct(this.welcomeText(course));
      this.switchMode(0);
    },

    welcomeText: function (course) {
      if (course.welcome) return course.welcome;
      if (course.band === 'early') return 'Play with the ' + (course.shortTitle || course.title).toLowerCase() + ' world first!';
      if (course.band === 'mid') return 'Start exploring, then take on the mission!';
      return 'Explore freely, then test yourself in the mission.';
    },

    instruct: function (text, opts) {
      opts = opts || {};
      if (!this.instructionEl) return;
      this.instructionEl.innerHTML = vocab.enrich(text);
      if (opts.speak !== false && !opts.isFeedback) PYP.ttsAuto(text, this.instructionEl);
    },

    checkJourneyComplete: function () {
      if (this.journeyDone) return;
      var all = this.modesEl.querySelectorAll('.ml-journey-dot');
      if (!all.length) return;
      var visited = this.modesEl.querySelectorAll('.ml-journey-dot.is-visited');
      if (visited.length === all.length) {
        this.journeyDone = true;
        setTimeout(function () {
          if (PYP.celebrate) PYP.celebrate();
        }, 400);
      }
    },

    switchMode: function (index) {
      if (this.activeEngine && this.activeEngine.destroy) {
        try { this.activeEngine.destroy(); } catch (e) { /* keep switching */ }
      }
      this.activeEngine = null;
      this.activeModeIndex = index;
      var course = this.course;
      var mode = course.modes[index];
      var tabs = this.modesEl.querySelectorAll('.ml-mode-tab');
      Array.prototype.forEach.call(tabs, function (t, i) {
        t.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      });
      this.playareaEl.innerHTML = '';

      // Journey progress: fill the phase dot and tick the visited tab once.
      if (mode.phase && !this.visitedPhases[mode.phase]) {
        this.visitedPhases[mode.phase] = true;
        var dot = this.modesEl.querySelector('.ml-journey-dot.phase-' + mode.phase);
        if (dot) dot.classList.add('is-visited');
        var tabs = this.modesEl.querySelectorAll('.ml-mode-tab');
        if (tabs[index]) tabs[index].classList.add('is-visited');
        this.checkJourneyComplete();
      }

      var EngineCls = PYP.engines[mode.engine];
      if (!EngineCls) {
        this.playareaEl.appendChild(PYP.el('p', 'spatial-fallback', 'This game could not load.'));
        return;
      }
      var ctx = {
        course: course,
        mode: mode,
        instruct: function (text, opts) { Stage.instruct(text, opts); },
        sfx: sfx,
        tts: TTS_MANAGER,
        vocab: vocab
      };
      this.activeEngine = new EngineCls(this.playareaEl, mode.config || {}, ctx);
    },

    // Replay: fresh cover, evidence cleared by destroying the engine.
    replay: function () {
      if (this.activeEngine && this.activeEngine.destroy) {
        try { this.activeEngine.destroy(); } catch (e) { /* ignore */ }
      }
      this.activeEngine = null;
      TTS_MANAGER.speak && window.speechSynthesis && window.speechSynthesis.cancel();
      this.mount(this.course);
    }
  });

  /* ------------------------------------------------------------------ */
  /* Boot                                                                 */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    var dataEl = document.getElementById('course-data');
    if (!dataEl || !PYP.stage) return;
    var course;
    try { course = JSON.parse(dataEl.textContent); } catch (e) { return; }
    PYP.stage.mount(course);
    // Replay button is created per lesson; wire a delegated replay control.
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.ml-replay')) {
        PYP.stage.replay();
      }
    });
  });
})();
