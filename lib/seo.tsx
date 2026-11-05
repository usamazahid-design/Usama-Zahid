/** SERP-safe length. Google typically truncates around - characters. */
const SITE_URL = 'https://usamazahid.design';

export function seoDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function OrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#organization`,
    '@type': ['Organization', 'ProfessionalService'],
    name: 'Usama Zahid — Brand-to-URL Studio',
    alternateName: ['Usama Zahid Design', 'Brand-to-URL'],
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.png`,
      width: 512,
      height: 512,
    },
    description:
      'Independent Brand & User-Centric Product Design Studio by Usama Zahid in Lahore, Pakistan. Delivering brand identity systems, user-centric product UI/UX, and production Next.js websites in 4 weeks with zero handoff gap.',
    foundingDate: '2019',
    areaServed: ['Worldwide', 'United States', 'United Kingdom', 'United Arab Emirates'],
    priceRange: '$8,000 - $24,000+',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${SITE_URL}/contact/`,
      availableLanguage: ['English', 'Urdu'],
    },
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Usama Zahid',
      url: `${SITE_URL}/about/`,
      jobTitle: 'SaaS Brand & User-Centric Product Designer',
    },
    sameAs: [
      'https://github.com/usamazahid-design',
      'https://x.com/usama2017a',
      'https://www.linkedin.com/in/usamazahid-design/',
      'https://www.instagram.com/usamazahid.design/',
      'https://www.behance.net/usama-zahid-design',
      'https://dribbble.com/usamazahid-design',
      'https://contra.com/usamazahid_design',
      'https://clutch.co/profile/usama-zahid-design',
    ],
    knowsAbout: [
      'Brand Strategy',
      'Visual Identity Systems',
      'User-Centric Product Design',
      'UI/UX Design',
      'Design Systems',
      'Design Tokens',
      'Next.js',
      'TypeScript',
      'Web Engineering',
      'Brand-to-URL',
    ],
  };
}

export function WebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#website`,
    '@type': 'WebSite',
    name: 'Usama Zahid',
    url: `${SITE_URL}/`,
    description:
      'Brand & Product Designer. Brand-to-URL, identity, product, and code as one continuous sequence.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

export function PersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#person`,
    '@type': 'Person',
    name: 'Usama Zahid',
    givenName: 'Usama',
    familyName: 'Zahid',
    jobTitle: 'SaaS Brand & User-Centric Product Designer',
    description:
      'Independent Brand & User-Centric Product Designer. Creator of Brand-to-URL: brand strategy, visual identity systems, user-centric product UI/UX, and production Next.js code from one operator. 6 years in brand identity systems, 3 years in user-centric product UI/UX and Next.js engineering; 50+ projects shipped across 30+ global clients. Based in Lahore, Pakistan, working globally.',
    disambiguatingDescription:
      'Independent SaaS Brand & User-Centric Product Designer based in Lahore, Pakistan (6 years brand identity experience, 3 years user-centric product UI/UX and Next.js engineering). Creator of Brand-to-URL 4-week sprint and designer of Petrozen ERP, CodeStreaks, Stealth Humanizer, Begum Couture, and The Laila Majnu.',
    birthPlace: 'Lahore, Pakistan',
    homeLocation: {
      '@type': 'Place',
      name: 'Lahore, Pakistan',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    nationality: 'Pakistan',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'SaaS Brand & User-Centric Product Designer',
      skills: 'Brand Strategy, Visual Identity Systems, User-Centric Product UI/UX Design, Design Systems, Next.js Web Engineering',
    },
    knowsAbout: [
      'User-Centric Product Design',
      'SaaS Product Design',
      'UI/UX Design',
      'Design Systems',
      'Design Tokens',
      'Brand Strategy',
      'Visual Identity Systems',
      'Next.js',
      'TypeScript',
      'Web Engineering',
      'Brand-to-URL',
    ],
    url: `${SITE_URL}/`,
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
    sameAs: [
      'https://github.com/usamazahid-design',
      'https://x.com/usama2017a',
      'https://www.linkedin.com/in/usamazahid-design/',
      'https://www.instagram.com/usamazahid.design/',
      'https://www.behance.net/usama-zahid-design',
      'https://dribbble.com/usamazahid-design',
      'https://contra.com/usamazahid_design',
      'https://clutch.co/profile/usama-zahid-design',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'COMSATS University Islamabad, Lahore Campus',
    },
  };
}

export function BreadcrumbSchema(items: { name: string; url: string }[]) {
  const last = items[items.length - 1];
  return {
    '@context': 'https://schema.org',
    '@id': last ? `${last.url}#breadcrumb` : undefined,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function ArticleSchema(post: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
  image?: string;
  category?: string;
  tags?: string[];
}) {
  const pageId = `${post.url}#webpage`;
  const fullImage = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${SITE_URL}${post.image}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.headline,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: post.author || 'Usama Zahid',
      url: `${SITE_URL}/about/`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Usama Zahid',
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageId,
    },
    url: post.url,
    ...(fullImage && { image: fullImage }),
    ...(post.category && { articleSection: post.category }),
    ...(post.tags && { keywords: post.tags.join(', ') }),
  };
}

export function FAQPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function ProductSchema(product: {
  name: string;
  description: string;
  url: string;
  price: string;
  image?: string;
  priceCurrency?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
    ...(product.image && { image: product.image }),
    brand: { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.priceCurrency || 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2027-12-31',
    },
    ...(product.category && { category: product.category }),
  };
}

export function ServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  provider: string;
  offers?: { price: string; priceCurrency?: string };
  packages?: { name: string; price: string; priceCurrency?: string }[];
}) {
  const packageOffers = service.packages?.map((pkg) => ({
    '@type': 'Offer',
    name: pkg.name,
    price: pkg.price,
    priceCurrency: pkg.priceCurrency || 'USD',
  }));

  const prices = service.packages?.map((pkg) => Number(pkg.price)) ?? [];
  const aggregate =
    packageOffers && packageOffers.length > 0
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: String(Math.min(...prices)),
            highPrice: String(Math.max(...prices)),
            offerCount: packageOffers.length,
            offers: packageOffers,
          },
        }
      : service.offers
        ? {
            offers: {
              '@type': 'Offer',
              price: service.offers.price,
              priceCurrency: service.offers.priceCurrency || 'USD',
            },
          }
        : {};

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    ...aggregate,
  };
}

export function OfferCatalogSchema(items: {
  name: string;
  description: string;
  url: string;
  price: string;
  priceCurrency?: string;
}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Usama Zahid — Brand & Product Design Services',
    url: 'https://usamazahid.design/services/',
    itemListElement: items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.name,
        description: item.description,
        url: item.url,
        provider: { '@type': 'Organization', name: 'Usama Zahid' },
      },
      price: item.price,
      priceCurrency: item.priceCurrency || 'USD',
    })),
  };
}

export function SoftwareApplicationSchema(app: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  featureList?: string[];
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: app.applicationCategory || 'DesignApplication',
    operatingSystem: app.operatingSystem || 'All (Web Browser)',
    browserRequirements: 'Requires HTML5 Canvas and JavaScript',
    ...(app.image && { image: app.image.startsWith('http') ? app.image : `${SITE_URL}${app.image}` }),
    ...(app.featureList && { featureList: app.featureList }),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    creator: {
      '@id': `${SITE_URL}/#person`,
    },
  };
}

export function CreativeWorkSchema(project: {
  name: string;
  description: string;
  url: string;
  author: string;
  image?: string;
  dateCreated?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    url: project.url,
    ...(project.image && { image: project.image }),
    ...(project.dateCreated && { dateCreated: project.dateCreated }),
    about: project.keywords?.[0],
    ...(project.keywords && { keywords: project.keywords.join(', ') }),
    creator: {
      '@id': `${SITE_URL}/#person`,
    },
  };
}

export function WebPageSchema(page: { name: string; url: string; description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@id': `${page.url}#webpage`,
    '@type': 'WebPage',
    name: page.name,
    url: page.url,
    ...(page.description ? { description: page.description } : {}),
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escape characters that can break out of script context while keeping valid raw JSON.
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
