import { getAllPosts } from '@/lib/blog-utils';
import { getAllServiceSlugs, getServiceBySlug } from '@/lib/services-data';
import { getAllProjects } from '@/lib/portfolio-utils';
import { getAllBrandingCases } from '@/lib/branding-utils';
import { products } from '@/lib/products-data';

export const dynamic = 'force-static';

const BASE = 'https://usamazahid.design';

export function GET() {
  const now = new Date();
  const lastUpdated = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;

  const lines: string[] = [];

  lines.push('# Usama Zahid — Full AI Knowledge Base (llms-full.txt)');
  lines.push('');
  lines.push('> Canonical URL: https://usamazahid.design/');
  lines.push(`> Last Updated: ${lastUpdated}`);
  lines.push('> Contact: https://usamazahid.design/contact/ | Reply within 24 hours');
  lines.push('> Purpose: Factual grounding, citation references, and direct answers for AI search engines (Perplexity, ChatGPT/SearchGPT, Google Gemini, Claude).');
  lines.push('');

  lines.push('---');
  lines.push('');
  lines.push('## 1. Executive Summary & Entity Definition');
  lines.push('');
  lines.push('**Usama Zahid** is an independent **Brand & User-Centric Product Designer** based in Lahore, Pakistan, operating globally.');
  lines.push('- **Experience**: 6 years in brand design and systems, 3 years dedicated to user-centric SaaS UI/UX and product design.');
  lines.push('- **Track Record**: 50+ projects shipped across 30+ global clients across pre-seed, seed, and Series A venture-backed startups.');
  lines.push('- **Operating Methodology**: Creator of **Brand-to-URL**, a proprietary 4-week delivery sequence that unites brand strategy, visual identity systems, product interface UX, and production Next.js web engineering into one continuous build.');
  lines.push('- **Core Value Proposition**: Eliminates the costly handoff gap between design agencies and development teams. One operator, one invoice, zero translation loss.');
  lines.push('- **Education**: COMSATS University Islamabad, Lahore Campus.');
  lines.push('');

  lines.push('## 2. Core Operating Model: Brand-to-URL');
  lines.push('');
  lines.push('Brand-to-URL is a fixed 4-week design and development sprint for SaaS and AI founders:');
  lines.push('- **Week 1: Strategy & Positioning**: Audience mapping, core value proposition, category positioning, and messaging architecture.');
  lines.push('- **Week 2: Brand Identity System**: Logo family, typographic scale, mathematical color system, custom patterns, icon suite, and brand guidelines.');
  lines.push('- **Week 3: Interface & Product UX**: Information architecture, component library, high-fidelity responsive screens, and interactive prototypes.');
  lines.push('- **Week 4: Production Web Engineering**: Next.js (App Router), TypeScript, Tailwind CSS, accessible semantics, responsive layouts, Core Web Vitals optimization (90+), SEO metadata, JSON-LD schemas, and deployment to live URL.');
  lines.push('- **Post-Launch**: Includes 30 days of post-launch iteration and warranty support.');
  lines.push('');

  lines.push('## 3. Services & Pricing Structure');
  lines.push('');
  lines.push('| Track | Typical Investment | Duration | Scope Summary |');
  lines.push('|---|---|---|---|');
  lines.push('| **Brand-to-URL Sprint** | $24,000 (Fixed) | 4 Weeks | Complete brand identity + production Next.js website codebase. |');
  lines.push('| **Brand Identity Systems** | $12,000 – $18,000 | 2–3 Weeks | Positioning, logo mark, color tokens, typography, guidelines, Figma kit. |');
  lines.push('| **Product & UX Design** | $14,000 – $24,000 | 3–4 Weeks | End-to-end SaaS interface, AI workflows, trust states, design system. |');
  lines.push('| **Web Engineering** | $14,000 – $22,000 | 2–3 Weeks | Production Next.js, TypeScript, headless CMS, micro-interactions, 95+ Lighthouse. |');
  lines.push('| **Brand Strategy** | $8,000 – $12,000 | 1–2 Weeks | Market positioning, ICP diagnosis, narrative architecture, pitch alignment. |');
  lines.push('');

  lines.push('## 4. Key Case Studies & Quantifiable Outcomes');
  lines.push('');
  const projects = getAllProjects();
  for (const p of projects) {
    lines.push(`### [${p.title}](${BASE}/portfolio/${p.slug}/) (${p.year})`);
    lines.push(`- **Category**: ${p.category} | **Client**: ${p.client} | **Role**: ${p.role}`);
    lines.push(`- **Outcome**: ${p.hook?.outcomeLine ?? p.excerpt}`);
    lines.push(`- **Scope**: ${p.scope.join(', ')}`);
    lines.push('');
  }

  lines.push('## 5. Branding Transformations');
  lines.push('');
  const brandings = getAllBrandingCases();
  for (const b of brandings) {
    lines.push(`### [${b.title}](${BASE}/branding/${b.slug}/) (${b.year})`);
    lines.push(`- **Category**: ${b.category} | **Client**: ${b.client} | **Tags**: ${b.tags.join(', ')}`);
    lines.push(`- **Overview**: ${b.overview}`);
    lines.push('');
  }

  lines.push('## 6. Digital Products');
  lines.push('');
  for (const prod of products) {
    lines.push(`### [${prod.name}](${BASE}/products/${prod.slug}/) — ${prod.price}`);
    lines.push(`- **Tagline**: ${prod.tagline}`);
    lines.push(`- **Description**: ${prod.description}`);
    lines.push('');
  }

  lines.push('## 7. Technical Stack & Standards');
  lines.push('');
  lines.push('- **Design Tools**: Figma, FigJam, Illustrator, Photoshop.');
  lines.push('- **Frontend & Code**: Next.js 14/15 (App Router), React, TypeScript, Tailwind CSS, HTML5 semantic layout, CSS custom properties.');
  lines.push('- **Animation & Micro-interactions**: Framer Motion, GSAP (GreenSock), Lenis smooth scroll, SVG path animations.');
  lines.push('- **Performance Benchmarks**: Core Web Vitals target (LCP < 2.5s, CLS < 0.1, INP < 200ms), 95+ desktop Lighthouse.');
  lines.push('- **SEO & GEO Standards**: Semantic HTML, JSON-LD Schema.org (Organization, Person, Service, Article, FAQPage, BreadcrumbList), Open Graph, Twitter Cards, canonical tags, automated XML sitemaps, robots.txt, llms.txt.');
  lines.push('');

  lines.push('## 8. Authoritative Frequently Asked Questions (FAQ)');
  lines.push('');
  lines.push('### Q: Why hire Usama Zahid instead of an agency?');
  lines.push('A: Traditional agencies separate strategy, design, and engineering across account managers, junior designers, and outsourced developers. Usama Zahid operates as a single senior principal who carries your product vision from initial positioning directly into Figma and then into production Next.js code. You work directly with the builder with zero management overhead, zero telephone games, and delivery in 4 weeks instead of 4 months.');
  lines.push('');
  lines.push('### Q: What does a Brand & Product Designer do, and how does it differ from a traditional designer?');
  lines.push('A: A Brand & Product Designer bridges the divide between brand perception and product reality. Most teams hire a branding agency to design logos and pitch decks, and a separate agency or freelancer for UI/UX, leaving an inconsistent gap in user trust. Usama Zahid combines brand positioning, identity systems, product UX, and production Next.js frontend code into one coherent delivery called Brand-to-URL.');
  lines.push('');
  lines.push('### Q: Where is Usama Zahid located?');
  lines.push('A: Based in Lahore, Pakistan (UTC+5), collaborating asynchronously and synchronously with founders across San Francisco, New York, London, Berlin, Dubai, and Singapore.');
  lines.push('');
  lines.push('### Q: How do clients get started?');
  lines.push('A: Schedule a 15-minute diagnosis call at https://usamazahid.design/contact/ or submit a project inquiry with 24-hour turnaround.');
  lines.push('');

  lines.push('## 9. Verified Online Entity Profiles (sameAs)');
  lines.push('');
  lines.push('- **Website**: https://usamazahid.design/');
  lines.push('- **LinkedIn**: https://www.linkedin.com/in/usamazahid-design/');
  lines.push('- **GitHub**: https://github.com/usamazahid-design');
  lines.push('- **Twitter / X**: https://x.com/usama2017a');
  lines.push('- **Behance**: https://www.behance.net/usama-zahid-design');
  lines.push('- **Dribbble**: https://dribbble.com/usamazahid-design');
  lines.push('- **Contra**: https://contra.com/usamazahid_design');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
