# Case Study Asset Checklist

This checklist tracks the real media assets needed so portfolio and branding case pages feel complete and visually strong.

## Priority 1 (featured first)

### `petrozen-erp` (product case)
- Hook hero image (already present) - verify final export quality (WebP, 2x desktop).
- Research artifacts (interview notes, workflow maps, raw screenshots).
- Design decision sketches (low-fi exploration).
- Mid-fi flow frames.
- Final hi-fi key screens (dashboard, ledger, reconciliation, reports).
- Usability proof assets (before/after and heatmap exports).

### `codestreaks` (branding case)
- Replace all placeholder/dummy image mappings with final exports:
  - lockups
  - palette specimen
  - pattern system
  - use-digital
  - use-signage
  - use-social
- Ensure each visual has matching caption and real alt text.

## Priority 2

### `Techmechka` and `taxdoctor` (branding)
- These entries are marked as under development in copy.
- Replace dummy image references when ready:
  - hero
  - strategy
  - lockups
  - palette
  - pattern
  - use-digital
  - use-signage
  - use-social
- Keep the current in-page "assets updating" notice until replacement is complete.

## Data source audit results

- `lib/portfolio-data.ts` currently contains placeholder image references (`/images/portfolio/placeholders/...`).
- `lib/branding-data.ts` currently maps many figures through `dummyBrandingImages`.
- `lib/branding-data.ts` has "under development" descriptor text on two projects (`Techmechka`, `taxdoctor`).

## Export specs (recommended)

- Format: WebP for raster assets.
- Widths: 1600-2200px depending on slot.
- Quality target: 75-85.
- Keep one consistent naming convention per case folder.
- Always include descriptive alt text per image.
