# How to Add a Branding Project

Branding cases are data-driven, same as portfolio projects. You append one object
to a typed array and the index, case page, sitemap, and SEO are generated
automatically.

**File to edit:** `lib/branding-data.ts`
**Images map (optional):** `lib/branding-images.ts`
**Type:** `BrandingCase` (defined at the top of `lib/branding-data.ts`)
**Route generated:** `/branding/<slug>` via `app/branding/[slug]/page.tsx`

No router, nav, or sitemap file needs to change.

---

## 1. What you need

Every case needs:

| Field | Example | Notes |
| ----- | ------- | ----- |
| `slug` | `'northbound-coffee'` | kebab-case, unique, becomes the URL |
| `title` | `'Northbound Coffee'` | Page H1 and index card |
| `category` | `'IDENTITY'` | One of: `IDENTITY` `REBRAND` `PACKAGING` `BRAND_SYSTEM` |
| `tags` | `['Identity', 'Packaging']` | Shown on cards |
| `caseNumber` | `'#004'` | Display index |
| `client` / `year` / `timeline` / `role` | `'Northbound'` / `'2026'` / `'8 weeks'` / `'Brand Designer'` | Hero facts |
| `platform` / `team` / `tools` | `'Web · Print'` / `'Solo project'` / `['Figma']` | Overview panel |
| `featured` | `true` | Only **one** case should be featured (index flagship) |
| `accentColor` | `'#C45C26'` | Hex. Drives section numbers and highlights |
| `descriptor` | One short sentence | Hero + index cards |
| `heroImage` | See §3 | Full-bleed hero |
| Copy blocks | overview, context, goals, research, system, results | See §2 |
| `identityFigures` | 2–4 images | Horizontal gallery |
| `brandInUse` | 2–4 images | Full-bleed application plates |
| `results` | 3 metrics | Outcome strip |
| `nextSteps` | numbered list | Closing chapter |

Optional:

- `strategyBlock` — skip if you have no strategy chapter
- `motionSpecs` — skip if there is no motion work
- `liveUrl` / `liveLabel` — live brand site, e.g. `'https://example.com'`

---

## 2. Copy the existing shape

Open `lib/branding-data.ts` and find:

```ts
export const brandingCases: BrandingCase[] = [
```

The easiest way to add a case is to **duplicate the last object**, then change
every field. Keep the commas. TypeScript will error if a required field is missing.

Numbered lists always look like this:

```ts
brandGoals: [
  { num: '01', text: 'Read as premium without looking decorative.' },
  { num: '02', text: 'Survive small sizes — favicon and app icon.' },
],
```

`visualSystem` has four grids the case page renders as lockups, colour, type, and
tokens. Fill them with real brand rules:

```ts
visualSystem: {
  tokens: [{ name: 'color.accent', value: 'Clay (#C45C26) — reserved for CTAs.' }],
  palette: [{ name: 'Clay', hex: '#C45C26', usage: 'Primary accent. Buttons and marks.' }],
  typography: [{
    role: 'Display',
    family: 'Playfair Display · 700',
    usage: 'Headlines from 40px up.',
    sample: 'Roast is a ritual',
  }],
  lockups: [
    {
      name: 'Primary mark',
      usage: 'Default lockup on dark.',
      variant: 'primary',
      src: '/images/branding/northbound/lockup-primary.png',
      alt: 'Northbound primary lockup',
    },
    { name: 'Horizontal', usage: 'Nav and letterhead.', variant: 'horizontal', src: '/images/branding/northbound/lockup-horizontal.png' },
    { name: 'Icon', usage: 'Favicon and app tile.', variant: 'icon', src: '/images/branding/northbound/lockup-icon.png' },
    { name: 'Reversed', usage: 'On light surfaces.', variant: 'reversed', src: '/images/branding/northbound/lockup-reversed.png' },
  ],
},
```

`lockups.variant` must be one of:
`'primary' | 'horizontal' | 'stacked' | 'icon' | 'reversed'`

### Actual logos in LogoLockup

The lockup grid shows a generated letter mark **until** you set `src`. To show the real logo:

1. Create `public/images/branding/<slug>/`
2. Export each variant as a **transparent** PNG, WebP, or SVG (no background).
3. Set `src` on that lockup object. The path starts at `public/`:

```
public/images/branding/codestreaks/lockup-primary.png
→ src: '/images/branding/codestreaks/lockup-primary.png'
```

| Variant | File | Artwork |
| ------- | ---- | ------- |
| `primary` | `lockup-primary.png` | Full mark + wordmark, light art for a **dark** tile |
| `horizontal` | `lockup-horizontal.png` | Wide lockup for nav / email |
| `stacked` | `lockup-stacked.png` | Mark above wordmark |
| `icon` | `lockup-icon.png` | Mark only |
| `reversed` | `lockup-reversed.png` | **Dark** art for the light tile |

Do not flatten a black or white rectangle into the file — the tile already supplies the background. Omit `src` on any variant you do not have yet; that tile keeps the letter placeholder.

---

## 3. Images

Images are a `BrandingImage`:

```ts
{
  src: '/images/branding/northbound/hero.webp',
  alt: 'Northbound Coffee identity applied on a cafe counter',
  width: 2200,
  height: 1400,
}
```

### Local files (recommended)

1. Create a folder: `public/images/branding/<slug>/`
2. Drop WebP or JPG files in there (hero, strategy, lockups, applications).
3. Reference them with a path that starts at `public/`:

```
public/images/branding/northbound/hero.webp
→ src: '/images/branding/northbound/hero.webp'
```

Suggested exports:

| Slot | Size | Notes |
| ---- | ---- | ----- |
| Hero | **2200 × 1400** | Cropped 16∶9 / 21∶9 in the UI — keep the subject centred |
| Strategy / identity gallery | **1800 × 1125** | 16∶10 |
| Brand in use | **1800 × 1125** or wider | Full-bleed plates |

### Temporary Unsplash URLs

Until local art is ready, add keys in `lib/branding-images.ts` and point `src` at
`dummyBrandingImages.yourslug.hero`. Replace those URLs with `/images/branding/...`
paths later — no component changes needed.

---

## 4. Step-by-step

1. Open `lib/branding-data.ts`.
2. Duplicate an existing case inside `brandingCases`.
3. Set a unique `slug` and the next `caseNumber` (`#001`, `#002`, …).
4. Fill client, year, role, descriptor, and all copy.
5. Add images under `public/images/branding/<slug>/` and update every `src`.
6. Set `featured: true` on **one** case only (the index flagship). Remove it from
   the previous flagship if you are replacing it.
7. Save. Preview:

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000/branding/` and
   `http://localhost:3000/branding/<your-slug>/`.

No other files need to be edited. Sitemap and nav pick the new slug up automatically.

---

## 5. Minimal example

```ts
{
  slug: 'northbound-coffee',
  title: 'Northbound Coffee',
  category: 'IDENTITY',
  tags: ['Identity', 'Packaging'],
  caseNumber: '#004',
  client: 'Northbound',
  year: '2026',
  timeline: '8 weeks',
  role: 'Brand Designer',
  platform: 'Web · Print · Packaging',
  team: 'Solo project',
  tools: ['Figma', 'Illustrator'],
  featured: false,
  accentColor: '#C45C26',
  descriptor: 'A roast-led identity for a specialty coffee bar that had to feel ritual, not cafe-generic.',
  heroImage: {
    src: '/images/branding/northbound/hero.webp',
    alt: 'Northbound Coffee brand applied in the cafe',
    width: 2200,
    height: 1400,
  },
  overview: 'One paragraph on what the brand is and what you shipped.',
  context: 'Two short paragraphs on the brief, the category, and what was broken.',
  brandGoals: [
    { num: '01', text: 'Feel ritual, not generic cafe.' },
  ],
  methods: [
    { num: '01', text: '12 customer interviews at the bar.' },
  ],
  keyInsights: [
    { num: '01', text: 'Buyers chose on ritual cues, not origin stories.' },
  ],
  visualSystem: {
    tokens: [{ name: 'color.accent', value: 'Clay (#C45C26).' }],
    palette: [{ name: 'Clay', hex: '#C45C26', usage: 'Accent only.' }],
    typography: [{
      role: 'Display',
      family: 'Playfair Display · 700',
      usage: 'Headlines.',
      sample: 'Roast is a ritual',
    }],
    lockups: [
      { name: 'Primary', usage: 'Default on dark.', variant: 'primary' },
    ],
  },
  identityFigures: [
    {
      id: 'id-01',
      label: 'HI-FI',
      caption: 'Primary lockup',
      description: 'Mark at working size on dark.',
      image: {
        src: '/images/branding/northbound/lockups.webp',
        alt: 'Northbound primary lockup',
        width: 1800,
        height: 1125,
      },
    },
  ],
  brandInUse: [
    {
      id: 'use-01',
      label: 'HI-FI',
      caption: 'Cup and sleeve',
      description: 'Identity on takeaway packaging.',
      image: {
        src: '/images/branding/northbound/packaging.webp',
        alt: 'Northbound cup and sleeve',
        width: 1800,
        height: 1125,
      },
    },
  ],
  results: [
    { label: 'RECALL', value: '+40%', description: 'Unprompted recall in a follow-up survey.' },
  ],
  nextSteps: [
    { num: '01', text: 'Extend the system to the roasting bag line.' },
  ],
},
```

---

## 6. Edit, feature, or remove

- **Edit copy or images:** change the object in `brandingCases`. Save and refresh.
- **Feature a different case:** set `featured: true` on the new one and remove it
  from the old one. The index uses the first featured case (fallback: first in the array).
- **Remove a case:** delete its object. If the URL was already live, add a redirect
  so the old slug does not 404 (see `docs/TECHNICAL.md`).
- **Change a slug:** treat as remove + add. The old URL 404s unless you redirect.
