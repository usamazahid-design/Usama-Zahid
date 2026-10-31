## Goal
- Build and refine award-winning Next.js 14 portfolio for Usama Zahid; completed personal `/about` page, then built `/services`, `/contact`, `/blog` (list) + `/blog/[slug]` (detail with 6 posts), and `/portfolio` (list) + `/portfolio/[slug]` (detail with 5 projects, each with a unique layout per type).

## Constraints & Preferences
- Tech: Next.js 14.2.5, Tailwind, Framer Motion, GSAP ScrollTrigger, Lenis. R3F/Three.js used in homepage Hero only.
- Brand colors: `--uz-black #040404`, `--uz-white #F6F6F6`, `--uz-indigo #4B3FFF`, `--uz-graphite #1C1C1C`, `--uz-slate #4A4A4A`, `--uz-silver #9A9A9A`, `--uz-fog #E0E0E0`.
- Type: Inter 800 headlines, JetBrains Mono uppercase labels (tracked wide), Inter 400 body.
- Rules: `border-radius: 0` enforced globally, no gradients/shadows/glows, indigo ≤10%, bg always `#040404`.
- Grid: 63px unit, max-w 1440px, 80px desktop / 24px mobile margins.
- Cursor: 12px white square grows to 56px indigo border on hover, `mix-blend-mode: difference`, 6 trailing dots, `data-cursor-text` for label.
- Page entry: full-screen LoadingScreen with UZ monogram, status cycle, 0-100% progress.
- PowerShell `.ps1` blocked — use `cmd /c "cd /d ... && npm run build"` for npm.
- `next@14.2.5` security warning outstanding (no upgrade requested).
- All hero sections simplified to type-driven (no 3D) — large static SVG U mark with indigo corner ticks (180×180) centered hero pattern.
- 5 portfolio project types must each have a UNIQUE detail page layout (branding=editorial, ui-ux=case study, motion=showcase, web-dev=technical, brand-to-url=full pipeline).

## Progress
### Done
- About page: removed 3D R3F U mark from `AboutHero`, replaced with inlined static SVG U mark (180×180) with 4 indigo corner brackets; deleted orphaned `AboutScene.tsx`.
- Built `/services` page (7 new components + `app/services/page.tsx`): `ServicesHero` (centered, "Four disciplines. / One operator. / Brand to URL."), `SectionInterstitial` marquee, `ServicesOverview` (2x2 grid, 4 service pillars with deliverables + 6-14 week timeline), `ServicesDetail` (4 deep-dive rows with 7-col body + 5-col meta sidebar), `ServicesEngagements` (3-column with SYSTEM_BUILD featured indigo, "MOST_BOOKED" badge), `ServicesDeliverables` (4-column matrix, 42 total items), `ServicesFAQ` (10 Q&As), `ServicesCTA` (full-width indigo "Start the sequence.").
- Built `/contact` page (6 new components + `app/contact/page.tsx`): `ContactHero` (centered, "Start a / conversation. / Not a transaction.", 2 action chips), `ContactMethods` (2x2 grid: EMAIL/CALENDAR/GITHUB/TWITTER), `ContactForm` (7-col form + 5-col sidebar, live progress bar 00/07→07/07, 7 fields with EMPTY/EDITING/FILLED states, mailto: submit with success state + reference ID), `ContactExpectations` (4-step vertical timeline T+0/T+24H/T+30M/T+48H), `ContactFAQ` (10 pre-flight Q&As), `ContactCTA` (full-width indigo "Open the channel.").
- Built `/blog` and `/blog/[slug]` (12 files): `lib/blog-data.ts` (6 BlogPost + BlogBlock discriminated union with 9 block types), `lib/blog-utils.ts` (helpers + getTableOfContents with `as 2 | 3` cast), `PostCover` (8 deterministic SVG variants seeded by post number), `PostCard` (default + wide), `BlogHero` (4-stat strip), `BlogList` (featured + 6 category filter chips + live search + 2-col grid with AnimatePresence + empty state), `BlogNewsletter` (full-width indigo "The dispatch." + mailto: subscribe form), `PostHero` (back link + meta + title + subtitle + tags + cover), `PostBody` (renders 9 block types with drop-cap, anchors, code highlighting, callouts), `PostTOC` (sticky sidebar with scroll-spy + progress bar + live percentage via useState), `PostFooter` (author bio + 4-stat grid + share links + 3 related posts). 6 posts: brand-to-url-operating-system (FEATURED), why-i-sign-every-receipt-in-28-days, case-for-single-operator-studios, nextjs-framer-motion-gsap-triangulation, 48-hour-build-protocol, what-physics-taught-me-about-design-constraints.
- Built `/portfolio` and `/portfolio/[slug]` (all 14 files now complete):
  - `lib/portfolio-data.ts` (5 Project discriminated union, 5 type-specific interfaces: BrandingProject, UIUXProject, MotionProject, WebDevProject, BrandToUrlProject; allTypes, typeLabels)
  - `lib/portfolio-utils.ts` (getProjectBySlug, getAllProjects year desc, getFeaturedProject, getNonFeaturedProjects, getProjectsByType, getRelatedProjects, getAdjacentProjects cycle, getAllSlugs)
  - `components/portfolio/ProjectCover.tsx` (5 type-specific SVG patterns: branding-grid, uiux-stack, motion-arc, webdev-bracket, brandtourl-pipe)
  - `components/portfolio/ProjectCard.tsx` (default + wide variants)
  - `components/portfolio/PortfolioHero.tsx` (centered hero with 5-stat strip PROJECTS/DISCIPLINES/YEARS/CLIENTS/SHIPPED + U mark)
  - `components/portfolio/PortfolioList.tsx` (featured wide card + 5 type filter chips + 2-col grid with AnimatePresence + empty state)
  - `components/portfolio/ProjectMeta.tsx` (shared sticky sidebar with CASE_FILE, CLIENT, TYPE, YEAR, ROLE, DURATION, SCOPE, LIVE_URL, DISCUSS_SIMILAR CTA)
  - `components/portfolio/projects/BrandingProject.tsx` (editorial magazine layout: 6 sections THE_BRIEF/COLOR_PALETTE 2x3/TYPOGRAPHY 3 rows/LOGO_CONSTRUCTION 4 steps + 4 lockup variants/APPLICATIONS 2x2/THE_OUTCOME 4 stats)
  - `components/portfolio/projects/UIUXProject.tsx` (product case study: 7 sections PROBLEM/PERSONAS 2x2/ARCHITECTURE 5 areas with page tags/PROCESS_STEPS 2x2/COMPONENTS 8 cells/FINAL_SCREENS 5/METRICS 4 with deltas)
  - `components/portfolio/projects/MotionProject.tsx` (motion showcase: 6 sections CONCEPT/STORYBOARD 2x4 with SVG frame viz/FRAMES 7 with timecode/EASING_CURVES 2x2 with SVG path visualizations/SOUND 4 layers with waveform bars/OUTCOME 4 stats)
  - `components/portfolio/projects/WebDevProject.tsx` (technical case study: 6 sections BRIEF/STACK 2-col with purpose/ARCHITECTURE 5 layers/PERFORMANCE 5 with animated indigo score bars/CODE_SAMPLE with tsx syntax highlighting keywords indigo/strings silver/comments slate/FEATURES 2x2)
  - `components/portfolio/projects/BrandToUrlProject.tsx` (flagship pipeline: 6 sections BRIEF/PIPELINE 4 stages with deliverables sidebar/BRAND palette 3x5 + type + logo note/PRODUCT screens + features 2x2/BUILD stack chips + performance 2x2/OUTCOME 4 stats)
  - `components/portfolio/ProjectNav.tsx` (prev/next project navigation, cycled, with meta strip + title + excerpt + client + year)
  - `components/portfolio/PortfolioCTA.tsx` (full-width indigo "Your case study next." with system status panel showing CAPACITY 02/04, NEXT_SLOT Q3_2026, animated 50% capacity bar, 2 CTA buttons: Start the sequence / See the engagements)
  - `app/portfolio/page.tsx` (list entry, 38 lines: PortfolioHero + interstitials marquee + PortfolioList + Footer)
  - `app/portfolio/[slug]/page.tsx` (detail entry with generateStaticParams/generateMetadata, switches on project.type to render matching layout from `components/portfolio/projects/`, includes ProjectHero (back link area + meta strip + huge title + subtitle + cover) + body 8-col + meta sidebar 4-col + SectionDivider + ProjectNav + PortfolioCTA + Footer)
  - 5 projects: `lattice` (FEATURED, brand-to-url, Lattice Finance, 2026, 10w, brandtourl-pipe), `halcyon-labs` (branding, Halcyon Labs, 2025, 8w, branding-grid), `northwind-os` (ui-ux, Northwind Logistics, 2025, 11w, uiux-stack), `phantom-reel` (motion, Phantom Reel Festival, 2026, 4w, motion-arc), `caravan` (web-dev, Caravan Travel, 2025, 6w, webdev-bracket)
- Navigation updated: navLinks final = `About→/about`, `Work→/#work`, `Services→/services`, `Log→/blog`, `Contact→/contact`. Brand logo `href="/"`. Added `usePathname()` with `isHome` boolean. Active section map: `/about`→about, `/services`→services, `/contact`→contact, `/blog`→log. Book Call button: `isHome ? '#contact' : '/contact'`.
- Build verified all routes (final):
  - `/` 18.7 kB / 196 kB
  - `/about` 9.49 kB / 140 kB
  - `/services` 12.2 kB / 140 kB
  - `/contact` 12.9 kB / 141 kB
  - `/blog` 7.18 kB / 154 kB
  - `/blog/[slug]` 5.42 kB / 152 kB (× 6 posts)
  - `/portfolio` 5.15 kB / 141 kB
  - `/portfolio/[slug]` 7.59 kB / 144 kB (× 5 projects)

### In Progress
- (none) — Portfolio system fully built and verified.

### Blocked
- (none)

## Key Decisions
- Hero pattern standardized across all subpages: full-width centered, no 3D, 3-line headline (last line indigo) + thin indigo rule + sub + U mark with corner ticks (180×180) + top/bottom meta strips. AboutHero originally had R3F but was simplified per user request.
- `about-page components/three/AboutScene.tsx` deleted when removed; no source code references remained after edit.
- Blog data uses structured `BlogBlock[]` instead of MDX — no new dependencies needed, full control over rendering, no markdown parser.
- `getTableOfContents` return type must include `as 2 | 3` cast — TypeScript widens literal types otherwise.
- PostTOC `window?.scrollY` during SSR fails — moved to `useState<number>(0)` and update in `useEffect`. Replaced "MIN LEFT" display with `Math.round(progress)%`.
- BlogPost cards use `dangerouslySetInnerHTML` for content text (allows `&ldquo;`/`&rdquo;` in source data).
- Blog initial `BlogHero` used `dangerouslySetInnerHTML` with inline `@keyframes` — broke; rewrote with proper Framer Motion `motion.span` with `initial`/`animate`/staggered `delay`.
- Portfolio uses TypeScript discriminated union (`type BrandingProject | UIUXProject | ...`) — each layout component receives the full project and renders type-specific content.
- Portfolio list `PortfolioList` does not need search; only type filter (different from BlogList which has both).
- Project covers are deterministic SVGs seeded by post number (not random) — same cover renders same every time.
- Navigation: route all subpage links to their dedicated routes (`/about`, `/services`, `/blog`, `/contact`) rather than anchor jumps, since those pages exist as full routes.
- Section ID convention on subpages: `about-hero`, `about-story` etc. for about; `services-hero` etc. for services; `contact-hero` etc. for contact; `blog-hero`, `post-hero` for blog; `portfolio-hero`, `post-hero` for portfolio.
- `as const` not used in blog data because rendering components handle widening.
- WebDevProject code highlighting is regex-based (not a parser): keywords (import/const/let/function/return/if/else/async/await/etc.) → indigo, strings (single/double/template) → silver, comments (//) → slate italic, numbers → silver. Pre-escapes `<` `>` `&` before applying spans.
- MotionProject `curves` SVG path uses `cubic-bezier`-like control points from `easeIn`/`easeOut` numeric values.
- BrandToUrlProject pipeline stages include connector lines (vertical 1px + indigo square dot) between stages.
- ProjectNav dividers use `divide-y md:divide-y-0 md:divide-x divide-uz-graphite` to stack on mobile, side-by-side on desktop.

## Next Steps
- (none) — All 5 subpages (about, services, contact, blog, portfolio) and detail routes built and verified.

## Critical Context
- Build env: `cmd /c "cd /d <path> && npm run build"` works, raw `cd` in PowerShell fails on Windows paths with spaces.
- `.next` cache deletion needed when files are removed from disk; webpack `0.pack.gz` references stale paths until cleared. Use `Remove-Item -LiteralPath ".next" -Recurse -Force -ErrorAction SilentlyContinue` before rebuilds.
- Build output (final, all clean, 20 routes):
  - `/` 18.7 kB / 196 kB
  - `/about` 9.49 kB / 140 kB
  - `/services` 12.2 kB / 140 kB
  - `/contact` 12.9 kB / 141 kB
  - `/blog` 7.18 kB / 154 kB
  - `/blog/[slug]` 5.42 kB / 152 kB (× 6 posts)
  - `/portfolio` 5.15 kB / 141 kB
  - `/portfolio/[slug]` 7.59 kB / 144 kB (× 5 projects)
- `data-cursor="hover"` enables cursor growth; `data-cursor-text="..."` shows label (BOOK, VIEW, START, EMAIL, FORM, OPEN, READ, SEND, DISCUSS, etc.).
- All `mailto:`-based forms (contact, blog newsletter) open user's email client with pre-filled subject/body. No backend; client-side only.
- ContactForm PROJECT_TYPE 7 chips: S.01 Brand System, S.02 Product Design, S.03 Web Engineering, S.04 Brand Strategy, S.05 Solo Sprint, S.06 Operator Retainer, S.07 Something Else.
- Portfolio types: `'branding' | 'ui-ux' | 'motion' | 'web-dev' | 'brand-to-url'`. Each project has unique type-specific data fields (e.g. `palette[]` for branding, `personas[]` for ui-ux, `storyboard[]` for motion, `performance[]` for web-dev, `pipeline[]` for brand-to-url).
- Section IDs (final, no conflicts): `top`, `about`, `work`, `services`, `process`, `contact`, `blog-hero`/`post-hero`, `portfolio-hero`/`post-hero`/etc.
- WebDevProject code highlighting is regex-only (handles tsx/tsx strings, comments, keywords, numbers) — not a real parser. Avoid complex code in codeSample fields.

## Relevant Files
- `D:\My work\Web Dev\UZ\usama zahid\app\about\page.tsx`: About page entry, 8 sections + dividers + AboutCTA + Footer.
- `D:\My work\Web Dev\UZ\usama zahid\app\services\page.tsx`: Services page entry, 7 sections + 4 dividers + 2 interstitials + Footer.
- `D:\My work\Web Dev\UZ\usama zahid\app\contact\page.tsx`: Contact page entry, 6 sections + 3 dividers + 2 interstitials + Footer.
- `D:\My work\Web Dev\UZ\usama zahid\app\blog\page.tsx`: Blog list entry, BlogHero + interstitials + BlogList (featured + filter+search grid) + BlogNewsletter + Footer.
- `D:\My work\Web Dev\UZ\usama zahid\app\blog\[slug]\page.tsx`: Blog detail, generateStaticParams/generateMetadata, PostHero + PostBody (8-col) + PostTOC (4-col sticky) + SectionDivider + PostFooter + Footer.
- `D:\My work\Web Dev\UZ\usama zahid\app\portfolio\page.tsx`: Portfolio list entry (38 lines): PortfolioHero + SectionInterstitial marquee + PortfolioList + Footer.
- `D:\My work\Web Dev\UZ\usama zahid\app\portfolio\[slug]\page.tsx`: Portfolio detail entry, generateStaticParams/generateMetadata, inline ProjectHero (8-col meta+title, 4-col cover) + body grid 8-col (type-specific layout) + meta sidebar 4-col (ProjectMeta sticky) + SectionDivider + ProjectNav + PortfolioCTA + Footer. Switches on `project.type` to render matching layout from `components/portfolio/projects/`.
- `D:\My work\Web Dev\UZ\usama zahid\lib\blog-data.ts`: 6 BlogPost + BlogBlock discriminated union (9 types) + allCategories + allTags.
- `D:\My work\Web Dev\UZ\usama zahid\lib\blog-utils.ts`: getPostBySlug, getAllPosts, getFeaturedPost, getNonFeaturedPosts, getPostsByCategory, getRelatedPosts, calculateReadingTime, formatDate/formatDateLong, getAllSlugs, getTableOfContents (with `as 2 | 3` cast), slugifyHeading.
- `D:\My work\Web Dev\UZ\usama zahid\lib\portfolio-data.ts`: 5 Project discriminated union + 5 type-specific interfaces (BrandingProject, UIUXProject, MotionProject, WebDevProject, BrandToUrlProject) + allTypes + typeLabels.
- `D:\My work\Web Dev\UZ\usama zahid\lib\portfolio-utils.ts`: getProjectBySlug, getAllProjects (year desc), getFeaturedProject, getNonFeaturedProjects, getProjectsByType, getRelatedProjects, getAdjacentProjects (cycle), getAllSlugs.
- `D:\My work\Web Dev\UZ\usama zahid\components\Navigation.tsx`: Uses usePathname()/isHome, routes subpage links (About/Services/Log/Contact), active section map for subpages, Book Call button routes to `/contact` from subpages.
- `D:\My work\Web Dev\UZ\usama zahid\components\about\AboutHero.tsx`: Simplified — 3D removed, static SVG U mark with 4 indigo corner ticks (180×180), centered hero pattern.
- `D:\My work\Web Dev\UZ\usama zahid\components\three\AboutScene.tsx`: DELETED.
- `D:\My work\Web Dev\UZ\usama zahid\components\services\ServicesHero.tsx`: Centered hero, "Four disciplines. / One operator. / Brand to URL."
- `D:\My work\Web Dev\UZ\usama zahid\components\services\ServicesOverview.tsx`: 2x2 grid, 4 service pillars with deliverables and timelines.
- `D:\My work\Web Dev\UZ\usama zahid\components\services\ServicesDetail.tsx`: 4 deep-dive sub-sections with meta box + deliverables + process.
- `D:\My work\Web Dev\UZ\usama zahid\components\services\ServicesEngagements.tsx`: 3 engagement models (SYSTEM_BUILD featured indigo).
- `D:\My work\Web Dev\UZ\usama zahid\components\services\ServicesDeliverables.tsx`: 4-column matrix, 42 total items.
- `D:\My work\Web Dev\UZ\usama zahid\components\services\ServicesFAQ.tsx`: 10 Q&As accordion.
- `D:\My work\Web Dev\UZ\usama zahid\components\services\ServicesCTA.tsx`: Full-width indigo "Start the sequence." + system status panel.
- `D:\My work\Web Dev\UZ\usama zahid\components\contact\ContactHero.tsx`: Centered hero with 2 action chips.
- `D:\My work\Web Dev\UZ\usama zahid\components\contact\ContactMethods.tsx`: 2x2 grid of 4 channels.
- `D:\My work\Web Dev\UZ\usama zahid\components\contact\ContactForm.tsx`: 7-col form + 5-col sidebar with live progress, mailto: submit, success state with reference ID.
- `D:\My work\Web Dev\UZ\usama zahid\components\contact\ContactExpectations.tsx`: 4-step vertical timeline with T+0/T+24H/T+30M/T+48H.
- `D:\My work\Web Dev\UZ\usama zahid\components\contact\ContactFAQ.tsx`: 10 pre-flight Q&As.
- `D:\My work\Web Dev\UZ\usama zahid\components\contact\ContactCTA.tsx`: Full-width indigo "Open the channel."
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\PostCover.tsx`: 8 deterministic SVG variants seeded by post number.
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\PostCard.tsx`: Default + wide variants with hover indigo borders.
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\BlogHero.tsx`: Centered hero with 4-stat strip.
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\BlogList.tsx`: Featured + category filter chips + live search + 2-col grid with AnimatePresence.
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\BlogNewsletter.tsx`: Full-width indigo "The dispatch." + subscribe form.
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\PostHero.tsx`: Back link + meta + title + subtitle + tags + cover.
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\PostBody.tsx`: Renders 9 block types with drop-cap, anchors, code highlighting, callouts.
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\PostTOC.tsx`: Sticky sidebar with scroll-spy + progress bar + live percentage (uses useState, no SSR window access).
- `D:\My work\Web Dev\UZ\usama zahid\components\blog\PostFooter.tsx`: Author bio + 4-stat grid + share links + 3 related posts.
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\ProjectCover.tsx`: 5 type-specific SVG patterns (branding-grid/uiux-stack/motion-arc/webdev-bracket/brandtourl-pipe).
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\ProjectCard.tsx`: Default + wide variants.
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\PortfolioHero.tsx`: Centered hero with 5-stat strip.
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\PortfolioList.tsx`: Featured + 5 type filter chips + 2-col grid with AnimatePresence.
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\ProjectMeta.tsx`: Shared sticky sidebar with CASE_FILE, CLIENT, TYPE, YEAR, ROLE, DURATION, SCOPE, LIVE_URL, DISCUSS_SIMILAR CTA.
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\projects\BrandingProject.tsx`: Editorial magazine layout (6 sections: brief, palette, type, logo construction, applications, outcome).
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\projects\UIUXProject.tsx`: Product case study layout (problem, personas, architecture, process, components, screens, metrics).
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\projects\MotionProject.tsx`: Motion showcase layout (concept, storyboard, frames, curves, sound, outcome).
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\projects\WebDevProject.tsx`: Technical case study layout (brief, stack, architecture, performance with animated score bars, code sample with regex syntax highlighting, features).
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\projects\BrandToUrlProject.tsx`: Flagship pipeline layout (brief, 4-stage pipeline with deliverables sidebar, brand palette/type/logoNote, product screens/features, build stack chips + performance, outcome).
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\ProjectNav.tsx`: Prev/next project navigation, dividers stack on mobile / split on desktop, with meta strip + title + excerpt + client + year.
- `D:\My work\Web Dev\UZ\usama zahid\components\portfolio\PortfolioCTA.tsx`: Full-width indigo "Your case study next." with system status panel (CAPACITY 02/04, animated 50% bar) + 2 CTA buttons.
- `D:\My work\Web Dev\UZ\usama zahid\package.json`: No new dependencies added; all portfolio/blog features use existing deps.
- `D:\My work\Web Dev\UZ\usama zahid\.next`: Cleared before each major build with `Remove-Item -LiteralPath ".next" -Recurse -Force -ErrorAction SilentlyContinue`.
