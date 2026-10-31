const fs = require('fs');
const path = require('path');

// 1. Get all known valid routes in the app
const validRoutes = new Set();
// We know all blog posts categories & slugs from .htaccess redirects:
const categoryMap = {
  'brand-to-url-operating-system': 'strategy',
  'why-i-sign-every-receipt-in-28-days': 'strategy',
  'case-for-single-operator-studios': 'strategy',
  'nextjs-framer-motion-gsap-triangulation': 'engineering',
  '48-hour-build-protocol': 'engineering',
  'what-physics-taught-me-about-design-constraints': 'strategy',
  'myths-truths-building-brands-2026-bad-ux-kills-conversion': 'identity',
  'why-i-teach-design-as-a-ladder-iop-digital': 'strategy',
  'saas-design-operating-system': 'product',
  'how-to-design-saas-website-that-converts': 'website',
  'ai-ux-design-patterns': 'product',
  'freelance-designer-vs-agency-for-saas': 'strategy',
  'how-much-does-saas-website-design-cost': 'marketing',
  'ai-product-design-build-saas-products-users-trust': 'product',
  'ai-features-that-dont-feel-gimmicky': 'product',
  'ai-onboarding-design-why-youre-losing-users': 'product',
  'designing-for-uncertainty-ai-ux-patterns': 'product',
  'the-trust-gap-in-ai-products': 'product',
  'brand-identity-for-tech-startups-a-revenue-problem': 'identity',
  'build-a-credible-brand-identity-on-a-pre-seed-budget': 'identity',
  'generic-saas-design-isnt-safe-its-invisible': 'identity',
  'the-visual-consistency-checklist-saas-founders': 'identity',
  'what-is-brand-gravity-why-weak-brand-identity-raises-cpa': 'identity',
  'saas-design-best-practices-a-founders-diagnostic': 'product',
  'audit-your-saas-product-for-cognitive-load': 'product',
  'decision-architecture-how-saas-pages-convert-enterprise-buyers': 'product',
  'saas-product-designer-vs-ui-designer': 'product',
  'how-your-saas-website-affects-fundraising': 'marketing',
  'how-to-design-a-saas-website-that-wins-enterprise-buyers-and-seed-investors': 'marketing',
  'invest-in-your-saas-website-before-paid-ads': 'marketing',
  'the-credibility-gap-why-a-weak-visual-system-costs-you-more': 'identity',
  'what-investors-see-on-your-saas-website': 'marketing',
  'why-your-saas-hero-section-loses-visitors-in-3-seconds': 'website',
  '10-saas-landing-pages-torn-apart': 'website',
  'cognitive-load-is-killing-your-saas-conversions': 'product',
};

// Scan files
function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  let issues = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'out') {
        issues = issues.concat(scanDirectory(fullPath));
      }
    } else if (/\.(ts|tsx|js|mjs)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for /blog/<slug> where slug is not a category
      const blogRegex = /href=[\\"]*\/blog\/([a-z0-9-]+)\/?([a-z0-9-]+)?/g;
      let m;
      while ((m = blogRegex.exec(content)) !== null) {
        const first = m[1];
        const second = m[2];
        const categories = ['identity', 'engineering', 'product', 'strategy', 'marketing', 'website'];
        if (!categories.includes(first) && first) {
          issues.push({
            file: fullPath,
            match: m[0],
            flatSlug: first,
            suggestedCategory: categoryMap[first] || 'UNKNOWN',
          });
        }
      }

      // Check for /design-system/
      if (content.includes('/design-system/')) {
        issues.push({
          file: fullPath,
          match: '/design-system/',
          suggested: '/blog/product/saas-design-operating-system/',
        });
      }
    }
  }
  return issues;
}

const root = path.join(__dirname, '..');
const issues = scanDirectory(path.join(root, 'lib')).concat(
  scanDirectory(path.join(root, 'components')),
  scanDirectory(path.join(root, 'app'))
);

console.log(`Found ${issues.length} link issues in codebase:`);
const uniqueIssues = new Map();
issues.forEach((iss) => {
  const key = `${iss.file} -> ${iss.match || iss.flatSlug}`;
  uniqueIssues.set(key, iss);
});

for (const [key, iss] of uniqueIssues) {
  console.log(`File: ${path.relative(root, iss.file)}`);
  console.log(`  Issue: ${iss.match}`);
  if (iss.suggestedCategory) {
    console.log(`  Fix: /blog/${iss.suggestedCategory}/${iss.flatSlug}/`);
  } else if (iss.suggested) {
    console.log(`  Fix: ${iss.suggested}`);
  }
}
