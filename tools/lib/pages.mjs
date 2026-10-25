/* ==========================================================================
   pages.mjs — HTML templates for course pages and the hub.
   Shell = IB PYP neobrutalism (pyp.css); stage = Marble (stage.css).
   All links are relative so the site works under GitHub Pages subpaths.
   ========================================================================== */

const EMOJI_FAVICON = (emoji) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">${emoji}</text></svg>`)}`;

const TTS_MARKUP = `
      <!-- TTS accent control (top right) -->
      <div class="tts-dropdown-wrap" id="ttsDropdownWrap">
        <button type="button" class="tts-trigger" id="ttsTrigger" aria-haspopup="menu" aria-expanded="false" title="Select voice accent">
          <span class="tts-trigger-flag" id="ttsFlag">🇬🇧</span>
          <span class="tts-trigger-label" id="ttsLabel">Voice</span>
          <span class="tts-arrow">▾</span>
        </button>
        <div class="tts-menu" id="ttsMenu" role="menu">
          <div class="tts-menu-header">Select voice accent</div>
          <div class="tts-radio-group" id="ttsRadioList" role="radiogroup"></div>
        </div>
      </div>`;

const FOOTER = (fontPath) => `
      <footer class="site-footer">
        <div class="footer-credits">
          <span><strong>Course data</strong> <a href="https://github.com/withmarbleapp/os-taxonomy" rel="noopener">Marble Skill Taxonomy</a> · ODbL-1.0 / CC-BY-SA-4.0</span>
          <span><strong>Inquiry game patterns</strong> adapted from <a href="https://github.com/szkane/ib-pyp-html5-generator" rel="noopener">ib-pyp-html5-generator</a> and the Marble builder guidelines</span>
          <span><strong>Type &amp; 3D</strong> <a href="${fontPath}" rel="noopener">Baloo 2 (SIL OFL)</a> · three.js (MIT)</span>
        </div>
        <div class="footer-note">Built for IB PYP inquiry · No accounts, no tracking · Child-facing pages stay offline-first</div>
      </footer>`;

const ENGINE_FILES = {
  'concept-lab': 'concept-lab.js',
  'mission': 'mission.js',
  'flashcards': 'flashcards.js',
  'sorter': 'sorter.js',
  'sequence': 'sequence.js',
  'arcade': 'arcade.js',
  'decision': 'decision.js',
  'doctor': 'doctor.js',
  'worksheet': 'worksheet.js',
  'spatial3d': 'spatial3d.js',
  'memory': 'memory.js',
  'word-builder': 'word-builder.js',
  'solar3d': 'solar3d.js',
  'volcano3d': 'volcano3d.js',
  'geometry3d': 'geometry3d.js',
  'optics3d': 'optics3d.js',
  'diorama3d': 'diorama3d.js',
  'storybook': 'storybook.js',
};
const THREE_ENGINES = ['spatial3d', 'solar3d', 'volcano3d', 'geometry3d', 'optics3d', 'diorama3d'];

function subjectSlug(subject) {
  return subject.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-');
}

/* --------------------------------------------------------------- */
/* Course page                                                       */
/* --------------------------------------------------------------- */

export function coursePage(course) {
  const engines = [...new Set(course.modes.map((m) => m.engine))];
  const needsScenes = engines.includes('concept-lab');
  const scriptTags = [
    `<script src="../assets/vendor/rough.js"></script>`,
    `<script src="../assets/js/story-actors.js"></script>`,
    `<script src="../assets/js/cover-art.js"></script>`,
  ];
  if (needsScenes) scriptTags.push(`<script src="../assets/js/scenes.js"></script>`);
  if (engines.includes('concept-lab')) {
    scriptTags.push(`<script src="../assets/vendor/konva.min.js"></script>`);
    scriptTags.push(`<script src="../assets/vendor/lottie.min.js"></script>`);
  }
  if (engines.includes('storybook')) {
    scriptTags.push(`<script src="../assets/vendor/rough.js"></script>`);
    scriptTags.push(`<script src="../assets/vendor/konva.min.js"></script>`);
    scriptTags.push(`<script src="../assets/js/story-actors.js"></script>`);
  }
  scriptTags.push(`<script src="../assets/js/core.js"></script>`);
  for (const e of engines) scriptTags.push(`<script src="../assets/js/engines/${ENGINE_FILES[e]}"></script>`);
  if (engines.some((e) => THREE_ENGINES.includes(e))) {
    scriptTags.unshift(`<script src="../assets/vendor/three.min.js"></script>`);
    scriptTags.push(`<!-- three.js r186 bundled locally · MIT License · threejs.org -->`);
  }

  const topicsHtml = course.topics
    .map(
      (t) => `<li><span class="learn-emoji" aria-hidden="true">${course.emoji}</span><span><strong>${esc(t.name)}</strong>${t.desc ? ` — ${esc(t.desc)}` : ''}</span></li>`
    )
    .join('\n');

  const misconHtml = course.misconceptions.length
    ? course.misconceptions
        .map(
          (m) => `<div class="misconception"><strong>${esc(m.topic)}</strong>${esc(m.pattern)}${m.nextMove ? `<em>Next step: ${esc(m.nextMove)}</em>` : ''}</div>`
        )
        .join('\n')
    : '<p>No researched misconceptions recorded for this course yet.</p>';

  const payload = JSON.stringify(course).replace(/</g, '\\u003c');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(course.title)} · Age ${course.age} · PYP Marble Courses</title>
  <meta name="description" content="${escAttr(course.summary)}" />
  <link rel="icon" href="${EMOJI_FAVICON(course.emoji)}" />
  <link rel="stylesheet" href="../assets/css/pyp.css" />
  <link rel="stylesheet" href="../assets/css/stage.css" />
</head>
<body>
  <div class="container pyp-chrome">
    <nav class="nav-bar">
      <div class="nav-left">
        <a class="pyp-map-link" href="../index.html">← All courses</a>
        <span class="unit-tag unit-tag--subject-${subjectSlug(course.subject)}">${course.emoji} ${esc(course.subject)}</span>
        <span class="unit-tag unit-tag--theme">Age ${course.age}</span>
      </div>
      <div class="nav-right">
${TTS_MARKUP}
        <button type="button" class="btn btn--white grownups-toggle" id="adultToggle" aria-expanded="false" aria-controls="adultPanel">👩‍🏫 Grown-ups</button>
      </div>
    </nav>

    <main class="child-zone" aria-label="Play ${esc(course.title)}">
      <section class="marble-learning" id="marbleStage" data-band="${course.band}" aria-label="Interactive course stage"${course.dark ? ' data-ml-theme="dark"' : ''}></section>
    </main>

    <section class="adult-panel" id="adultPanel" hidden>
      <div class="adult-panel-head">
        <h2>👩‍🏫 For grown-ups${course.draft ? ' · <span class="draft-note">Draft course</span>' : ''}</h2>
        <p class="adult-panel-sub">Unit framing, learning goals and teaching notes — kept out of the child’s play space by default. <button type="button" class="btn-speaker" id="btnSpeakSummary" aria-label="Read the course summary aloud">🔊</button></p>
      </div>

      <section class="card uoi-card" aria-label="Unit of inquiry">
        <div class="uoi-grid">
          <div class="uoi-cell">
            <h3>🌐 Transdisciplinary theme</h3>
            <p>${esc(course.theme)}</p>
          </div>
          <div class="uoi-cell">
            <h3>💡 Central idea (suggested)</h3>
            <p>${esc(course.centralIdea)}</p>
          </div>
          <div class="uoi-cell">
            <h3>🧭 Lines of inquiry (suggested)</h3>
            <ul>
              ${course.linesOfInquiry.map((l) => `<li>${esc(l)}</li>`).join('\n            ')}
            </ul>
          </div>
          <div class="uoi-cell">
            <h3>🔑 Key concepts</h3>
            <div class="chip-row">${course.keyConcepts.map((c) => `<span class="chip">${esc(c)}</span>`).join('')}</div>
          </div>
          <div class="uoi-cell">
            <h3>🌱 Learner profile</h3>
            <div class="chip-row">${course.learnerProfile.map((c) => `<span class="chip">${esc(c)}</span>`).join('')}</div>
          </div>
          <div class="uoi-cell">
            <h3>🛠️ ATL skills</h3>
            <div class="chip-row">${course.atl.map((c) => `<span class="chip">${esc(c)}</span>`).join('')}</div>
          </div>
        </div>
        <p class="uoi-note">PYP framing is a suggested mapping from the subject and domain — align it with your school’s programme of inquiry. Learning goals come from the Marble Skill Taxonomy.</p>
      </section>

      <section class="card learn-card" aria-label="What you will learn">
        <h2>🎯 What you’ll learn</h2>
        <ul class="learn-list">
${topicsHtml}
        </ul>
      </section>

      <details class="grownups" open>
        <summary>📖 Goals, common misconceptions &amp; printable ideas</summary>
        <div class="grownups-body">
          <h3>Learning goal</h3>
          <p>${esc(course.summary)}</p>
          <h3>Common misconceptions (from teaching research)</h3>
          ${misconHtml}
          ${course.poeTask ? `<h3>Try at home (predict–observe–explain)</h3><p>${esc(course.poeTask)}</p>` : ''}
          ${course.activities.length ? `<h3>Activity ideas</h3><ul>${course.activities.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
          ${course.homeReading ? `<h3>Read at home (real picture books, paired to each strategy)</h3><ul>${course.homeReading.map((b) => `<li>${esc(b)}</li>`).join('')}</ul><p class="uoi-note">Suggested titles for shared reading — borrow from your library. The interactive course uses our own public-domain retellings.</p>` : ''}
          <h3>How this course works</h3>
          <p>${course.stats.topicCount} learning goals, ${course.stats.researchCount} with research digests. Evidence of understanding comes from the child’s committed answers inside the games (the “Mission check” mode) — described for this session, not as a lasting grade. Research digests are assistive summaries and were generated with AI assistance; review before classroom use.</p>
        </div>
      </details>
    </section>
${FOOTER('../assets/fonts/OFL.txt')}
  </div>

  <script id="course-data" type="application/json">${payload}</script>
${scriptTags.join('\n')}
  <script>
    // Adult panel toggle — collapsed by default; the child never needs it.
    (function () {
      var toggle = document.getElementById('adultToggle');
      var panel = document.getElementById('adultPanel');
      toggle.addEventListener('click', function () {
        var open = panel.hasAttribute('hidden');
        if (open) panel.removeAttribute('hidden');
        else panel.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      var speakBtn = document.getElementById('btnSpeakSummary');
      speakBtn.addEventListener('click', function () {
        var data = JSON.parse(document.getElementById('course-data').textContent);
        speakBtn.classList.add('speaking');
        PYP.TTS_MANAGER.speak(data.title + '. ' + data.summary, function () { speakBtn.classList.remove('speaking'); }, speakBtn);
      });
    })();
  </script>
</body>
</html>
`;
}

/* --------------------------------------------------------------- */
/* Hub page                                                          */
/* --------------------------------------------------------------- */

export function hubPage(courses) {
  const subjects = [...new Set(courses.map((c) => c.subject))].sort();
  const GRADE_ORDER = ['K', 'G1', 'G2', 'G3', 'G4', 'G5'];
  const grades = [...new Set(courses.map((c) => c.grade))].sort((a, b) => GRADE_ORDER.indexOf(a) - GRADE_ORDER.indexOf(b));
  const indexData = courses.map((c) => ({
    slug: c.slug,
    title: c.title,
    subject: c.subject,
    domain: c.domain,
    age: c.age,
    grade: c.grade,
    gradeLabel: c.gradeLabel,
    theme: c.theme,
    emoji: c.emoji,
    question: c.question,
    centralIdea: c.centralIdea,
    topicCount: c.stats.topicCount,
    modes: c.modes.map((m) => m.icon + ' ' + m.label),
  }));

  const subjectChips = subjects
    .map((s) => `<button type="button" class="filter-chip" data-filter="subject" data-value="${escAttr(s)}" aria-pressed="false">${esc(s)}</button>`)
    .join('\n        ');
  const gradeChips = grades
    .map((g) => `<button type="button" class="filter-chip" data-filter="grade" data-value="${escAttr(g)}" aria-pressed="false">${g === 'K' ? 'K' : esc(g)}</button>`)
    .join('\n        ');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PYP Marble Courses · ${courses.length} inquiry courses for ages 5–10</title>
  <meta name="description" content="All ${courses.length} IB PYP courses from the Marble Skill Taxonomy as interactive, explorable web lessons — explore labs, missions, sorting games, 3D space and more." />
  <link rel="icon" href="${EMOJI_FAVICON('🧩')}" />
  <link rel="stylesheet" href="assets/css/pyp.css" />
  <link rel="stylesheet" href="assets/css/stage.css" />
</head>
<body>
  <div class="container pyp-chrome">
    <nav class="nav-bar">
      <div class="nav-left">
        <span class="unit-tag unit-tag--theme">🧩 PYP Marble Courses</span>
      </div>
${TTS_MARKUP}
    </nav>

    <section class="hub-hero">
      <h1>Every course. One playground. 🧩</h1>
      <p>${courses.length} IB Primary Years courses from the Marble Skill Taxonomy — each with an explorable marble stage, a mission check, and grown-up notes. Pick a subject, pick an age, and play.</p>
      <div class="hero-badges">
        <span class="stat-badge">📚 ${courses.length} courses</span>
        <span class="stat-badge">🧒 Ages 5–10 · K–G5</span>
        <span class="stat-badge">🎮 ${[...new Set(courses.flatMap((c) => c.modes.map((m) => m.engine)))].length} game engines</span>
        <span class="stat-badge">🔬 Research-backed</span>
      </div>
      <div class="hub-deco" aria-hidden="true">🧮🔬📚🪐</div>
    </section>

    <div class="filter-bar" role="group" aria-label="Filter courses">
      <button type="button" class="filter-chip" data-filter="subject" data-value="" aria-pressed="true">All subjects</button>
      ${subjectChips}
    </div>
    <div class="filter-bar" role="group" aria-label="Filter by grade">
      <button type="button" class="filter-chip" data-filter="grade" data-value="" aria-pressed="true">All grades</button>
      ${gradeChips}
    </div>
    <div class="filter-bar">
      <input class="filter-search" id="searchInput" type="search" placeholder="Search courses… (fractions, Egypt, sound)" aria-label="Search courses" />
    </div>

    <main class="courses-grid" id="coursesGrid" aria-live="polite"></main>
    <div class="hub-empty" id="hubEmpty" hidden>No courses match those filters — try clearing one. 🙂</div>
${FOOTER('assets/fonts/OFL.txt')}
  </div>

  <script src="data/courses.js"></script>
  <script src="assets/js/core.js"></script>
  <script>
    (function () {
      var COURSES = window.PYP_COURSES || [];
      var grid = document.getElementById('coursesGrid');
      var empty = document.getElementById('hubEmpty');
      var state = { subject: '', grade: '', q: '' };

      function render() {
        var list = COURSES.filter(function (c) {
          if (state.subject && c.subject !== state.subject) return false;
          if (state.grade && c.grade !== state.grade) return false;
          if (state.q) {
            var hay = (c.title + ' ' + c.subject + ' ' + c.theme + ' ' + c.question).toLowerCase();
            if (hay.indexOf(state.q) < 0) return false;
          }
          return true;
        });
        grid.innerHTML = list.map(card).join('');
        empty.hidden = list.length > 0;
        if (list.length && window.PYP && PYP.TTS_MANAGER) PYP.TTS_MANAGER.init();
      }

      function card(c) {
        var subjectClass = 'cc-tag--subject-' + c.subject.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-');
        var draftTag = c.draft ? '<span class="cc-tag cc-tag--draft" title="Auto-derived framing — no curated summary in the taxonomy yet">Draft</span>' : '';
        return '<a class="course-card" href="courses/' + c.slug + '.html">' +
          '<div class="cc-top"><span class="cc-emoji" aria-hidden="true">' + c.emoji + '</span>' +
          '<div class="cc-tags"><span class="cc-tag ' + subjectClass + '">' + esc(c.subject) + '</span>' +
          '<span class="cc-tag">Age ' + c.age + ' · ' + esc(c.gradeLabel) + '</span>' + draftTag + '</div></div>' +
          '<h2>' + esc(c.title) + '</h2>' +
          '<p class="cc-question">' + esc(c.question) + '</p>' +
          '<div class="cc-modes">' + c.modes.map(function (m) { return '<span class="cc-mode">' + esc(m) + '</span>'; }).join('') + '</div>' +
          '</a>';
      }

      function esc(s) {
        return String(s).replace(/[&<>"']/g, function (ch) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
      }

      var STORE_KEY = 'pyp_hub_filters';
      function saveState() {
        try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
      }

      document.querySelectorAll('.filter-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          var kind = chip.getAttribute('data-filter');
          var value = chip.getAttribute('data-value');
          var group = document.querySelectorAll('.filter-chip[data-filter="' + kind + '"]');
          group.forEach(function (g) { g.setAttribute('aria-pressed', 'false'); });
          chip.setAttribute('aria-pressed', 'true');
          state[kind] = value;
          saveState();
          render();
        });
      });
      document.getElementById('searchInput').addEventListener('input', function (e) {
        state.q = e.target.value.trim().toLowerCase();
        saveState();
        render();
      });

      // Restore the visitor's last filters (e.g. after returning from a course).
      (function restore() {
        var saved = null;
        try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) {}
        if (!saved) return;
        state.subject = saved.subject || '';
        state.grade = saved.grade || '';
        state.q = saved.q || '';
        document.querySelectorAll('.filter-chip').forEach(function (g) {
          var kind = g.getAttribute('data-filter');
          var value = g.getAttribute('data-value');
          g.setAttribute('aria-pressed', (state[kind] || '') === value ? 'true' : 'false');
        });
        document.getElementById('searchInput').value = state.q;
      })();

      render();
      document.addEventListener('DOMContentLoaded', function () {
        if (window.PYP && PYP.TTS_MANAGER) PYP.TTS_MANAGER.init();
      });
    })();
  </script>
</body>
</html>
`;
}

function esc(s) {
  return String(s).replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]));
}
function escAttr(s) {
  return esc(s).replace(/"/g, '&quot;');
}
