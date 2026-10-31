# How to Add a Blog Post

Blog posts are fully data-driven. You add one entry to a single TypeScript array
and the page, route, sitemap, and SEO are generated automatically.

**File to edit:** `lib/blog-data.ts`
**Type:** `BlogPost` (defined at the top of that file)
**Route generated:** `/blog/<slug>` via `app/blog/[slug]/page.tsx` + `generateStaticParams()`

---

## 1. The `BlogPost` shape

```ts
interface BlogPost {
  slug: string;            // URL segment, kebab-case, unique. e.g. "my-new-post"
  number: string;          // display index, zero-padded. e.g. "007"
  title: string;
  subtitle: string;        // shown under the title on the post + listings
  date: string;            // "YYYY.MM.DD"
  readingTime: number;     // minutes, integer
  category: BlogCategory;  // see allowed values below
  tags: string[];          // lowercase keywords
  featured?: boolean;      // only ONE post should be featured (used on /blog hero)
  excerpt: string;         // meta description + listing preview
  cover: CoverVariant;     // decorative cover style (see below)
  coverImage: string;      // full image URL
  content: BlogBlock[];    // the body, an array of typed blocks
  faqs?: { q: string; a: string }[];  // optional per-post FAQ
}
```

### `BlogCategory` (union)
`'SYSTEM' | 'PROCESS' | 'FIELD_NOTES' | 'ESSAY' | 'TECHNICAL'`

### `CoverVariant` (union)
`'grid' | 'rings' | 'bars' | 'arc' | 'dots' | 'lines' | 'wave' | 'cross'`
(Purely decorative — pick whichever matches the post's vibe.)

### `BlogBlock` (union)
Each item in `content` is one of:

```ts
{ type: 'p'; text: string; drop?: boolean }                 // paragraph; drop=true = large first letter
{ type: 'h2'; text: string; id?: string }                   // section heading (id used for TOC anchor)
{ type: 'h3'; text: string; id?: string }
{ type: 'ul'; items: string[] }
{ type: 'ol'; items: string[] }
{ type: 'quote'; text: string; cite?: string }
{ type: 'code'; language: string; code: string; filename?: string }
{ type: 'image'; src: string; alt: string; caption?: string }
{ type: 'callout'; variant: 'note' | 'warning' | 'success'; text: string }
{ type: 'divider' }
```

---

## 2. Image sizes & aspect ratios

Every photographic image in the blog is cropped with `object-cover` inside a fixed
aspect-ratio frame. Upload at or above the recommended pixel size so it stays sharp
on retina displays.

### Source file specs (what to export)

| Field / block | Used in | Display ratio | Recommended export | Min width |
| ------------- | ------- | ------------- | ------------------ | --------- |
| `coverImage` | Post hero, listing cards, related posts, OG/Twitter | **16∶9** (cards crop to **16∶10**) | **1600 × 900 px** | 1200 px |
| `{ type: 'image' }` in `content` | In-article figure (`PostBody`) | **16∶9** | **1600 × 900 px** | 1200 px |

**Format:** JPG or WebP, sRGB, compressed (≈80–120 KB at 1600 px wide is fine).

**Local assets:** place files in `public/images/blog/` and reference as
`/images/blog/your-file.webp`.

**Remote (Unsplash):** the `img()` helper already requests `w=1600`:

```ts
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
```

Use this for `coverImage` and in-body `image` blocks. For a custom crop on Unsplash,
append `&h=900&fit=crop` to enforce 16∶9.

`lib/blog-data.ts` also exports a `blogImage` map of preset Unsplash IDs — use
`blogImage.brand`, `blogImage.code1`, etc. when you want a quick default.

### Where each size appears (rendered)

| Component | Aspect frame | Max display width | `sizes` hint |
| --------- | ------------ | ----------------- | ------------ |
| `PostHero` | 16∶9 | ~896 px (`max-w-4xl`) | `100vw` mobile · `900px` desktop |
| `PostCard` (grid) | 16∶10 | ~50% of listing grid | `100vw` mobile · `50vw` desktop |
| `PostCard` (wide / featured) | 16∶10 | ~40% of row | `100vw` mobile · `40vw` desktop |
| `PostBody` figure | 16∶9 | ~768 px (article column) | `100vw` mobile · `768px` desktop |
| `PostFooter` related card | 16∶9 | ~33% of 3-col grid | `100vw` mobile · `33vw` desktop |

`coverImage` is also passed to Open Graph, Twitter cards, and `ArticleSchema` — keep
it at **1600 × 900** so social previews match the on-page hero.

### Decorative cover (`cover` field)

The `cover` field (`'grid' | 'rings' | …`) drives `PostCover` — a **procedural SVG
pattern**, not a photo. No image file needed for that field.

`PostCover` SVG canvas sizes (internal only): `sm` 80×80 · `md` 160×160 ·
`lg` 280×280 · `xl` 480×480.

---

## 3. Step-by-step

1. Open `lib/blog-data.ts`.
2. Find `export const posts: BlogPost[] = [` and append a new object (order does
   not matter — listing sorts by `date`/`number` via the utils).
3. Fill in all required fields. Set `number` to the next sequential value.
4. Write `content` as an array of `BlogBlock` items. Use `h2` with `id` for any
   section you want in the table of contents.
5. (Optional) Add a `faqs` array — it renders a dedicated "Questions on this post."
   accordion and emits `FAQPageSchema` JSON-LD automatically.
6. Make sure `slug` is unique and kebab-case.
7. Save and rebuild:

   ```bash
   npm run build
   ```

8. Preview: `npx serve out`, then open `/blog/<your-slug>/`.

No router, component, or sitemap changes are required — they are derived.

---

## 4. Minimal example

```ts
{
  slug: 'my-first-post',
  number: '007',
  title: 'My First Post',
  subtitle: 'A short note on why this pattern works.',
  date: '2026.07.12',
  readingTime: 4,
  category: 'ESSAY',
  tags: ['method', 'notes'],
  excerpt: 'A compact explainer of the single-operator model in practice.',
  cover: 'dots',
  coverImage: img('1517842645767-c639042777db'),
  content: [
    { type: 'p', drop: true, text: 'Opening line with a drop cap.' },
    { type: 'h2', text: 'The core idea', id: 'core' },
    { type: 'p', text: 'Body paragraph explaining the idea.' },
    {
      type: 'callout',
      variant: 'note',
      text: 'A side note worth highlighting.',
    },
    { type: 'divider' },
    { type: 'p', text: 'Closing thought.' },
  ],
  faqs: [
    {
      q: 'Who is this for?',
      a: 'Founders who need a single operator to run the sequence end to end.',
    },
  ],
},
```

---

## 5. Editing / removing

- **Feature a different post:** set `featured: true` on the new one and remove it
  from the old (the listing picks `getFeaturedPost()` = first `featured`, else first).
- **Remove a post:** delete its object from `posts`. If the URL was previously
  published and crawled, add a static redirect page (see `docs/TECHNICAL.md` §7)
  so the old link does not 404.
- **Change a slug:** treat it like a removal + add — old slug 404s unless you add
  a redirect page at `app/blog/<old-slug>/page.tsx`.
