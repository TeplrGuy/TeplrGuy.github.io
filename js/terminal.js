// ============================================================================
// terminal.js — Interactive terminal experience using xterm.js
// Commands: help, whoami, experience, skills, education, contact, download,
//           linkedin, clear, git log, neofetch, sudo hire gilbert, cat README.md
// ============================================================================

const ResumeTerminal = {
  term: null,
  fitAddon: null,
  currentLine: '',
  history: [],
  historyIndex: -1,

  ASCII_ART: `\x1b[38;5;141m
   ██████╗  █████╗ 
  ██╔════╝ ██╔══██╗
  ██║  ███╗███████║
  ██║   ██║██╔══██║
  ╚██████╔╝██║  ██║
   ╚═════╝ ╚═╝  ╚═╝\x1b[0m`,

  WELCOME: `\x1b[38;5;243m──────────────────────────────────────────────────────\x1b[0m
\x1b[1;38;5;141m  Gilbert Appiah\x1b[0m — \x1b[38;5;114mResume Agent v2025.1\x1b[0m
\x1b[38;5;243m  Sr. Solution Engineer | Microsoft\x1b[0m
\x1b[38;5;243m  Type \x1b[1;38;5;75mhelp\x1b[0;38;5;243m for available commands\x1b[0m
\x1b[38;5;243m──────────────────────────────────────────────────────\x1b[0m
`,

  PROMPT: '\x1b[38;5;141m~/gilbert-appiah\x1b[0m \x1b[38;5;114m$\x1b[0m ',

  init(containerId) {
    if (typeof Terminal === 'undefined') return;

    this.term = new Terminal({
      theme: {
        background: '#0d1117',
        foreground: '#e6edf3',
        cursor: '#58a6ff',
        cursorAccent: '#0d1117',
        selectionBackground: '#264f78',
        black: '#0d1117',
        red: '#ff7b72',
        green: '#7ee787',
        yellow: '#d29922',
        blue: '#58a6ff',
        magenta: '#d2a8ff',
        cyan: '#39d353',
        white: '#e6edf3',
      },
      fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace",
      fontSize: 14,
      lineHeight: 1.4,
      cursorBlink: true,
      cursorStyle: 'bar',
      allowProposedApi: true,
    });

    if (typeof FitAddon !== 'undefined') {
      this.fitAddon = new FitAddon.FitAddon();
      this.term.loadAddon(this.fitAddon);
    }

    const container = document.getElementById(containerId);
    this.term.open(container);
    if (this.fitAddon) this.fitAddon.fit();

    // Welcome
    this.term.writeln(this.ASCII_ART);
    this.term.writeln(this.WELCOME);
    this.writePrompt();

    // Input handling
    this.term.onKey(({ key, domEvent }) => {
      const code = domEvent.keyCode;

      if (code === 13) { // Enter
        this.term.writeln('');
        this.handleCommand(this.currentLine.trim());
        this.currentLine = '';
        this.historyIndex = -1;
      } else if (code === 8) { // Backspace
        if (this.currentLine.length > 0) {
          this.currentLine = this.currentLine.slice(0, -1);
          this.term.write('\b \b');
        }
      } else if (code === 38) { // Up arrow
        if (this.history.length > 0) {
          if (this.historyIndex < this.history.length - 1) this.historyIndex++;
          this.replaceCurrentLine(this.history[this.history.length - 1 - this.historyIndex]);
        }
      } else if (code === 40) { // Down arrow
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.replaceCurrentLine(this.history[this.history.length - 1 - this.historyIndex]);
        } else {
          this.historyIndex = -1;
          this.replaceCurrentLine('');
        }
      } else if (code === 9) { // Tab
        domEvent.preventDefault();
        this.autocomplete();
      } else if (key.length === 1 && !domEvent.ctrlKey && !domEvent.altKey) {
        this.currentLine += key;
        this.term.write(key);
      } else if (domEvent.ctrlKey && domEvent.key === 'l') {
        domEvent.preventDefault();
        this.term.clear();
        this.writePrompt();
      }
    });

    // Resize handling
    window.addEventListener('resize', () => {
      if (this.fitAddon) this.fitAddon.fit();
    });
  },

  replaceCurrentLine(text) {
    // Clear current line
    const count = this.currentLine.length;
    for (let i = 0; i < count; i++) this.term.write('\b \b');
    this.currentLine = text;
    this.term.write(text);
  },

  autocomplete() {
    const cmds = Object.keys(this.commands);
    const matches = cmds.filter(c => c.startsWith(this.currentLine.toLowerCase()));
    if (matches.length === 1) {
      this.replaceCurrentLine(matches[0]);
    } else if (matches.length > 1) {
      this.term.writeln('');
      this.term.writeln(matches.map(m => `  \x1b[38;5;75m${m}\x1b[0m`).join('    '));
      this.writePrompt();
      this.term.write(this.currentLine);
    }
  },

  writePrompt() {
    this.term.write(this.PROMPT);
  },

  handleCommand(input) {
    if (!input) {
      this.writePrompt();
      return;
    }

    this.history.push(input);

    const parts = input.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    // Special multi-word commands
    if (input.toLowerCase() === 'sudo hire gilbert') {
      this.commands['sudo hire gilbert'].call(this);
    } else if (input.toLowerCase().startsWith('git log')) {
      this.commands['git log'].call(this);
    } else if (input.toLowerCase().startsWith('cat readme') || input.toLowerCase() === 'cat readme.md') {
      this.commands['cat readme.md'].call(this);
    } else if (this.commands[cmd]) {
      this.commands[cmd].call(this, args);
    } else {
      this.term.writeln(`\x1b[38;5;203mcommand not found: ${this.escapeText(cmd)}\x1b[0m`);
      this.term.writeln(`\x1b[38;5;243mType \x1b[1;38;5;75mhelp\x1b[0;38;5;243m for available commands\x1b[0m`);
    }

    if (cmd !== 'clear') this.writePrompt();
  },

  escapeText(text) {
    return text.replace(/[<>&"']/g, '');
  },

  commands: {
    help() {
      const cmds = [
        ['whoami',              'Display professional profile'],
        ['experience',          'List all roles (--current for current only)'],
        ['skills',              'Technical skills (--ai, --cloud, --dev, --arch)'],
        ['education',           'Education & certifications'],
        ['contact',             'Contact information'],
        ['download',            'Download resume as PDF'],
        ['linkedin',            'Open LinkedIn profile'],
        ['neofetch',            'System-info style profile display'],
        ['git log',             'Career history as git commits'],
        ['cat readme.md',       'View the Markdown resume'],
        ['sudo hire gilbert',   '🤔 Try it...'],
        ['clear',               'Clear the terminal'],
        ['help',                'Show this help message'],
      ];

      this.term.writeln('');
      this.term.writeln('\x1b[1;38;5;141m  Available Commands\x1b[0m');
      this.term.writeln('\x1b[38;5;243m  ─────────────────────────────────────────────\x1b[0m');
      cmds.forEach(([cmd, desc]) => {
        const padded = cmd.padEnd(22);
        this.term.writeln(`  \x1b[38;5;75m${padded}\x1b[0m \x1b[38;5;243m${desc}\x1b[0m`);
      });
      this.term.writeln('');
    },

    whoami() {
      this.term.writeln('');
      this.term.writeln(`\x1b[1;38;5;141m  ${RESUME.meta.name}\x1b[0m`);
      this.term.writeln(`\x1b[38;5;114m  ${RESUME.experience[0].title}\x1b[0m`);
      this.term.writeln(`\x1b[38;5;243m  ${RESUME.experience[0].company}\x1b[0m`);
      this.term.writeln('');
      // Wrap profile text
      const words = RESUME.profile.split(' ');
      let line = '  ';
      words.forEach(w => {
        if ((line + w).length > 70) {
          this.term.writeln(`\x1b[38;5;252m${line}\x1b[0m`);
          line = '  ';
        }
        line += w + ' ';
      });
      if (line.trim()) this.term.writeln(`\x1b[38;5;252m${line}\x1b[0m`);
      this.term.writeln('');
    },

    experience(args) {
      const roles = (args && args.includes('--current'))
        ? [RESUME.experience[0]]
        : RESUME.experience;

      this.term.writeln('');
      roles.forEach(exp => {
        this.term.writeln(`\x1b[1;38;5;75m  ${exp.company}\x1b[0m — \x1b[38;5;141m${exp.title}\x1b[0m`);
        this.term.writeln(`\x1b[38;5;243m  ${exp.period}\x1b[0m`);
        exp.achievements.forEach(a => {
          this.term.writeln(`\x1b[38;5;114m    ▸\x1b[0m ${a}`);
        });
        this.term.writeln('');
      });

      if (!args || !args.includes('--current')) {
        this.term.writeln('\x1b[1;38;5;220m  Startups & Projects\x1b[0m');
        this.term.writeln('\x1b[38;5;243m  ─────────────────────────────────────────────\x1b[0m');
        RESUME.startupsAndProjects.forEach(sp => {
          this.term.writeln(`\x1b[1;38;5;75m  ${sp.company}\x1b[0m — \x1b[38;5;141m${sp.title}\x1b[0m`);
          this.term.writeln(`\x1b[38;5;243m  ${sp.period}\x1b[0m`);
          sp.achievements.forEach(a => {
            this.term.writeln(`\x1b[38;5;114m    ▸\x1b[0m ${a}`);
          });
          this.term.writeln('');
        });
      }
    },

    skills(args) {
      const filter = args && args[0] ? args[0].replace('--', '') : null;
      const filterMap = {
        ai:    'AI & Automation',
        cloud: 'Cloud & DevOps',
        dev:   'Full-Stack Engineering',
        arch:  'Architecture & Strategy',
      };

      this.term.writeln('');
      Object.entries(RESUME.skills).forEach(([cat, items]) => {
        if (filter && filterMap[filter] && filterMap[filter] !== cat) return;
        this.term.writeln(`\x1b[1;38;5;141m  ${cat}\x1b[0m`);
        items.forEach(s => {
          this.term.writeln(`\x1b[38;5;114m    ●\x1b[0m ${s}`);
        });
        this.term.writeln('');
      });
    },

    education() {
      this.term.writeln('');
      this.term.writeln('\x1b[1;38;5;141m  Education\x1b[0m');
      RESUME.education.forEach(e => {
        this.term.writeln(`  \x1b[38;5;75m${e.degree}\x1b[0m`);
        this.term.writeln(`  \x1b[38;5;243m${e.institution}\x1b[0m`);
      });
      this.term.writeln('');
      this.term.writeln('\x1b[1;38;5;141m  Certifications\x1b[0m');
      RESUME.certifications.forEach(c => {
        this.term.writeln(`  \x1b[38;5;114m  ✓\x1b[0m ${c}`);
      });
      this.term.writeln('');
      this.term.writeln('\x1b[1;38;5;141m  Awards\x1b[0m');
      RESUME.awards.forEach(a => {
        this.term.writeln(`  \x1b[38;5;220m  🏆\x1b[0m ${a}`);
      });
      this.term.writeln('');
    },

    contact() {
      this.term.writeln('');
      this.term.writeln(`  \x1b[38;5;75m📧  Email:\x1b[0m     ${RESUME.meta.email}`);
      this.term.writeln(`  \x1b[38;5;75m📱  Phone:\x1b[0m     ${RESUME.meta.phone}`);
      this.term.writeln(`  \x1b[38;5;75m🔗  LinkedIn:\x1b[0m  ${RESUME.meta.linkedinShort}`);
      this.term.writeln(`  \x1b[38;5;75m🐙  GitHub:\x1b[0m    ${RESUME.meta.githubShort}`);
      this.term.writeln(`  \x1b[38;5;75m🌐  Website:\x1b[0m   ${RESUME.meta.website}`);
      this.term.writeln('');
    },

    download() {
      this.term.writeln('\x1b[38;5;114m  ⬇  Downloading resume PDF...\x1b[0m');
      const a = document.createElement('a');
      a.href = RESUME.meta.resumePdf;
      a.download = 'Gilbert_Appiah_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.term.writeln('\x1b[38;5;114m  ✓  Download started!\x1b[0m');
      this.term.writeln('');
    },

    linkedin() {
      this.term.writeln(`\x1b[38;5;114m  🔗  Opening LinkedIn → ${RESUME.meta.linkedinShort}\x1b[0m`);
      window.open(RESUME.meta.linkedin, '_blank', 'noopener');
      this.term.writeln('');
    },

    clear() {
      this.term.clear();
      this.writePrompt();
    },

    neofetch() {
      const info = [
        `\x1b[1;38;5;141m${RESUME.meta.name}\x1b[0m\x1b[38;5;243m@\x1b[0m\x1b[38;5;75mmicrosoft\x1b[0m`,
        `\x1b[38;5;243m─────────────────────────────\x1b[0m`,
        `\x1b[38;5;75mRole:\x1b[0m        ${RESUME.experience[0].title}`,
        `\x1b[38;5;75mCompany:\x1b[0m     ${RESUME.experience[0].company}`,
        `\x1b[38;5;75mSince:\x1b[0m       ${RESUME.experience[0].period}`,
        `\x1b[38;5;75mOS:\x1b[0m          Azure Cloud / GitHub`,
        `\x1b[38;5;75mShell:\x1b[0m       GitHub Copilot CLI`,
        `\x1b[38;5;75mIDE:\x1b[0m         VS Code + Copilot Agent Mode`,
        `\x1b[38;5;75mLanguages:\x1b[0m   C#, Java, Python, TypeScript, Swift`,
        `\x1b[38;5;75mInfra:\x1b[0m       Docker, Kubernetes, GitHub Actions`,
        `\x1b[38;5;75mAI Stack:\x1b[0m    Copilot, Azure AI Foundry, MCP`,
        `\x1b[38;5;75mUptime:\x1b[0m      7+ years in production`,
        `\x1b[38;5;75mStatus:\x1b[0m      \x1b[38;5;114m● Open to new challenges\x1b[0m`,
        ``,
        `\x1b[40m  \x1b[41m  \x1b[42m  \x1b[43m  \x1b[44m  \x1b[45m  \x1b[46m  \x1b[47m  \x1b[0m`,
      ];

      const artLines = this.ASCII_ART.split('\n').filter(l => l);
      this.term.writeln('');

      const maxLines = Math.max(artLines.length, info.length);
      for (let i = 0; i < maxLines; i++) {
        const artLine = (artLines[i] || '').padEnd(28);
        const infoLine = info[i] || '';
        this.term.writeln(`${artLine}  ${infoLine}`);
      }
      this.term.writeln('');
    },

    'git log'() {
      this.term.writeln('');
      // Career as git commits (newest first)
      const commits = [
        { hash: 'a1b2c3d', date: '2025-08', msg: 'feat: promoted to Sr. Solution Engineer — Dev Tools & AI', tag: 'HEAD -> main' },
        { hash: 'e4f5g6h', date: '2023-10', msg: 'feat: 🏆 Won Microsoft Global Hackathon 2023', tag: null },
        { hash: 'i7j8k9l', date: '2022-03', msg: 'feat: promoted to Sr. Cloud Solution Architect', tag: null },
        { hash: 'm0n1o2p', date: '2020-06', msg: 'feat: joined Microsoft as Azure Escalation Engineer', tag: null },
        { hash: 'q3r4s5t', date: '2019-05', msg: 'feat: Architect/Full-Stack at Ally Financial', tag: null },
        { hash: 'y9z0a1b', date: '2019-01', msg: 'feat: iOS Developer at Regulur Inc', tag: null },
        { hash: 'c2d3e4f', date: '2018-05', msg: 'feat: Software Engineer at US Naval Undersea Warfare Center', tag: null },
        { hash: 'g5h6i7j', date: '2017-07', msg: 'feat: co-founded Teplr — mobile development', tag: null },
        { hash: 'u6v7w8x', date: '2015-05', msg: 'init: B.S. Computer Science — UMass Dartmouth', tag: 'v1.0.0' },
      ];

      commits.forEach(c => {
        const tag = c.tag ? ` \x1b[38;5;220m(${c.tag})\x1b[0m` : '';
        this.term.writeln(`\x1b[38;5;220m${c.hash}\x1b[0m${tag} \x1b[38;5;243m${c.date}\x1b[0m ${c.msg}`);
      });
      this.term.writeln('');
    },

    'sudo hire gilbert'() {
      this.term.writeln('');
      this.term.writeln('\x1b[38;5;114m  ✅  ACCESS GRANTED\x1b[0m');
      this.term.writeln('');
      this.term.writeln('\x1b[1;38;5;220m  🎉  Excellent decision!\x1b[0m');
      this.term.writeln('');
      this.term.writeln(`\x1b[38;5;252m  Initializing hire sequence...\x1b[0m`);
      this.term.writeln(`\x1b[38;5;114m  [████████████████████████████] 100%\x1b[0m`);
      this.term.writeln('');
      this.term.writeln(`\x1b[38;5;252m  📧  Reach out: \x1b[38;5;75m${RESUME.meta.email}\x1b[0m`);
      this.term.writeln(`\x1b[38;5;252m  🔗  Connect:   \x1b[38;5;75m${RESUME.meta.linkedinShort}\x1b[0m`);
      this.term.writeln('');
      this.term.writeln(`\x1b[38;5;243m  Let's build something extraordinary together.\x1b[0m`);
      this.term.writeln('');
    },

    'cat readme.md'() {
      this.term.writeln('');
      const md = LanguageRenderer.markdown(RESUME);
      md.split('\n').forEach(line => {
        // Colorize markdown syntax
        if (line.startsWith('# ')) {
          this.term.writeln(`\x1b[1;38;5;141m${line}\x1b[0m`);
        } else if (line.startsWith('## ')) {
          this.term.writeln(`\x1b[1;38;5;75m${line}\x1b[0m`);
        } else if (line.startsWith('### ')) {
          this.term.writeln(`\x1b[1;38;5;114m${line}\x1b[0m`);
        } else if (line.startsWith('- ')) {
          this.term.writeln(`\x1b[38;5;243m  ▸\x1b[0m${line.slice(1)}`);
        } else if (line.startsWith('> ')) {
          this.term.writeln(`\x1b[38;5;243m${line}\x1b[0m`);
        } else if (line.startsWith('---')) {
          this.term.writeln(`\x1b[38;5;243m──────────────────────────────────────────\x1b[0m`);
        } else if (line.startsWith('*')) {
          this.term.writeln(`\x1b[3;38;5;243m${line}\x1b[0m`);
        } else {
          this.term.writeln(line);
        }
      });
      this.term.writeln('');
    },
  },

  fit() {
    if (this.fitAddon && this.term) {
      this.fitAddon.fit();
    }
  },

  destroy() {
    if (this.term) {
      this.term.dispose();
      this.term = null;
    }
  }
};
