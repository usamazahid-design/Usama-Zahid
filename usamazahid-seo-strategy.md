# SEO Audit, Strategy & Implementation Roadmap
## usamazahid.design

**Prepared for:** Usama Zahid — AI Product Designer  
**Date:** July 29, 2026  
**Context:** Independent solo operator offering design + dev services to SaaS companies and small/micro-businesses. Based in Lahore, Pakistan. ~7 years experience.

---

## 1. Executive Summary

Usama Zahid's site is technically strong under the hood (Next.js, Vercel, 98+ Lighthouse target) but is nearly invisible to search engines. The homepage throws a client-side JavaScript exception, making it unreadable to Googlebot. The blog explicitly states "No SEO content" — a philosophy that is actively costing organic leads. The site's terminal-aesthetic, while distinctive, uses navigation labels and heading structures that are opaque to search crawlers and human visitors unfamiliar with the operator persona. However, the raw material is excellent: deep case studies, genuine expertise, clear pricing, and a unique single-operator positioning. This strategy transforms the site from an SEO ghost into a lead-generating asset without compromising the brand's identity. The core shift: from "No SEO content" to "content worth finding." Estimated implementation effort: ~45 hours over 12 weeks. Expected outcome: 300–800 monthly organic visits within 6 months, up from a baseline of likely zero to near-zero.

---

## 2. Technical Audit Findings

### 2.1 Page-by-Page Findings

| # | Page | URL | Title Tag | Meta Description | H1 | H2 Count | Word Count (approx.) | Issues Found | Severity |
|---|------|-----|-----------|-----------------|----|----------|----------------------|--------------|----------|
| 1 | Homepage | `/` | *(empty)* | *(missing)* | *(JS error)* | *(JS error)* | *(JS error)* | Client-side exception — page fails to render server-side. Googlebot likely sees blank page. | **Critical** |
| 2 | About | `/about/` | "About — Usama Zahid · Usama Zahid" | *(missing)* | "Physics brain. Design hands. Builder output." | ~9 | ~1,200 | No meta description. Page is rich but narrative-driven, not keyword-targeted. "Usama Zahid" doubled in title. | Important |
| 3 | Work/Portfolio | `/work` → 404 | N/A | N/A | N/A | N/A | 0 | **404 error.** Navigation links to `/work` but sitemap lists `/portfolio`. Broken user journey. | **Critical** |
| 4 | Services | `/services/` | "Services — AI Product Design · Usama Zahid · Usama Zahid" | *(missing)* | "Four disciplines. One operator. AI Product Design." | ~4 | ~1,400 | No meta description. Good structure but titles don't include "SaaS" or "small business" keywords. | Important |
| 5 | Services → Identity | `/services/identity/` | "Brand Systems — S.01 · Usama Zahid · Usama Zahid" | *(missing)* | "Identity is a system." | ~4 | ~800 | Headings use terminal nomenclature (S.01) instead of SEO-friendly labels. | Nice-to-have |
| 6 | Services → Product | `/services/product/` | "Product Design — S.02 · Usama Zahid · Usama Zahid" | *(missing)* | "Products in systems, not screens." | ~4 | ~800 | Same terminal nomenclature issue. | Nice-to-have |
| 7 | Services → Engineering | `/services/engineering/` | "Web Engineering — S.03 · Usama Zahid · Usama Zahid" | *(missing)* | "Production code, not prototypes." | ~4 | ~800 | Same. | Nice-to-have |
| 8 | Services → Strategy | `/services/strategy/` | "Brand Strategy — S.04 · Usama Zahid · Usama Zahid" | *(missing)* | "Strategy before the design." | ~4 | ~800 | Same. | Nice-to-have |
| 9 | Contact | `/contact/` | "Contact — Open a Channel · Usama Zahid · Usama Zahid" | *(missing)* | "Let's build something remarkable." | ~6 | ~1,000 | Good CTA, all channels documented. No meta description. | Important |
| 10 | Blog Index | `/blog/` | "Operator Log — Blog · Usama Zahid · Usama Zahid" | *(missing)* | "Notes from the operator's log." | ~2 | ~300 | **Blog explicitly states "No SEO content" and "No scheduled posts."** Only 6 posts, last updated May 2026. Uses Unsplash stock images with generic alt text. | **Critical** |
| 11 | Blog Post | `/blog/brand-to-url-operating-system/` | "The Brand-to-URL Operating System — Operator Log · Usama Zahid" | *(missing)* | "The Brand-to-URL Operating System" | ~6 | ~1,400 | Strong content — could rank if optimized. No meta description. Images from Unsplash with generic alt text. | Important |
| 12 | Blog Post (x5 more) | `/blog/*` | *(pattern: Post Title — Operator Log · Usama Zahid)* | *(missing)* | Varies | Varies | 600–1,200 | Same pattern — decent content, zero SEO. | Important |
| 13 | Portfolio | `/portfolio/` | "Portfolio — Case Files · Usama Zahid · Usama Zahid" | *(missing)* | "Product case studies. AI UX depth. One operator." | ~2 | ~300 | Case study thumbnails use generic Unsplash images. No descriptive alt text. | Important |
| 14 | Case Study | `/portfolio/neuraldesk-copilot/` | "NeuralDesk Copilot — Case Study · Usama Zahid · Usama Zahid" | *(missing)* | "NeuralDesk Copilot" | ~8 | ~1,500 | **Excellent content — detailed case study.** Could drive significant organic traffic if optimized. Images are Unsplash placeholders — need real work screenshots. | Important |
| 15 | Products | `/products/` | "Digital Products — Catalog · Usama Zahid · Usama Zahid" | *(missing)* | "Five products. Zero handoffs. Instant license." | ~2 | ~500 | Interesting revenue channel. No meta description. | Nice-to-have |
| 16 | CV | `/cv/` | "CV — Usama Zahid · Operator Log · Usama Zahid" | *(missing)* | "Seven years. One operator. The full record." | ~6 | ~2,000 | Very detailed, great for authority signals. No meta description. | Nice-to-have |
| 17 | Privacy Policy | `/privacy-policy/` | "Privacy Policy — Usama Zahid · Usama Zahid" | *(missing)* | "Privacy Policy." | ~12 | ~1,500 | Legal page, well-structured. Low SEO priority. | Nice-to-have |

### 2.2 Global Technical Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| **Homepage client-side exception** | **Critical** | The root URL (`/`) throws "Application error: a client-side exception has occurred." Googlebot and users see nothing. This is the single biggest SEO problem. |
| **Missing meta descriptions on every page** | **Critical** | Not a single page has a meta description tag. Google auto-generates snippets — you lose control of SERP messaging. |
| **Zero structured data** | **Critical** | No JSON-LD schema anywhere. Missing: `Person`, `Organization`, `Service`, `WebSite`, `BreadcrumbList`, `BlogPosting`, `FAQ` schemas. This is low-hanging fruit. |
| **No Open Graph / Twitter Card tags** | Important | Links shared on social/discord will render with no image, title, or description. |
| **`/work` → 404, sitemap says `/portfolio`** | **Critical** | Navigation points to broken URL. Sitemap lists `/portfolio`. Either fix the nav or redirect. |
| **Navigation uses opaque labels** | Important | Labels: HERO, ABOUT, PROOF, SERVICES, CV, CONTACT. "HERO" and "PROOF" are not standard. Users and crawlers expect "Home" and "Portfolio." |
| **Blog tagline: "No SEO content"** | **Critical** | Self-defeating. The blog has genuinely good essays. This philosophy needs to be retired. |
| **Generic Unsplash images on portfolio** | Important | Case studies show stock photos instead of real work. This hurts both conversion (trust) and SEO (unique images drive image search traffic). |
| **Image alt text is generic** | Important | All images use auto-generated Unsplash descriptions, not real alt text describing the work. |
| **Sitemap has pages not in navigation** | Important | `/portfolio`, `/products`, `/special-offer`, `/cv`, `/privacy-policy`, `/terms` are only discoverable through sitemap. Either add to footer nav or remove from sitemap. |
| **No canonical tags detected** | Important | Risk of duplicate content issues if URLs are accessible with/without trailing slash. |
| **Title tags all end with "· Usama Zahid · Usama Zahid"** | Nice-to-have | The double name is redundant. Use "— Usama Zahid" once. |

### 2.3 What's Working Well

- **SSL/HTTPS**: Fully enabled
- **robots.txt**: Present, properly configured
- **sitemap.xml**: Present, lists all key pages, includes lastmod and changefreq
- **Performance infrastructure**: Next.js + Vercel edge, claims 98+ Lighthouse
- **Privacy compliance**: GDPR-aware privacy policy, proper cookie disclosure
- **Content depth**: About page, CV, case studies, and blog posts have genuine substance
- **Clear pricing**: All services list "FROM $X" — great for purchase-intent queries
- **Blog RSS/Atom**: Mentions RSS — good for syndication (verify it's functional)

---

## 3. Keyword Strategy

### 3.1 Target Keywords (25 Keywords Across 3 Buckets)

#### Bucket 1: Branded / Service Keywords (Bottom of Funnel — Purchase Intent)

| # | Keyword | Search Intent | Est. Volume (Global) | Difficulty | Has Content? | Priority |
|---|---------|---------------|----------------------|------------|--------------|----------|
| 1 | "brand designer for SaaS" | Hire a brand designer specializing in SaaS | 200–500/mo | Medium | ❌ None | **Highest** |
| 2 | "SaaS product designer" | Hire a product designer for SaaS | 500–1,200/mo | Medium-High | ❌ None | **Highest** |
| 3 | "SaaS landing page design" | Looking for SaaS landing page creation | 300–800/mo | Medium | ❌ None | **Highest** |
| 4 | "freelance product designer for startups" | Hire freelance product designer | 200–600/mo | Medium | ❌ None | High |
| 5 | "AI product designer" | Hire designer specialized in AI product UX | 500–1,500/mo | Low-Medium | ✅ Partially (title tag only) | **Highest** |
| 6 | "SaaS website designer" | Hire designer for SaaS website | 400–1,000/mo | Medium-High | ❌ None | High |
| 7 | "brand identity designer for tech startups" | Hire identity designer for tech | 150–400/mo | Medium | ❌ None | High |
| 8 | "designer for early stage SaaS" | Hire designer for early-stage SaaS | 100–250/mo | Low | ❌ None | Medium |

#### Bucket 2: Problem-Aware Keywords (Middle of Funnel — Research Intent)

| # | Keyword | Search Intent | Est. Volume | Difficulty | Has Content? | Priority |
|---|---------|---------------|-------------|------------|--------------|----------|
| 9 | "how to design a SaaS website that converts" | Learning conversion-focused design | 200–500/mo | Medium | ❌ None | **Highest** |
| 10 | "brand to URL process" | Understanding integrated brand+web workflow | 50–150/mo | Low | ✅ Blog post exists | High |
| 11 | "single operator studio model" | Exploring alternative studio structures | 50–100/mo | Low | ✅ Blog post exists | High |
| 12 | "SaaS design best practices 2026" | Current design best practices for SaaS | 300–800/mo | Medium-High | ❌ None | High |
| 13 | "how to improve SaaS conversion rate with design" | Using design to improve conversions | 200–500/mo | Medium | ❌ None | High |
| 14 | "SaaS product design process" | Understanding the design process | 100–300/mo | Medium | ❌ None | Medium |
| 15 | "AI UX design patterns" | Learning AI-specific UX patterns | 300–800/mo | Medium | ✅ Case study tangentially | **Highest** |
| 16 | "design system for SaaS" | Building a design system approach | 200–500/mo | Medium-High | ❌ None | Medium |
| 17 | "brand positioning for SaaS startups" | Brand strategy for SaaS | 100–300/mo | Medium | ❌ None | Medium |

#### Bucket 3: Comparison / Consideration Keywords (Middle of Funnel — Evaluation Intent)

| # | Keyword | Search Intent | Est. Volume | Difficulty | Has Content? | Priority |
|---|---------|---------------|-------------|------------|--------------|----------|
| 18 | "freelance designer vs agency for SaaS" | Comparing service models | 100–300/mo | Low | ❌ None | **Highest** |
| 19 | "best SaaS design agencies 2026" | Agency discovery | 500–1,500/mo | High | ❌ None | Medium |
| 20 | "freelance vs studio for brand identity" | Comparing service providers | 50–150/mo | Low | ❌ None | Medium |
| 21 | "how much does SaaS website design cost" | Pricing research | 200–600/mo | Medium | ❌ None | High |
| 22 | "Next.js portfolio site design" | Technical stack research | 100–300/mo | Low | ❌ None | Medium |
| 23 | "product design portfolios for SaaS inspiration" | Portfolio browsing | 100–300/mo | Low | ❌ None | Medium |
| 24 | "independent product designer for hire" | Finding independent designers | 100–250/mo | Low | ❌ None | High |
| 25 | "Pakistan product designer SaaS" | Location + service discovery | 50–100/mo | Very Low | ❌ None | Medium |

### 3.2 Competitor Gap Analysis

**Direct competitors (independent designers/small studios targeting SaaS/SMB):**

| Competitor | Domain | Strengths | Gaps Usama Can Exploit |
|------------|--------|-----------|------------------------|
| Filllo Design | dribbble.com/filllodesign | Strong Dribbble presence, 82+ products shipped, clear SaaS positioning | No blog content. Usama's case study depth + engineering capability + "one operator" narrative is unique. |
| Daniel G. Bright (Bright Studios) | Barcelona-based | "Make your company look inevitable" — strong positioning language | Usama has more technical depth (code + design), physics background narrative, and transparent pricing. |
| Onething Design | onething.design (est.) | Lean team, direct senior access, seed-stage focus | Direct competitor positioning. Usama can differentiate with "one voice, one operator" + AI product design angle. |
| Parallel HQ | parallelhq.com | Strong blog, thought leadership, clear SaaS focus | Usama can compete on price ($12K–$35K vs Parallel's $20K–$120K+) and the "solo operator = no handoff tax" story. |
| Ramotion | ramotion.com | Premium positioning, SF-based, brand+product unified | Not a direct competitor (much higher price tier), but they rank for keywords Usama should target. |

**Topics competitors rank for that usamazahid.design doesn't:**
- "SaaS website design agency" (list posts, comparison pages)
- "How much does SaaS design cost" (pricing transparency pages)
- "Startup brand identity process" (process documentation)
- "B2B SaaS landing page examples" (curated inspiration)
- "Product design for AI startups" (niche positioning)

---

## 4. Content Plan

### 4.1 Metadata Rewrites — Top 5 Pages

**Page 1: Homepage (`/`)**

| Element | Current | Recommended |
|---------|---------|-------------|
| Title | *(empty — page errors)* | `AI Product Designer for SaaS & Startups — Usama Zahid` |
| Meta Description | *(missing)* | `Independent AI product designer. I help SaaS founders and small businesses ship brand, product, and code as one continuous sequence. From strategy to deploy. Based in Lahore, working globally.` |
| H1 | *(broken)* | `AI Product Design. One operator. One sequence.` |

**Page 2: Services (`/services/`)**

| Element | Current | Recommended |
|---------|---------|-------------|
| Title | `Services — AI Product Design · Usama Zahid · Usama Zahid` | `SaaS Design Services — Brand, Product & Web Engineering — Usama Zahid` |
| Meta Description | *(missing)* | `Four tracks, one operator. Brand systems from $18K, product design from $24K, web engineering from $22K, brand strategy from $12K. Fixed scope, fixed price, 100% yours.` |
| H1 | *(current is fine)* | Keep: `Four disciplines. One operator. AI Product Design.` |

**Page 3: Portfolio (`/portfolio/`)**

| Element | Current | Recommended |
|---------|---------|-------------|
| Title | `Portfolio — Case Files · Usama Zahid · Usama Zahid` | `SaaS & AI Product Design Case Studies — Usama Zahid Portfolio` |
| Meta Description | *(missing)* | `4 deep case studies in AI SaaS, fintech, and habit-tracking product design. Each case traces research through execution. 47+ clients, 100+ projects, one operator.` |
| H1 | *(current is fine)* | Keep: `Product case studies. AI UX depth. One operator.` |

**Page 4: Blog (`/blog/`)**

| Element | Current | Recommended |
|---------|---------|-------------|
| Title | `Operator Log — Blog · Usama Zahid · Usama Zahid` | `SaaS Design & Single-Operator Studio — Blog — Usama Zahid` |
| Meta Description | *(missing)* | `Essays on SaaS product design, brand-to-URL systems, single-operator studios, and the craft of shipping. Field notes from an independent AI product designer.` |
| *(Remove)* | Tagline: `"No SEO content"` | Replace with: `"Field notes on design, code, and the craft of shipping."` |

**Page 5: Contact (`/contact/`)**

| Element | Current | Recommended |
|---------|---------|-------------|
| Title | `Contact — Open a Channel · Usama Zahid · Usama Zahid` | `Start a Project — Usama Zahid — AI Product Designer` |
| Meta Description | *(missing)* | `Available for 2 new projects Q3 2026. Book a free 15-minute diagnosis call or send a brief. Reply within 24 hours. No retainer lock. Fixed scope, fixed price.` |

**Global title tag fix:** Change all `· Usama Zahid · Usama Zahid` to `— Usama Zahid`.

### 4.2 Content Pillar Structure

#### Pillar 1: SaaS Design (The "How to Design SaaS" Authority)
*Target keywords: #2, #3, #9, #12, #13, #14, #16*

| # | Article/Topic | Target Keyword(s) | Format | Est. Words |
|---|---------------|-------------------|--------|------------|
| P1 | **Pillar Page: "The SaaS Design Operating System"** | SaaS product designer, SaaS design best practices | Long-form guide | 3,000+ |
| 1 | How to Design a SaaS Website That Converts (Not Just Looks Good) | how to design a SaaS website that converts | Guide | 2,000 |
| 2 | SaaS Landing Page Design: 10 Patterns That Ship Trust Before the Scroll | SaaS landing page design | Listicle + analysis | 2,000 |
| 3 | Designing AI Product UX: Trust, Memory, and Recovery States | AI UX design patterns | Case-study-backed guide | 2,500 |
| 4 | How to Build a Design System for SaaS (That Engineers Will Actually Use) | design system for SaaS | Technical walkthrough | 2,000 |

#### Pillar 2: Branding for SaaS & Small Business (The "Who to Hire" Authority)
*Target keywords: #1, #4, #7, #8, #17, #24*

| # | Article/Topic | Target Keyword(s) | Format | Est. Words |
|---|---------------|-------------------|--------|------------|
| P2 | **Pillar Page: "Brand Identity for SaaS Startups: A Complete Guide"** | brand designer for SaaS, brand identity designer for tech startups | Long-form guide | 2,500+ |
| 5 | Brand Positioning for SaaS: How to Define Your Space Before You Design | brand positioning for SaaS startups | Strategy guide | 2,000 |
| 6 | What Makes a Brand-to-URL System: Why Your Brand and Website Should Be One Sequence | brand to URL process | Opinion essay | 1,800 |
| 7 | Brand Identity for Early-Stage SaaS: What to Build First (and What to Skip) | designer for early stage SaaS | Founder's guide | 1,500 |

#### Pillar 3: The Single-Operator Model (The "Why One Person" Authority)
*Target keywords: #11, #18, #20, #21, #24*

| # | Article/Topic | Target Keyword(s) | Format | Est. Words |
|---|---------------|-------------------|--------|------------|
| P3 | **Pillar Page: "The Single-Operator Studio: A Complete Guide for SaaS Founders"** | freelance designer vs agency for SaaS | Long-form guide | 2,500+ |
| 8 | Freelance Designer vs Agency for SaaS: What Actually Works (Updated 2026) | freelance designer vs agency for SaaS | Comparison | 2,000 |
| 9 | How Much Does SaaS Website Design Cost in 2026? (Honest Pricing Breakdown) | how much does SaaS website design cost | Pricing transparency | 2,000 |
| 10 | The Case for Single-Operator Studios *(EXISTING — optimize and republish)* | single operator studio model | Essay | Already exists |
| 11 | What Physics Taught Me About Design Constraints *(EXISTING — optimize)* | Already covered | Essay | Already exists |
| 12 | How to Hire an Independent Product Designer (Without Getting Burned) | independent product designer for hire | Guide for clients | 1,800 |

### 4.3 Internal Linking Structure

```
Homepage (/)
├── Services (/services/) ← Primary commercial landing
│   ├── Identity (/services/identity/)
│   ├── Product (/services/product/)
│   ├── Engineering (/services/engineering/)
│   └── Strategy (/services/strategy/)
├── Portfolio (/portfolio/) ← Link from services pages ("See similar work")
│   ├── NeuralDesk Copilot (/portfolio/neuraldesk-copilot/)
│   ├── LedgerFlow AI (/portfolio/ledgerflow-ai/)
│   ├── OpsOrbit Assistant (/portfolio/opsorbit-assistant/)
│   └── Cadence Habit App (/portfolio/cadence-habit-app/)
├── Blog (/blog/) ← Link from portfolio ("Read the process behind this")
│   ├── P1: SaaS Design Operating System
│   │   ├── Design a SaaS Website That Converts
│   │   ├── SaaS Landing Page Patterns
│   │   ├── AI UX Design Patterns
│   │   └── Design System for SaaS
│   ├── P2: Brand Identity for SaaS
│   │   ├── Brand Positioning for SaaS
│   │   ├── Brand-to-URL System
│   │   └── Brand Identity for Early-Stage SaaS
│   └── P3: Single-Operator Studio
│       ├── Freelance vs Agency for SaaS
│       ├── SaaS Website Design Cost
│       └── Hire Independent Product Designer
├── About (/about/)
├── CV (/cv/)
├── Contact (/contact/)
└── Products (/products/)
```

**Key linking rules:**
- Every blog post links to at least one relevant service page
- Every case study links to its blog process write-up
- Pillar pages link to all their cluster posts and vice versa
- Service pages link to relevant portfolio case studies
- Contact CTA at the bottom of every blog post and case study
- `/work` gets a 301 redirect to `/portfolio`

### 4.4 Thin / Duplicate Content Flags

- **Service sub-pages** (`/services/identity/`, `/services/product/`, etc.) share an identical footer/sidebar structure. Not duplicate, but thin on unique indexed content outside the main body. Consolidate FAQs or add unique elements.
- **The "BOOTING..." and status terminal** code is repeated identically across dozens of pages. It's decorative, but an excessive amount of identical text across pages could be seen as boilerplate by Google. Consider reducing the terminal chrome or making it unique per page.
- **Contact CTAs** at the bottom of almost every page are near-identical. This is fine for UX but adds significant duplicate-text across the site. Consider varying one or two lines per page context.

---

## 5. Off-Page Plan

### 5.1 Backlink Acquisition Tactics

#### Tier 1: High-Authority Profile Listings (Week 7–8, ~3 hours)

| Platform | Action | Effort |
|----------|--------|--------|
| **Dribbble** (DR 92) | Update profile, post 4 case study shots with SEO-rich descriptions linking to full case studies | 2 hrs |
| **Behance** (DR 91) | Already exists (behance.net/pdd045). Publish full case studies as Behance projects with backlinks. Optimize profile headline for "AI Product Designer / SaaS." | 2 hrs |
| **Clutch** (DR 81) | Create a profile under "Design Agencies in Pakistan" — even solo operators can list. Include services and portfolio. | 1 hr |
| **Contra** (DR 78) | Create portfolio on Contra as "Brand & Product Designer for SaaS." Contra is commission-free and ranks well. | 1 hr |
| **LinkedIn** | Already exists. Optimize headline for keywords. Publish blog posts as LinkedIn articles (canonical back to site). | 1 hr |
| **GitHub** (DR 96) | Already exists (github.com/usamazahid). Pin a repo with your portfolio README linking back to site. Add website link to profile. | 30 min |
| **Awwwards** | Already won 2 SOTD. Ensure profile links to usamazahid.design. Submit case study pages for individual awards. | 1 hr |

#### Tier 2: Guest Posts & Community (Week 9–10, ~6 hours)

| Platform/Target | Action | Effort |
|-----------------|--------|--------|
| **Indie Hackers** | Write 1–2 posts about the single-operator studio model. IH audience = SaaS founders. Include case study with metrics. | 3 hrs |
| **Smashing Magazine** | Pitch an article on "Designing AI Product UX" or "Design Systems for Single Developers." They pay and have DR 91. | 4 hrs (pitch + write) |
| **CSS-Tricks / (new ownership)** | Pitch a technical piece on "Next.js + Framer Motion + GSAP: When to Use What." You already have the blog post — expand it. | 2 hrs |
| **A List Apart** | Pitch "The Translation Tax: Why Handoffs Kill Design Quality." High DR (89), perfect for your positioning. | 3 hrs |
| **Hacker News** | Post your best technical essays. HN can drive 5,000–50,000 visits in a day if it hits the front page. | 30 min/post |

#### Tier 3: Directory & Niche Listings (Week 9–10, ~2 hours)

| Platform | Action |
|----------|--------|
| **Minimal Gallery** | Submit portfolio — they feature designer portfolio sites. |
| **SiteInspire** | Submit for curation. |
| **Godly** | Submit portfolio — curated web design inspiration. |
| **Lapa Ninja** | Submit landing page designs. |
| **Product Hunt** | Already featured (#3 Product of the Day). Launch your digital products there with backlinks. |
| **PakWired / TechJuice** | Pakistani tech publications. Pitch a founder profile or design opinion piece. |

### 5.2 Digital PR Angle

**"The SaaS Design Autopsy" — A Monthly Teardown Series**

Publish one deep teardown per month of a well-known SaaS product's design (landing page, onboarding flow, or dashboard UX). Structure:

1. **What they got right** (3–5 specific design decisions, with screenshots)
2. **What they got wrong** (2–3 missed opportunities, with alternatives sketched)
3. **What you'd do differently** (specific redesign suggestion)

**Targets for first 3 months:**
- Linear.app (you use it, you know it)  
- Vercel (your hosting platform)
- Notion (your tool)

**Why this works:**
- SaaS founders search for "[Company] design analysis" or "[Company] UX review"
- The companies themselves often share well-done teardowns
- Establishes you as the SaaS design expert who sees things others miss
- Each teardown is naturally linkable and shareable on Twitter/LinkedIn/Indie Hackers

---

## 6. Phased Roadmap

### Phase 1: Foundations (Weeks 1–2) — ~12 Hours

| # | Task | Effort | Tool/Platform | Metric to Track |
|---|------|--------|---------------|------------------|
| 1.1 | **Fix homepage client-side exception.** Debug the root `/` route. This is your most important page. Verify it renders server-side (view source should show HTML content, not just JS). | 3–4 hrs | Vercel logs, Next.js error boundary | Homepage loads with HTTP 200 in Google Search Console "Live Test" |
| 1.2 | **Fix `/work` → `/portfolio` navigation.** Either rename the nav link or set up a 301 redirect from `/work` to `/portfolio`. | 15 min | Next.js redirects config | No 404s in Search Console coverage report |
| 1.3 | **Add meta descriptions to ALL pages.** Use the rewrites from Section 4.1. Implement programmatically in Next.js `generateMetadata()` for all routes. | 2 hrs | Next.js Metadata API | Meta descriptions appear in Search Console and when sharing links |
| 1.4 | **Add structured data (JSON-LD).** Implement: `Person` schema on /about, `Service` schema on /services + sub-pages, `WebSite` + `SearchAction` on homepage, `BreadcrumbList` on all pages, `BlogPosting` on blog posts, `FAQ` schema on service FAQ sections. | 3 hrs | Next.js, schema-dts package, Google Rich Results Test | All schema types validate in Google Rich Results Test with zero errors |
| 1.5 | **Add Open Graph & Twitter Card tags.** Title, description, and image for every page. Use a branded default image (not Unsplash) for pages without custom images. | 1 hr | Next.js Metadata API | Sharing any URL on Twitter/Slack/Discord renders card with image and description |
| 1.6 | **Set up canonical tags.** Ensure every page has a self-referencing canonical. Resolve trailing slash consistency (/about vs /about/). | 30 min | Next.js Metadata API | No "Duplicate without user-selected canonical" warnings in Search Console |
| 1.7 | **Submit sitemap to Google Search Console & Bing Webmaster Tools.** Verify all pages are indexed. | 30 min | GSC, Bing Webmaster | Sitemap shows "Success" status; all key pages indexed within 1–2 weeks |
| 1.8 | **Set up Google Analytics (GA4) and verify PostHog.** Ensure conversion tracking on the contact form. | 1 hr | GA4, PostHog, Google Tag Manager | Test conversion events fire on form submission |

### Phase 2: Content Build (Weeks 3–6) — ~18 Hours

| # | Task | Effort | Tool/Platform | Metric to Track |
|---|------|--------|---------------|------------------|
| 2.1 | **Optimize all 6 existing blog posts.** Add meta descriptions, proper alt text on images, internal links to services/portfolio, keyword-optimized headings, and a CTA at the end. Remove "No SEO content" from blog header. | 3 hrs | Markdown / CMS (Sanity) | Existing blog posts start appearing in Search Console queries |
| 2.2 | **Write Pillar Page P1: "The SaaS Design Operating System."** 3,000+ word comprehensive guide covering design process, AI UX patterns, landing page principles, and design systems for SaaS. | 4 hrs | Sanity CMS, Figma for custom graphics | Target: ranks for "SaaS design best practices" and "AI product designer" |
| 2.3 | **Write 2 cluster articles for P1.** "How to Design a SaaS Website That Converts" and "AI UX Design Patterns: Trust, Memory, and Recovery States" (repackage the NeuralDesk case study learning into a guide). | 3 hrs each (6 hrs) | Sanity CMS | Published and indexed in GSC; internal links from pillar page |
| 2.4 | **Replace Unsplash images on portfolio.** Swap generic images with actual project screenshots, mockups, or original graphics. Write descriptive alt text for each. | 3 hrs | Figma exports, image optimization | Images indexed in Google Image Search with relevant queries |
| 2.5 | **Optimize contact page for conversions.** A/B test the current brief form vs a shorter version. Add trust signals (47+ clients, 100% shipped, client logos if permitted). | 2 hrs | GA4, form analytics | Contact form submission rate increases |

### Phase 3: Authority & Distribution (Weeks 7–12) — ~15 Hours

| # | Task | Effort | Tool/Platform | Metric to Track |
|---|------|--------|---------------|------------------|
| 3.1 | **Write and publish Pillar Page P3: "Freelance Designer vs Agency for SaaS."** This is a high-priority ranking opportunity with low competition. Include the cost comparison table with honest pros/cons. | 3 hrs | Sanity CMS | Page ranks for "freelance designer vs agency for SaaS" and drives referral traffic |
| 3.2 | **Publish the first "SaaS Design Autopsy" teardown.** Target: Linear.app. Share on Twitter/X, LinkedIn, Indie Hackers, and Hacker News. Email your 1,247 newsletter subscribers. | 4 hrs | Sanity CMS, Figma (for annotated screenshots) | Post gets shared/engaged by the target company or community; backlinks generated |
| 3.3 | **Set up all platform profiles.** Dribbble, Behance (refresh), Clutch, Contra, GitHub — complete profiles with backlinks. | 3 hrs | Each platform | Profile pages are indexed; referral traffic begins |
| 3.4 | **Write 1 guest post.** Target Indie Hackers or Smashing Magazine. Pitch your single-operator studio model or AI UX patterns. Include 1–2 backlinks. | 4 hrs | Email pitch, writing | Guest post published with dofollow link within 4 weeks |
| 3.5 | **Publish Pillar Page P2 and 2 cluster articles.** "Brand Identity for SaaS Startups," "Brand Positioning for SaaS," and "How Much Does SaaS Website Design Cost." | 5 hrs | Sanity CMS | Pillar + cluster pages indexed; internal link network complete |
| 3.6 | **Launch digital product on Product Hunt.** Pick your Portfolio Site Template or Brand System Kit. Product Hunt launch drives backlinks and traffic. | 2 hrs | Product Hunt | #1–5 Product of the Day; 500+ visits; at least 3 backlinks from write-ups |

### Phase 4: Ongoing — Weekly & Monthly Cadence

| Cadence | Task | Tool | Metric |
|---------|------|------|--------|
| **Weekly** (30 min) | Check Google Search Console for new queries, errors, and index status. Note any 404s or mobile usability issues. | GSC | Error count at 0; new queries appearing |
| **Weekly** (15 min) | Publish or queue 1 newsletter dispatch (you already have 1,247 subs at 68% open rate — this is gold). Include a new article link or case study teaser. | Email platform | Open rate >60%; click-through rate to site |
| **Biweekly** (3 hrs) | Publish 1 new blog post or teardown. Rotate between pillar clusters. | Sanity CMS | 1 new indexed page every 2 weeks |
| **Monthly** (1 hr) | Review GA4/PostHog: organic traffic trend, top landing pages, conversion rate from organic. Compare to previous month. | GA4, PostHog | Month-over-month organic traffic growth |
| **Monthly** (30 min) | Check backlink profile. Any new links? Any toxic ones? | Ahrefs Webmaster Tools (free) or Google Search Console Links report | Referring domains growing by 2–5/month |
| **Quarterly** (1 hr) | Run PageSpeed Insights on top 5 pages. Ensure Lighthouse scores stay at 95+. Re-optimize images if needed. | PageSpeed Insights, Lighthouse | All pages >90 mobile, >95 desktop |

---

## 7. Measurement Plan

### 7.1 Baseline Metrics (Start Here — Week 1)

| Metric | Baseline (Estimated) | Tool |
|--------|----------------------|------|
| Monthly organic clicks | Near zero (homepage throws JS error) | Google Search Console |
| Total indexed pages | 15–20 (only those in sitemap) | Google Search Console |
| Average position | 50+ (essentially invisible) | Google Search Console |
| Backlinks / Referring domains | Unknown — likely <10 | Ahrefs (free tier) / GSC |
| PageSpeed (mobile) | Unknown — test immediately | PageSpeed Insights |
| Core Web Vitals — LCP | Claimed <0.8s — verify | PageSpeed Insights / CrUX |
| Newsletter subscribers | 1,247 | Email platform |
| Contact form submissions / month | Unknown — start tracking | GA4 / PostHog |
| Bounce rate from organic | Unknown | GA4 |

### 7.2 3-Month Targets

| Metric | Target | 
|--------|--------|
| Monthly organic clicks | 100–300 | 
| Indexed pages | 30+ |
| Keywords in top 100 | 50+ |
| Keywords in top 10 | 3–5 (long-tail) |
| Backlinks / Referring domains | 15–25 |
| 1 blog post ranking on page 1 for a target keyword | Yes |
| Contact form submissions from organic search | 2–5 total |

### 7.3 6-Month Targets

| Metric | Target | 
|--------|--------|
| Monthly organic clicks | 300–800 |
| Keywords in top 10 | 10–15 (including 2–3 high-intent service keywords) |
| Referring domains | 25–40 |
| Organic-to-lead conversion rate | 2–5% |
| Blog becomes primary source of new discovery (beating referrals) | Yes |

### 7.4 Tools Setup Checklist

| Tool | Cost | Setup |
|------|------|-------|
| **Google Search Console** | Free | Verify domain ownership. Submit sitemap. Check weekly. |
| **Google Analytics 4** | Free | Install via GTM. Set up conversion events (form submit). |
| **Bing Webmaster Tools** | Free | Import from GSC. Submit sitemap. |
| **Ahrefs Webmaster Tools** | Free (limited) | Verify domain. Track backlinks and keyword positions. |
| **PageSpeed Insights** | Free | Test monthly. Integrate with Lighthouse CI for automated checks. |
| **PostHog** | Already using (self-hosted) | Set up dashboards for organic traffic and conversions. |
| **Sentry** | Already using | Continue monitoring JS errors on homepage. |

---

## Appendix A: Quick Wins — Do These First

These 5 tasks take under 2 hours total and can be done tomorrow:

1. **Fix `/work` → `/portfolio` redirect.** 15 minutes. Stops losing visitors.
2. **Add meta description to `/services/` page.** 10 minutes. Your most valuable commercial page.
3. **Remove "No SEO content" from blog header.** 2 minutes. Stop signaling that search engines shouldn't bother.
4. **Add your website to your GitHub profile** and pin your portfolio README. 10 minutes. DA 96 backlink, free.
5. **Run a PageSpeed Insights test on the homepage** (once it's fixed) to confirm the 98+ Lighthouse claim. 5 minutes. If it's not 98+, fix it — you sell this as a deliverable.

---

## Appendix B: Navigation Label Fix

| Current (Terminal) | Recommended (Human + SEO) |
|---------------------|---------------------------|
| HERO | Home |
| ABOUT | About |
| PROOF → currently 404s | Portfolio / Work |
| SERVICES | Services |
| CV | CV / Resume |
| CONTACT | Contact |

*Keep the terminal aesthetic in the page content — just make navigation labels intelligible to both humans and crawlers.*

---

*Document prepared by SEO audit crawl and competitive research, July 2026. All findings based on live site analysis and current search landscape.*

---

## 8. Generative Engine Optimization (GEO): Getting Cited by ChatGPT, Perplexity & AI Overviews

This section covers how to make your site readable, trustworthy, and citable by AI engines — ChatGPT, Perplexity, Claude, Google AI Overviews, and Gemini. Traditional SEO gets you into the retrieval set; GEO gets you *cited*. Different engines, different rules. Here's exactly what to do.

### 8.1 Why This Matters for a Solo Designer

When a SaaS founder asks Perplexity "Who should I hire to design my SaaS landing page?" or asks ChatGPT "What's the best process for branding an AI startup?" — you want your name and site in the answer, with a citation link. This is not theoretical. AI engines now drive 10–30% of discovery for B2B services. Being the *cited source* is the new ranking #1.

### 8.2 The llms.txt File — Your AI Sitemap

**What it is:** A plain-text Markdown file at `https://usamazahid.design/llms.txt` that tells AI models what your site is about, which pages matter, and how to navigate it. Think of it as a sitemap written for language models instead of crawlers.

**Who uses it (as of mid-2026):**
| Platform | Status | Detail |
|----------|--------|--------|
| **OpenAI (ChatGPT)** | ✅ Active | GPTBot fetches llms.txt every ~15 minutes on sites that have one |
| **Anthropic (Claude)** | ✅ Active | ClaudeBot reads llms.txt as a navigation signal |
| **Perplexity** | ✅ Active | Uses llms.txt to prioritize pages for indexing |
| **Google AI Overviews** | ⚠️ Not required | Google says llms.txt is unnecessary for AI Overviews — but having one doesn't hurt |

**The spec:** Proposed by Jeremy Howard (Answer.AI) in September 2024, now adopted as the de facto GEO standard. Only 5–15% of websites have one — this is a first-mover advantage.

**Your llms.txt file:**

Create this file at the root of your domain:

```markdown
# usamazahid.design

> Independent AI Product Designer. Strategy, identity, product, and code — one operator, one sequence. Based in Lahore, working globally with SaaS founders and small businesses.

## About

- [About Usama Zahid](https://usamazahid.design/about/): Background, method, daily practice, tools, and influences of the single operator.
- [CV & Full Record](https://usamazahid.design/cv/): 7 years, 47 clients, 100+ projects. Complete work history with stack and capabilities.

## Services

- [Services Overview](https://usamazahid.design/services/): Four tracks — Brand Systems ($18K+), Product Design ($24K+), Web Engineering ($22K+), Brand Strategy ($12K+).
- [Brand Systems](https://usamazahid.design/services/identity/): Identity systems as operating layers. Type, color, voice, motion.
- [Product Design](https://usamazahid.design/services/product/): End-to-end product design with component libraries and engineering handoff.
- [Web Engineering](https://usamazahid.design/services/engineering/): Next.js, TypeScript, headless CMS. Production code, 98+ Lighthouse.
- [Brand Strategy](https://usamazahid.design/services/strategy/): Positioning, messaging, audience mapping — the decisions before design.

## Portfolio & Case Studies

- [Portfolio Index](https://usamazahid.design/portfolio/): 4 deep case studies in AI SaaS, fintech, operations, and UX.
- [NeuralDesk Copilot](https://usamazahid.design/portfolio/neuraldesk-copilot/): AI support workspace — cut response time from 19 min to 7.4 min.
- [LedgerFlow AI](https://usamazahid.design/portfolio/ledgerflow-ai/): AI-assisted reconciliation for finance teams.
- [OpsOrbit Assistant](https://usamazahid.design/portfolio/opsorbit-assistant/): Planning assistant for operations teams.
- [Cadence Habit App](https://usamazahid.design/portfolio/cadence-habit-app/): Mobile habit app redesign — lifted day-7 retention from 22% to 41%.

## Blog & Writing

- [Blog Index](https://usamazahid.design/blog/): Essays on SaaS design, single-operator studios, and the craft of shipping.
- [The Brand-to-URL Operating System](https://usamazahid.design/blog/brand-to-url-operating-system/): Why running strategy through deploy as one sequence produces better work.
- [The Case for Single-Operator Studios](https://usamazahid.design/blog/case-for-single-operator-studios/): Why smaller teams produce better decisions.
- [What Physics Taught Me About Design Constraints](https://usamazahid.design/blog/what-physics-taught-me-about-design-constraints/): How a physics foundation shapes design methodology.

## Contact

- [Start a Project](https://usamazahid.design/contact/): Book a free 15-minute diagnosis call. Reply within 24 hours.
```

**Implementation:** 30 minutes. Create this file, place it at the root, and keep it updated whenever you publish a new pillar page or case study. OpenAI's GPTBot refetches it every ~15 minutes on sites that have one.

### 8.3 Citation-Worthy Content Structure

Research from Princeton (KDD 2024) found that specific content patterns boost AI citation rates by up to **40%**. Here are the three patterns that work:

#### Pattern 1: Answer-First + Question-Answer Pairs

**The rule:** Every H2 should be a real question a human would ask. The first paragraph after each H2 should be a 40–80 word direct answer. Depth comes *after* the answer.

**Example — Before (current style):**
```
## The split is the failure mode

The conventional split — agency for brand, studio for product, freelancer for code — looks efficient on paper. Three specialists, three invoices, three meetings...
```

**Example — After (GEO-optimized):**
```
## Why do most SaaS branding projects fail?

Most SaaS branding projects fail because of the "translation tax" — every handoff between brand agency, product studio, and developer loses signal. A single operator eliminates this tax by running strategy, design, and code in one continuous sequence, cutting project time by 3–4x and maintenance cost by 2–3x.

[Then expand with the narrative depth you already write well.]
```

#### Pattern 2: Stat + Source + Implication

AI engines cite pages that carry specific, sourced facts. Every major section should contain one citation-worthy stat.

**Template:**
> "[Specific number]" + "[Source context]" + "[What it means for the reader]"

**Examples for your content:**
- "47 clients, 100+ projects shipped, zero missed deadlines. That's not a claim — it's a seven-year track record of fixed-scope, fixed-price delivery."
- "NeuralDesk's median response time dropped from 19 minutes to 7.4 minutes after the redesign — a 61% reduction. The lever wasn't better AI. It was transparent confidence states."
- "The site you're viewing scores 98+ on Lighthouse. That's the engineering baseline I ship for every client."

#### Pattern 3: Quotable Standalone Sentences

AI engines extract and quote specific sentences. Write your key insights so they can stand alone.

**Before (buried insight):**
> "The single-operator model is not a romantic idea. It is an operational response to a problem the multi-vendor model cannot solve: the translation tax. Every handoff is a chance for the original intent to decay."

**After (already good — make sure these stand out visually):**
> **The single-operator model is not a romantic idea.** It's an operational response to the translation tax — every handoff decays the original intent. The only way to eliminate the tax is to eliminate the handoff.

### 8.4 Platform-Specific Strategies

Each AI engine cites differently. Here's what works for each:

#### ChatGPT (Search)

| What it values | Action for your site |
|----------------|---------------------|
| Encyclopedic, authoritative content | Structure pillar pages like reference guides — definitive, comprehensive |
| Wikipedia-style opening definitions | Lead every page with a 2–3 sentence factual summary of what the page covers |
| Structured documents | Use clear hierarchy: H1 → H2 → H3. No skipped levels. |
| Wikipedia presence (~48% of top-10 citations) | Create a Wikidata entry for yourself. If you meet notability criteria, pursue a Wikipedia page. |

**Specific action:** Create a Wikidata entry for "Usama Zahid (designer)" with your properties: occupation, nationality, website, notable works. This feeds the Knowledge Graph that ChatGPT relies on.

#### Perplexity

| What it values | Action for your site |
|----------------|---------------------|
| **Recency** — content ≤90 days gets a measurable boost | Add visible "Last updated" dates. Update your key pages quarterly. |
| Specific facts, numbers, dates | Every case study and service page should include dated, metric-driven results. |
| Self-contained, extractable passages | Write each section so it makes sense if read in isolation. |
| Reddit & community signals | Engage on Indie Hackers, r/SaaS, r/web_design. Perplexity heavily weights community sources. |
| Clear entity naming | Use consistent entity names: "Usama Zahid" (not "UZ"), "AI Product Designer" (not just "operator"). |

**Specific action:** Add a visible "Last updated: [date]" line to every blog post and service page. Perplexity's L3 quality gate explicitly checks for dated content.

#### Google AI Overviews

| What it values | Action for your site |
|----------------|---------------------|
| Existing top-20 organic ranking (still the strongest signal) | All traditional SEO work in Sections 2–6 remains critical |
| FAQ-rich pages | Add FAQ schema + visible FAQ sections to service pages (you already have them!) |
| Structured data matching visible content | Ensure all schema markup reflects exactly what's on the page |
| E-E-A-T signals | Author bios, credentials, external citations, consistent branding |
| Freshness for time-sensitive topics | Date-modified schema, visible update dates |

**Google says:** "No special optimizations required for AI Overviews — just do standard SEO well." This means: the foundation work in Phase 1 is your AI Overviews strategy.

#### Claude

| What it values | Action for your site |
|----------------|---------------------|
| Intellectual honesty — content that names limitations | In opinion posts, explicitly state when the single-operator model doesn't work |
| Technical documentation depth | Your engineering pages already do this well |
| Primary sources | Link to original research, your own data, case study metrics |

**Specific action:** In "The Case for Single-Operator Studios," add a section titled "When This Model Breaks" (you already have this — "When the model breaks" is in your Brand-to-URL post). Claude rewards content that acknowledges its own limits.

### 8.5 Entity Optimization — Making "Usama Zahid" Machine-Readable

AI engines need to understand you as an entity — a distinct, real-world thing with properties, relationships, and context.

#### Step 1: Wikidata Entry

Create a Wikidata item. Even a minimal entry dramatically improves entity recognition.

**Properties to include:**
- `instance of (P31)`: human
- `occupation (P106)`: product designer, brand designer
- `country of citizenship (P27)`: Pakistan
- `official website (P856)`: https://usamazahid.design
- `educated at (P69)`: University of the Punjab
- `field of work (P101)`: product design, brand identity, web development
- `X username (P2002)`: usama2017a
- `LinkedIn profile (P2035)` — your LinkedIn URL

**Effort:** 1–2 hours. Once created, it persists and feeds Google's Knowledge Graph, ChatGPT's entity recognition, and Wikipedia's structured data ecosystem.

#### Step 2: SameAs Consolidation

Add `sameAs` properties to your `Person` schema, linking to:
- Wikidata URL
- LinkedIn profile
- GitHub profile
- Dribbble profile
- Behance profile
- X/Twitter profile

This tells search engines and AI models: "All these profiles refer to the same person." Consistency across platforms = stronger entity signal.

#### Step 3: Consistent Entity Naming

Use the same name format everywhere: **Usama Zahid**. Not "UZ," not "usamazahid," not "Usama Zahid — AI Product Designer" (that's a title, not a name). Titles go in jobTitle fields.

### 8.6 Structured Data Specifically for AI Engines

Your Phase 1 task already covers schema. Here's the AI-specific priority list:

| Schema Type | Priority for AI | Where to Add |
|-------------|----------------|-------------|
| `Person` | **Highest** | About page, CV page |
| `Article` / `BlogPosting` | **Highest** | Every blog post with `author`, `datePublished`, `dateModified` |
| `FAQ` | **Highest** | Service sub-pages — you already have FAQ accordions! Just add FAQ schema behind them |
| `Organization` (single-person org) | High | Homepage, Contact page |
| `Service` | High | Each service sub-page |
| `WebSite` + `SearchAction` | Medium | Homepage |
| `BreadcrumbList` | Medium | Every page |
| `HowTo` | Medium | Blog posts that explain processes (e.g., "The 48-Hour Build Protocol") |
| `Speakable` | Low | Mark your most citation-worthy paragraphs for voice/AI reading |

**Critical for AI:** FAQ schema is disproportionately valuable. You already have 6 FAQ items on each service page. Mark them up with JSON-LD FAQ schema — this is 20 minutes of work for a significant AI citation boost.

### 8.7 Content Freshness — The "DateModified" Signal

AI engines (especially Perplexity) heavily weight recency. A 2024 article answering a 2026 question is almost never cited.

**Implementation checklist:**

| Action | Effort | Tool |
|--------|--------|------|
| Add visible "Last updated: [date]" to every blog post | 30 min (template change) | Sanity CMS |
| Update `dateModified` in Article schema whenever content is revised | Built into template | Next.js generateMetadata |
| Review and refresh pillar pages every 60–90 days | Quarterly task | Calendar reminder |
| Update stats and years in old posts (e.g., change "5 years" to "7 years") | 15 min per post | Manual |
| Add year to titles where relevant ("SaaS Design Guide 2026") | 5 min per title change | Sanity CMS |

### 8.8 Author Authority for AI Trust

AI engines evaluate **who wrote the content** before deciding whether to cite it. As a solo operator, your author authority *is* your site authority.

**Your author authority checklist:**

| Signal | Status | Action |
|--------|--------|--------|
| Detailed author bio page | ✅ Exists (`/about/`) | Optimize it — add structured credentials, years of experience, notable clients |
| `Person` schema on author page | ❌ Missing | Add (Phase 1, Task 1.4) |
| Author name on every blog post | ✅ Exists | Good — make sure it links to `/about/` |
| External citations (Awwwards, Muzli, FastCo) | ✅ Exists | Add these to your Person schema as `award` and `sameAs` properties |
| LinkedIn profile with matching credentials | ✅ Exists | Add structured headline: "AI Product Designer | Brand-to-URL Systems for SaaS" |
| Speaking / podcast appearances | Unknown | Pursue 1–2 design podcast guest spots. AI engines cite people who are cited elsewhere. |
| Consistent name + title across platforms | ⚠️ Partial | Audit: does every profile say the same thing? |

### 8.9 GEO Implementation Roadmap (Integrated with Main Phases)

| Week | GEO Task | Integrates With | Effort |
|------|----------|-----------------|--------|
| 1 | Create Wikidata entry | Phase 1 (Foundations) | 2 hrs |
| 1 | Create and deploy `/llms.txt` | Phase 1 | 30 min |
| 1–2 | Add all schema markup (Person, FAQ, Article, Service) | Phase 1, Task 1.4 | 3 hrs (already in plan) |
| 3–6 | Write all new content in GEO format (answer-first, stat+source+implication) | Phase 2 (Content Build) | No extra — just write differently |
| 3–6 | Retrofit existing 6 blog posts with answer-first intros + visible dates | Phase 2, Task 2.1 | Included in the 3 hrs |
| 7–12 | Build community presence (Indie Hackers, Reddit r/SaaS) — critical for Perplexity | Phase 3 (Authority) | 1 hr/week ongoing |
| 7–12 | Audit and consolidate entity consistency across all profiles | Phase 3, Task 3.3 | 1 hr |
| Ongoing | Quarterly content refresh with dateModified updates | Phase 4 | 1 hr/quarter |

### 8.10 How to Know GEO Is Working

| Metric | Tool | Target |
|--------|------|--------|
| Your site appears in ChatGPT answers for relevant queries | Manual testing — ask ChatGPT: "Who is a good product designer for SaaS startups?" | At least 1 mention within 6 months |
| Your pages are cited in Perplexity for design/SaaS queries | Manual testing in Perplexity | 1–2 citations by month 6 |
| Google AI Overviews show your pages for target keywords | Ahrefs / Semrush AI Overview tracking, or GSC generative AI reports (rolling out 2026) | Impressions from AI features appear in GSC |
| llms.txt is fetched by AI crawlers | Server logs / Vercel analytics | Bot traffic from GPTBot, ClaudeBot, PerplexityBot within 1 week of deployment |
| Wikidata entry appears in Google Knowledge Graph sidebar | Google search for "Usama Zahid designer" | Knowledge panel appears within 3–6 months |
| Referral traffic from perplexity.ai, chatgpt.com | GA4 referral reports | Small but measurable — 10–50 visits/month by month 6 |

---

## Appendix C: GEO Quick-Start Checklist

Do these 5 things this week — total time: 3 hours:

1. **Create and deploy `/llms.txt`** using the template in Section 8.2. 30 minutes.
2. **Start a Wikidata entry** for yourself. Search "Wikidata create new item." 1 hour.
3. **Add FAQ schema** to all 4 service sub-pages (Identity, Product, Engineering, Strategy). You already have the FAQ content — just wrap it in JSON-LD. 30 minutes.
4. **Add "Last updated: [date]"** to all blog post templates in Sanity. 30 minutes.
5. **Write one paragraph for your About page** that is a standalone, quotable definition: "Usama Zahid is an independent AI product designer based in Lahore, Pakistan. Since 2019, he has shipped 100+ projects across brand, product, and code for SaaS companies and small businesses — all as a single operator with zero handoffs." 30 minutes.

---

*GEO section researched and written July 2026. Based on current AI engine behavior, llms.txt spec v1.0, Princeton GEO research (KDD 2024), and platform-specific citation analysis.*

---

## 9. Technical SEO Deep-Dive: Next.js + Vercel Stack

This section covers the code-level technical SEO work needed. Since your site runs on Next.js with Vercel hosting, you have access to best-in-class tools — but they're all opt-in. Nothing happens automatically.

### 9.1 The Homepage Crisis — Root Cause & Fix

**What's happening:** `usamazahid.design/` returns "Application error: a client-side application exception has occurred." View source probably shows either an empty body or a minimal error shell. Googlebot sees no content, no headings, no links.

**Likely causes in a Next.js site:**
1. **A client component throws during SSR.** If you have a `"use client"` component at the root layout level that references `window`, `document`, `localStorage`, or `navigator` without a guard, it will crash server-side.
2. **Dynamic import without SSR fallback.** If you're doing `dynamic(() => import('./HeavyComponent'), { ssr: false })` on a component that the homepage depends on for its first render, the SSR output may be empty while the client hasn't hydrated yet.
3. **An unhandled promise rejection in the root layout.** Async data fetching in the root layout that throws gets caught by the error boundary and produces the empty shell.
4. **Environment variable missing at build time.** If a required env var (`NEXT_PUBLIC_*` or server-side) is absent, and the code doesn't handle the `undefined` case, the page crashes.

**Diagnosis steps (do immediately):**
```bash
# 1. Check Vercel deployment logs for the root route
# Go to Vercel Dashboard → your project → Deployments → latest → Functions
# Look for errors on the / route's function invocation

# 2. Test locally in production mode
npm run build && npm run start
# Then visit http://localhost:3000/ and check terminal for errors

# 3. Curl the homepage to see what Googlebot receives
curl -s https://www.usamazahid.design/ | head -50

# 4. Use Google's URL Inspection Tool (Search Console)
# Enter your homepage URL and click "Test Live URL"
# Screenshot shows exactly what Googlebot rendered
```

**Fix template for the most common cause (client component without SSR guard):**
```typescript
// ❌ BEFORE — crashes during SSR
"use client";
export function TerminalBoot() {
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    // This runs only on client, but the component body runs on server too
    const hash = window.location.hash; // 💥 window is undefined on server
    setBooted(true);
  }, []);
  return <div>...</div>;
}

// ✅ AFTER — SSR-safe
"use client";
export function TerminalBoot() {
  const [booted, setBooted] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    setBooted(true);
  }, []);

  // Server renders a loading state; client hydrates into full terminal
  if (!booted) {
    return (
      <div aria-label="Loading" role="status">
        <h1>AI Product Designer for SaaS & Startups — Usama Zahid</h1>
        <p>Strategy, identity, product, and code. One operator. One sequence.</p>
      </div>
    );
  }

  return <div>...</div>; // Full terminal UI
}
```

**Critical:** The SSR fallback must contain your H1 and core content. This is what Googlebot indexes. The terminal aesthetic can load client-side, but the text needs to be in the HTML payload.

### 9.2 Metadata Architecture — Next.js App Router

You're using the App Router (based on your site structure). Here's the correct metadata implementation for every route type.

**Root Layout (`app/layout.tsx`):**
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.usamazahid.design'),
  title: {
    default: 'AI Product Designer for SaaS & Startups — Usama Zahid',
    template: '%s — Usama Zahid',  // Fixes the double-name issue
  },
  description: 'Independent AI product designer. Strategy, identity, product, and code — one operator, one continuous sequence. SaaS and small business specialist. Based in Lahore, working globally.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Usama Zahid — AI Product Designer',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@usama2017a',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.usamazahid.design',
  },
};
```

**Static page (`app/services/page.tsx`):**
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SaaS Design Services — Brand, Product & Web Engineering',
  description: 'Four tracks, one operator. Brand systems from $18K, product design from $24K, web engineering from $22K, brand strategy from $12K. Fixed scope, fixed price, 100% yours.',
  openGraph: {
    title: 'SaaS Design Services — Brand, Product & Web Engineering',
    description: 'Four tracks, one operator. Fixed scope, fixed price, 100% yours.',
    url: 'https://www.usamazahid.design/services',
  },
  alternates: {
    canonical: 'https://www.usamazahid.design/services',
  },
};
```

**Dynamic page — blog post (`app/blog/[slug]/page.tsx`):**
```typescript
import type { Metadata } from 'next';
import { getPostBySlug } from '@/lib/sanity';

export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt || post.body.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Usama Zahid'],
      url: `https://www.usamazahid.design/blog/${slug}`,
      images: post.ogImage ? [{ url: post.ogImage }] : [],
    },
    alternates: {
      canonical: `https://www.usamazahid.design/blog/${slug}`,
    },
  };
}
```

### 9.3 Rendering Strategy — Which Pages Get Which Strategy

Not all pages should be rendered the same way. Here's the correct strategy per route type:

| Route | Strategy | Why |
|-------|----------|-----|
| `/` (homepage) | SSG + ISR | Rarely changes. Static CDN delivery = fastest TTFB. Revalidate on content change. |
| `/about/` | SSG + ISR | Update when bio/tools change. Revalidate monthly. |
| `/services/` + sub-pages | SSG + ISR | Pricing and deliverables are stable. Revalidate on scope changes. |
| `/portfolio/` | SSG + ISR | Rebuild when you add a case study. |
| `/portfolio/[slug]/` | SSG | Case studies don't change. Static is fine. |
| `/blog/` | ISR or SSR | Blog index should reflect latest posts. ISR with 1-hour revalidation. |
| `/blog/[slug]/` | SSG | Blog posts are static once published. |
| `/contact/` | SSG | The form is client-rendered; the page is static. |
| `/products/` | SSG + ISR | Revalidate when you add a digital product. |
| `/cv/` | SSG + ISR | Update when your CV changes. Monthly revalidation is fine. |

**Implementation in Next.js App Router:**
```typescript
// For SSG + ISR pages (homepage, about, services, portfolio)
export const revalidate = 86400; // Revalidate once per day (in seconds)
// Or use time-based revalidation:
// export const revalidate = 3600; // 1 hour

// For fully static pages (blog posts, case studies)
// Just don't set revalidate — they're static by default

// For the blog index (needs to show latest posts)
export const revalidate = 3600; // Revalidate every hour
```

### 9.4 Core Web Vitals — LCP, INP, CLS

You claim 98+ Lighthouse. Here's how to actually get it and keep it.

#### LCP (Largest Contentful Paint) — Target: < 2.5s

Your LCP element is likely the hero text or a large terminal animation on the homepage. Fixes:

**1. Use `next/image` with explicit dimensions on every image:**
```typescript
import Image from 'next/image';

// ❌ Old pattern — uses Unsplash with raw <img>
<img src="https://images.unsplash.com/..." alt="..." />

// ✅ Correct pattern for remote images
<Image
  src="https://images.unsplash.com/photo-1561070791-..." // or your own images
  alt="Brand-to-URL system diagram showing the four-track sequence"
  width={1200}
  height={630}
  priority  // Preload if this is the LCP element
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>

// For real project screenshots (preferred over Unsplash):
<Image
  src="/portfolio/neuraldesk-final-cockpit.webp"
  alt="NeuralDesk Copilot AI response panel showing confidence badge, evidence rail, and recovery actions"
  width={1600}
  height={900}
  priority
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

**2. Configure `next.config.ts` for remote images:**
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // If you keep Unsplash
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF first — smaller than WebP
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
};
```

**3. Preload the LCP font:**
```typescript
// In your root layout or next.config.ts
// If you're using Google Fonts with next/font, this is automatic.
// ⚠️ You mentioned Google Fonts in your privacy policy.
//    Self-hosting via next/font is BETTER for LCP:
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',       // Prevents invisible text during load
  preload: true,
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-mono',
});
```

#### INP (Interaction to Next Paint) — Target: < 200ms

Your terminal animations and GSAP/Framer Motion code affect INP.

**1. Dynamic imports for heavy components:**
```typescript
import dynamic from 'next/dynamic';

// Lazy-load the terminal boot sequence (it animations on mount anyway)
const TerminalBoot = dynamic(() => import('@/components/TerminalBoot'), {
  ssr: true,  // SSR the static content (headings)
  loading: () => <BootFallback />, // Show simplified version during load
});

// Lazy-load Spline 3D (you mention it on your about page)
const SplineViewer = dynamic(() => import('@/components/SplineViewer'), {
  ssr: false, // Spline is client-only
  loading: () => <div className="spline-placeholder" />,
});
```

**2. Use `next/script` for third-party scripts:**
```typescript
import Script from 'next/script';

// In your root layout
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive" // Load after page is interactive
/>
<Script id="gtag-init" strategy="afterInteractive">
  {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} ...`}
</Script>
```

#### CLS (Cumulative Layout Shift) — Target: < 0.1

Your site has a terminal loading animation — this is a CLS risk if not handled carefully.

**1. Reserve space for terminal output:**
```css
/* Ensure the terminal area has a fixed min-height during boot */
.terminal-boot {
  min-height: 100vh;  /* Or whatever your terminal occupies */
  /* This prevents content below from jumping when terminal renders */
}
```

**2. `next/font` for zero layout shift from web fonts:**
```typescript
// Using next/font (shown above) eliminates font-related CLS entirely.
// Google Fonts loaded via <link> will cause FOUT/FOIT = layout shift.
// If you MUST use external fonts, add this to your <head>:
<link rel="preload" href="https://fonts.googleapis.com/..." as="font" crossorigin />
```

**3. All images must have `width` and `height`:**
```typescript
// ❌ Causes CLS — browser doesn't know image dimensions
<Image src="..." alt="..." fill />

// ✅ Reserves exact space before image loads
<Image src="..." alt="..." width={800} height={450} />

// ✅ For fill mode — parent must have explicit dimensions
<div className="relative w-full aspect-video">
  <Image src="..." alt="..." fill sizes="(max-width: 768px) 100vw, 800px" />
</div>
```

### 9.5 Vercel Caching & Crawl Budget

Your site is on Vercel. Here's how to maximize cache efficiency for Googlebot.

**1. Set aggressive cache headers for static pages:**
```typescript
// In next.config.ts or per-route
export async function generateMetadata() {
  // ...
}

// For pages that are fully static and rarely change:
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours
```

**2. Verify cache headers are working:**
```bash
# Check what headers Googlebot sees
curl -sI https://www.usamazahid.design/ | grep -i cache
# Should see: x-vercel-cache: HIT
# And: cache-control: public, s-maxage=86400, stale-while-revalidate=604800
```

**3. Crawl budget considerations — what Googlebot should NOT waste time on:**
```typescript
// app/robots.ts — programmatic robots.txt
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/.well-known/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://www.usamazahid.design/sitemap.xml',
  };
}
```

**4. Sitemap — make it dynamic:**
```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/sanity';
import { getAllCaseStudies } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const caseStudies = await getAllCaseStudies();

  const staticRoutes = [
    { url: 'https://www.usamazahid.design', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: 'https://www.usamazahid.design/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://www.usamazahid.design/services', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: 'https://www.usamazahid.design/portfolio', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: 'https://www.usamazahid.design/blog', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: 'https://www.usamazahid.design/contact', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: 'https://www.usamazahid.design/products', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: 'https://www.usamazahid.design/cv', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  const blogRoutes = posts.map((post) => ({
    url: `https://www.usamazahid.design/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const portfolioRoutes = caseStudies.map((study) => ({
    url: `https://www.usamazahid.design/portfolio/${study.slug}`,
    lastModified: new Date(study.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...portfolioRoutes];
}
```

### 9.6 URL Trailing Slash — Pick One and Enforce It

Your sitemap shows URLs WITHOUT trailing slashes (e.g., `/about`, `/services`), but navigation might resolve to WITH slashes (e.g., `/about/`, `/services/`). This inconsistency creates duplicate content.

**Fix in `next.config.ts`:**
```typescript
const nextConfig = {
  trailingSlash: false, // Pick one. Your sitemap uses no trailing slash. Force it.
  // ...
};

// Then set up a redirect for any trailing-slash URLs that might exist:
// app/next.config.ts redirects
async redirects() {
  return [
    {
      source: '/:path+/',
      destination: '/:path+',
      permanent: true, // 301 redirect
    },
    // Fix the /work → /portfolio broken link
    {
      source: '/work',
      destination: '/portfolio',
      permanent: true, // 301
    },
  ];
}
```

### 9.7 Terminal Chrome — The Duplicate Text Problem

Your terminal UI has identical text blocks on every page (the "BOOTING..." sequence, the operator log header, the system status block). This is ~500+ characters of identical text on 17+ pages.

**Why it matters:** Google calls this "boilerplate." It doesn't get you penalized, but it dilutes the unique content signal per page. When every page starts with the same 500 characters, Google has to dig to find what makes each page different.

**Fix — make terminal output page-specific:**
```typescript
// ❌ Current approach — same boot sequence on every page
<div className="terminal-boot">
  OPERATOR_LOG · LAHORE_PK ● ONLINE
  UZ · OS v.04.2.7
  USAMA ZAHID · AI · PRODUCT · DESIGNER
  ...
</div>

// ✅ Page-specific boot messages — keeps the aesthetic, adds unique content
// Homepage: "BOOTING_ROOT_MODULE · INDEXING_INBOUND"
// Services: "LOADING_CATALOG · 04_TRACKS_AVAILABLE"
// Portfolio: "OPENING_CASE_FILES · 04_CASES · 07_YEARS"
// Blog: "FETCHING_OPERATOR_LOG · 06_DISPATCHES"
// Contact: "OPENING_CHANNEL · ACCEPTING_NEW_CLIENTS"

// Implementation:
const BOOT_MESSAGES = {
  '/': 'BOOTING_ROOT_MODULE · INDEXING_INBOUND',
  '/about': 'LOADING_OPERATOR_PROFILE · LAHORE_PK',
  '/services': 'LOADING_CATALOG · 04_TRACKS_AVAILABLE',
  '/portfolio': 'OPENING_CASE_FILES · 04_CASES · 07_YEARS',
  '/blog': 'FETCHING_OPERATOR_LOG · 06_DISPATCHES',
  '/contact': 'OPENING_CHANNEL · ACCEPTING_NEW_CLIENTS',
  '/products': 'LOADING_CATALOG · 05_PRODUCTS',
  '/cv': 'LOADING_RECORD · 07_YEARS · 47_CLIENTS',
} as const;
```

This preserves your brand aesthetic while giving each page a unique text fingerprint for crawlers.

### 9.8 Image Alt Text — From Decoration to Content

Your portfolio case studies use Unsplash stock images. This is a dual problem: (1) potential clients don't see your real work, and (2) Google Image Search can't surface unique, high-quality design work.

**Replace every Unsplash image on portfolio pages with real work:**
```typescript
// ❌ Current — generic Unsplash image
<Image
  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  alt="" // or auto-generated Unsplash description
  width={1600}
  height={900}
/>

// ✅ Real work image with descriptive alt text
<Image
  src="/portfolio/neuraldesk/confidence-panel-high-fidelity.webp"
  alt="NeuralDesk Copilot AI response panel — confidence badge showing 'High Match · 92%', evidence rail with 3 source citations, and one-click recovery actions for agents"
  width={1600}
  height={900}
  priority={isFeatured}
/>
```

**Alt text formula for design portfolio images:** `[Project Name] [Component shown] — [key design decision visible], [second detail], [third detail]`

### 9.9 Structured Data — Complete JSON-LD Implementation

Here's a copy-paste-ready JSON-LD component for each schema type.

**Person Schema (`components/PersonJsonLd.tsx`):**
```typescript
export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Usama Zahid',
    alternateName: 'UZ',
    url: 'https://www.usamazahid.design',
    jobTitle: 'AI Product Designer',
    description: 'Independent AI product designer. Strategy, identity, product, and code — one operator, one continuous sequence. 7 years experience, 47+ clients, 100+ projects.',
    birthDate: '1998', // approximate — adjust
    nationality: { '@type': 'Country', name: 'Pakistan' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of the Punjab',
    },
    sameAs: [
      'https://github.com/usamazahid',
      'https://www.linkedin.com/in/usamazahid-design/',
      'https://x.com/usama2017a',
      'https://www.behance.net/pdd045',
      'https://instagram.com/usamazahid.xyz',
      'https://www.facebook.com/usamazahidd',
      // Add Wikidata URL once created
    ],
    knowsAbout: [
      'Product Design',
      'Brand Identity',
      'Web Engineering',
      'User Experience Design',
      'SaaS Design',
      'AI Product Design',
      'Design Systems',
    ],
    award: [
      'Awwwards Site of the Day — Lattice Finance (2026)',
      'Awwwards Site of the Day — Halcyon Labs (2025)',
      'Product Hunt #3 Product of the Day — Caravan Travel (2024)',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

**Service Schema (`components/ServiceJsonLd.tsx`):**
```typescript
export function ServiceJsonLd({
  name,
  description,
  url,
  priceRange,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  priceRange: string;
  serviceType: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Person',
      name: 'Usama Zahid',
      url: 'https://www.usamazahid.design',
    },
    serviceType,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: priceRange.replace(/[^0-9]/g, ''), // Strip non-numeric
        priceCurrency: 'USD',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Usage on /services/identity:
// <ServiceJsonLd
//   name="Brand Systems"
//   description="Identity systems that survive first contact with reality. Naming, type, color, voice, motion — built for daily use, not awards."
//   url="https://www.usamazahid.design/services/identity"
//   priceRange="$18,000"
//   serviceType="Brand Identity Design"
// />
```

**FAQ Schema (`components/FaqJsonLd.tsx`):**
```typescript
export function FaqJsonLd({ faqs }: {
  faqs: { question: string; answer: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Usage on /services/identity/ — you already have 6 FAQ accordions:
// <FaqJsonLd faqs={[
//   { question: "How long does a brand system take?", answer: "06 — 10 weeks..." },
//   { question: "What is the difference between a brand system and a brand identity?", answer: "..." },
//   // ... all 6
// ]} />
```

### 9.10 Technical SEO Pre-Deploy Checklist

Run this before every Vercel deploy:

```bash
# 1. Metadata audit — check title, description, OG on every route
npx seo-audit-tool --url https://www.usamazahid.design  # Or similar CLI tool

# 2. Structured data validation
# Paste each page URL into: https://validator.schema.org/

# 3. Crawl your own site
npx checkly --url https://www.usamazahid.design --sitemap

# 4. Core Web Vitals
npx lighthouse https://www.usamazahid.design/ --view --preset=desktop
npx lighthouse https://www.usamazahid.design/ --view --preset=perf

# 5. Verify no client-side-only routes
# Every route should return full HTML when curled:
curl -s https://www.usamazahid.design/ | grep -c "<h1"  # Should return > 0

# 6. Check redirects
curl -sI https://www.usamazahid.design/work | grep "HTTP/2 301" # Should 301 to /portfolio

# 7. Sitemap validity
curl -s https://www.usamazahid.design/sitemap.xml | grep -c "<url>" # Count URLs

# 8. robots.txt
curl -s https://www.usamazahid.design/robots.txt

# 9. llms.txt
curl -s https://www.usamazahid.design/llms.txt
```

---

## Appendix D: Technical SEO Priority Matrix

| Priority | Task | Section | Effort | Impact |
|----------|------|---------|--------|--------|
| 🔴 P0 | Fix homepage client-side exception | 9.1 | 3–4 hrs | Unlocks all search visibility |
| 🔴 P0 | Fix `/work` → 301 to `/portfolio` | 9.6 | 10 min | Stops 404 errors |
| 🔴 P0 | Add metadata (title, description, OG, canonical) to all pages | 9.2 | 2 hrs | Fundamental indexability |
| 🔴 P0 | Add structured data (Person, Service, FAQ, Article, Breadcrumb) | 9.9 | 3 hrs | Rich results + AI citations |
| 🟠 P1 | Replace Unsplash images with real work | 9.8 | 3 hrs | Trust + image search traffic |
| 🟠 P1 | Make terminal boot text page-specific | 9.7 | 1 hr | Unique content fingerprint per page |
| 🟠 P1 | Set correct rendering strategies (SSG/ISR) | 9.3 | 1 hr | Core Web Vitals + crawl efficiency |
| 🟠 P1 | Implement next/font (self-host fonts) | 9.4 | 30 min | Eliminates font CLS |
| 🟡 P2 | Add explicit width/height to all images | 9.4 | 1 hr | Eliminates image CLS |
| 🟡 P2 | Dynamic imports for heavy components | 9.4 | 1 hr | Improves INP |
| 🟡 P2 | Programmatic sitemap generation | 9.5 | 1 hr | Auto-updates, fewer manual errors |
| 🟢 P3 | Set aggressive CDN cache headers | 9.5 | 30 min | Faster TTFB for global visitors |
| 🟢 P3 | Add pre-deploy SEO checklist to CI | 9.10 | 1 hr | Prevents regressions |

---

*Technical SEO deep-dive written July 2026. Based on Next.js 14–15 App Router best practices, Vercel deployment patterns, and current Googlebot behavior.*

---

## 10. Conversion Rate Optimization (CRO): Turning Organic Traffic Into Leads

SEO without conversion is a hobby. Every organic visitor who lands on your site needs a clear path to becoming a lead. Here's an audit of your current conversion flow and specific fixes.

### 10.1 Current Conversion Flow Audit

| Step | Current State | Problem |
|------|--------------|---------|
| Landing on a page | Terminal aesthetic, "BOOTING..." animation | 2–3 seconds before meaningful content appears. Bounce risk. |
| Reading services | Clear pricing, deliverables, timelines | ✅ Strong. One of the best parts of the site. |
| Deciding to contact | Multiple channels (email, form, calendar, phone) | **Paradox of choice.** 8 contact channels on the contact page dilutes action. |
| Contact form | 7 fields — name, email, company, project type, budget, timeline, message | **Too long.** 7 fields is a lot for a first touch. |
| After submitting | Unknown — no confirmation of a thank-you page | Unclear what happens next. Anxiety. |
| Booking a call | cal.com link buried among 8 options | Should be the primary CTA, not option #3. |
| Trust before contact | 47+ clients, 100+ projects, Awwwards badges | ✅ Good, but buried in terminal chrome instead of featured near CTAs. |

### 10.2 CRO Fixes — Ranked by Impact

#### Fix 1: Single Primary CTA (Impact: High | Effort: 30 min)

Every page should have exactly **one** primary action. Right now your contact page offers 8 channels. This creates decision paralysis.

**Recommended flow:**
```
Visitor lands on any page
  ↓
Sees primary CTA: "Book a Free Diagnosis Call" → cal.com
  ↓
Secondary: "Prefer email? Send a brief" → contact form
  ↓
Tertiary: "Just browsing? Join the newsletter" → email signup
```

**Implementation — restructure the contact page CTA hierarchy:**
```
[PRIMARY — Large button, high contrast]
→ Book a 15-Minute Diagnosis Call (Free)
  "No slides. No commitment. Just signal."

[SECONDARY — Text link]
→ Send a written brief instead → jumps to form

[TERTIARY — Small text at bottom]
→ Other ways to reach me: Email · LinkedIn · X
```

#### Fix 2: Shorten the Contact Form (Impact: High | Effort: 1 hr)

Your current form has 7 fields. Research shows every additional field beyond 3 reduces conversion by ~10%.

**Current fields:** Name, Email, Company, Project Type, Budget, Timeline, Message

**Recommended — split into two steps:**

**Step 1 (3 fields):** Name, Email, "What's the problem you're trying to solve?" (one textarea)
**Step 2 (after submit — optional):** "Help me prepare: budget range, timeline, company name" (all optional)

This gets the lead first, then collects qualifying info. A submitted 3-field form is worth more than an abandoned 7-field one.

**Bonus:** Add a single-line value proposition above the form:
> "You'll get a reply within 24 hours with either a Calendly link, a written scope, or an honest no. No pitch deck. No sales call."

#### Fix 3: Add a Thank-You Page (Impact: Medium | Effort: 30 min)

After form submission, redirect to `/contact/thanks/` with:
- "Reply within 24 hours, guaranteed."
- Link to book a call now (don't wait for the reply)
- Link to portfolio and blog ("While you wait, see recent work")
- Newsletter signup

This page also becomes a GA4 conversion confirmation page you can track.

#### Fix 4: Trust Signals Near Every CTA (Impact: Medium | Effort: 1 hr)

Every call-to-action on the site should be within 100px of a trust signal:

| CTA Location | Trust Signal to Add |
|-------------|---------------------|
| Homepage CTA | "47+ clients · 100+ projects · 100% shipped" |
| Services CTA | "2× Awwwards SOTD · 98+ Lighthouse guarantee" |
| Portfolio CTA | "Featured on Muzli · FastCo interview" |
| Contact form | "Every brief gets a response. No exceptions since 2019." |

#### Fix 5: Exit-Intent Newsletter Capture (Impact: Medium | Effort: 1 hr)

You have 1,247 newsletter subscribers at 68% open rate. That's exceptional. But there's no visible newsletter signup on most pages.

**Add a subtle signup to:**
- Blog post footer (readers who finish an article are warm leads)
- Portfolio case study footer
- The 404 page (seriously — lost visitors will give you their email)

**Template for blog post footer:**
```
---
### Get the Operator's Dispatch

One email per month. Essays, field notes, process documentation.
No tracking pixels. No list buys. 1,247 operators read it.

[your email address] → Subscribe
```

### 10.3 CRO Metrics to Track

| Metric | Baseline (Guess) | Target | Tool |
|--------|-----------------|--------|------|
| Contact form submission rate | Unknown — start tracking | 3–5% of visitors | GA4 |
| Form abandonment rate | Unknown | <50% | PostHog |
| Cal.com booking rate | Unknown | 2–4% of visitors | cal.com analytics |
| Newsletter signup rate (blog posts) | Unknown | 1–3% of blog readers | Email platform |
| Time from visit to conversion | Unknown | <1 week typical | GA4 + CRM |
| CTA click-through rate | Unknown | >5% on primary CTA | PostHog heatmaps |

---

## 11. 12-Week Editorial Calendar

Vague plans don't ship. Here's exactly what to publish and when, mapped to 3 hours/week of writing time.

### Week-by-Week Publishing Schedule

| Week | Date Range | Publish | Type | Target Keyword | Effort |
|------|-----------|---------|------|---------------|--------|
| **1–2** | *(Foundations — no publishing)* | Fix technical issues. Set up analytics. Create llms.txt. | — | — | — |
| **3** | Jul 28 – Aug 3 | **Pillar P1: "The SaaS Design Operating System"** | 3,000-word guide | SaaS design best practices, SaaS product designer | 4 hrs |
| **4** | Aug 4 – 10 | **"How to Design a SaaS Website That Converts"** | 2,000-word guide | how to design a SaaS website that converts | 3 hrs |
| **4** | Aug 4 – 10 | Optimize & republish: "The Case for Single-Operator Studios" | Refresh + SEO | single operator studio model | 1 hr |
| **5** | Aug 11 – 17 | **"AI UX Design Patterns: Trust, Memory, Recovery States"** | 2,500-word case-study guide | AI UX design patterns | 3 hrs |
| **6** | Aug 18 – 24 | **Pillar P3: "Freelance Designer vs Agency for SaaS (2026)"** | 2,500-word comparison | freelance designer vs agency for SaaS | 4 hrs |
| **7** | Aug 25 – 31 | **"How Much Does SaaS Website Design Cost in 2026?"** | 2,000-word pricing guide | how much does SaaS website design cost | 3 hrs |
| **7** | Aug 25 – 31 | Optimize & republish: "What Physics Taught Me About Design Constraints" | Refresh + SEO | — | 1 hr |
| **8** | Sep 1 – 7 | **"SaaS Design Autopsy #1: Linear.app"** | Teardown with screenshots | Linear design analysis | 4 hrs |
| **9** | Sep 8 – 14 | **Pillar P2: "Brand Identity for SaaS Startups"** | 2,500-word guide | brand designer for SaaS | 4 hrs |
| **10** | Sep 15 – 21 | **"Brand Positioning for SaaS: Define Your Space Before You Design"** | 2,000-word strategy guide | brand positioning for SaaS startups | 3 hrs |
| **10** | Sep 15 – 21 | Optimize & republish: "The 48-Hour Build Protocol" | Refresh + SEO | — | 1 hr |
| **11** | Sep 22 – 28 | **"How to Build a Design System for SaaS"** | 2,000-word technical guide | design system for SaaS | 3 hrs |
| **12** | Sep 29 – Oct 5 | **"SaaS Design Autopsy #2: Vercel"** | Teardown | Vercel design analysis | 4 hrs |
| **12** | Sep 29 – Oct 5 | **"How to Hire an Independent Product Designer"** | 1,800-word guide for clients | independent product designer for hire | 3 hrs |

**Total published by week 12:** 11 new articles + 3 optimized republishes = 14 live, optimized pages.

### Publishing Day Strategy

- **Tuesday morning (PKT):** Publish. This catches US Monday evening and EU Tuesday morning.
- **Tuesday afternoon:** Post on LinkedIn, X, Indie Hackers, and Reddit (r/SaaS, r/web_design where appropriate).
- **Tuesday evening:** Send to newsletter if the topic warrants it (1–2x/month max, don't burn your 68% open rate).
- **Wednesday:** Monitor social engagement. Reply to every comment.

### Quarterly Content Maintenance

Every quarter, spend 2 hours on:
- Update any post with "2026" in the title to reflect current year
- Add new case study links to relevant older posts
- Update any stats that have changed (e.g., "47 clients" → new number)
- Refresh the pillar pages with new internal links to recently published cluster posts

---

## 12. Mobile, Accessibility & Security Hygiene

These are real ranking factors in 2026. Accessibility in particular: WCAG-compliant sites see 23% more organic traffic and rank for 27% more keywords compared to non-compliant sites, per a 2026 SEMrush/AccessibilityChecker study of 10,000 domains. 94.8% of websites still fail basic accessibility — fixing this is a competitive advantage.

### 12.1 Mobile Responsiveness Audit

Your terminal aesthetic presents specific mobile challenges. Here's what to verify:

| Check | How to Test | What to Fix |
|-------|-------------|-------------|
| Terminal font size on mobile | Open on iPhone SE viewport (375px) | Monospace fonts render smaller. Minimum 14px for body, 12px for terminal chrome. |
| Touch targets | Tap all nav links with thumb | Minimum 48×48px touch targets. Terminal-style text links are often too small. |
| Horizontal scroll | Rotate phone, check all pages | Zero horizontal scroll allowed. Terminal ASCII art may overflow on narrow screens. |
| Form usability | Fill the contact form on mobile | Inputs must be at least 16px font (prevents iOS zoom). Budget dropdowns must work with touch. |
| CTA visibility | Is the primary CTA visible without scrolling? | "Book a call" should be above the fold on mobile. Terminal boot sequence may push it down. |
| Content width | Does body text fit without pinching? | Terminal layouts often use fixed-width containers. Use `max-width: 100%` and `overflow-x: hidden`. |

### 12.2 Accessibility — High-Impact Quick Fixes

71.6% of screen reader users navigate by headings. Your terminal-style headings may not be real HTML headings. Verify immediately.

#### Heading Hierarchy Audit

```bash
# Check your heading structure with a browser extension
# (WAVE, axe DevTools, or Lighthouse accessibility audit)

# Or manually: view source and check:
# - One <h1> per page? 
# - No skipped levels? (H1 → H3 without H2 is a fail)
# - Are headings semantic HTML, or styled <div>s?
```

**Common issue on terminal-themed sites:** Headings built with styled `<div>` or `<span>` instead of `<h1>`–`<h6>`. A screen reader sees no headings at all, and Google treats the page as unstructured.

**Fix:**
```html
<!-- ❌ Terminal aesthetic, no semantics -->
<div class="terminal-h1">Physics brain. Design hands. Builder output.</div>

<!-- ✅ Terminal aesthetic + semantic heading -->
<h1 class="terminal-h1">Physics brain. Design hands. Builder output.</h1>
```

#### Critical Accessibility Checklist (2 Hours)

| # | Fix | Effort | Why It Matters |
|---|-----|--------|----------------|
| 1 | Ensure every page has exactly one `<h1>` | 30 min | Screen readers + Google both need this |
| 2 | No skipped heading levels (H1 → H3 without H2) | 30 min | Breaks document outline for assistive tech |
| 3 | All images have descriptive `alt` text (not auto-generated Unsplash descriptions) | 30 min | Blind users + Google Image Search |
| 4 | Form inputs have associated `<label>` elements | 15 min | Screen readers can't identify unlabeled inputs |
| 5 | Color contrast ≥ 4.5:1 for body text (terminal green-on-black may fail) | 15 min | Low-vision users literally can't read low-contrast text |
| 6 | Skip-to-content link for keyboard users | 15 min | Lets keyboard users bypass your terminal boot animation |
| 7 | All interactive elements reachable by Tab key | 15 min | Motor-disabled users rely on keyboard navigation |

#### Terminal-Specific Color Contrast Check

Your terminal uses green/amber text on dark backgrounds. Test it:

```bash
# Check your exact colors:
# Open Chrome DevTools → Lighthouse → Accessibility audit
# Or use: https://webaim.org/resources/contrastchecker/

# Typical terminal green (#00FF00) on black (#000000) = 15.3:1 ✅ Passes
# But dim/amber text (#FFB000 on #1A1A1A) = ~6.5:1  ✅ Passes
# Faded green (#4A7A4A on #0A0A0A) = ~4.2:1      ⚠️ Borderline
# Gray operator log text (#666 on #0A0A0A) = ~4.5:1  ⚠️ Borderline
```

If your "OFF" or dimmed terminal states use gray-on-dark, increase contrast. Don't compromise the aesthetic — just use slightly brighter dim colors.

### 12.3 Security Headers

Security headers are a minor ranking signal but prevent real problems. Your site uses Vercel + Cloudflare — add these in `next.config.ts` or `vercel.json`:

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

Verify with: `curl -sI https://www.usamazahid.design/ | grep -i strict`

### 12.4 404 Page SEO

You have a custom 404 page (`/htdocs_error/page_not_found.svg`). Verify:

1. It returns HTTP 404 status (not 200 — a "soft 404" confuses Google)
2. It has links to homepage, portfolio, services, and contact
3. It has your newsletter signup (lost visitors = newsletter subscribers)
4. It does NOT redirect to homepage (Google needs the 404 status code to de-index bad URLs)

---

## 13. Analytics & Tracking Setup (Detailed)

"Install GA4" is not enough. Here's exactly what to track, why, and how.

### 13.1 Essential GA4 Events

```typescript
// app/lib/analytics.ts — central analytics events

// Fire these events from your components:

// 1. Contact form start (someone clicks into the form)
gtag('event', 'form_start', {
  event_category: 'contact',
  event_label: 'brief_form',
});

// 2. Contact form submission
gtag('event', 'generate_lead', {
  event_category: 'contact',
  event_label: 'brief_form_submitted',
  value: 1, // Each lead = 1
});

// 3. Cal.com booking click
gtag('event', 'book_call', {
  event_category: 'conversion',
  event_label: 'cal_dot_com',
});

// 4. Newsletter signup
gtag('event', 'sign_up', {
  event_category: 'newsletter',
  method: 'blog_footer', // or 'homepage', 'contact_page', etc.
});

// 5. Content engagement (scroll ≥75%)
gtag('event', 'scroll_depth', {
  event_category: 'engagement',
  event_label: '75_percent',
  page_path: window.location.pathname,
});

// 6. Portfolio case study view (spent >60 seconds)
gtag('event', 'case_study_engaged', {
  event_category: 'portfolio',
  event_label: 'neuraldesk-copilot', // dynamic per case study
});

// 7. Digital product "Get It" click
gtag('event', 'product_interest', {
  event_category: 'products',
  event_label: 'brand_system_kit',
});

// 8. CV PDF request
gtag('event', 'cv_request', {
  event_category: 'career',
  event_label: 'pdf_request',
});
```

### 13.2 PostHog Dashboard Setup

Create 3 dashboards in PostHog (already self-hosted):

**Dashboard 1: Acquisition**
- Organic traffic trend (source = organic)
- Top 10 landing pages by organic visitors
- New vs returning visitors (organic)
- Geographic breakdown (which countries send traffic)
- Device breakdown (mobile vs desktop)

**Dashboard 2: Engagement**
- Average scroll depth per page
- Time on page for blog posts
- Bounce rate per landing page
- Pages per session
- Top exit pages (where people leave)

**Dashboard 3: Conversion**
- Form starts vs form completions (abandonment rate)
- Cal.com clicks
- Newsletter signups
- Conversion rate by traffic source
- Conversion rate by landing page

### 13.3 Google Search Console — Weekly Check

Every Monday, 15 minutes, check these 4 things:

1. **Performance → Queries (last 7 days):** Sort by impressions. Any new queries appearing? Any clicks?
2. **Indexing → Pages:** Any new errors? Any pages dropped from index?
3. **Experience → Core Web Vitals:** Any URLs failing? (Should be zero if you maintain 98+.)
4. **Security & Manual Actions:** Should always be "No issues detected."

### 13.4 Monthly SEO Report Template

Spend 30 minutes on the 1st of each month. Track these in a simple spreadsheet:

| Metric | Last Month | This Month | % Change | Notes |
|--------|-----------|------------|----------|-------|
| Organic clicks | — | — | — | From GSC |
| Organic impressions | — | — | — | From GSC |
| Avg. position | — | — | — | From GSC |
| Keywords in top 10 | — | — | — | From GSC or Ahrefs |
| Indexed pages | — | — | — | From GSC coverage |
| Contact form submissions (organic) | — | — | — | From GA4 + source filter |
| Cal.com bookings (organic) | — | — | — | From cal.com + GA4 |
| Newsletter subscribers (new) | — | — | — | From email platform |
| Blog posts published | — | — | — | Count |
| Backlinks / referring domains | — | — | — | From Ahrefs Webmaster |
| Lighthouse score (mobile) | — | — | — | From PageSpeed Insights |
| Revenue (projects won from organic) | — | — | — | Ask clients "How did you find me?" |

---

## 14. Newsletter SEO Strategy

You have 1,247 subscribers at 68% open rate. That's a 2–3× better open rate than industry average for design newsletters. This is a distribution asset — here's how to make it also an SEO asset.

### 14.1 Archive Newsletters as Blog Posts

Every newsletter you send becomes a blog post on your site 2 weeks later. Why:
- Newsletter content is already written — zero extra effort
- It adds fresh, indexed pages to your site
- It gives subscribers a reason to visit the site (searchable archive)
- Google sees consistent content velocity (frequency signal)

**Implementation:**
```
Send newsletter → Wait 2 weeks → Publish as blog post with [Dispatch #N] prefix
```

### 14.2 Newsletter-to-Site Traffic Loop

```
Newsletter → Links to blog posts → Subscribers visit site → Increased time on site
    ↑                                                                      ↓
New subscribers ← Blog post footer signup ← Blog ranks in search ← Google sees engagement
```

### 14.3 Newsletter Landing Page

Create `/dispatch/` as an archive + signup page:
- All past dispatches listed with titles, dates, snippets
- Signup form at the top
- Social proof: "1,247 operators read this. 68% open rate."
- This page itself can rank for "design newsletter" or "product design newsletter"

---

## Appendix E: Complete Page-by-Page Fix Checklist

Print this. Check each box as you complete it.

### Homepage (`/`)
- [ ] Client-side exception fixed — page renders server-side with full HTML
- [ ] Title: "AI Product Designer for SaaS & Startups — Usama Zahid"
- [ ] Meta description added (150–160 chars)
- [ ] H1 present and rendering in source (not client-only)
- [ ] Open Graph image set
- [ ] Canonical: `https://www.usamazahid.design`
- [ ] Person schema added
- [ ] WebSite schema added
- [ ] Primary CTA above the fold
- [ ] Trust signals visible near CTA

### About (`/about/`)
- [ ] Title: "About — Usama Zahid"
- [ ] Meta description added
- [ ] Person schema added (full version)
- [ ] FAQ schema for method/process questions

### Services (`/services/`)
- [ ] Title: "SaaS Design Services — Brand, Product & Web Engineering — Usama Zahid"
- [ ] Meta description added
- [ ] Service schema for each track
- [ ] BreadcrumbList schema

### Services → Identity (`/services/identity/`)
- [ ] Meta description added
- [ ] FAQ schema (6 questions already exist in accordions)
- [ ] Service schema
- [ ] Internal links to relevant portfolio case studies

### Services → Product (`/services/product/`)
- [ ] Meta description added
- [ ] FAQ schema
- [ ] Service schema

### Services → Engineering (`/services/engineering/`)
- [ ] Meta description added
- [ ] FAQ schema
- [ ] Service schema

### Services → Strategy (`/services/strategy/`)
- [ ] Meta description added
- [ ] FAQ schema
- [ ] Service schema

### Portfolio (`/portfolio/`)
- [ ] Title: "SaaS & AI Product Design Case Studies — Usama Zahid Portfolio"
- [ ] Meta description added
- [ ] Real project images replacing Unsplash
- [ ] Descriptive alt text on all images
- [ ] 301 redirect from `/work` to `/portfolio` tested

### Case Studies (×4 pages)
- [ ] Meta descriptions added
- [ ] Real project screenshots replacing Unsplash
- [ ] Descriptive alt text
- [ ] Article schema with author, datePublished, dateModified
- [ ] Internal links to relevant services and blog posts

### Blog (`/blog/`)
- [ ] "No SEO content" tagline removed
- [ ] Title: "SaaS Design & Single-Operator Studio — Blog — Usama Zahid"
- [ ] Meta description added
- [ ] Newsletter signup visible in layout

### Blog Posts (×6 + new ones)
- [ ] Meta descriptions added
- [ ] Article/BlogPosting schema on each
- [ ] "Last updated: [date]" visible
- [ ] Answer-first intro paragraph (GEO format)
- [ ] Internal links to services and portfolio
- [ ] CTA at end of each post
- [ ] Newsletter signup in footer

### Contact (`/contact/`)
- [ ] Title: "Start a Project — Usama Zahid — AI Product Designer"
- [ ] Meta description added
- [ ] Single primary CTA (cal.com)
- [ ] Trust signals near form
- [ ] Thank-you page after form submission (`/contact/thanks/`)
- [ ] Form has 3–4 fields max (first step)

### Products (`/products/`)
- [ ] Meta description added
- [ ] Product schema for each digital product

### CV (`/cv/`)
- [ ] Meta description added
- [ ] PDF download tracked as event

### Global / Cross-Site
- [ ] All title tags: `· Usama Zahid · Usama Zahid` → `— Usama Zahid`
- [ ] `metadataBase` set in root layout
- [ ] Open Graph + Twitter cards on all pages
- [ ] Canonicals on all pages
- [ ] Trailing slash consistency enforced
- [ ] Sitemap auto-generated and submitted
- [ ] robots.txt verified
- [ ] llms.txt deployed
- [ ] Terminal boot text made page-specific
- [ ] All images use `next/image` with width/height
- [ ] `next/font` for self-hosted fonts
- [ ] Google Search Console verified
- [ ] GA4 installed with conversion events
- [ ] Security headers configured (HSTS, X-Frame-Options)
- [ ] 404 page returns actual 404 status
- [ ] Heading hierarchy valid (one H1 per page, no skipped levels)
- [ ] Color contrast verified (4.5:1 minimum)
- [ ] Form inputs have labels
- [ ] Skip-to-content link added
- [ ] Privacy policy and terms pages link in footer
- [ ] `/special-offer` page either published or removed from sitemap

---

*Additional sections written July 2026. CRO advice based on SaaS/design portfolio benchmarks. Accessibility data from SEMrush/AccessibilityChecker 2026 study of 10,000 domains.*
