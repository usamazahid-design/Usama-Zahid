# Technical Documentation — Usama Zahid Portfolio

This document describes the architecture, stack, data model, and build pipeline
for the `usama-zahid-portfolio` site so future maintainers can extend it safely.

---

## 1. Overview

A single-operator portfolio and blog for **Usama Zahid** (AI Product Designer).
It is a **statically exported** Next.js 14 site (`output: 'export'`) — there is
no server runtime, no API routes, and no database. All content lives in typed
TypeScript data files under `lib/` and is rendered through the App Router.

Because the site is a static export:

- There is **no server-side rendering, middleware, or redirects**.
- `next.config.js` uses `output: 'export'` + `trailingSlash: true`.
- Images use `unoptimized: true` (the `next/image` optimizer needs a server).
- Every route is pre-rendered to an `index.html` under `out/`.

---

## 2. Tech Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 14.2.5 (App Router)                         |
| Language       | TypeScript 5.5                                     |
| Styling        | Tailwind CSS 3.4 + custom design tokens in CSS      |
| Component anim | Framer Motion 11 (lifecycle/component animation)    |
| Scroll anim    | GSAP 3 + ScrollTrigger (scroll-driven sequences)   |
| Smooth scroll  | Lenis 1.1                                          |
| 3D (optional)  | three.js / @react-three/fiber / drei               |
| Export target  | Static HTML (`out/`)                                |

### Animation boundary rule

- **Framer Motion** → triggered by component lifecycle (mount, hover, click, state).
- **GSAP + ScrollTrigger** → triggered by scroll position.
- The two never animate the same component; mixing them causes jank.
- Lenis drives smooth scrolling globally; tune it in `components/SmoothScroll` (or
  where Lenis is initialized). Keep `duration` ~1.6, `wheelMultiplier` ~1.1.

---

## 3. Project Structure

```
app/                      # Routes (App Router). One folder per route.
  page.tsx                # Home
  about/  ai-product-design/  blog/  contact/  cv/
  portfolio/  products/  privacy-policy/  terms/  special-offer/
  services/
    [slug]/page.tsx       # Dynamic service pages (SSG)
  blog/[slug]/page.tsx    # Dynamic blog post pages (SSG)
  portfolio/[slug]/page.tsx # Dynamic project pages (SSG)
components/               # All UI components, grouped by feature.
  blog/  services/  portfolio/  contact/  brand-to-url/  ...
lib/                      # Typed content + helpers (the "CMS").
  blog-data.ts  blog-utils.ts
  portfolio-data.ts  portfolio-utils.ts
  services-data.ts  products-data.ts  offer-data.ts
  cv-data.ts  legal-data.ts  privacy-data.ts  terms-data.ts
  brand-to-url-data.ts
  seo.tsx                 # JSON-LD + metadata helpers
public/                   # Static assets (logo.svg, images, favicon)
```

Route naming note: route segment names in code may differ from user-facing copy
(e.g. the `brand-to-url` folder still exists internally though the page is titled
"AI Product Design"). Only change folder names with care — see §6.

---

## 4. The Data Layer (`lib/`)

There is no headless CMS. Content is plain typed arrays:

- `blog-data.ts` → `posts: BlogPost[]`
- `portfolio-data.ts` → `projects: Project[]`
- `branding-data.ts` → `brandingCases: BrandingCase[]`
- `services-data.ts` → `services: Service[]`
- `*-utils.ts` → lookup helpers (`getPostBySlug`, `getFeaturedPost`, etc.)

To add content you edit the relevant `lib/*.ts` file and re-run the build. There
is no admin UI. See the companion docs:

- `docs/HOW-TO-ADD-BLOG.md`
- `docs/HOW-TO-ADD-PROJECT.md`
- `docs/HOW-TO-ADD-BRANDING-PROJECT.md`
- `docs/HOW-TO-CHANGE-TESTIMONIALS.md`

### Dynamic routes

`generateStaticParams()` in each `[slug]/page.tsx` reads the slugs from the data
file, so new entries are automatically turned into pages at build time. No router
changes are needed when adding a post, project, or branding case — just append
to the array. Testimonials are an exception: they live in
`components/Testimonials.tsx` (see `docs/HOW-TO-CHANGE-TESTIMONIALS.md`).

---

## 5. Design System

Design tokens are defined in `app/globals.css` (CSS custom properties) and mirrored
in `tailwind.config.ts`:

- **Spacing**: 8pt scale.
- **Type scale**: `--text-h1 … --text-micro`.
- **Semantic colors**: `--color-success / warning / critical / info`.
- **Surfaces**: `.card-base`, `.badge-*`, `.progress-bar-*`, device frames.
- **Motion utilities**: `.stagger`, `.fade-up`.

Brand color tokens: `uz-black`, `uz-white`, `uz-indigo`, `uz-silver`, `uz-slate`,
`uz-graphite`. Prefer these Tailwind classes over raw hex values in components.

---

## 6. SEO & Metadata

- `lib/seo.tsx` exports `ArticleSchema`, `BreadcrumbSchema`, `FAQPageSchema`,
  `ProductSchema`, and a `JsonLd` component.
- Each page sets `metadata` (title/description/openGraph/canonical) and renders
  the relevant `<JsonLd>` so search engines get structured data.
- `app/sitemap.ts` (or `sitemap.xml` route) and `app/robots.ts` are generated from
  the same data, so published posts/projects appear automatically.
- **Renaming a route folder** requires clearing `.next` and `out` before rebuild,
  otherwise Next throws `PageNotFoundError`.

---

## 7. Build & Deploy

```bash
# Local dev
npm run dev            # next dev  → http://localhost:3000

# Production static build
npm run build          # next build → writes out/
npm run lint           # next lint

# Preview the static export (optional)
npx serve out          # or any static file server
```

The `out/` folder is fully static and can be uploaded to any static host
(Netlify, Vercel static, S3 + CloudFront, GitHub Pages, etc.). Because there is
no server, **legacy URL redirects must be handled as static pages** (see
`app/services/brand-strategy/page.tsx` and `app/blog/<old-slug>/page.tsx`, which
use a `<meta http-equiv="refresh">` + client-side `window.location.replace`).

### Cleaning before a rebuild

When you rename a route or change `generateStaticParams` sources, delete caches:

```bash
Remove-Item -Recurse -Force .next, out   # PowerShell
# then: npm run build
```

---

## 8. Conventions

- **Components** are PascalCase files; client components that animate or use state
  start with `'use client'`.
- **Data files** are the source of truth — do not hardcode content in pages.
- **Images** come from Unsplash via the `blogImage` / `photo` helpers, or from
  `public/`. Remote images must be listed in `next.config.js` `remotePatterns`.
- **FAQ** sections are reusable accordions (`PostFAQ`, `BlogFAQ`, `ServiceFAQ`);
  add FAQ content as `faqs: { q, a }[]` in the data file and the `FAQPageSchema`
  is emitted automatically.
- **Email**: `hello.usamazahid@gmail.com`. **Cal.com**: `usama-zahid-hpaadwj/15min`.
