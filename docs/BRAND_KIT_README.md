# Brand Kit Generator (/brand-kit/)

A designer-quality, 100% client-side Brand Guidelines and Asset Kit Generator integrated into `usamazahid.design`.

## Features
1. **Logo Scalability Test (Score /10)** *(First Tab)*:
   - 7 weighted Canvas heuristic checks (Small-size legibility 16–64px, fine-detail erosion, color complexity, 1-color silhouette survival, surface contrast, aspect ratio, source vector quality).
   - Animated score ring, size ladder preview, favicon tab mock, iOS squircle mock, issues list, and verdict.
   - Includes 3 built-in benchmark logos (*Apex Architecture*, *St. Claire Apothecary*, *PulseFlow AI*) for instant one-click testing.
2. **Color Architecture**:
   - Client-side MMCQ/ColorThief quantizer extracts Primary, Secondary, Accent, Neutral Dark, and Neutral Light.
   - Tints and shades (5 steps), HEX, RGB, HSL, and CMYK for print.
   - Real-time WCAG 2.1 AA/AAA contrast checks against light and dark surfaces.
3. **Typography System**:
   - 12 curated Google Font pairings with mood matching.
   - Live type scale ladder (Display, H1, H2, H3, Body, Caption) with live sample copy.
4. **Logo Usage Guidelines**:
   - Exclusion zone blueprint diagram with 'X' clearance rule (X = 25% of mark height).
   - Minimum reproduction sizes (Digital: 24px/120px; Print: 8mm/30mm).
   - Approved background canvases and prohibited misuses (stretch, rotate, recolor, busy background).
5. **Canvas Mockups (6 Templates)**:
   - Composites mark onto business card, letterhead, tote bag, ceramic mug, signage, and social post with multiply blending.
   - Single-click 1200x900px PNG downloads.
6. **Interactive Business Card Studio**:
   - Front and back canvas studio with editable typography, drag & scale logo mark, and palette swatches.
   - 300 DPI print-ready PNG export (1050x600 px).
7. **Complete Export Package**:
   - Multi-page vector PDF manual generated client-side via `jsPDF`.
   - Full `.ZIP` package generated client-side via `JSZip` containing guidelines PDF, monochrome logos, color JSON, 6 mockup PNGs, and the scalability audit report.
8. **Secure Serverless AI Layer (Text-Only)**:
   - Zero remote uploads: customer logos never leave the browser.
   - Secure proxy script provided for Cloudflare Worker (`serverless/cloudflare-worker.js`) or Hostinger PHP (`serverless/hostinger-proxy.php`).
   - Resilient: if AI is offline or unconfigured, the tool immediately falls back to rich rule-based presets with zero error interruptions.

---

## Serverless Proxy Setup & Deployment

### Option A: Cloudflare Worker (Recommended)
1. In Cloudflare Dashboard, go to **Workers & Pages** -> **Create Application**.
2. Paste the code from `serverless/cloudflare-worker.js`.
3. Set Environment Variables:
   - `AI_BASE_URL`: `https://api.openai.com/v1` (or Gemini OpenAI-compatible endpoint)
   - `AI_API_KEY`: `sk-...`
   - `AI_MODEL`: `gpt-4o-mini`
4. Deploy the worker and set `NEXT_PUBLIC_BRAND_AI_ENDPOINT` in your `.env`:
   ```bash
   NEXT_PUBLIC_BRAND_AI_ENDPOINT=https://your-worker-name.subdomain.workers.dev
   ```

### Option B: Hostinger LiteSpeed (PHP)
1. Upload `serverless/hostinger-proxy.php` to your Hostinger `public_html/api/brand-ai.php`.
2. Add your `AI_API_KEY` to Hostinger's environment variables or `.htaccess`:
   ```apache
   SetEnv AI_API_KEY "sk-..."
   SetEnv AI_MODEL "gpt-4o-mini"
   ```
3. Set `NEXT_PUBLIC_BRAND_AI_ENDPOINT=https://usamazahid.design/api/brand-ai.php` in your environment.
