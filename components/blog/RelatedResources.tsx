import Link from 'next/link';
import { BlogPost } from '@/lib/blog-data';

interface Resource {
  href: string;
  label: string;
  kind: 'service' | 'case-study' | 'page';
  desc: string;
}

const ALL_RESOURCES: Resource[] = [
  { href: '/services/identity/', label: 'Brand Identity', kind: 'service', desc: 'Positioning, logo system, colour, type, custom pattern, and 38-slide guidelines.' },
  { href: '/services/product/', label: 'Product & UX Design', kind: 'service', desc: 'Friction audit, redesigned flows, web and mobile interfaces, and a component design system.' },
  { href: '/services/engineering/', label: 'Production-Ready Website', kind: 'service', desc: 'Next.js, TypeScript, responsive layouts, component kit, and production code built to ship.' },
  { href: '/services/strategy/', label: 'Launch Assets', kind: 'service', desc: 'Launch plans, social media templates, print collateral, and reusable brand files.' },
  { href: '/brand-to-url/', label: 'Brand-to-URL', kind: 'page', desc: 'Brand identity and a production-ready website, designed and built together in four weeks.' },
  { href: '/portfolio/stealth-humanizer-ai-app/', label: 'Stealth Humanizer app', kind: 'case-study', desc: 'Writing app UX, trust states, confidence, and control for user workflows.' },
  { href: '/portfolio/petrozen-erp/', label: 'Petrozen ERP', kind: 'case-study', desc: 'A finance-first ERP that cut invoice-to-reconciliation time from days to minutes.' },
  { href: '/portfolio/the-laila-majnu-gifting/', label: 'The Laila Majnu', kind: 'case-study', desc: 'Brand identity and web experience for a premium gifting brand.' },
  { href: '/portfolio/begum-bridal-couture-website/', label: 'Begum Bridal Couture', kind: 'case-study', desc: 'A luxury bridal couture brand site and identity system.' },
  { href: '/portfolio/', label: 'All Case Studies', kind: 'page', desc: 'Selected case studies across brand identity, web engineering, and product UX.' },
  { href: '/services/', label: 'Services Overview', kind: 'page', desc: 'Four ways to work together, from brand identity to a live URL.' },
  { href: '/products/', label: 'Digital Products', kind: 'page', desc: 'Ready-to-use design systems and templates. Instant license, zero handoffs.' },
];

function pick(post: BlogPost): Resource[] {
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  const cat = post.category.toLowerCase();
  const wants = (keys: string[]) => keys.some((k) => tags.has(k) || cat.includes(k));

  const groups: Resource[][] = [];

  if (wants(['ai-ux', 'ai-product-design', 'trust', 'uncertainty', 'onboarding', 'ai', 'product-design'])) {
    groups.push([
      ALL_RESOURCES[3], // strategy
      ALL_RESOURCES[4], // ai-product-design
      ALL_RESOURCES[5], // stealth
      ALL_RESOURCES[6], // petrozen
    ]);
  }
  if (wants(['brand', 'identity', 'positioning', 'credibility', 'cpa', 'visual', 'gravity'])) {
    groups.push([
      ALL_RESOURCES[0], // identity
      ALL_RESOURCES[3], // strategy
      ALL_RESOURCES[7], // laila majnu
      ALL_RESOURCES[8], // begum
    ]);
  }
  if (wants(['operator', 'studio', 'system', 'method', 'delivery', 'process'])) {
    groups.push([ALL_RESOURCES[10], ALL_RESOURCES[9]]);
  }
  if (wants(['nextjs', 'framer-motion', 'gsap', 'animation', 'performance', 'technical'])) {
    groups.push([ALL_RESOURCES[2], ALL_RESOURCES[1]]);
  }
  if (wants(['design-system', 'template', 'component', 'figma', 'system'])) {
    groups.push([ALL_RESOURCES[11], ALL_RESOURCES[2]]);
  }
  if (wants(['conversion', 'landing', 'website', 'saas', 'seo', 'signals', 'investor', 'fundraising'])) {
    groups.push([ALL_RESOURCES[1], ALL_RESOURCES[2], ALL_RESOURCES[0]]);
  }

  if (!groups.length) {
    groups.push([ALL_RESOURCES[10], ALL_RESOURCES[9], ALL_RESOURCES[4]]);
  }

  const seen = new Set<string>();
  const out: Resource[] = [];
  for (const g of groups) {
    for (const r of g) {
      if (!seen.has(r.href)) {
        seen.add(r.href);
        out.push(r);
      }
    }
  }
  return out.slice(0, 4);
}

export default function RelatedResources({ post }: { post: BlogPost }) {
  const resources = pick(post);
  if (!resources.length) return null;

  return (
    <section
      className="relative w-full bg-uz-black border-t border-uz-graphite"
      style={{ padding: '100px 0' }}
    >
      <div className="edge-marker tl" style={{ position: 'absolute' }} />
      <div className="edge-marker tr" style={{ position: 'absolute' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-4">
              [ KEEP_GOING ]
            </div>
            <h2 className="font-display text-uz-white text-[clamp(28px,4vw,44px)] tracking-[-0.04em] leading-[0.95] mb-4">
              Apply this
              <br />
              <span className="text-uz-indigo">to a product.</span>
            </h2>
            <p className="text-uz-silver text-[15px] leading-[1.7] max-w-xs">
              This post maps to the real work, the services and shipped case studies that put these ideas into production.
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-uz-graphite">
              {resources.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  data-cursor="hover"
                  data-cursor-text="VIEW"
                  className="group relative bg-uz-black p-7 md:p-8 hover:bg-uz-graphite transition-colors duration-500"
                >
                  <div className="font-mono text-[9px] text-uz-indigo tracking-[0.3em] uppercase mb-5">
                    [ {r.kind === 'service' ? 'SERVICE' : r.kind === 'case-study' ? 'CASE_STUDY' : 'GUIDE'} ]
                  </div>
                  <h3 className="font-display text-uz-white text-[clamp(20px,2vw,26px)] tracking-[-0.03em] leading-[1.05] mb-3 group-hover:text-uz-indigo transition-colors duration-500">
                    {r.label}
                  </h3>
                  <p className="text-uz-silver text-[14px] leading-[1.6] mb-6">{r.desc}</p>
                  <div className="pt-5 border-t border-uz-graphite flex items-center justify-between">
                    <span className="font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
                      Explore
                    </span>
                    <span className="font-mono text-[14px] text-uz-indigo transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
