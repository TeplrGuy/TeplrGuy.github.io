// ============================================================================
// resume-data.js — Single Source of Truth
// All views (Python, Java, C#, TypeScript, YAML, Markdown, Terminal) read from
// this object. Edit ONLY here to update your resume everywhere.
// ============================================================================

const RESUME = {
  meta: {
    name: "Gilbert Appiah",
    initials: "GA",
    phone: "(617) 602-7456",
    email: "GilbertAppiah9@gmail.com",
    linkedin: "https://www.linkedin.com/in/gilbertappiah/",
    linkedinShort: "linkedin.com/in/gilbertappiah",
    github: "https://github.com/teplrguy",
    githubShort: "github.com/teplrguy",
    website: "https://teplrguy.github.io",
    location: "United States",
    resumePdf: "assets/GA-Resume.pdf",
    photo: "assets/profile.jpg",
    photoAi: "assets/profile-ai.webp"
  },

  profile:
    "Strategic Technical Leader and Architect with over 7 years of experience " +
    "building, deploying, and scaling reliable production systems. Expert in " +
    "Cloud Solution Architecture and Agentic DevOps, specialized in integrating " +
    "AI-powered tools into the enterprise SDLC to drive developer productivity " +
    "and operational excellence.",

  experience: [
    {
      company: "Microsoft",
      title: "Sr. Solution Engineer — Software, Development Tools & AI",
      period: "Aug 2025 – Present",
      startYear: 2025,
      achievements: [
        "Architecting Agentic DevOps: Lead hands-on technical engagements, including PoCs and architecture workshops, to embed AI (GitHub Copilot, Azure Developer Tools) into customer SDLCs.",
        "Enterprise AI Strategy: Serve as a trusted advisor to engineering leaders, designing secure, scalable, and AI-native development environments for global financial institutions.",
        "Production Reliability: Accelerate AI integration while ensuring systemic stability, transitioning legacy workflows into modern, AI-first development stacks.",
        "Cross-Functional Influence: Partner with Product Engineering to influence roadmaps based on enterprise-scale adoption challenges and successes."
      ]
    },
    {
      company: "Microsoft",
      title: "Sr. Cloud Solution Architect",
      period: "Mar 2022 – Aug 2025",
      startYear: 2022,
      achievements: [
        "Cloud Solution Architecture: Designed and implemented cloud-native applications for S500 customers using microservices and containerization (Docker, Azure Compute, Kubernetes).",
        "Production Excellence: Maintained a 98% resolution rate within SLA for critical customer workloads, ensuring high availability and reliability.",
        "Efficiency at Scale: Optimized Azure code deployments and service configurations, resulting in a 40% reduction in deployment time.",
        "Technical Evangelism: Conducted 100+ architectural workshops to enhance customer technical maturity and unlock value in the Microsoft Cloud.",
        "Leadership: Delivered several multi-million dollar engineering and support contracts for proactive/reactive engagements."
      ]
    },
    {
      company: "Microsoft",
      title: "Azure App Service Escalation Engineer",
      period: "Jun 2020 – Mar 2022",
      startYear: 2020,
      achievements: [
        "Critical Systems Support: Resolved 200+ high-severity production issues with a 98% customer satisfaction rate.",
        "Deployment Optimization: Assisted customers with complex code deployments to Azure, reducing deployment-related failures by 25%.",
        "Team Leadership: Mentored colleagues on deep-tier troubleshooting, improving team-wide resolution times by 30%."
      ]
    },
    {
      company: "Ally Financial (via Cognizant)",
      title: "Architect / Full-Stack Developer",
      period: "May 2019 – Jun 2020",
      startYear: 2019,
      achievements: [
        "Production Reliability: Owned Identity Management services for a major financial application, ensuring 99.9% uptime.",
        "Secure API Design: Built resilient REST APIs using Java, Spring Boot, and OAuth/JWT, improving feature delivery time by 25%.",
        "CI/CD Engineering: Implemented Jenkins pipelines that reduced production deployment errors by 30%, avoiding downtime while accelerating time to production."
      ]
    }
  ],

  skills: {
    "Architecture & Strategy": [
      "Cloud Solution Architecture",
      "Microservices",
      "System Design",
      "Context Engineering",
      "AI Governance"
    ],
    "AI & Automation": [
      "GitHub Copilot (CLI & IDE)",
      "Azure AI Foundry",
      "Agentic DevOps",
      "Prompt Engineering",
      "MCP Servers"
    ],
    "Cloud & DevOps": [
      "GitHub",
      "Azure DevOps",
      "Azure (App Service, Functions, Logic Apps)",
      "CI/CD (GitHub Actions, ADO)",
      "Docker",
      "Kubernetes"
    ],
    "Full-Stack Engineering": [
      "C#/.NET",
      "Java (Spring Boot)",
      "Python",
      "JavaScript",
      "React.js",
      "Swift",
      "TDD",
      "SDD"
    ]
  },

  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Massachusetts at Dartmouth"
    }
  ],

  certifications: [
    "Microsoft Certified: Azure Developer Associate (AZ-204)",
    "Microsoft Certified: Azure Fundamentals (AZ-900)"
  ],

  awards: [
    "Microsoft Global Hackathon 2023 — Winner"
  ]
};

// freeze to prevent accidental mutation
Object.freeze(RESUME);
