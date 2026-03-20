# teplrguy.github.io

> **Gilbert Appiah** — Sr. Solution Engineer at Microsoft  
> Cloud Architecture · Agentic DevOps · Enterprise AI

## What Is This?

This isn't a regular resume. It's a **Resume as an Agentic System** — my professional experience rendered as real, idiomatic code across 6 programming languages plus an interactive terminal.

### Views

| Tab | File | What You'll See |
|-----|------|----------------|
| **YAML** | `gilbert.mcp.yml` | My resume as an MCP Server configuration — the default view |
| **Python** | `gilbert.py` | A dataclass-based Python class with `@property` methods |
| **Java** | `Gilbert.java` | Builder pattern, `List.of()`, full Javadoc |
| **C#** | `Gilbert.cs` | Attributes, `async/await`, LINQ patterns |
| **TypeScript** | `gilbert.ts` | Interfaces, decorators, generics |
| **Markdown** | `README.md` | Traditional clean resume |
| **Terminal** | `▶ Terminal` | Interactive CLI — try `neofetch`, `git log`, or `sudo hire gilbert` |

### Terminal Commands

```
whoami              — Professional profile
experience          — All roles (--current for current only)
skills              — Skills by category (--ai, --cloud, --dev, --arch)
education           — Education & certifications
contact             — Contact info
download            — Download resume PDF
linkedin            — Open LinkedIn profile
neofetch            — System-info style display
git log             — Career history as git commits
sudo hire gilbert   — 🤔 Try it...
```

### Tech Stack

- **Zero frameworks** — Vanilla HTML/CSS/JS
- **Prism.js** — Syntax highlighting
- **xterm.js** — Terminal emulation (same library VS Code uses)
- **GitHub Actions** — Auto-generated weekly blog from GitHub activity
- **GitHub Pages** — Static hosting

### Auto-Blog

Every Monday, a GitHub Action fetches my public GitHub activity and generates a blog post summarizing what I worked on that week. No manual effort.

## Local Development

```bash
# Clone
git clone https://github.com/teplrguy/teplrguy.github.io.git
cd teplrguy.github.io

# Serve locally (any static server works)
npx serve .
# or
python -m http.server 8000
```

## License

MIT — Feel free to fork and build your own resume-as-code site.

---

Built with ♥ and GitHub Copilot
