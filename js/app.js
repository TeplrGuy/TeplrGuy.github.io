// ============================================================================
// app.js — Main controller
// Tab switching, hash routing, Prism highlighting, typing animation, copy btn
// ============================================================================

(function () {
  'use strict';

  // ── State ───────────────────────────────────────────────────────────────
  let currentLang = 'yaml';
  let terminalInitialized = false;

  // ── DOM refs ────────────────────────────────────────────────────────────
  const tabs = document.querySelectorAll('.tab[data-lang]');
  const codeView = document.getElementById('code-view');
  const codeOutput = document.getElementById('code-output');
  const codeLangLabel = document.getElementById('code-lang-label');
  const terminalView = document.getElementById('terminal-view');
  const copyBtn = document.getElementById('copy-btn');
  const mobileDropdown = document.getElementById('mobile-lang-dropdown');
  const typingEl = document.getElementById('typing-title');

  // ── Typing Animation ───────────────────────────────────────────────────
  const titles = [
    'Sr. Solution Engineer — Dev Tools & AI',
    'Cloud Solution Architect',
    'Agentic DevOps Specialist',
    'Enterprise AI Strategist',
  ];

  let titleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let typeTimer = null;

  function animateTyping() {
    const current = titles[titleIdx];

    if (!deleting) {
      typingEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx >= current.length) {
        // Pause before deleting
        typeTimer = setTimeout(() => { deleting = true; animateTyping(); }, 2500);
        return;
      }
      typeTimer = setTimeout(animateTyping, 50 + Math.random() * 40);
    } else {
      typingEl.textContent = current.slice(0, charIdx);
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx = 0;
        titleIdx = (titleIdx + 1) % titles.length;
        typeTimer = setTimeout(animateTyping, 400);
        return;
      }
      typeTimer = setTimeout(animateTyping, 25);
    }
  }

  // ── View Switching ──────────────────────────────────────────────────────
  function switchToLang(lang) {
    currentLang = lang;

    // Update tabs
    tabs.forEach(tab => {
      tab.setAttribute('aria-selected', tab.dataset.lang === lang ? 'true' : 'false');
    });

    // Update mobile dropdown
    if (mobileDropdown) mobileDropdown.value = lang;

    // Update URL hash
    history.replaceState(null, '', '#' + lang);

    if (lang === 'terminal') {
      codeView.style.display = 'none';
      terminalView.style.display = 'block';

      if (!terminalInitialized) {
        ResumeTerminal.init('terminal-container');
        terminalInitialized = true;
      } else {
        ResumeTerminal.fit();
      }
    } else {
      terminalView.style.display = 'none';
      codeView.style.display = 'block';

      // Render code
      const renderer = LanguageRenderer[lang];
      if (renderer) {
        const code = renderer(RESUME);
        const prismClass = LANG_TO_PRISM[lang] || 'language-markup';

        codeOutput.className = prismClass;
        codeOutput.textContent = code;

        // Re-highlight
        if (window.Prism) {
          Prism.highlightElement(codeOutput);
        }

        // Update label
        codeLangLabel.textContent = LANG_LABELS[lang] || lang.toUpperCase();
      }
    }
  }

  // ── Tab Click Handlers ──────────────────────────────────────────────────
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchToLang(tab.dataset.lang);
    });
  });

  // ── Mobile Dropdown ─────────────────────────────────────────────────────
  if (mobileDropdown) {
    mobileDropdown.addEventListener('change', (e) => {
      switchToLang(e.target.value);
    });
  }

  // ── Copy Button ─────────────────────────────────────────────────────────
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = codeOutput.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.querySelector('span').textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.querySelector('span').textContent = 'Copy';
        }, 2000);
      });
    });
  }

  // ── Keyboard Navigation ────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    // Number keys 1-7 switch tabs
    if (e.key >= '1' && e.key <= '7' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const target = document.activeElement;
      // Don't intercept if typing in terminal or input
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('#terminal-container'))) return;

      const langs = ['yaml', 'python', 'java', 'csharp', 'typescript', 'markdown', 'terminal'];
      const idx = parseInt(e.key) - 1;
      if (idx < langs.length) {
        e.preventDefault();
        switchToLang(langs[idx]);
      }
    }
  });

  // ── Hash Routing ────────────────────────────────────────────────────────
  function initFromHash() {
    const hash = window.location.hash.slice(1).toLowerCase();
    const validLangs = ['yaml', 'python', 'java', 'csharp', 'typescript', 'markdown', 'terminal'];
    if (validLangs.includes(hash)) {
      switchToLang(hash);
    } else {
      switchToLang('yaml');
    }
  }

  window.addEventListener('hashchange', initFromHash);

  // ── Init ────────────────────────────────────────────────────────────────
  initFromHash();
  animateTyping();

})();
