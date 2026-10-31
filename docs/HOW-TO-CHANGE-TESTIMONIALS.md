# How to Change Testimonials

The homepage testimonials block is **not** data-driven like portfolio or branding.
Quotes live in a hardcoded array inside the component. You edit that array, save,
and the homepage updates.

**File to edit:** `components/Testimonials.tsx`
**Shown on:** homepage (`#testimonials`)

---

## 1. Where the quotes live

Open `components/Testimonials.tsx`. The array is at the top of the file:

```ts
const testimonials = [
  {
    quote: 'Usama rebuilt our brand and our product surface in three weeks. …',
    name: 'Ahmad R.',
    role: 'Founder',
    company: 'Petrozen',
    metric: '-58% ERR',
  },
  // … three more objects
];
```

Each item has five fields. All are required:

| Field | Example | Notes |
| ----- | ------- | ----- |
| `quote` | `'The output looked like a top-tier studio.'` | Displayed in quotation marks. Keep it one or two sentences. |
| `name` | `'Ahmad R.'` | Shown in uppercase on the card. Use a last initial if they prefer privacy. |
| `role` | `'Founder'` | Job title |
| `company` | `'Petrozen'` | Company or product name |
| `metric` | `'-58% ERR'` | Short outcome chip. Keep it compact (`+127% BRAND`, `98 SCORE`). |

---

## 2. Which quote goes where

The layout is **index-based**. It does not loop the whole array. Changing order
in the array changes which slot each quote occupies:

| Array index | Slot on the page | Label | Size |
| ----------- | ---------------- | ----- | ---- |
| `[0]` | Large featured quote (left, row 1) | T.01 | Biggest type |
| `[1]` | Top of the right stack | T.02 | Compact |
| `[2]` | Bottom of the right stack | T.03 | Compact |
| `[3]` | Full-width quote (row 2) | T.04 | Large, full width |

Put the strongest quote at `[0]`. Put the second-strongest at `[3]`. The two
shorter quotes go in `[1]` and `[2]`.

---

## 3. Change an existing quote

1. Open `components/Testimonials.tsx`.
2. Find the object you want to update.
3. Edit `quote`, `name`, `role`, `company`, and/or `metric`.
4. Keep the surrounding commas and quotes intact.
5. Save. Refresh `http://localhost:3000/#testimonials`.

Example — swap only the featured quote:

```ts
{
  quote:
    'Usama shipped the identity and the product shell in the same sprint. We launched on the original date.',
  name: 'Amina S.',
  role: 'Founder',
  company: 'Northbound',
  metric: '+40% RECALL',
},
```

---

## 4. Reorder quotes

Cut and paste whole objects inside the array. The first object is always T.01,
the last is always T.04. No JSX changes needed.

---

## 5. Keep four quotes

The page is built for **exactly four** testimonials.

- A fifth object in the array **will not appear**. The component never reads
  past index `[3]`.
- Removing one object will break the layout (undefined quote / crash).

If you need a different count, you must also update:

1. The JSX slots (`testimonials[0]` … `testimonials[3]`).
2. The hardcoded `04` next to `VERIFIED_COUNT` in the section header.

Until you do that, replace quotes in place rather than adding or deleting items.

---

## 6. Copy notes

- Names are published on the live site. Confirm consent before swapping in a
  new person.
- Metrics should match the related case study (portfolio or branding), not a
  deck claim.
- Quotes that are too long will wrap awkwardly in T.02 / T.03. Keep those two
  under ~25 words.
- T.01 and T.04 can run a little longer because they use display type.
