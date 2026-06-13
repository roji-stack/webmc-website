# WE-BMC Frontend Architecture
> React + Antigravity | Tailwind CSS | File-based routing

---

## Project Philosophy

- **Feature-based colocation**: component logic, styles, and types live together by domain, not by artifact type.
- **Dumb pages, smart components**: pages are thin routing shells; all state, data-fetching, and composition happen inside feature components.
- **Static data first**: club content (members, projects, competitions) lives in versioned data files — no CMS dependency until scale demands it.

---

## Folder Structure

```
we-bmc/
├── public/
│   ├── favicon.ico
│   ├── og-image.png                  # Open Graph social preview
│   └── assets/
│       ├── logos/
│       │   ├── we-bmc-wordmark.svg
│       │   └── western-engineering-logo.svg
│       └── images/
│           ├── mustangmotion/        # Product & team photos
│           └── competitions/
│
├── src/
│   │
│   ├── pages/                        # Route-level entry points (thin wrappers)
│   │   ├── index.jsx                 # → /          (Home / About)
│   │   ├── projects/
│   │   │   ├── index.jsx             # → /projects
│   │   │   └── [slug].jsx            # → /projects/:slug  (dynamic detail)
│   │   ├── competitions.jsx          # → /competitions
│   │   └── team.jsx                  # → /team
│   │
│   ├── components/
│   │   │
│   │   ├── layout/                   # Site-wide shell components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageWrapper.jsx       # Injects nav + footer, sets max-width
│   │   │
│   │   ├── ui/                       # Primitive, reusable atoms
│   │   │   ├── Button.jsx            # variant: primary | ghost | outline
│   │   │   ├── Badge.jsx             # variant: default | success | info | muted
│   │   │   ├── Card.jsx              # base surface with border + radius
│   │   │   ├── SectionLabel.jsx      # Eyebrow text + left-border accent
│   │   │   ├── Tag.jsx               # Pill tag for disciplines / keywords
│   │   │   └── Divider.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx              # Mission headline + CTA
│   │   │   ├── MissionStatement.jsx  # 2–3 sentence club mandate
│   │   │   ├── HighlightReel.jsx     # 3-column stat / accolade strip
│   │   │   └── FeaturedProject.jsx   # Teaser card linking to Projects
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx       # Grid card: title, discipline tags, status
│   │   │   ├── ProjectGrid.jsx       # Responsive grid of ProjectCards
│   │   │   ├── ProjectDetail.jsx     # Full detail layout (used in [slug].jsx)
│   │   │   ├── StatusBadge.jsx       # "Active" | "Completed" | "Paused"
│   │   │   └── mustang-motion/       # MustangMotion-specific sub-components
│   │   │       ├── MMHero.jsx        # Product image + headline
│   │   │       ├── MMSpecPanel.jsx   # Mechanical & ergonomic design details
│   │   │       ├── MMClinicalPanel.jsx  # Clinical utility + use-cases
│   │   │       └── MMTechSpecs.jsx   # Sensor array, BLE, power specs table
│   │   │
│   │   ├── competitions/
│   │   │   ├── CompetitionCard.jsx   # Full featured card (TNBC etc.)
│   │   │   ├── AchievementStat.jsx   # Large rank number + scope label
│   │   │   ├── CompetitionRecord.jsx # Tabular history of all entries
│   │   │   └── TabPanel.jsx          # Overview / Context / Project tabs
│   │   │
│   │   └── team/
│   │       ├── MemberCard.jsx        # Avatar, name, role, discipline
│   │       ├── LeadershipRow.jsx     # Exec banner with larger cards
│   │       └── TeamGrid.jsx          # Responsive member roster grid
│   │
│   ├── data/                         # Versioned static content — edit here, not in JSX
│   │   ├── projects.js               # Array of project objects
│   │   ├── competitions.js           # Array of competition + result objects
│   │   └── team.js                   # Array of member objects
│   │
│   ├── hooks/
│   │   ├── useScrollReveal.js        # IntersectionObserver fade-in utility
│   │   └── useActiveSection.js       # Tracks active nav item on scroll
│   │
│   ├── styles/
│   │   ├── globals.css               # Tailwind base + custom reset rules
│   │   └── theme.js                  # Design token constants (brand colors, fonts)
│   │
│   └── App.jsx                       # Router root
│
├── tailwind.config.js                # Extends palette with WU brand colors
├── postcss.config.js
├── vite.config.js                    # Or next.config.js if using Next.js
└── package.json
```

---

## Routing Map

| URL | Page File | Primary Component |
|-----|-----------|-------------------|
| `/` | `pages/index.jsx` | `Hero`, `MissionStatement`, `HighlightReel`, `FeaturedProject` |
| `/projects` | `pages/projects/index.jsx` | `ProjectGrid` |
| `/projects/mustangmotion` | `pages/projects/[slug].jsx` | `MMHero`, `MMSpecPanel`, `MMClinicalPanel`, `MMTechSpecs` |
| `/competitions` | `pages/competitions.jsx` | `CompetitionCard`, `CompetitionRecord` |
| `/team` | `pages/team.jsx` | `LeadershipRow`, `TeamGrid` |

---

## Data Shape Contracts

### `data/projects.js`
```js
export const projects = [
  {
    id: "mustangmotion",
    slug: "mustangmotion",
    title: "MustangMotion",
    tagline: "Smart diagnostic knee brace",
    status: "active",          // "active" | "completed" | "paused"
    year: 2024,
    disciplines: ["Mechanical", "Embedded Systems", "Clinical"],
    coverImage: "/assets/images/mustangmotion/cover.jpg",
    summary: "...",            // 1–2 sentence description for grid card
    detail: {/* full copy */}
  }
];
```

### `data/competitions.js`
```js
export const competitions = [
  {
    id: "tnbc-2024",
    name: "True North Biomedical Competition",
    acronym: "TNBC",
    year: 2024,
    location: "Ontario & National",
    project: "mustangmotion",  // FK to projects[].id
    tags: ["Medical Devices", "Diagnostics", "Wearables"],
    achievements: [
      { rank: "1st", scope: "Provincial", label: "Ontario Champion" },
      { rank: "4th", scope: "National",   label: "National Finalist" }
    ],
    tabs: {
      overview: "...",
      context:  "...",
    }
  }
];
```

### `data/team.js`
```js
export const team = [
  {
    id: "jane-doe",
    name: "Jane Doe",
    role: "President",
    tier: "executive",         // "executive" | "lead" | "member"
    discipline: "Biomedical Engineering",
    year: "3rd Year",
    avatar: "/assets/images/team/jane-doe.jpg",
    linkedin: "https://linkedin.com/in/..."
  }
];
```

---

## Tailwind Config — Brand Extension

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "wu-purple": {
          DEFAULT: "#4F2683",
          light:   "#6B47B0",
          pale:    "#EEEDFE",
          dark:    "#3B1A6A",
        }
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans:  ["system-ui", "-apple-system", "sans-serif"],
      }
    }
  }
};
```

---

## Component Design Conventions

1. **Props over state**: components receive data as props; state lives only where unavoidable (tabs, accordions).
2. **No hardcoded copy in JSX**: all strings come from `data/` files or props — makes i18n and content updates painless.
3. **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` used correctly for accessibility and SEO.
4. **Named exports for atoms, default exports for pages**: keeps tree-shaking predictable.
5. **Loading states**: every data-dependent section has a skeleton or fallback state defined.
