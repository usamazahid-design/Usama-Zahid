# How to Add a Project (Portfolio Case Study)

Projects are fully data-driven, like blog posts. You append one object to a typed
array and the page, route, sitemap, and SEO are generated automatically.

**File to edit:** `lib/portfolio-data.ts`
**Type:** `Project` = `CaseStudyProject | UIUXProject` (defined at the top of that file)
**Route generated:** `/portfolio/<slug>` via `app/portfolio/[slug]/page.tsx` + `generateStaticParams()`

There are **two templates** you can choose between:

| Template        | Use for                                  | Discriminated by         |
| --------------- | ---------------------------------------- | ------------------------ |
| `ai-case-study` | AI / product design work with research   | `template?: 'ai-case-study'` (default) |
| `ui-ux`         | Pure UI/UX design work                   | `template: 'ui-ux'` (required) |

---

## 1. Shared base fields (`ProjectBase`)

Every project — regardless of template — needs these:

```ts
{
  slug: string;          // URL segment, kebab-case, unique. e.g. "acme-ai"
  number: string;        // display index, zero-padded. e.g. "005"
  title: string;
  subtitle: string;      // one-line summary shown on cards + hero
  client: string;
  year: string;          // "2026"
  role: string;          // "Lead Product Designer"
  duration: string;      // "12 weeks"
  excerpt: string;       // listing preview + meta description
  accentColor: string;   // hex, drives the project's theme color. e.g. "#4B3FFF"
  featured?: boolean;    // only ONE project should be featured (portfolio hero)
  url?: string;          // public domain, no protocol. e.g. "acme.ai"
  category: ProjectCategory;
  scope: string[];       // ["AI Product Strategy", "UX Research", ...]
  team: string;          // "1 designer, 1 PM, 4 engineers"
  platform: string;      // "Web app (desktop-first)"
  tools: string[];       // ["Figma", "Maze", ...]
  hook: {
    outcomeLine: string; // the headline result, e.g. "First-reply latency -61%"
    image: CaseMedia;    // the hero media (see §4 for CaseMedia, §5 for local images)
  };
}
```

### `ProjectCategory` (union)
`'ai-saas' | 'fintech' | 'operations' | 'ui-ux'`

---

## 2. `CaseStudyProject` (AI / product template)

Extend the base with these research-and-outcome sections. Each is an object;
arrays accept one or more entries. You can keep early sections short.

```ts
{
  // ...base fields above, template is optional here...
  context: { summary: string };
  aiProblem: {
    statement: string;
    quotes: string[];
    evidence: CaseMedia[];
  };
  uxResearch: {
    methods: string[];
    findings: string[];
    artifacts: CaseMedia[];
  };
  mentalModels: { summary: string; maps: CaseMedia[] };
  problemFraming: {
    statement: string;
    expectationGap?: string;
    gapDiagram?: CaseMedia;
  };
  designDecisions: {
    sketches: CaseMedia[];
    options: { rejected: string; chosen: string; reasoning: string }[];
  };
  theWork: {
    midFi: CaseMedia[];
    hiFi: CaseMedia[];
    prototype?: CaseMedia;
    designSystem: { token: string; detail: string }[];
    motionSpecs?: string[];
  };
  aiUxPatterns: {
    components: CaseMedia[];
    states: { name: string; behavior: string }[];
    edgeCases: { scenario: string; handling: string }[];
  };
  usabilityTesting: {
    clips: CaseMedia[];
    beforeAfter: { before: string; after: string; change: string }[];
    heatmaps: CaseMedia[];
  };
  outcome: {
    screens: CaseMedia[];
    metrics: { label: string; value: string; delta?: string }[];
    liveUrl?: string;
  };
  reflection: { narrative: string; nextMoves: string[] };
}
```

---

## 3. `UIUXProject` template

Set `template: 'ui-ux'` and use this shape instead of the AI sections:

```ts
{
  // ...base fields...
  template: 'ui-ux',
  overview: { summary: string };
  problem: { statement: string; goals: string[] };
  research: { methods: string[]; insights: string[]; artifacts: CaseMedia[] };
  flows: { summary: string; diagrams: CaseMedia[] };
  wireframes: { summary?: string; frames: CaseMedia[] };
  visualDesign: {
    summary: string;
    screens: CaseMedia[];
    styleTokens: { token: string; detail: string }[];
  };
  prototype?: { summary?: string; media?: CaseMedia; motionNotes?: string[] };
  outcome: {
    metrics: { label: string; value: string; delta?: string }[];
    screens: CaseMedia[];
    liveUrl?: string;
  };
  reflection: { narrative: string; nextMoves: string[] };
}
```

---

## 4. `CaseMedia` (how images/video are stored)

Every image, video, or prototype reference is a `CaseMedia` object:

```ts
interface CaseMedia {
  id: string;            // unique within the project, e.g. "hero-1"
  title: string;
  caption?: string;
  fidelity: FidelityTag; // 'TEXT'|'RAW'|'LOW-FI'|'MID-FI'|'HI-FI'
  layout?: GalleryLayout;// 'hero'|'duo'|'trio'|'quad'|'full-bleed'
  content:
    | { type: 'image'; src: string; alt: string }
    | { type: 'video'; url: string; thumbnail?: string }
    | { type: 'prototype'; url: string };
}
```

There are **no helpers** for images anymore. Every image is a plain, uniform
block that points to a **local file** in `public/images/portfolio/`. See §5.

> Use **your own local images** — there is no web/Unsplash fallback anymore.

---

## 5. How to use YOUR OWN local images (read this first)

> **New to coding?** Read `docs/GUIDE-LOCAL-IMAGES-BEGINNER.md` instead — it walks
> through every click, in plain words, using your actual files. What follows is
> the short technical version.

This is the most common question. It is only 2 steps.

### Step 1 — Put the image file in the right folder

All site images live in `public/images/`. The project images folder is already
created for you:

```
public/images/portfolio/
```

So you drag/copy your image into:

```
public/images/portfolio/neuraldesk-hero.png
```

Any format works: PNG, JPG, WebP, AVIF, SVG. Keep it under ~1 MB if you can
(export ~1600px wide, like the Unsplash images).

### Step 2 — Reference it with a `/images/...` path

In `lib/portfolio-data.ts`, the `src` field is just a **text path**. Use the
path that starts from the `public/` folder, with a leading `/`:

```ts
content: {
  type: 'image',
  src: '/images/portfolio/neuraldesk-hero.png',   // ← your local file
  alt: 'NeuralDesk final interface',
}
```

That is it. No other file or config needs to change. The build copies
`public/` into `out/` as-is and the image just works.

### Which is which?

| If you write… | Where the image is | Notes |
| ------------- | ------------------ | ----- |
| `src: '/images/portfolio/my-shot.png'` | A file you own in `public/images/portfolio/` | ✅ The only form used in the project data |
| `src: photo('1460925895917-…')` | A photo hosted on Unsplash | ❌ Removed — no longer exists |

### Full example with a local image

```ts
// File on disk:  public/images/portfolio/acme-hero.webp
// Written in:   lib/portfolio-data.ts

hook: {
  outcomeLine: 'Agent trust score up 40%.',
  image: {
    id: 'hook-1',
    title: 'Final cockpit',
    caption: 'High-fidelity final screen of the AI support cockpit.',
    fidelity: 'HI-FI',
    content: {
      type: 'image',
      src: '/images/portfolio/acme-hero.webp',   // ← your file
      alt: 'Acme AI cockpit interface',
    },
  },
},
```

### How to replace ALL the images in a project

Every `CaseMedia` has the same `content.src` pattern. Give each image a unique
`id` (e.g. `hero-1`, `evidence-1`, `work-2`) and point `src` at your local file
in `public/images/portfolio/`:

---

## 6. Image sizes & gallery layouts

Portfolio images are rendered by `components/portfolio/CaseMedia.tsx`. Each
`CaseMedia` item is cropped with `object-cover` inside a frame determined by its
`layout` field (defaults to `'duo'`).

### `GalleryLayout` → display frame

| `layout` value | Aspect ratio | Used for | Recommended export |
| -------------- | ------------ | -------- | ------------------ |
| `full-bleed` | **16∶9** | Case-study hook hero, prototypes | **1600 × 900 px** |
| `hero` | **16∶9** | Full-width section heroes | **1600 × 900 px** |
| `duo` *(default)* | **4∶3** | Two-column `MediaGrid`, listing thumbnails | **1600 × 1200 px** |
| `trio` | **3∶4** | Portrait screens, mobile UI | **1200 × 1600 px** |
| `quad` | **1∶1** | Square tiles, icon grids | **1600 × 1600 px** |

**Format:** JPG or WebP, sRGB. Export at the sizes above (or larger); the UI never
upscales beyond the source.

**Local assets:** `public/images/portfolio/` → reference as
`/images/portfolio/your-file.webp`.

All project images are local files under `public/images/portfolio/`. Reference
them as `/images/portfolio/your-file.webp` — no remote URLs.

### Where each size appears (rendered)

| Context | Layout forced | Max display width | Notes |
| ------- | ------------- | ----------------- | ----- |
| Case-study hook (`CaseStudy` / `UIUXCaseStudy`) | `full-bleed` | ~100% content column | First image on page; `priority` load |
| `MediaGrid` (2-up) | per-item `layout` (usually `duo`) | ~50% column each | Default for plain image blocks |
| `MediaGrid` (single item) | per-item `layout` | full column width | Set `layout: 'full-bleed'` for wide shots |
| Portfolio listing card (`ProjectCard`) | hook image in **4∶3** frame | **420 px** wide | Uses `hook.image` src directly |
| In-page `CaseMedia` | per-item `layout` | ~60 vw desktop | `sizes="100vw"` on mobile |

### Choosing a layout

- **UI screenshots (desktop):** `duo` (4∶3) in grids; `full-bleed` for the hook.
- **Mobile screens:** `trio` (3∶4) so portrait frames are not over-cropped.
- **Before/after pairs, component clusters:** `quad` (1∶1) or two `duo` items in `MediaGrid`.
- **Research photos, whiteboards:** `duo` or `full-bleed` depending on detail.

### Video & prototype embeds

`{ type: 'video' }` and `{ type: 'prototype' }` fill the same aspect frame as
images. Optional `thumbnail` on video entries is not rendered today — the iframe
fills the layout box directly. Prefer **16∶9** embeds for `full-bleed` slots.

### Hook image (`hook.image`)

Every project needs a hook image. On the case-study page it is always shown as
**16∶9 full-bleed** regardless of the `layout` stored in data. On `/portfolio/`
listing cards it appears in a **4∶3** frame (max 420 px wide).

**Recommended:** export hook art at **1600 × 900** with the subject centred — safe
for both the wide hero crop and the tighter card crop.

---

## 7. Step-by-step

1. Open `lib/portfolio-data.ts`.
2. Find `export const projects: Project[] = [` and append a new object.
3. Add all `ProjectBase` fields. Set `number` to the next sequential value and pick
   a unique `slug`.
4. Choose the template:
   - **AI / product** → add the `CaseStudyProject` sections from §2 (omit `template`).
   - **UI/UX** → set `template: 'ui-ux'` and add the §3 sections.
5. Add your images (see §5):
   - Copy your real screenshots/art into `public/images/portfolio/`.
   - Reference them as `src: '/images/portfolio/your-file.png'` in every `CaseMedia`.
   - Give every `id` a unique value. Every image is a local file — there are no
     Unsplash placeholders anymore.
6. (Optional) set `featured: true` on exactly one project for the portfolio hero.
7. Save and rebuild:

   ```bash
   npm run build
   ```

8. Preview: `npx serve out`, then open `/portfolio/<your-slug>/`.

No router, component, or sitemap changes are required.

---

## 8. Minimal `ai-case-study` example

```ts
{
  slug: 'acme-ai',
  number: '005',
  title: 'Acme AI',
  subtitle: 'Redesigned the agent cockpit to recover trust after bad outputs.',
  client: 'Acme',
  year: '2026',
  role: 'Lead Product Designer',
  duration: '10 weeks',
  excerpt: 'An AI workspace redesign focused on evidence, confidence, and recovery.',
  accentColor: '#4B3FFF',
  url: 'acme.ai',
  category: 'ai-saas',
  scope: ['AI Product Strategy', 'Interaction Design'],
  team: '1 designer, 3 engineers',
  platform: 'Web app',
  tools: ['Figma', 'Maze'],
  hook: {
    outcomeLine: 'Agent trust score up 40%.',
    image: {
      id: 'hook-1',
      title: 'Final cockpit',
      caption: 'High-fidelity cockpit.',
      fidelity: 'HI-FI',
      layout: 'duo',
      content: {
        type: 'image',
        src: '/images/portfolio/acme-cockpit.png',
        alt: 'Acme cockpit interface',
      },
    },
  },
  context: { summary: 'Owned end-to-end design from discovery to delivery.' },
  aiProblem: {
    statement: 'Agents distrusted fluent-but-wrong answers.',
    quotes: ['"It is confidently wrong sometimes."'],
    evidence: [
      {
        id: 'prob-1',
        title: 'Escalation chart',
        caption: 'Escalations rose.',
        fidelity: 'RAW',
        layout: 'duo',
        content: { type: 'image', src: '/images/portfolio/acme-chart.png', alt: 'Raw chart' },
      },
    ],
  },
  uxResearch: {
    methods: ['6 interviews'],
    findings: ['Needed source-level evidence.'],
    artifacts: [
      {
        id: 'res-1',
        title: 'Affinity',
        caption: 'Affinity map.',
        fidelity: 'RAW',
        layout: 'duo',
        content: { type: 'image', src: '/images/portfolio/acme-affinity.png', alt: 'Affinity' },
      },
    ],
  },
  mentalModels: { summary: 'Mapped expectation breakpoints.', maps: [] },
  problemFraming: { statement: 'How might we keep speed while preserving trust?' },
  designDecisions: {
    sketches: [
      {
        id: 'dec-1',
        title: 'Sketch',
        caption: 'Layout sketch.',
        fidelity: 'LOW-FI',
        layout: 'duo',
        content: { type: 'image', src: '/images/portfolio/acme-sketch.png', alt: 'Sketch' },
      },
    ],
    options: [{ rejected: 'Auto-send', chosen: 'Confirm with evidence', reasoning: 'Trust improved.' }],
  },
  theWork: {
    midFi: [
      {
        id: 'wf-1',
        title: 'Wireframe',
        caption: 'Mid-fi wireframe.',
        fidelity: 'MID-FI',
        layout: 'duo',
        content: { type: 'image', src: '/images/portfolio/acme-wireframe.png', alt: 'Wireframe' },
      },
    ],
    hiFi: [
      {
        id: 'hf-1',
        title: 'Final',
        caption: 'Hi-fi screen.',
        fidelity: 'HI-FI',
        layout: 'duo',
        content: { type: 'image', src: '/images/portfolio/acme-hifi.png', alt: 'Hi-fi' },
      },
    ],
    designSystem: [{ token: 'confidence.badge.*', detail: '5 confidence states.' }],
  },
  aiUxPatterns: {
    components: [
      {
        id: 'pat-1',
        title: 'States',
        caption: 'State cluster.',
        fidelity: 'HI-FI',
        layout: 'duo',
        content: { type: 'image', src: '/images/portfolio/acme-states.png', alt: 'States' },
      },
    ],
    states: [{ name: 'Loading', behavior: 'Shows retrieval progress.' }],
    edgeCases: [{ scenario: 'Timeout', handling: 'Preserve context, offer retry.' }],
  },
  usabilityTesting: {
    clips: [{ id: 'clip-1', title: 'Replay', fidelity: 'HI-FI', content: { type: 'video', url: 'https://www.loom.com/' } }],
    beforeAfter: [{ before: '74% external docs', after: '21%', change: 'Inline evidence.' }],
    heatmaps: [],
  },
  outcome: {
    screens: [
      {
        id: 'out-1',
        title: 'Result',
        caption: 'Outcome screen.',
        fidelity: 'HI-FI',
        layout: 'duo',
        content: { type: 'image', src: '/images/portfolio/acme-outcome.png', alt: 'Outcome' },
      },
    ],
    metrics: [{ label: 'Trust', value: '+40%' }],
    liveUrl: 'https://acme.ai',
  },
  reflection: { narrative: 'Trust beat raw speed.', nextMoves: ['Ship evidence rail.'] },
},
```

(For a `ui-ux` project, swap the AI sections for the §3 shape and add `template: 'ui-ux'`.)

### Images in this example

Every image in the example above is already a local file path in
`public/images/portfolio/`. To use your own art, copy your file into that folder
and set `src` to `/images/portfolio/your-file.png`. For example, to show a file
called `acme-cockpit.png`, the block is:

```ts
image: {
  id: 'hook-1',
  title: 'Final cockpit',
  caption: 'High-fidelity cockpit.',
  fidelity: 'HI-FI',
  layout: 'duo',
  content: {
    type: 'image',
    src: '/images/portfolio/acme-cockpit.png',   // file in public/images/portfolio/
    alt: 'Acme cockpit interface',
  },
},
```

Every image follows this same uniform block — there are no helper variables or
web URLs involved.

---

## 9. Cross-linking with Services

`lib/services-data.ts` has a `caseStudy.projectSlug` field on each service. Set it
to a project `slug` to link a service page to its case study (and vice versa). The
related-services logic on a project page reads `relatedSlugs` from the service data.

---

## 10. Editing / removing

- **Feature a different project:** set `featured: true` on the new one; the portfolio
  hero uses the first `featured` (fallback: first project).
- **Remove a project:** delete its object. If the URL was previously published, add a
  static redirect page (see `docs/TECHNICAL.md` §7) so the old link does not 404.
- **Change a slug:** treat as removal + add; the old slug 404s unless you add a redirect.
