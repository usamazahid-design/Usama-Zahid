# How to Add a Product

Products are data-driven. To add a new one, you only edit one file:

- `lib/products-data.ts`

The products page (`/products`) and product detail page (`/products/[slug]`) update automatically.

---

## 1) Add a new product object

Open `lib/products-data.ts` and find:

- `export const products: Product[] = [ ... ]`

Copy one existing product object, paste it at the end, then update values.

Required fields:

- `slug` (unique, kebab-case, URL-safe)
- `number` (`"06"`, `"07"`, etc.)
- `code` (example: `"PR.06 · FIGMA"`)
- `name`
- `type` (`figma | nextjs | notion | pdf | motion | bundle`)
- `typeLabel`
- `tagline`
- `description`
- `thumbnail`
- `gallery` (array of image paths)
- `bullets` (3-6 items recommended)
- `price` (for display only)
- `status` (`available | new | bestseller | limited`)
- `files`
- `compatibility`
- `updates`
- `license`

Optional fields:

- `compareAt`
- `featured`
- `deliveryMode` (`link | file | email`)
- `deliveryUrl`
- `deliveryLabel`

---

## 2) Image dimensions (important)

Use local images from `public/images/...` when possible.

### Thumbnail (`thumbnail`)

- Used in product cards and top preview area.
- Recommended ratio: **4:3**
- Recommended size: **1600 x 1200 px**
- Minimum: **1200 x 900 px**

### Gallery images (`gallery[]`)

- Rendered on detail page in `16:10` frames.
- Recommended ratio: **16:10**
- Recommended size: **1600 x 1000 px**
- Minimum: **1280 x 800 px**

### Format + quality

- Preferred formats: **WebP** or **JPG**
- Keep each image around **200 KB to 800 KB** (as a practical target)
- Use sRGB color profile

---

## 3) Correct image paths

If your file is:

- `public/images/Products/brandkit/brandkit-hero.webp`

Then path in data must be:

- `/images/Products/brandkit/brandkit-hero.webp`

Rules:

- Always start with single `/`
- Do **not** use `//images/...`
- Keep folder name casing exact (`Products` vs `products`) because Linux hosting is case-sensitive

---

## 4) Free resource delivery setup

Each product can deliver resource after email submit:

- `deliveryMode: 'file'` -> download/open a file URL
- `deliveryMode: 'link'` -> open Figma/Drive/Dropbox/Notion URL
- `deliveryMode: 'email'` -> just capture lead (no auto-open link)

Example:

```ts
{
  slug: 'brand-system-kit',
  // ...other fields
  thumbnail: '/images/Products/brandkit/brandkit-hero.webp',
  gallery: [
    '/images/Products/brandkit/brandkit-hero.webp',
    '/images/Products/brandkit/brandkit-screen-01.webp',
    '/images/Products/brandkit/brandkit-screen-02.webp',
  ],
  deliveryMode: 'link',
  deliveryUrl: 'https://www.figma.com/community/file/xxxxxxxx',
  deliveryLabel: 'Open Figma resource',
}
```

---

## 5) Final checklist before publish

1. `slug` is unique
2. Image paths are valid and case-correct
3. `thumbnail` and `gallery` follow recommended dimensions
4. `deliveryMode` + `deliveryUrl` match your delivery type
5. Run build:

```bash
npm run build
```

If build passes, your product is ready.
