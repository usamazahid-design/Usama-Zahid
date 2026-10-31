# Technical SEO & Web Performance Audit — usamazahid.design

**Audited:** 18–19 September 2026 · **Site:** usamazahid.design (Usama Zahid — Brand-to-URL design, pre-seed→Series A SaaS/AI founders)
**Target cluster:** "AI product designer", "brand and product designer"
**Method:** live crawl of 57 sitemap URLs + host/legacy probes, raw HTML parsing, headless Chrome rendering across 5 device profiles, Lighthouse (lab, throttled) on 9 page/device combinations, content-negotiation tests on image CDNs, schema.org validation against Google's documented property requirements, and index/mention research.

**Stack detected:** Next.js static export (`_next/static`) served by LiteSpeed on Hostinger. No CDN, no edge cache. Brotli + HTTP/2 enabled. HTTPS valid, no mixed content.

---

## 1. Executive summary — top 5 issues ranked by traffic impact

### #1 — CRITICAL: The homepage is a full-page error screen on every phone (reproduced, root-caused)

Every viewport below the 768px breakpoint renders **"Something went wrong / Try again"** instead of the homepage. Verified at 320, 360, 375, 390, 393, 411, 412, 414, 428, 480, 540, 600, 640 and 700px — 768px+ renders normally.

- **Failing DOM:** 43 nodes. **Working DOM:** 1,026 nodes. Same URL, same run.
- **Root cause (proven):** an SVG path-draw animation calls `getTotalLength()` on an `SVGGeometryElement` that is **not rendered** below the `md` (768px) breakpoint. Chrome throws `InvalidStateError: Failed to execute 'getTotalLength' on 'SVGGeometryElement': This element is non-rendered element`. The throw happens inside an effect during hydration, is uncaught, and React tears the tree down to the root error boundary.
- **Proof:** monkey-patching `SVGGeometryElement.prototype.getTotalLength` to return a finite value before page load makes the homepage render perfectly on a 390px viewport (1,026 nodes, full content). Without the patch: 43 nodes, error screen.
- **Secondary bug (all viewports, non-fatal):** `SyntaxError: Failed to execute 'appendChild' on 'Node': Unexpected token ')'` from the Next.js `next/script` loader at `_next/static/chunks/6558-*.js:5194`. It appears on desktop too, where the page still renders — but it should be fixed.
- **Compounding effect:** when the crash occurs the error boundary replaces the whole document, so the rendered DOM has **no `<title>`, no meta description, no viewport meta and late/missing charset** (Lighthouse confirms all four fail). A search engine rendering at smartphone width can therefore see a document with no title and no description.
- **Why this is #1:** Google indexes mobile-first. Even where Googlebot's own rendering is masked (see finding CB-1 — `/_next/` is blocked in robots.txt, so Googlebot currently can't fetch the JS/CSS needed to render at all), **every human visitor on a phone gets an error page**. Mobile is where "AI product designer" searches happen. Zero mobile conversion, and no CrUX-eligible good experience data can accumulate.

### #2 — CRITICAL: The target keyword theme is missing from every commercial page

| Page | "AI product design" occurrences | Title contains "AI product" | H1 contains it |
|---|---|---|---|
| `/` (homepage) | **0** | No | No |
| `/ai-product-design/` (the dedicated landing page) | **0** | No | No |
| `/services/` and all 4 `/services/*/` | **0** | No | No |
| `/portfolio/`, all 4 case studies | 0–2 | No | No |
| `/about/`, `/cv/`, `/contact/`, `/products/`, `/calculator/` | 0 | No | No |
| Blog posts only | 3–44 | 4 posts | 4 posts |

The page literally named `/ai-product-design/` never uses the phrase "AI product design" and is titled *"Brand-to-URL | Brand & Product Design | Usama Zahid"*. Its H1 is *"From concept. To product. One operator."* — an expression of process, not of service. **There is no relevance signal for the money keyword anywhere on the money pages.** Meanwhile "Brand-to-URL" (a coined, zero-search-volume term) occupies prime title/H1/JSON-LD real estate across the whole site.

Compounding this, the site has been re-positioned and Google is still serving the **previous** positioning: current live title is *"Brand & Product Designer | Brand-to-URL"*, while the live SERP result for the homepage reads *"AI Product Designer for SaaS & Startups — Usama Zahid"* and the snippet picks up UI chrome (`01 About 02 Work 03 Services 04 Log 05 Contact UTC --:--:--`). Repeated positioning churn resets topical evaluation and produces stale, low-CTR snippets.

### #3 — CRITICAL: Mobile Core Web Vitals fail on every content template

Lab, throttled mobile (4× CPU, Slow 4G) — see `evidence/05-lighthouse-summary.txt`:

| Template | Perf | FCP | LCP | TBT | CLS | Speed Index | TTI |
|---|---|---|---|---|---|---|---|
| `/services/` | **10** | 3.3s | 6.5s | 13,400ms | **0.52** | 10.1s | 33.9s |
| `/portfolio/` | **10** | 3.3s | 7.2s | 11,950ms | **0.53** | 10.0s | 31.2s |
| `/ai-product-design/` | **10** | 3.2s | 6.7s | 25,730ms | **0.49** | 17.3s | 65.4s |
| `/blog/…users-trust/` | **11** | 3.4s | 8.0s | 15,150ms | **0.44** | 8.7s | 34.8s |
| `/contact/` | **13** | 3.4s | 6.8s | 16,220ms | **0.40** | 9.6s | 41.9s |
| `/portfolio/petrozen-erp/` | **51** | 3.4s | 6.9s | 640ms | 0 | 5.0s | 7.0s |
| Homepage (crashed state) | 57 | 3.4s | 6.7s | 480ms | 0 | 3.6s | 6.7s |
| Homepage (desktop) | 83 | 0.5s | 1.9s | 200ms | 0.005 | 1.7s | 3.2s |
| Case study (desktop) | 96 | 0.5s | 0.9s | 30ms | 0 | 1.8s | 1.7s |

Note the perverse result: **the homepage's "57" is a broken page's score** — a crashed page does no work, so it scores better than the pages that actually render. All Core Web Vitals thresholds are failed: LCP good ≤2.5s, INP proxy (TBT) good ≤200ms, CLS good ≤0.1.

Causes, in order of weight:
- **587 KB of JavaScript across 25 requests** on a 698 KB page (Script = 84% of page weight).
- Third-party tags load eagerly and block the main thread: `googletagmanager.com` gtag **172–176 KB**, PostHog `posthog-recorder.js` **66 KB** + `surveys.js` **34 KB** + 5 more PostHog assets, `app.cal.com/embed/embed.js` **24 KB**. Third-party code blocked the main thread for **4,940ms** on `/ai-product-design/`; PostHog recorder alone was attributed **22s of bootup time**.
- **No `preconnect`/`dns-prefetch`** for googletagmanager.com, us-assets.i.posthog.com or app.cal.com (Lighthouse: ~300ms saveable).
- Fonts are not preloaded — two self-hosted `woff2` files (47 KB + 31 KB) are discovered only after CSS parse.
- Node counts of 1,449 on `/services/` and `/portfolio/` with an animation-heavy layout.
- `unused-javascript` ≈ 194 KB wasted; `legacy-javascript` ≈ 48 KB wasted.
- CLS 0.40–0.53 is driven by the boot/preloader sequence and entrance animations that move the LCP element, plus blog images without `width`/`height` attributes.
- **Images:** hero images are shipped ~4× larger than displayed — `/images/portfolio/Petrozen-ERP/reconciliation.webp` is 1,448×1,086 for a 362×272 slot (**98% wasted bytes**); Unsplash images are hard-coded at `w=1600` for a 362px slot. No `srcset`/`sizes` anywhere.
- Static assets cached only `max-age=604800` (7 days) rather than 1 year + `immutable`; `_next/static` filenames are content-hashed, so this is free performance left on the table.

### #4 — HIGH: Off-page authority is effectively zero, and two of the six entity profiles are dead links

- The site's Organization schema `sameAs` points to six profiles. **Two are 404:**
  - `https://www.behance.net/pdd045` → *"Oops! We can't find that page."* (verified live)
  - `https://dribbble.com/usamazahid` → **404**
  - `https://www.linkedin.com/in/usamazahid-design/` — unverifiable, and inconsistent with other profiles (see below)
- **Competitor comparison** (verified): Clay (clay.global) holds 4.8★ across 30–32 verified Clutch reviews, 4.9★ across 37 DesignRush reviews, ~23 Google reviews, Webby/Awwwards/Communication Arts/FWA awards, and is listed on Clutch, DesignRush, Digital Agency Network, AgencyCluster, topbrandagencies.com and ~8 "best AI product design agencies" listicles. Usama has a Clutch profile with **no verified reviews and no displayed rating**.
- A search for the domain outside the site returns essentially **no editorial mentions** — the only non-site result surfaced is a GitHub repo of internal notes. There is no visible award, press, podcast or gallery feature.
- **Entity confusion is real and damaging.** Public profiles under this name disagree with each other: a second Behance profile (`behance.net/usamazahid11`) claims *2 years* of experience and "Google Certified UX/UI Designer"; the site claims *7 years, 100+ projects*; the Clutch profile says *6 years, founded 2023* while the site's JSON-LD says `foundingDate: 2019`; and at least three different LinkedIn handles exist (the site's `usamazahid-design`, the legacy schema's `usamazahid-pakalign`, and `usamadesign`). For a person-brand, this is a direct E-E-A-T and entity-disambiguation problem.

### #5 — HIGH: Internal linking is boilerplate-only, and there are no visible breadcrumbs

- Every page links to every top-level page through the shared header/footer — that is why all 57 URLs sit at depth ≤2.
- But **across all 33 blog posts and all 7 case studies there are ZERO contextual in-content internal links.** No post links to the service page or case study it is evidence for; no case study links to the next case study or to the relevant service. The 33 posts are the only pages carrying the target keyword relevance, and they pass none of it to the money pages.
- `BreadcrumbList` JSON-LD exists on 56 of 57 URLs, but **no visible breadcrumb UI** exists anywhere (`aria-label="breadcrumb"` absent on all sampled pages). Google recommends the visible trail match the markup.
- Anchor text to case studies is uniformly generic: `"Open case →"`, `"Read the case file →"`, `"[ CASE_STUDY ] …"`, `+42% ENGAGEMENT_TIME # 0…` — no descriptive, keyword-bearing anchors.
- `/card/` and `/cv/` receive only ~34 in-site inbound links each (all footer), making them the thinnest nodes; `/calculator/` has **1**.

---

## 2. Full findings table

Severity: **C**ritical / **H**igh / **M**edium / **L**ow · Effort: **S** <1 day · **M** 1–3 days · **L** 1–2 weeks · **XL** 2+ weeks

**63 findings** across the 7 requested categories (11 Critical · 18 High · 22 Medium · 7 Low · 4 verified-good · 1 mixed). A machine-readable, sortable copy is in `findings.csv`.

### 1 — Crawlability & Indexing

| ID | Issue | Sev | Page(s) affected | Evidence | Fix | Effort |
|---|---|---|---|---|---|---|
| CB-1 | `robots.txt` blocks `/_next/` — this disallows the site's **CSS and all JS**. Googlebot cannot fetch the stylesheets or scripts needed to render, so rendering is blocked on every URL. | **C** | Site-wide | `robots.txt`: `Disallow: /_next/` | Remove the `Disallow: /_next/` line (and `/api/` if it serves no crawlable HTML). Hashed static assets cost nothing to allow and are required for rendering. Re-verify in GSC → URL Inspection → "Test live URL" → View crawled page. | S |
| CB-2 | Homepage crashes below 768px, replacing the document (and its `<title>` / meta description / viewport) with an error screen | **C** | `/` (and any template using the same animation) | Width sweep 320–700px all fail; stub test restores render | Guard the SVG draw animation: only run it when the element is rendered (`el.getBoundingClientRect().width > 0`), or gate on `matchMedia('(min-width: 768px)')`, or wrap in `try/catch`. Add a **scoped** React error boundary per section (not just the root) so one animation can never blank a page. | S–M |
| CB-3 | Legacy URL architecture was replaced with **404s, not 301s** — old indexed URLs (`/journals/*`, `/services/branding/`, `/services/development/`, `/process/`, `/pricing/`, `/faq/`) all return 404 while Google still surfaces their content in SERPs | **H** | ~8+ legacy URL patterns | All probed URLs → 404 (4,511-byte "This Page Does Not Exist") | Pull the top old URLs from GSC → Pages → "Not found (404)", then 301 each to its nearest live equivalent (`/journals/*` → the matching `/blog/*`; `/services/branding/` → `/services/identity/`; `/services/development/` → `/services/engineering/`; `/process/` → `/services/`). Add a catch-all 301 map for the old taxonomy. | M |
| CB-4 | `www` host and `http://www` both return **200** instead of 301-redirecting; canonical is set to non-www so equity is mostly consolidated, but every www backlink (including the Clutch citation, which points at `https://www.usamazahid.design`) hits a duplicate host | **M** | All URLs on `www` | `https://www.usamazahid.design/` → 200; `https://usamazahid.design/` → 200 | 301 `www` → apex at the server/Hostinger level. Keep the existing `http` → `https` 301 (already correct). | S |
| CB-5 | Every path resolves at both `/path` and `/path/` (18 sampled pairs, all 200). Canonicals mitigate, but the server creates duplicate URL space and wastes crawl budget | **M** | Site-wide (57 × 2) | `/blog` and `/blog/` both 200; same for `/portfolio`, `/contact`, `/about`, all case studies | 301 the non-slash variant to the slash variant (match the canonical) at the LiteSpeed level. Keep internal links consistent. | S |
| CB-6 | `/special-offer/` is `noindex, follow` **but is listed in `sitemap.xml`** — contradictory signals; also flagged as a reason the page can't accumulate authority | **M** | `/special-offer/` | Meta robots `noindex, follow`; present in sitemap | If it's a real offer page, remove `noindex`. If it's genuinely excluded, remove it from the sitemap instead. Pick one. | S |
| CB-7 | `sitemap.xml` is structurally valid (57 URLs) but every URL shares the **same `lastmod`** (`2026-08-27T12:02:11.062Z`) and there are no `<image:image>` entries | **L** | `sitemap.xml` | Single lastmod value across all 57 URLs | Emit real per-URL `lastmod` from content dates, and add `<image:image>` for case-study heroes (valuable for Discover/Images). Regenerate on every deploy. | S–M |
| CB-8 | Google Search Console access was not available to this audit, so coverage/impression data could not be read directly. Everything above is inferred from crawl + SERP evidence. | — | — | n/a | Grant GSC access and check: Pages → *Not found (404)*, *Duplicate without user-selected canonical*, *Crawled – currently not indexed*; Settings → Crawl stats; Core Web Vitals report. The 404 cluster from CB-3 and the duplicate cluster from CB-5/4 will be visible there. | S |
| CB-9 | **Good news, verified:** no orphan pages (all 57 reachable ≤2 clicks from home), `noindex` present on exactly one page, self-referencing canonicals on 56/57 URLs, the 404 page correctly returns HTTP 404, `https` + HTTP/2 + Brotli + valid HSTS-free HTTPS all correct, no mixed content. | — | — | Crawl graph | Maintain. Consider adding `Strict-Transport-Security` (see PF-9). | — |

### 2 — Technical Performance

| ID | Issue | Sev | Page(s) affected | Evidence | Fix | Effort |
|---|---|---|---|---|---|---|
| PF-1 | Mobile lab performance 10–13 on all content templates; LCP 6.5–8.0s, TBT 12–26s, TTI 31–65s | **C** | `/services/`, `/portfolio/`, `/ai-product-design/`, `/blog/*`, `/contact/` | Lighthouse mobile, 4× CPU + Slow 4G | Sequence the work: (1) unblock the crash (CB-2), (2) defer third parties, (3) code-split the animation stack, (4) preconnect + preload. Expect LCP <3s and TBT <600ms from (1)+(2)+(3) alone. | L |
| PF-2 | 587 KB JS / 25 script requests; `unused-javascript` ≈194 KB; `legacy-javascript` ≈48 KB | **C** | All | Lighthouse network + unused-javascript | Audit bundle: GSAP **and** Framer Motion are both shipped (`nextjs-framer-motion-gsap-triangulation` blog post confirms the triangulation) — pick one for scroll work and lazy-load the other via `next/dynamic` with `ssr:false`. Add `modularizeImports`/`optimizePackageImports`, drop `polyfills-*.js` via a modern `browserslist`. | L |
| PF-3 | Third-party tags block the main thread: gtag 172–176 KB, PostHog recorder 66 KB + surveys 34 KB + 5 more, Cal.com embed 24 KB. Third-party block = **4,940ms**; PostHog recorder attributed 22s bootup. | **C** | All | `third-party-summary`, `bootup-time` | PostHog: set `strategy="lazyOnload"` on the init `<Script>`, disable `session_recording` on marketing pages or enable `maskAllInputs`+sampling, and drop unused features (surveys/dead-clicks/exception autocapture if unused). GA/GTM: `strategy="afterInteractive"` at minimum, better `lazyOnload`, and consider Google's consent-mode + a single tag manager rather than gtag + PostHog + Cal. | M |
| PF-4 | Cumulative Layout Shift 0.40–0.53 on templates that render (good ≤0.1) | **C** | `/services/`, `/portfolio/`, `/ai-product-design/`, `/blog/*`, `/contact/` | `layout-shifts` — 15 shifts/page; largest 0.44–0.53 | Reserve space for the boot/preloader so it doesn't push the LCP element; animate with `transform`/`opacity` only (not layout properties); add explicit `width`/`height` (or `aspect-ratio`) to **every** `<img>` — **293 of 296 `<img>` elements site-wide (99%) lack width/height**, including 138 across the 33 blog posts. | M |
| PF-5 | Hero images are delivered ~4–8× larger than displayed; 16 images exceed 300 KB | **H** | Case studies, blog | `image-delivery-insight`: `reconciliation.webp` 1,448×1,086 for a 362×272 box → 117,917 wasted bytes (98%); Unsplash hero 1,600px for a 362px box → 60,006 wasted bytes | Use `next/image` (static export supports it with `unoptimized` off + a loader, or self-host resized variants) or add `srcset`/`sizes` manually: case-study images at 480/768/1200/1600w; Unsplash at `w=400/800/1600` with `auto=format&q=70`. Target ≤80 KB per above-the-fold image. | M |
| PF-6 | No `srcset`/`sizes` on any image; Unsplash URLs hard-coded at `w=1600&q=80` | **H** | All image pages | Raw `<img>` inspection across 12 templates | Same as PF-5. Also self-host the Unsplash assets you rely on (removes a third-party connection and gives you control of format/cache) — note Unsplash *does* correctly serve AVIF (62 KB at 1600w, 13 KB at 400w) to modern browsers, so format is not the problem; **dimension waste is**. | M |
| PF-7 | Static assets cached only 7 days; nothing is `immutable` | **M** | `/_next/static/*`, `/images/*` | `cache-control: public, max-age=604800`; Lighthouse `cache-insight` est. 118 KB savable | For `/_next/static/*` (content-hashed filenames): `public, max-age=31536000, immutable`. For `/images/*`: 1 year since filenames are stable. Let HTML stay short-cached. | S |
| PF-8 | No `preconnect`/`dns-prefetch` for the three third-party origins that are always used | **M** | All | `<link rel="preconnect">` list is empty; Lighthouse `uses-rel-preconnect` ≈300ms | Add `<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>`, `https://us-assets.i.posthog.com`, `https://app.cal.com`, `https://images.unsplash.com`. Keep to ≤4. | S |
| PF-9 | Fonts are self-hosted but not preloaded, and there's no `font-display` audit pass; no `Strict-Transport-Security`; a third-party `__cf_bm` cookie is set by the Cal.com embed | **M**/**L** | All | Lighthouse `font-display` (no items), missing HSTS header, `third-party-cookies` (1) | Use `next/font/local` with `display:'swap'` and `preload:true` and preload only the two weights used above the fold; add `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`; self-host the Cal.com embed or load it only on interaction/`/contact`. | M |
| PF-10 | Render-blocking CSS (2 files, 14 KB) is in `<head>`; the LCP element on `/services/` is a `<span>` inside an animated H1 wrapper | **L** | All | `render-blocking-insight` (2 items); LCP node = `h1.font-display > span.block > span.block` | Low bytes, so low priority — inline the critical subset of the 947-byte file, defer the 13 KB one. More importantly, stop animating the LCP element's container so LCP isn't delayed by the boot sequence. | S |
| PF-11 | **Good news, verified:** Brotli enabled (153 KB HTML → 26 KB on the wire), HTTP/2, TTFB 60–80 ms server response, `http`→`https` 301 correct, no mixed content, no images missing an alt attribute (2 decorative images correctly use an empty alt), most non-hero images already `loading="lazy"`. | — | — | Headers + crawl | Maintain. | — |

### 3 — On-Page SEO

| ID | Issue | Sev | Page(s) affected | Evidence | Fix | Effort |
|---|---|---|---|---|---|---|
| OP-1 | Target keyword absent from all commercial pages (see Exec #2) | **C** | `/`, `/ai-product-design/`, `/services/*`, `/portfolio/*`, case studies | Automated keyword count across 57 URLs | Rewrite `/ai-product-design/` as the cluster's money page: title `AI Product Designer for SaaS & AI Startups \| Usama Zahid`, H1 containing "AI product design", and the phrase in the first 100 words plus 3–5 subheads. Then add "AI product design" to `/services/product/`, `/services/`, and each AI-relevant case study. Keep "Brand-to-URL" as a *differentiator*, not the primary keyword. | M |
| OP-2 | 17 titles exceed 60 characters → truncation in SERPs (up to 69 chars) | **H** | Blog posts, `/branding/taxdoctor/`, `/portfolio/begum-bridal-couture-website/` | Crawl title lengths | Cap at ~55 chars before the brand suffix; lead with the keyword, put "\| Usama Zahid" on only the highest-value pages. E.g. `/blog/ai-onboarding-design-why-youre-losing-users/` → `AI Onboarding Design: Stop 5-Minute Churn` (42). | S |
| OP-3 | `/about/` title is only 19 characters ("About \| Usama Zahid") — wasted SERP real estate on the site's key E-E-A-T page | **M** | `/about/` | Crawl | `About Usama Zahid — AI Product & Brand Designer, Lahore` (~55). | S |
| OP-4 | Meta descriptions are templated and inconsistent: 33 are ≥150 chars, 5 open with the identical pattern "Learn how to…", and several are machine-truncated mid-sentence with an ellipsis (`"…The reason is that brand decision…"`) | **M** | 33 blog posts + landing pages | Crawl | Rewrite the top 12 pages by opportunity as CTR copy (concrete outcome + differentiator + soft CTA), 140–155 chars, unique opener per post. Remove the programmatic word-cut. | M |
| OP-5 | Heading hierarchy is otherwise good: exactly one H1 on 56/57 pages, logical H2/H3 nesting. Two exceptions: `/card/` has **2 H1s**; `/cv/` H1 text is duplicated ("Usama Zahid CV. Seven years. One designer. The full record. Seven years. One designer. The full record.") | **L** | `/card/`, `/cv/` | Crawl H1 counts | Demote the second `/card/` H1 to H2; de-duplicate the `/cv/` H1. | S |
| OP-6 | Zero contextual internal links in 33 posts and 7 case studies (Exec #5) | **H** | All blog + case studies | Link extraction with nav/footer removed | Add 3–5 contextual links per post: one to the parent service page, one to a relevant case study (keyword anchor, e.g. *"how we cut reconciliation time by 78% in the Petrozen ERP redesign"*), one to the `/ai-product-design/` hub. Add a "Related case study" module driven by tags. | M |
| OP-7 | No visible breadcrumbs despite `BreadcrumbList` JSON-LD on 56 URLs | **M** | All sub-pages | `aria-label="breadcrumb"` absent site-wide; only the case-study "chapters" nav exists | Render a visible, linkable breadcrumb (`Home › Services › Product Design`) matching the JSON-LD, and add `aria-label="Breadcrumb"`. | S |
| OP-8 | URL structure is clean and readable with no parameters — **good**. Two nits: `/branding/Techmechka/` uses inconsistent casing (all other slugs are lowercase), and case studies are split across two directories (`/portfolio/` for product, `/branding/` for identity) which fragments the "case study" grouping | **L** | `/branding/Techmechka/`, `/portfolio/*`, `/branding/*` | Crawl | 301 `/branding/Techmechka/` → `/branding/techmechka/`. Consider a single `/work/` hub that lists all 7 cases with facet filters, keeping the existing URLs live. | S–M |
| OP-9 | Content depth is genuinely strong: 33 blog posts, median 2,433 words (min 1,038 / max 3,213) — this rivals or beats agency blog output. But **case studies are thin for commercial pages**: 436–1,746 words, and the `/portfolio/` hub is 436 words with only 4 of 7 cases surfaced | **M** | 7 case studies, `/portfolio/`, `/branding/` | Crawl word counts | Push each case study past 1,800 words with: problem framing, constraints, named decisions, before/after artefacts, the metric methodology ("how the 78% was measured"), and a closing CTA. Surface all 7 cases on the hub. | L |
| OP-10 | Image alt text handling is **excellent**: 0 of 296 `<img>` elements are missing an `alt` attribute, and the only 2 empty alts are on `/card/` where they are correctly decorative — **good**. Blog alts are generic though (the post title reused as the hero alt) | **L** | Blog | Crawl image audit across 58 URLs | Make blog alts describe the image, not repeat the post title. | S |

### 4 — Structured Data

| ID | Issue | Sev | Page(s) affected | Evidence | Fix | Effort |
|---|---|---|---|---|---|---|
| SD-1 | `Product` schema on `/products/` is **missing `image`** for all 5 products → fails Google's required properties for Product/Merchant rich results | **H** | `/products/` (5 × Product) | JSON-LD dump: `Product props=['category','description','name','offers','url']` | Add `image` (absolute URL, ≥1200px wide where possible) to each Product. Add `brand`, `sku`, and `priceValidUntil` to the `Offer`. Then validate each. | S |
| SD-2 | `Organization` on every page is missing `logo` — a required/recommended property for Organization rich results and for entity resolution | **M** | All 57 pages | JSON-LD dump: `Organization props=[…]` — no `logo` | Add `"logo": {"@type":"ImageObject","url":"https://usamazahid.design/images/logo.png","width":512,"height":512}`. Also add `"@id"` to Organization and Person and reference them everywhere (see SD-3). | S |
| SD-3 | No `@id` values anywhere → the JSON-LD is a set of **disconnected islands**. Organization, Person and WebSite are re-declared on every page instead of being one graph with stable identifiers | **M** | All pages | Every block re-declares `@type` with no `@id` | Adopt a single node graph: `Organization#org`, `Person#usama`, `WebSite#site`, `WebPage#webpage`, and reference via `@id` in `author`, `publisher`, `creator`, `mainEntityOfPage`. This is what makes Google consolidate you as one entity. | M |
| SD-4 | `Article` schema is missing **`mainEntityOfPage`** and there is no `image` served from your own domain (all point at `images.unsplash.com`) | **M** | 33 blog posts | JSON-LD dump of `/blog/ai-ux-design-patterns/` and `/blog/how-much-does-saas-website-design-cost/` | Add `mainEntityOfPage: { "@type":"WebPage", "@id": "<url>#webpage" }`. Self-host one 1200×630 OG image per post — third-party-hosted Article images are fragile and lose you control of the asset Google may show. `author`, `datePublished`, `dateModified`, `publisher` are already correct. | M |
| SD-5 | `CreativeWork` on the 7 case studies is missing `creator`, `dateCreated` and `about`; it uses `author` only | **M** | 7 case studies | JSON-LD dump of `/portfolio/petrozen-erp/` | Add `creator` (Person `@id`), `dateCreated`, `about` (project type), plus `image`/`thumbnailUrl`, `keywords`, and `award` if any. Consider `@type: ["CreativeWork","CaseStudy"]`… note `CaseStudy` is not a schema.org type — model it as `CreativeWork` + `about` (the client/product) or use `Article` with `articleSection: "Case Study"` for richer eligibility. | S |
| SD-6 | `Service` + `AggregateOffer` on the 4 service pages is solid (`lowPrice`/`highPrice`/`offerCount`, nested `Offer`s). `Organization` nested as `provider` is missing `url` and `logo` | **L** | `/services/*/` | JSON-LD dump of `/services/product/` | Reference the single `Organization#org` by `@id` instead of re-declaring a bare `{name:"Usama Zahid"}`. Add `serviceType`, `areaServed`, and `hasOfferCatalog`. | S |
| SD-7 | `FAQPage` markup is used on 10+ pages. Since Aug 2023 Google restricts FAQ rich results to authoritative government/health sites, so **this markup will not produce rich results** for this site. It is not harmful, but it is not earning anything either | **M** | `/`, `/contact/`, `/ai-product-design/`, `/special-offer/`, 4 service pages, 33 posts | Schema type inventory across 57 URLs | Keep the markup (it still helps entity/topic understanding) but stop counting it as a rich-result opportunity. Redirect that effort into `Article`/`CreativeWork` completeness and a real review corpus. Consider `HowTo` for process posts (`/blog/48-hour-build-protocol/`) — `HowTo` *does* still render. | S |
| SD-8 | No `BreadcrumbList` on `/card/` (the only page with none) | **L** | `/card/` | Schema inventory | Add the two-level trail, or accept it as a non-search page. | S |
| SD-9 | Missing opportunities: `ProfilePage` + full `Person` (already strong on `/about/`: `alumniOf`, `knowsAbout`, `sameAs`, `birthPlace`) should be linked from `/cv/` as `ProfilePage`; `AggregateRating`/`Review` is absent even though the page displays "★★★★★ Trusted by 47+ founders" (self-serving ratings are ignored for rich results and should only be added when tied to real, verifiable third-party reviews); no `VideoObject` for the motion work; no `SoftwareApplication`/`Service` schema for the 5 digital products | **M** | `/cv/`, `/about/`, `/`, `/products/` | Schema inventory + page copy | Add `ProfilePage` wrapping the `Person` on `/about/` and `/cv/`. For ratings: only mark up `Review`/`AggregateRating` once you collect real Clutch/Google reviews, and attribute them to `Organization` (not self-authored). Add `VideoObject` if motion reels are published. | M |

> **Validation note:** Google's Rich Results Test has no public API, so each block was validated by hand against Google's documented required/recommended properties plus the schema.org spec. Recommended final step: run these 8 URLs through `search.google.com/test/rich-results` — `/`, `/products/`, `/ai-product-design/`, `/services/product/`, `/services/identity/`, `/portfolio/petrozen-erp/`, `/branding/codestreaks/`, `/blog/ai-ux-design-patterns/` — and fix anything SD-1→SD-5 flags.

### 5 — Content & Semantic SEO

| ID | Issue | Sev | Page(s) affected | Evidence | Fix | Effort |
|---|---|---|---|---|---|---|
| CN-1 | Keyword-to-content mismatch on every commercial page | **C** | See OP-1 | Keyword count across 57 URLs | See OP-1. Treat "AI product designer" as the primary cluster and "brand and product designer" as the secondary; write both into titles, H1s, first paragraphs and internal anchors. | M |
| CN-2 | Search-intent mismatch on the homepage. Someone searching "AI product designer" wants *evidence they should hire one*: what you do, who for, proof, price, availability, and a way to start. The homepage instead opens with an experimental boot sequence (`CALIBRATING_TYPOGRAPHY / BOOTING…`), a live UTC clock, a 0→100% counter, and kinetic type — the actual service statement ("I'm a brand & product designer. Brand-to-URL…") is the 4th text block on desktop and never appears on mobile because the page crashes | **H** | `/` (and every template using the same boot sequence) | Raw HTML order + rendering; JS-off text extraction | Keep the aesthetic, but make the above-the-fold readable in one screen: **what** (AI product design for pre-seed→Series A SaaS), **who for**, **proof metric**, **availability**, primary CTA. Reduce the boot sequence to ≤400ms or remove it on mobile and for repeat visitors. | M |
| CN-3 | Case studies do not target long-tail, proof-driven queries. Titles are brand-only (`Petrozen ERP \| Case Study \| Usama Zahid`) and H1s like "The Laila Majnu" carry no intent — nobody searches for them | **H** | All 7 case studies | Crawl titles and H1s | Retitle for intent (`SaaS Onboarding Redesign Case Study: −58% Drop-off`, `ERP UX Case Study: Invoice-to-Reconciliation in Under 1 Hour`); add an intent-bearing H1 plus a "Results" block stating the metric, the measurement method and the timeframe. These are the pages most likely to earn links and long-tail traffic. | M |
| CN-4 | Topic cannibalisation in the AI cluster. Four posts compete for near-identical intent: `ai-ux-design-patterns` vs `designing-for-uncertainty-ai-ux-patterns` (both "AI UX patterns/uncertainty"), plus `ai-product-design-build-saas-products-users-trust` vs `the-trust-gap-in-ai-products` vs `ai-features-that-dont-feel-gimmicky`. Two more collide on cognitive load: `cognitive-load-is-killing-your-saas-conversions` vs `audit-your-saas-product-for-cognitive-load`. Title-similarity analysis flags 20+ pairs >0.55 | **H** | 10+ blog posts | Title-similarity matrix + phrase-overlap analysis | Canonicalise one post per intent; merge the weaker into the stronger with a 301 and fold in its unique sections; differentiate the rest by explicit angle (e.g. "AI trust patterns for B2B dashboards" vs "AI trust patterns for consumer chat"). Build one pillar page per cluster and link all posts up to it. | L |
| CN-5 | No topic pillar/hub page. 33 posts exist but no page owns the cluster head term | **H** | Site architecture | Link graph: all posts at depth 2, no hub page | Create `/ai-product-design/` as a genuine hub (not just a landing page): 2,000+ words on the discipline, an annotated index of every AI post, links to the 4 case studies, and FAQ. Point every cluster post at it. | M |
| CN-6 | `"Brand to URL"` is a coined, zero-volume term occupying the primary title keyword slot on the homepage and 5+ other pages. Half the homepage H2s are internal jargon (`[ PROTOCOL_03 / BRAND_TO_URL ]`, `THE_BRAND_TO_URL_SEQUENCE`) | **M** | `/`, `/services/`, `/ai-product-design/` | SERP research + on-page audit | Keep it as a trademarked differentiator in the H1/schema and body, but move it out of the primary keyword slot. Buy the query relevance with real search terms. | S |
| CN-7 | Content gaps vs named competitors. Cheapest wins that competitors own and you don't: **pricing transparency page** (you have a calculator but no crawlable pricing page), **`/work/`-style filterable case index**, **process page** (deleted — old `/process/` 404s), **comparison pages** ("freelance vs agency" exists as a post — promote to a service page), **named-client logo wall**, **glossary/definitions hub**, **AI-UX pattern library as a linkable asset**, **a `/reviews/` proof page** | **M** | New pages | Competitor content inventory (Clay, Ramotion, Focus Lab, Designjoy, Adam Fard) | Prioritise: `/pricing/`, `/process/`, `/reviews/`, and a definitional hub (`/ai-ux-patterns/`). See §6 for the named competitors and what each outranks you with. | L |
| CN-8 | E-E-A-T: the author bio is genuinely good on `/about/` (candid, specific, `Person` schema with `alumniOf`, `knowsAbout`, `sameAs`) — **this is a strength**. But: testimonials are partially pseudonymous ("Sara K.", "Bilal M.", "Hina T.") with **no verifiable source**; there is no external validation (no reviews, no press, no awards); no client logos; and the metric claims have no method ("78% reduction" — measured how?) | **H** | `/`, `/about/`, `/cv/`, all case studies | Page copy + profile research | Get 2–3 testimonials attributed with full name, role, company and a link (LinkedIn or the live product) — consent permitting. Add a "how we measured this" line under each metric. Add client logos with permission. Collect real reviews (see AU-2). Publish the `/cv/` as a downloadable PDF (already available) and link it from `/about/`. | M |
| CN-9 | **Credibility contradiction (urgent):** the homepage advertises "LIGHTHOUSE 98+" and "Lighthouse 98. Always." — measured mobile reality is **10–57**. Separately, the site's proof stats render as **"0Y / 0+ / 0+ / 0+ VERIFIED"** before JS hydrates (captured in `evidence/02-homepage-js-off-zero-stats.png`), and on mobile they never animate because the page crashes. Anyone — prospect, client, or a reviewer reading your own case study about Lighthouse scores — can verify the opposite of your headline claim | **C** | `/`, all templates using the stat counters | Measured scores + JS-off screenshot | Fix the crash and the bundle first, then make the claim true, or change the copy to something verifiable today. Never let a stat render as 0: add a `<noscript>`/pre-hydration default that shows the real number. Also reconcile the numbers across pages — home says 50+ projects / 30+ clients / 6Y, `/about/` says 100+ projects / 7 years, `/portfolio/` says 47+ clients / 100+ projects, Clutch says 6 years / founded 2023, schema says `foundingDate: 2019`. | M |
| CN-10 | Content freshness/shelf life is lapsing: "NEXT_AVAILABILITY Q3_2026", "Q3 2026 only", "UPDATED_2026.Q2", "Available for 2 new projects this quarter" — as of 19 Sept 2026, Q3 ends in 11 days and the "only" offer is close to expiring | **M** | `/`, `/special-offer/`, `/contact/` | Page copy | Drive these from a single dated config so a stale quarter can't sit on the page, or drop the dating entirely and state capacity instead. | S |

### 6 — Authority & Off-Page

> **Framing note:** no Ahrefs/Semrush/Moz API was available, so this section reports what *is* verifiable: index/mention research, profile status (live-tested), competitor citation mapping, and the concrete link targets competitors own and you don't. Treat the DR/RD numbers in any other report as estimates until you pull a backlink tool.

| ID | Issue | Sev | Page(s) affected | Evidence | Fix | Effort |
|---|---|---|---|---|---|---|
| AU-1 | **Two of six `sameAs` profiles are dead links.** `behance.net/pdd045` returns "Oops! We can't find that page"; `dribbble.com/usamazahid` returns 404. The LinkedIn handle in your schema (`/in/usamazahid-design/`) is inconsistent with other profiles carrying your name | **H** | Every page (Organization `sameAs`) + footer social links | Live HTTP checks + live page fetch | Update every URL to a profile that currently resolves; remove dead ones from `sameAs` and from the footer (a footer link to a 404 is a visible trust signal to prospects too). Pick **one** canonical handle per platform and use it in the site, schema, Clutch, Behance and LinkedIn. | S |
| AU-2 | **Clutch profile exists but carries no verified reviews or rating** — while every competitor in the niche leads with review volume: Clay 4.8★/30–32 Clutch + 4.9★/37 DesignRush + ~23 Google; Uitop 5.0★/21; Arounda 5.0★/62; Momentum 4.9★/94. Clutch profile metadata also contradicts the site: "Founded 2023", "6 years experience", and `sameAs: https://www.usamazahid.design` (the **www** host, which doesn't redirect — see CB-4) | **H** | `clutch.co/profile/usama-zahid-design` | Competitor review counts (Clutch/DesignRush/page sources) + profile content | Ask your 5–8 best clients (Begum Retails, CodeStreaks, Petrozen, Strong Rentals, Laila Majnu) for verified Clutch reviews — Clutch ranks for agency queries and buyers filter on review count. Fix the "founded" year to 2019 to match your schema. Change the profile's website field to the apex domain. Add DesignRush and Digital Agency Network profiles (both are followed/valued citations). | M |
| AU-3 | **Absent from every "best AI product design agency" listicle** — the highest-intent, highest-value link class in this niche. Verified live: 925studios, awesomic (×2), uitop, onething.design, excited.agency, rightleftagency, softriver, qubstudio, freecodeslab, wavespace, topbrandagencies. Competitors appear in most of them; you appear in none | **H** | Off-site | SERP research across 11 listicle pages | Build a target list and pitch inclusion (these pages are updated quarterly and mostly editorial-only). Pitch angle: *"single-operator alternative for pre-seed budgets"* — most listicles explicitly note a gap below the $25K–50K tier, which is exactly your position ($8K–24K). Pitch 3 per week for 8 weeks. | M |
| AU-4 | No awards or gallery features — competitors lead with Webby, Awwwards, Communication Arts, FWA, Behance/Dribbble features | **H** | Off-site | Competitor research (Clay: Webby/Awwwards/CA/FWA) | Submit the strongest 3 pieces (Petrozen ERP dashboard, Begum editorial commerce, the CodeStreaks identity system) to Awwwards, FWA, CSS Design Awards, and Behance galleries/curated categories. Awards generate both links and buyer trust. Also publish on Dribbble with a **live** profile. | L |
| AU-5 | Near-zero editorial mentions. A domain search outside the site surfaces essentially nothing editorial (one GitHub repo of internal notes) | **C** | Off-site | Index/mention research | Build the first 15 referring domains deliberately: Clutch + DesignRush + Digital Agency Network + AgencyCluster + topbrandagencies (directories); 3× listicle inclusion (AU-3); 1 award (AU-4); 2 client-site credits ("Site by Usama Zahid" on begumretails.com and thelailamajnu.com — ask now, they already link out elsewhere); Indie Hackers / r/SaaS / Hacker News "Show" for the 48-hour build write-up; Figma Community file for the design tokens; a Next.js showcase submission; one original data study ("we audited 50 AI SaaS onboarding flows — here's the median time-to-first-value") as a linkable asset. | XL |
| AU-6 | No Google Business Profile surfaced for the practice. Competitors carry 23–94 Google reviews, which also feed local/pack ranking for "design agency near me" style queries and give a trust surface | **M** | Off-site | Research | Create a Google Business Profile as a service-area business (Lahore + worldwide), complete with services, photos, and the `sameAs` set; then collect 5+ reviews from the same clients. Pair with `ProfessionalService`/`LocalBusiness` schema only if you want local pack visibility. | M |
| AU-7 | Social/citation signals are thin and split. Behance (the profile the site linked) is gone; a second Behance (`usamazahid11`) describes a *2-year* designer — contradicting your 7-year positioning. X, GitHub, Vimeo and Instagram links exist. No design-directory presence (no Awwwards, no Dribbble, no curated Behance) | **M** | Off-site | Live checks + profile comparison | Consolidate to ONE identity per platform and make every bio consistent (years of experience, title, location, one URL). Delete or repurpose the junior Behance profile. Post weekly case-study breakdowns to LinkedIn/X — this is also the top of the funnel for the link targets above. | M |

### 7 — UX friction that suppresses SEO performance

| ID | Issue | Sev | Page(s) affected | Evidence | Fix | Effort |
|---|---|---|---|---|---|---|
| UX-1 | Total mobile lockout (Exec #1) | **C** | `/` on all phones | Reproduced width sweep | See CB-2. This is simultaneously the biggest UX and biggest traffic issue. | S–M |
| UX-2 | Navigation is cryptic. Top nav reads `01 About 02 Work ▾ 03 Services ▾ 04 Log 05 Contact` — "Log" for a blog, numbered prefixes, dropdown-only for the two most important sections. There is no `Hire`/`Pricing` entry and no breadcrumb trail | **M** | All pages | Nav markup extraction | Rename to plain language (`Work`, `Services`, `Writing`, `About`, `Contact`), keep the numerals as decoration only, surface the dropdown children in the HTML (they must be crawlable and keyboard-reachable), and add `Pricing` to the nav once `/pricing/` exists. | S |
| UX-3 | Above-the-fold clarity fails the "5-second test" on mobile: the first screen is a boot sequence plus a clock; the value proposition and CTA come later. Every mobile visitor who *does* scroll — on a non-crashing template — meets the same treatment | **H** | `/`, `/services/`, `/ai-product-design/`, `/portfolio/` | Rendered screenshots of each template at 390px | Lead with a one-line proposition + primary CTA above the fold on mobile; move the boot sequence after LCP (or remove it on mobile and for returning visitors). | M |
| UX-4 | Conversion path friction: primary CTA is a Cal.com embed (`app.cal.com/embed/embed.js`, 24 KB, sets a third-party `__cf_bm` cookie, loads on **every** page); the secondary path is a brief form; `/calculator/` has exactly **1** internal inbound link so almost nobody finds it; `/products/` and `/calculator/` are not in the main nav | **M** | `/`, `/contact/`, `/calculator/`, `/products/` | Link-graph inbound counts + third-party audit | Load Cal.com only on `/contact/` (or on click), add a persistent `Book a call` link in the nav, link the calculator from `/services/` and every service page, and add products/pricing to the nav or footer. | M |
| UX-5 | Proof stats render as zeros pre-hydration and, on mobile, never populate | **H** | `/` (and any template with counters) | JS-off screenshot `evidence/02-homepage-js-off-zero-stats.png` | Render the real numbers server-side and animate *from* them (or not at all). An animated counter that starts at 0 is a design flourish; a permanent 0 is a credibility failure. | S |
| UX-6 | Bounce-rate risk compound: heavy animation on load + no above-fold clarity + crash on mobile + 6.5–8s mobile LCP. Any one of these raises bounce; the combination is why near-zero traffic isn't converting into anything | **H** | All | Lighthouse + screenshots | Fix in order: crash → above-fold clarity → animation budget → LCP. Re-measure after each. | M |
| UX-7 | **Good news, verified:** tap targets pass (Lighthouse `tap-targets` returned no failures), viewport meta is present on every template, the case-study sub-navigation ("Case study chapters") is a genuinely strong wayfinding pattern worth reusing on blog posts, and the 404 page is branded and returns the correct status code. | — | — | Lighthouse + crawl | Reuse the case-study chapters pattern on long blog posts. | — |

---

## 3. Prioritised 30 / 60 / 90-day action plan

Effort is the *first* constraint here, then impact. Nothing in days 1–14 depends on more content being written — it is all fixable in the existing codebase.

### Days 0–14 — Stop the bleeding (nothing below is optional)

| # | Action | Owner | Effort | Done when |
|---|---|---|---|---|
| 1 | **Fix the mobile homepage crash.** Guard the SVG `getTotalLength` call (`if (el.getBoundingClientRect().width === 0) return;` or gate the animation on `matchMedia('(min-width: 768px)')`), or wrap it in `try/catch`. Add a scoped error boundary around each animated section. | Dev | S–M | `/` renders 1,000+ DOM nodes at 320/360/375/390/411/428px; Lighthouse mobile on `/` shows real content |
| 2 | **Fix the `next/script` SyntaxError** at `6558-*.js` — audit every `<Script>`/`dangerouslySetInnerHTML` usage on the homepage; make `errors-in-console` clean on all viewports. | Dev | S | Zero page errors on desktop and mobile |
| 3 | **Unblock `/_next/` in robots.txt** so Googlebot can fetch the CSS/JS needed to render. | Dev | S | `robots.txt` serves `Allow: /` with no `_next` disallow |
| 4 | **Move third-party tags off the critical path:** PostHog → `lazyOnload` (+ disable session recording on marketing pages or sample it), GA/gtag → `lazyOnload`, Cal.com → load only on `/contact/`. Add `preconnect` for the 3 remaining origins. | Dev | M | LCP < 3.5s and TBT < 1,000ms on `/services/` mobile |
| 5 | **Server redirects:** `www` → apex 301; `/path` → `/path/` 301; `/branding/Techmechka/` → lowercase. Add the legacy 301 map (`/journals/*`, `/services/branding/`, `/services/development/`, `/process/`, `/pricing/`, `/faq/`). | Dev | S–M | All probed variants return 301 → 200 chain of length 1 |
| 6 | **Sitemap hygiene:** remove `/special-offer/` from the sitemap (keep `noindex`), emit real per-URL `lastmod`. | Dev | S | Sitemap validates; no noindex URL listed |
| 7 | **GSC setup & baseline:** verify the domain property, submit the sitemap, then export Pages / Core Web Vitals / Crawl stats. Expect the 404 cluster (CB-3) and duplicate cluster (CB-4/5) to appear. | SEO | S | Baseline report saved; Indexing requests filed for all 57 URLs |
| 8 | **Fix the dead profile links and the "0" stats.** Update every `sameAs` + footer link to a live profile; render stats server-side. | Dev + SEO | S | `behance.net/pdd045` and `dribbble.com/usamazahid` no longer referenced anywhere on-site |
| 9 | **Correct or remove the "Lighthouse 98+" claim** until it is measurably true. | Content | S | No unverifiable performance claim on the site |
| 10 | **Tag the crash in analytics** so you can quantify what mobile was costing you (a `window.onerror` beacon), and note the date you shipped the fix — it's the cleanest before/after story you'll have. | Dev | S | Error events visible in PostHog/GA |

### Days 15–30 — Relevance and on-page

| # | Action | Owner | Effort |
|---|---|---|---|
| 11 | Rewrite `/ai-product-design/` as the cluster money page (title, H1, first 100 words, 5 subheads, FAQ, CTA) with "AI product designer"/"AI product design" as the primary keyword. | Content | M |
| 12 | Add the keyword to `/services/product/`, `/services/`, `/portfolio/`, and the 3 AI case studies — naturally, in headings and body. | Content | M |
| 13 | Retitle the 17 over-length titles and the `/about/` title; rewrite the top 12 meta descriptions as CTR copy. | SEO | M |
| 14 | **Add 3–5 contextual internal links to each of the 33 posts** (parent service + relevant case study + `/ai-product-design/`), with descriptive anchors. Add a "Related case study" module. | Content + Dev | L |
| 15 | Add **visible breadcrumbs** to all sub-pages matching the existing `BreadcrumbList` JSON-LD. | Dev | S |
| 16 | Case-study retitles + a "Results / how it was measured" block on all 7; push each past 1,800 words; surface all 7 on `/portfolio/`. | Content | L |
| 17 | Structured data fixes: `Product.image` (5), `Organization.logo`, `Article.mainEntityOfPage`, `CreativeWork` `creator`/`dateCreated`/`about`, `@id` graph, `ProfilePage` on `/about/` + `/cv/`. | Dev | M |
| 18 | Performance round 2: self-host/`srcset` all hero images (target ≤80 KB above the fold), add `width`/`height` to every `<img>`, fix CLS by reserving the preloader's space and animating only transform/opacity, 1-year immutable cache for `/_next/static` and `/images`, preload the two above-fold font weights. | Dev | L |
| 19 | Consolidate the AI/cognitive-load topic cannibalisation: merge weaker posts into stronger ones with 301s. | Content | L |
| 20 | Collect **5–8 verified Clutch reviews** + fix the "founded 2023" metadata; create DesignRush and Digital Agency Network profiles. | BD | M |
| 21 | Create the Google Business Profile. | BD | S |

### Days 31–60 — Depth, entity consolidation, first links

| # | Action | Owner | Effort |
|---|---|---|---|
| 22 | Launch the missing commercial pages: `/pricing/`, `/process/`, `/reviews/`, and a `/ai-ux-patterns/` definitions hub. | Content | L |
| 23 | Build `/ai-product-design/` into a true pillar: 2,000+ words, annotated index of all cluster posts, links to all relevant case studies. | Content | L |
| 24 | Consolidate the personal entity: one LinkedIn, one Behance, one Dribbble; consistent years/title/location/URL in every bio; kill the junior Behance profile; add `sameAs` for every live profile only. | BD | M |
| 25 | Publish 4 new intent-targeted posts, each mapped to one long-tail query and each linked up to the pillar ("AI onboarding teardown", "AI product design cost", "AI UX patterns that build trust in B2B", "Series A design audit checklist"). | Content | L |
| 26 | *Ask now, ask often:* "Site by Usama Zahid" credit links from begumretails.com, thelailamajnu.com and any client site. Testimonials upgraded to full name + role + company + link. | BD | S |
| 27 | Publish the **original data study** ("We audited N AI SaaS onboarding flows — median time-to-first-value") as the linkable asset. | Content | L |
| 28 | Ship 2 comparison pages ("Single operator vs agency", "Brand-to-URL vs traditional rebrand") with honest framing — high commercial intent, low competition. | Content | M |
| 29 | Re-measure everything: Lighthouse mobile per template, GSC impressions for the target cluster, CrUX once volume allows, click depth, indexation count. Set the 30-day target: **all templates ≥85 mobile performance, LCP <2.5s, CLS <0.1**. | SEO | S |

### Days 61–90 — Authority and compounding

| # | Action | Owner | Effort |
|---|---|---|---|
| 30 | Pitch 3 listicle inclusions per week (AU-3 target list), leading with the *single-operator, pre-seed-priced* angle the listicles themselves say is missing. | BD | M |
| 31 | Submit 3 projects to Awwwards / FWA / CSSDA; publish a live Dribbble profile with weekly shots; submit to curated Behance galleries. | BD | L |
| 32 | Pitch 6 podcast/newsletter appearances (SaaS design, indie-founder, Next.js, Pakistani tech). Each yields a link + a Person-entity citation. | BD | M |
| 33 | Post the 48-hour build story to Indie Hackers, r/SaaS, and a Hacker News "Show" — the write-up already exists as a blog post; reformat it. | BD | M |
| 34 | Publish the Figma Community design-tokens file and a free template from `/products/` with an attribution link — designer-to-designer links are cheap and durable. | Design | M |
| 35 | Build 3 deeper case studies around proof-driven long-tail queries (onboarding redesign, dashboard UX, luxury e-commerce UX). | Content | L |
| 36 | Establish a publishing cadence (2 posts/month) with internal linking baked into the template, and a quarterly case-study review. | Content | ongoing |
| 37 | Re-audit at day 90 against this document's table; retire fixed IDs, re-rank the rest. | SEO | S |

---

## 4. What this audit could and could not verify

| Item | Status |
|---|---|
| Page-level crawl, titles, metas, headings, canonicals, images, schema, link graph | **Verified** — full crawl in `evidence/06-full-crawl-data.json` |
| Mobile crash + root cause | **Verified & reproduced** — see `evidence/04-width-sweep-results.json`; restored by stubbing `getTotalLength` |
| Lighthouse CWV (mobile + desktop) | **Verified but lab-based** — local Lighthouse, 4× CPU / Slow 4G for mobile (`evidence/05-lighthouse-summary.txt`) |
| CrUX **field** data (real-user LCP/INP/CLS) | **Not available** — the PageSpeed Insights API was rate-limited during this audit. Pull it from GSC → Core Web Vitals, or `webvitals` report once mobile traffic exists |
| Google Search Console coverage/impressions | **Not accessible** — no GSC access was provided. All indexing findings are inferred from crawl + SERP evidence; the 404 (CB-3) and duplicate (CB-4/5) clusters will be directly visible in GSC |
| Rich Results Test validation | **Manual** — validated against Google's documented required/recommended properties (no public API). Run the 8 URLs listed in §2/4 through the Rich Results Test for the final seal |
| Backlink profile (DR/RD/anchors/toxic links) | **Not available** — no Ahrefs/Semrush/Moz API. §2/6 reports verified off-site facts (profile status, competitor review counts, listicle inclusion) and a concrete target list, not estimated metrics |
| Google Business Profile | **Not confirmed** — no GBP surfaced in research; verify directly |

---

## 5. Bottom line

The reason traffic is low is not one thing, and it is not mysterious:

1. **There was no relevance signal.** The site was re-positioned from "AI Product Designer" to "Brand-to-URL", and the target keyword was dropped from every title, H1 and service page. Google is still serving the *previous* positioning, which tells you how recently this changed.
2. **There was no mobile experience.** The homepage — the page a first-time visitor lands on — is an error screen on every phone, and every other template fails Core Web Vitals badly on mobile.
3. **There was no way in.** Zero contextual internal links from the 33 posts that hold the only topical relevance, no breadcrumbs, no pillar page, no pricing or process pages.
4. **There was no off-site footprint.** One dead-of-reviews Clutch profile, two 404 social profiles, no awards, no directory presence, no listicle inclusion, no editorial mention — against competitors carrying 30–94 verified reviews and awards.
5. **The proof contradicts itself.** "Lighthouse 98+" against 10–57 measured; "100+ projects" beside "30+ projects"; "founded 2019" beside "founded 2023"; stats that render as zero; a 7-year designer sharing a name with a 2-year Behance profile.

Items 1, 2 and 5 are fixable in under three weeks by one developer. Item 3 is four weeks of content work. Item 4 is the only genuinely long project, and it gets much easier once 1–3 are done — because you'll finally have something worth linking to, and a defensible performance claim to pitch with.

---

*Files: `findings.csv` (sortable findings table) · `evidence/` (crash screenshot, JS-off screenshot, width-sweep, Lighthouse summary, full crawl data)*
