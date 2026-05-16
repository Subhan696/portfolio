# ◆ Portfolio — AI Engineer & Full-Stack Developer

A premium, award-worthy personal portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, **ShadCN UI**, and **Lucide**. Dark theme, glassmorphism, neon-gradient accents, command palette, particle field, custom cursor, scroll progress, animated counters, and a live GitHub feed.

> Inspired by modern developer portfolios — but cleaner, more futuristic, and more interactive.

---

## ✦ Features

- ⚡ **Next.js 15 + App Router**, TypeScript everywhere
- 🎨 **Glassmorphism + neon gradient** aesthetic, fully dark-themed
- 🪄 **Framer Motion + GSAP** animations (subtle, never distracting)
- 🧠 **Live GitHub integration** — repos, stars, followers, contribution grid
- 🎮 **Command palette** (`⌘K` / `Ctrl+K`)
- 🖱 **Custom cursor + glow** (desktop only, respects `prefers-reduced-motion`)
- 📊 **Animated counters**, animated skill bars
- 🧪 **Project filtering** by category + **modal previews**
- 🪟 **Particle field + animated grid background**
- 🛰 **Scroll progress** indicator
- 🎯 **Sticky animated navbar** with active-section detection
- 📝 **Validated contact form** (`react-hook-form` + `zod` + `sonner` toasts)
- 🧵 **Tech marquee**, testimonials carousel, blog placeholder
- 🏆 **Certifications & achievements** showcase
- 🪪 **SEO-ready**: OpenGraph, robots, sitemap
- ♿ **Accessibility**: semantic markup, reduced-motion support, keyboard nav
- 📱 **Fully responsive**: phone → 4K
- 🚀 **Optimized**: lazy components, image optimization, font subsets

---

## ✦ Tech stack

| Layer          | Tools                                                                |
| -------------- | -------------------------------------------------------------------- |
| Framework      | Next.js 15, React 19                                                 |
| Language       | TypeScript                                                           |
| Styling        | Tailwind CSS, ShadCN UI primitives, CSS variables                    |
| Animation      | Framer Motion, GSAP (ScrollTrigger), CSS keyframes                   |
| Icons          | Lucide React                                                         |
| Forms          | react-hook-form + zod                                                |
| Toasts         | sonner                                                               |
| Command bar    | cmdk                                                                 |
| Data           | GitHub REST API (cached at the edge)                                 |

---

## ✦ Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy env
cp .env.example .env.local
# then fill in your GitHub username (and optional token)

# 3. Run dev server
npm run dev

# 4. Build for production
npm run build && npm start
```

Open <http://localhost:3000>.

---

## ✦ Environment variables

| Key                              | Required | Description                                         |
| -------------------------------- | -------- | --------------------------------------------------- |
| `NEXT_PUBLIC_GITHUB_USERNAME`    | yes      | Your GitHub handle (used by `/api/github`)          |
| `GITHUB_TOKEN`                   | no       | Personal access token — raises GitHub rate limits   |
| `NEXT_PUBLIC_CONTACT_ENDPOINT`   | no       | POST endpoint for the contact form (Formspree/Resend) |

---

## ✦ Customization

1. **Identity** — edit `lib/site.ts` (name, title, socials, email, resume URL).
2. **Skills** — `data/skills.ts`
3. **Projects** — `data/projects.ts` (add screenshots in `public/projects/...` and update `image` paths)
4. **Experience / Education / Certs** — `data/experience.ts`, `data/education.ts`
5. **Testimonials** — `data/testimonials.ts`
6. **Resume** — drop your `resume.pdf` into `public/`
7. **Colors** — tweak `tailwind.config.ts` (`neon` palette) and `app/globals.css` (HSL tokens)

---

## ✦ Project structure

```
.
├─ app/
│  ├─ api/github/route.ts      # Cached GitHub API proxy
│  ├─ favicon.svg
│  ├─ globals.css              # Theme + utilities
│  ├─ layout.tsx               # Providers, fonts, global UI
│  ├─ page.tsx                 # Section composition
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  ├─ effects/                 # Cursor, particles, scroll progress, grid
│  ├─ layout/                  # Navbar, Footer
│  ├─ providers/               # Theme provider
│  ├─ sections/                # Hero, About, Skills, Projects, ...
│  ├─ ui/                      # Button, Card, Badge, Input, Section, Dialog
│  ├─ animated-counter.tsx
│  └─ command-palette.tsx
├─ data/                       # All editable content lives here
├─ lib/                        # Utilities + site config
├─ public/                     # Static assets
├─ .env.example
├─ next.config.js
├─ postcss.config.js
├─ tailwind.config.ts
└─ tsconfig.json
```

---

## ✦ Deploy to Vercel

The easiest path:

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new> and import the repo.
3. Set environment variables (`NEXT_PUBLIC_GITHUB_USERNAME`, optional `GITHUB_TOKEN`).
4. Click **Deploy**. Vercel auto-detects Next.js and configures everything.

Or via CLI:

```bash
npm i -g vercel
vercel
vercel env add NEXT_PUBLIC_GITHUB_USERNAME
vercel --prod
```

---

## ✦ Performance notes

- All images route through `next/image`; remote hosts whitelisted in `next.config.js`.
- The GitHub API route uses ISR (`revalidate = 3600`).
- Particle canvas auto-disables when the user prefers reduced motion.
- Lucide is tree-shaken via `optimizePackageImports`.

---

## ✦ Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<section>`).
- Form fields are labeled; errors are announced via toasts.
- All animations respect `prefers-reduced-motion`.
- Keyboard navigation is fully supported, including the command palette.

---

## ✦ Easter eggs

- `⌘K` / `Ctrl+K` — open the command palette anywhere.
- Hover over any tech in the marquee.
- The cursor reacts to interactive elements — try project cards and buttons.

---

## ✦ License

MIT — fork it, restyle it, make it yours.

---

> Built with ☕ and obsession for craft.
