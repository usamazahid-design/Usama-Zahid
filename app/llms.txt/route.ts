import { getAllPosts } from '@/lib/blog-utils';
import { getAllServiceSlugs, getServiceBySlug } from '@/lib/services-data';
import { getProjectBySlug, getAllSlugs as getPortfolioSlugs } from '@/lib/portfolio-utils';
import { getAllBrandingCases } from '@/lib/branding-utils';
import { products } from '@/lib/products-data';

export const dynamic = 'force-static';

const BASE = 'https://usamazahid.design';

function link(label: string, path: string, desc: string): string {
  return `- [${label}](${BASE}/${path}/): ${desc}`;
}

export function GET() {
  const now = new Date();
  const lastUpdated = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;

  const lines: string[] = [];
  lines.push('# usamazahid.design');
  lines.push('');
  lines.push(
    '> Independent Brand & Product Designer. Creator of Brand-to-URL: brand strategy, visual identity systems, product UI/UX design, and Next.js web engineering as one unified 4-week delivery sequence for SaaS and tech founders. Based in Lahore, working globally.'
  );
  lines.push('');
  lines.push(`> Last updated: ${lastUpdated}`);
  lines.push(`> Full Knowledge Base & Citations: ${BASE}/llms-full.txt`);
  lines.push('');

  lines.push('## About');
  lines.push(link('About Usama Zahid', 'about', 'Background, method, daily practice, tools, and influences of the single operator.'));
  lines.push(link('CV & Full Record', 'cv', '7+ years, 47 clients, 100+ projects shipped. Complete work history, tech stack, and verified capabilities.'));
  lines.push(link('Brand to URL', 'brand-to-url', 'Brand-to-URL: unified strategy, identity, product UX, and Next.js code from concept to live URL in 4 weeks.'));
  lines.push(link('Hire Usama Zahid', 'hire', 'Recruiter and founder overview: role fit, outcomes, experience timeline, and portfolio proof.'));

  lines.push('');
  lines.push('## Services');
  lines.push(link('Services Overview', 'services', 'Four tracks, Brand Systems ($12K+), Product Design ($14K+), Web Engineering ($14K+), Brand Strategy ($8K+). Three fixed packages per track.'));

  const serviceDescs: Record<string, string> = {
    identity: 'Identity systems as operating layers. Type, color, voice, motion.',
    product: 'End-to-end product design with component libraries and engineering handoff.',
    engineering: 'Next.js, TypeScript, headless CMS. Production code with a strong performance and accessibility baseline.',
    strategy: 'Positioning, messaging, audience mapping, the decisions before design.',
  };
  for (const slug of getAllServiceSlugs()) {
    const svc = getServiceBySlug(slug);
    lines.push(link(svc?.title ?? slug, `services/${slug}`, serviceDescs[slug] ?? svc?.summary ?? ''));
  }
  lines.push(link('Special Offer, Brand-to-URL Sprint', 'special-offer', 'Two spots. $24K fixed. Strategy, identity, product, and code bundled into one sprint.'));

  lines.push('');
  lines.push('## Products');
  lines.push(link('Digital Products Catalog', 'products', 'Five digital products. Instant license, zero handoffs.'));
  for (const product of products) {
    lines.push(link(product.name, `products/${product.slug}`, product.tagline));
  }

  lines.push('');
  lines.push('## Portfolio & Case Studies');
  lines.push(link('Portfolio Index', 'portfolio', 'Deep case studies in AI SaaS, fintech, and brand-to-URL product design.'));

  const projectDescs: Record<string, string> = {
    'petrozen-erp': 'Finance-first ERP, cut invoice-to-reconciliation time from days to minutes.',
    'stealth-humanizer-ai-app': 'AI writing app UX, trust states, confidence, and control for AI output.',
    'the-laila-majnu-gifting': 'Brand identity and web experience for a premium gifting brand.',
    'begum-bridal-couture-website': 'Premium bridal couture brand site and identity system.',
  };
  for (const slug of getPortfolioSlugs()) {
    const p = getProjectBySlug(slug);
    lines.push(link(p?.title ?? slug, `portfolio/${slug}`, projectDescs[slug] ?? p?.excerpt ?? ''));
  }

  lines.push('');
  lines.push('## Branding Case Studies');
  lines.push(link('Branding Index', 'branding', 'Identity-focused case studies in the same terminal OS format.'));
  for (const item of getAllBrandingCases()) {
    lines.push(link(item.title, `branding/${item.slug}`, item.overview));
  }

  lines.push('');
  lines.push('## Blog & Writing');
  lines.push(link('Blog Index', 'blog', 'Essays on SaaS design, single-operator studios, and the craft of shipping.'));
  lines.push(link('Brand Identity Writing', 'blog/identity', 'Identity systems, positioning, and visual clarity essays.'));
  lines.push(link('Product Design Writing', 'blog/product', 'Product UX, AI patterns, and interaction design dispatches.'));
  lines.push(link('Web Engineering Writing', 'blog/engineering', 'Implementation, animation systems, and build process notes.'));
  lines.push(link('Brand Strategy Writing', 'blog/strategy', 'Operating model, delivery strategy, and positioning insights.'));
  lines.push(link('Website Writing', 'blog/website', 'Landing pages, conversion architecture, and website execution.'));
  lines.push(link('Marketing Writing', 'blog/marketing', 'Fundraising, investor signals, and go-to-market messaging.'));

  const posts = getAllPosts();
  for (const post of posts) {
    lines.push(link(post.title, `blog/${post.service}/${post.slug}`, post.excerpt));
  }

  lines.push('');
  lines.push('## Contact');
  lines.push(link('Start a Project', 'contact', 'Book a free 15-minute diagnosis call. Reply within 24 hours.'));
  lines.push(link('Digital Visiting Card', 'card', 'Quick-contact digital visiting card.'));

  lines.push('');
  lines.push('## Legal');
  lines.push(link('Privacy Policy', 'privacy-policy', 'How personal data is collected, used, and protected.'));
  lines.push(link('Terms of Service', 'terms', 'Terms governing the use of the site and services.'));

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
