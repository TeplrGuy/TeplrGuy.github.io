// ============================================================================
// language-renderer.js — Renders RESUME data as idiomatic code in each language
// Each function returns a raw string. Prism.js handles syntax highlighting.
// ============================================================================

const LanguageRenderer = {

  // ─── YAML / MCP Server Config ───────────────────────────────────────────
  yaml(data) {
    const skillsYaml = Object.entries(data.skills)
      .map(([cat, items]) => {
        const key = cat.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        return `      ${key}:\n` + items.map(s => `        - "${s}"`).join('\n');
      })
      .join('\n');

    const toolsYaml = data.experience.map(exp => {
      const toolName = exp.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/_+$/, '');
      return `      - name: "${toolName}"\n` +
             `        description: "${exp.title} at ${exp.company}"\n` +
             `        period: "${exp.period}"\n` +
             `        capabilities:\n` +
             exp.achievements.map(a => `          - "${a}"`).join('\n');
    }).join('\n\n');

    const certsYaml = data.certifications.map(c => `    - "${c}"`).join('\n');
    const edYaml = data.education.map(e => `    - degree: "${e.degree}"\n      institution: "${e.institution}"`).join('\n');

    return `# ============================================================================
# MCP Server Configuration: ${data.meta.name}
# Agent: Enterprise DevOps Architect & AI Integration Specialist
# Version: 2025.1
# ============================================================================

mcpServers:
  gilbert-appiah:
    command: "npx"
    args: ["--yes", "@gilbert-appiah/agent", "--role", "solution-engineer"]
    
    env:
      COMPANY: "Microsoft"
      DIVISION: "Software, Development Tools & AI"
      SPECIALIZATION: "Agentic DevOps"
      CONTACT_EMAIL: "${data.meta.email}"
      LINKEDIN: "${data.meta.linkedinShort}"
      GITHUB: "${data.meta.githubShort}"

    # Agent Profile
    description: >
      ${data.profile}

    # Tools — Each role is an available tool in the agent's toolkit
    tools:
${toolsYaml}

    # Skills — Capabilities exposed to downstream agents
    skills:
${skillsYaml}

    # Education & Certifications
    education:
${edYaml}

    certifications:
${certsYaml}

    awards:
${data.awards.map(a => `    - "${a}"`).join('\n')}

    # Runtime Configuration
    settings:
      maxConcurrency: "unlimited"
      availability: "open to new challenges"
      responseTime: "< 24 hours"
      preferredContact: "${data.meta.email}"`;
  },

  // ─── Python ─────────────────────────────────────────────────────────────
  python(data) {
    const indent = (s, n) => s.split('\n').map(l => ' '.repeat(n) + l).join('\n');

    const expStr = data.experience.map(exp => {
      const achStr = exp.achievements.map(a => `                "${a}",`).join('\n');
      return `        Experience(
            company="${exp.company}",
            title="${exp.title}",
            period="${exp.period}",
            achievements=[
${achStr}
            ],
        ),`;
    }).join('\n');

    const skillsStr = Object.entries(data.skills).map(([cat, items]) => {
      const key = cat.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      return `            "${key}": [\n` +
        items.map(s => `                "${s}",`).join('\n') +
        `\n            ],`;
    }).join('\n');

    return `"""
${data.meta.name} — Resume as Code
Cloud Architecture · Agentic DevOps · Enterprise AI
"""
from __future__ import annotations
from dataclasses import dataclass, field
from typing import ClassVar


@dataclass(frozen=True)
class Experience:
    company: str
    title: str
    period: str
    achievements: list[str] = field(default_factory=list)


class CloudArchitect:
    """Mixin: designs and implements cloud-native solutions at scale."""
    pass


class AgenticDevOps:
    """Mixin: integrates AI-powered tooling into the enterprise SDLC."""
    pass


class GilbertAppiah(CloudArchitect, AgenticDevOps):
    """${data.profile}"""

    # ── Contact ──────────────────────────────────────────────────────
    EMAIL: ClassVar[str] = "${data.meta.email}"
    PHONE: ClassVar[str] = "${data.meta.phone}"
    LINKEDIN: ClassVar[str] = "${data.meta.linkedinShort}"
    GITHUB: ClassVar[str] = "${data.meta.githubShort}"

    def __init__(self) -> None:
        self.name = "${data.meta.name}"
        self.current_title = "${data.experience[0].title}"

    # ── Professional Experience ──────────────────────────────────────
    @property
    def experience(self) -> list[Experience]:
        return [
${expStr}
        ]

    @property
    def current_role(self) -> Experience:
        return self.experience[0]

    # ── Technical Skills ─────────────────────────────────────────────
    def get_skills(self) -> dict[str, list[str]]:
        return {
${skillsStr}
        }

    # ── Education & Certs ────────────────────────────────────────────
    @property
    def education(self) -> str:
        return "${data.education[0].degree} — ${data.education[0].institution}"

    @property
    def certifications(self) -> list[str]:
        return [
${data.certifications.map(c => `            "${c}",`).join('\n')}
        ]

    @property
    def awards(self) -> list[str]:
        return [
${data.awards.map(a => `            "${a}",`).join('\n')}
        ]

    # ── Entry Point ──────────────────────────────────────────────────
    def hire(self) -> str:
        return f"Let's build something great together → {self.EMAIL}"


if __name__ == "__main__":
    gilbert = GilbertAppiah()
    print(gilbert.hire())`;
  },

  // ─── Java ───────────────────────────────────────────────────────────────
  java(data) {
    const expStr = data.experience.map(exp => {
      const achStr = exp.achievements.map(a => `                    "${a}"`).join(',\n');
      return `            new Experience.Builder()
                .company("${exp.company}")
                .title("${exp.title}")
                .period("${exp.period}")
                .achievements(List.of(
${achStr}
                ))
                .build()`;
    }).join(',\n\n');

    const skillsStr = Object.entries(data.skills).map(([cat, items]) => {
      const itemStr = items.map(s => `"${s}"`).join(', ');
      return `        skills.put("${cat}", List.of(${itemStr}));`;
    }).join('\n');

    return `/**
 * ${data.meta.name} — Resume as Code
 * Cloud Architecture · Agentic DevOps · Enterprise AI
 *
 * @author  ${data.meta.name}
 * @version 2025.1
 * @see     <a href="${data.meta.linkedin}">LinkedIn</a>
 */
package com.gilbertappiah.resume;

import java.util.*;

public class GilbertAppiah extends CloudArchitect
        implements AgenticDevOps, EnterpriseTrustedAdvisor {

    // ── Contact ─────────────────────────────────────────────────────
    private static final String EMAIL    = "${data.meta.email}";
    private static final String PHONE    = "${data.meta.phone}";
    private static final String LINKEDIN = "${data.meta.linkedinShort}";
    private static final String GITHUB   = "${data.meta.githubShort}";

    // ── Profile ─────────────────────────────────────────────────────
    @Override
    public String getProfile() {
        return "${data.profile}";
    }

    // ── Experience ──────────────────────────────────────────────────
    @Override
    public List<Experience> getExperience() {
        return List.of(
${expStr}
        );
    }

    // ── Skills ──────────────────────────────────────────────────────
    @Override
    public Map<String, List<String>> getSkills() {
        Map<String, List<String>> skills = new LinkedHashMap<>();
${skillsStr}
        return Collections.unmodifiableMap(skills);
    }

    // ── Education & Certifications ──────────────────────────────────
    @Override
    public String getEducation() {
        return "${data.education[0].degree} — ${data.education[0].institution}";
    }

    @Override
    public List<String> getCertifications() {
        return List.of(
${data.certifications.map(c => `            "${c}"`).join(',\n')}
        );
    }

    @Override
    public List<String> getAwards() {
        return List.of(
${data.awards.map(a => `            "${a}"`).join(',\n')}
        );
    }

    // ── Main ────────────────────────────────────────────────────────
    public static void main(String[] args) {
        var gilbert = new GilbertAppiah();
        System.out.println("Let's build something great → " + EMAIL);
    }
}`;
  },

  // ─── C# ─────────────────────────────────────────────────────────────────
  csharp(data) {
    const expStr = data.experience.map(exp => {
      const achStr = exp.achievements.map(a => `                    "${a}",`).join('\n');
      return `            new()
            {
                Company = "${exp.company}",
                Title = "${exp.title}",
                Period = "${exp.period}",
                Achievements =
                {
${achStr}
                }
            },`;
    }).join('\n\n');

    const skillsStr = Object.entries(data.skills).map(([cat, items]) => {
      const itemStr = items.map(s => `"${s}"`).join(', ');
      return `            ["${cat}"] = new[] { ${itemStr} },`;
    }).join('\n');

    return `// ============================================================================
// ${data.meta.name} — Resume as Code
// Cloud Architecture · Agentic DevOps · Enterprise AI
// ============================================================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GilbertAppiah.Resume;

/// <summary>
/// ${data.profile}
/// </summary>
[Author("${data.meta.name}")]
[Contact(Email = "${data.meta.email}", Phone = "${data.meta.phone}")]
[LinkedIn("${data.meta.linkedinShort}")]
public sealed class GilbertAppiah : CloudArchitect, IAgenticDevOps
{
    // ── Profile ─────────────────────────────────────────────────────
    public override string Profile =>
        "${data.profile}";

    // ── Experience ──────────────────────────────────────────────────
    public override IReadOnlyList<Experience> Experience => new List<Experience>
    {
${expStr}
    };

    public Experience CurrentRole => Experience.First();

    // ── Skills ──────────────────────────────────────────────────────
    public IReadOnlyDictionary<string, string[]> Skills =>
        new Dictionary<string, string[]>
        {
${skillsStr}
        };

    // ── Education & Certifications ──────────────────────────────────
    public string Education =>
        "${data.education[0].degree} — ${data.education[0].institution}";

    public IReadOnlyList<string> Certifications => new[]
    {
${data.certifications.map(c => `        "${c}",`).join('\n')}
    };

    public IReadOnlyList<string> Awards => new[]
    {
${data.awards.map(a => `        "${a}",`).join('\n')}
    };

    // ── Entry Point ─────────────────────────────────────────────────
    public async Task<string> HireAsync()
    {
        await Task.CompletedTask;
        return $"Let's build something great → {nameof(GilbertAppiah)}";
    }

    public static async Task Main(string[] args)
    {
        var gilbert = new GilbertAppiah();
        Console.WriteLine(await gilbert.HireAsync());
    }
}`;
  },

  // ─── TypeScript ─────────────────────────────────────────────────────────
  typescript(data) {
    const expStr = data.experience.map(exp => {
      const achStr = exp.achievements.map(a => `      "${a}",`).join('\n');
      return `    {
      company: "${exp.company}",
      title: "${exp.title}",
      period: "${exp.period}",
      achievements: [
${achStr}
      ],
    },`;
    }).join('\n\n');

    const skillsStr = Object.entries(data.skills).map(([cat, items]) => {
      const key = cat.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const itemStr = items.map(s => `"${s}"`).join(', ');
      return `      ${key}: [${itemStr}],`;
    }).join('\n');

    return `/**
 * ${data.meta.name} — Resume as Code
 * Cloud Architecture · Agentic DevOps · Enterprise AI
 */

// ── Types ───────────────────────────────────────────────────────────
interface IExperience {
  readonly company: string;
  readonly title: string;
  readonly period: string;
  readonly achievements: readonly string[];
}

interface ISkillSet {
  readonly [category: string]: readonly string[];
}

interface IResumeAgent {
  readonly profile: string;
  readonly experience: readonly IExperience[];
  readonly skills: ISkillSet;
  hire(): Promise<string>;
}

type Certification = string;
type Award = string;

// ── Decorators ──────────────────────────────────────────────────────
function Contact(email: string, phone: string) {
  return (target: Function) => {
    Object.defineProperty(target.prototype, "email", { value: email });
    Object.defineProperty(target.prototype, "phone", { value: phone });
  };
}

function LinkedIn(url: string) {
  return (target: Function) => {
    Object.defineProperty(target.prototype, "linkedin", { value: url });
  };
}

// ── Implementation ──────────────────────────────────────────────────
@Contact("${data.meta.email}", "${data.meta.phone}")
@LinkedIn("${data.meta.linkedinShort}")
class GilbertAppiah implements IResumeAgent {

  readonly name = "${data.meta.name}";
  readonly github = "${data.meta.githubShort}";

  // ── Profile ───────────────────────────────────────────────────
  get profile(): string {
    return "${data.profile}";
  }

  // ── Experience ────────────────────────────────────────────────
  get experience(): readonly IExperience[] {
    return [
${expStr}
    ] as const;
  }

  get currentRole(): IExperience {
    return this.experience[0];
  }

  // ── Skills ────────────────────────────────────────────────────
  get skills(): ISkillSet {
    return {
${skillsStr}
    };
  }

  // ── Education & Certs ─────────────────────────────────────────
  get education(): string {
    return "${data.education[0].degree} — ${data.education[0].institution}";
  }

  get certifications(): readonly Certification[] {
    return [
${data.certifications.map(c => `      "${c}",`).join('\n')}
    ];
  }

  get awards(): readonly Award[] {
    return [
${data.awards.map(a => `      "${a}",`).join('\n')}
    ];
  }

  // ── Hire ──────────────────────────────────────────────────────
  async hire(): Promise<string> {
    return \`Let's build something great → \${this.name}\`;
  }
}

// ── Run ─────────────────────────────────────────────────────────────
const gilbert = new GilbertAppiah();
gilbert.hire().then(console.log);`;
  },

  // ─── Markdown ───────────────────────────────────────────────────────────
  markdown(data) {
    const expStr = data.experience.map(exp => {
      return `### ${exp.company} — ${exp.title}\n` +
             `*${exp.period}*\n\n` +
             exp.achievements.map(a => `- ${a}`).join('\n');
    }).join('\n\n');

    const skillsStr = Object.entries(data.skills).map(([cat, items]) => {
      return `- **${cat}:** ${items.join(', ')}`;
    }).join('\n');

    return `# ${data.meta.name}

> ${data.meta.phone} | ${data.meta.email} | [${data.meta.linkedinShort}](${data.meta.linkedin}) | [${data.meta.githubShort}](${data.meta.github})

---

## Professional Profile

${data.profile}

---

## Professional Experience

${expStr}

---

## Key Technical Skills

${skillsStr}

---

## Education

${data.education.map(e => `**${e.degree}** — ${e.institution}`).join('\n')}

## Certifications

${data.certifications.map(c => `- ${c}`).join('\n')}

## Awards

${data.awards.map(a => `- ${a}`).join('\n')}`;
  },

};

// Map language tab IDs → Prism language class names
const LANG_TO_PRISM = {
  yaml:       'language-yaml',
  python:     'language-python',
  java:       'language-java',
  csharp:     'language-csharp',
  typescript: 'language-typescript',
  markdown:   'language-markdown',
};

const LANG_LABELS = {
  yaml:       'YAML — MCP Server Config',
  python:     'Python',
  java:       'Java',
  csharp:     'C#',
  typescript: 'TypeScript',
  markdown:   'Markdown',
};
