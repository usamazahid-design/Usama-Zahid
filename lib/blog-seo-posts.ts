import type { BlogDraftPost } from './blog-data';

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

const cover = {
  brand: img('1561070791-2526d30994b5'),
  deskWork: img('1434626881859-194d67b2b86f'),
  code1: img('1555066931-4365d14bab8c'),
  solo: img('1499951360447-b19be8fe80f5'),
  notebook: img('1517842645767-c639042777db'),
} as const;

/** High-priority SEO pillar + cluster posts from the 2026 strategy. */
export const seoPillarPosts: BlogDraftPost[] = [
  {
    slug: 'saas-design-operating-system',
    number: '007',
    title: 'The SaaS Design Operating System',
    subtitle:
      'A complete guide to designing SaaS products that ship: process, AI UX, landing pages, and design systems engineers will actually use.',
    date: '2025.11.29',
    lastUpdated: '2026.08.12',
    readingTime: 16,
    category: 'SYSTEM',
    tags: ['saas', 'product-design', 'ai-ux', 'design-system', 'operating-system'],
    featured: false,
    excerpt:
      'SaaS product design is not a moodboard exercise. It is an operating system: research, flows, trust states, conversion surfaces, and a design system that survives contact with engineering. Here is how I run it end to end.',
    cover: 'grid',
    coverImage: cover.brand,
    content: [
      {
        type: 'p',
        drop: true,
        text: 'A SaaS design operating system is the repeatable sequence that turns a product idea into a shippable interface, strategy, UX, AI trust patterns, conversion surfaces, and a design system engineers will actually implement. If you are looking for a SaaS product designer who treats those layers as one continuous motion, this guide is the map.',
      },
      {
        type: 'p',
        text: 'Most SaaS teams do not fail because they lack taste. They fail because design is treated as a sequence of disconnected deliverables: a discovery deck, a Figma file, a design-system Notion page, and a landing page that was never connected to the product. The seams are where conversion dies and AI features lose trust.',
      },
      { type: 'h2', text: 'What a SaaS design OS actually includes', id: 'what-it-includes' },
      {
        type: 'ol',
        items: [
          '<strong>Positioning and jobs-to-be-done</strong>, who the product is for, what pain it replaces, and what “done” looks like in the first session.',
          '<strong>Information architecture and core flows</strong>, activation, primary loop, settings, and empty/error/loading states for every critical path.',
          '<strong>AI UX patterns</strong>, trust, memory, and recovery when models are wrong or slow. See also <a href="/blog/product/ai-ux-design-patterns/">AI UX design patterns</a>.',
          '<strong>Conversion surfaces</strong>, marketing site, pricing, and in-product upgrade moments designed as one system. See <a href="/blog/website/how-to-design-saas-website-that-converts/">SaaS websites that convert</a>.',
          '<strong>Design system + engineering handoff</strong>, tokens, components, and motion specs that match the stack you will actually ship.',
        ],
      },
      { type: 'h2', text: 'The four-week sequence I use', id: 'four-week-sequence' },
      {
        type: 'h3',
        text: 'Week 1, Diagnose and decide',
        id: 'week-1',
      },
      {
        type: 'p',
        text: 'Start with a written diagnosis: audience, competitive seams, primary job, and the single metric that proves the product works in the first week of use. Lock a one-line scope. Without that lock, every later polish session becomes scope creep dressed as craft.',
      },
      {
        type: 'h3',
        text: 'Week 2, Structure the product',
        id: 'week-2',
      },
      {
        type: 'p',
        text: 'Map the activation path and the weekly loop before you draw a single high-fidelity screen. SaaS retention is a loop problem. If the loop is unclear, UI polish will not save it. Document empty states and failure modes while the happy path is still plastic.',
      },
      {
        type: 'h3',
        text: 'Week 3, Design systems and AI surfaces',
        id: 'week-3',
      },
      {
        type: 'p',
        text: 'Build the component library against the real stack, usually Next.js, Tailwind, and a headless CMS or product API. For AI products, design confidence, citation, undo, and human takeover as first-class UI, not afterthoughts. The <a href="/portfolio/stealth-humanizer-ai-app/">Stealth Humanizer</a> case study is the field example.',
      },
      {
        type: 'h3',
        text: 'Week 4, Conversion and ship',
        id: 'week-4',
      },
      {
        type: 'p',
        text: 'Connect the marketing site to the product language. Pricing pages should reuse product vocabulary. Deploy with analytics, error tracking, and a 30-day iteration window. A SaaS design OS is not finished when Figma is tidy, it is finished when the URL works.',
      },
      { type: 'h2', text: 'SaaS design best practices that still hold in 2026', id: 'best-practices' },
      {
        type: 'ul',
        items: [
          'Design the first successful outcome before the feature catalog.',
          'Treat AI latency and wrong answers as UX problems, not engineering-only problems.',
          'Keep marketing and product voice identical, split brand is split trust.',
          'Ship a small design system early; expand it only when engineers reuse it twice.',
          'Prefer fixed-scope milestones over endless “design exploration” retainers.',
        ],
      },
      {
        type: 'quote',
        text: 'SaaS design is an operating system, not a moodboard. The URL is the proof.',
      },
      { type: 'h2', text: 'Where agencies and freelancers usually break the OS', id: 'failure-modes' },
      {
        type: 'p',
        text: 'Agencies often optimize for presentation volume. Freelancers often optimize for a single craft silo. The operating system fails in both cases when strategy, product, and code cannot share one decision log. That is why I run <a href="/services/">brand, product, and engineering as one sequence</a>, and why the comparison in <a href="/blog/strategy/freelance-designer-vs-agency-for-saas/">freelance vs agency for SaaS</a> matters for founders choosing a model.',
      },
      { type: 'divider' },
      {
        type: 'p',
        text: 'If you need a SaaS product designer who can own the operating system end to end, from positioning to production Next.js, the next step is a short diagnosis, not a 40-slide pitch deck.',
      },
      {
        type: 'callout',
        variant: 'success',
        text: 'Explore <a href="/services/product/">product design</a>, <a href="/brand-to-url/">Brand-to-URL</a>, or <a href="/contact/">book a free diagnosis call</a>. Pricing context: <a href="/blog/marketing/how-much-does-saas-website-design-cost/">what SaaS website design costs in 2026</a>.',
      },
    ],
    faqs: [
      {
        q: 'What is a SaaS design operating system?',
        a: 'It is the repeatable sequence covering positioning, product flows, AI trust patterns, conversion surfaces, and a design system that engineers can implement, treated as one continuous motion rather than disconnected deliverables.',
      },
      {
        q: 'How long does a full SaaS design engagement take?',
        a: 'A focused operating-system engagement typically runs four weeks for a clear MVP surface. Larger products stretch the same checkpoints across eight to twelve weeks without changing the sequence.',
      },
      {
        q: 'Do you include engineering handoff?',
        a: 'Yes. Tokens, components, and motion specs are built against the stack you will ship. Full-system packages also include production Next.js code, see web engineering and AI product design tracks.',
      },
      {
        q: 'Is this only for AI SaaS?',
        a: 'No. The OS applies to any SaaS product. AI products simply require extra trust, memory, and recovery patterns on top of the standard activation and retention loops.',
      },
    ],
  },
  {
    slug: 'how-to-design-saas-website-that-converts',
    number: '008',
    title: 'How to Design a SaaS Website That Converts (Not Just Looks Good)',
    seoTitle: 'How to Design a SaaS Website That Converts',
    subtitle:
      'A practical guide to SaaS landing pages and marketing sites that earn trust before the scroll and turn visitors into trials.',
    date: '2025.12.08',
    lastUpdated: '2026.08.06',
    readingTime: 12,
    category: 'PROCESS',
    tags: ['saas', 'landing-page', 'conversion', 'website-design'],
    excerpt:
      'Pretty SaaS websites are common. Converting ones are rare. Here is the structure, proof stack, and page architecture that turns visitors into trials without dark patterns.',
    cover: 'bars',
    coverImage: cover.deskWork,
    content: [
      {
        type: 'p',
        drop: true,
        text: 'To design a SaaS website that converts, lead with a clear job-to-be-done, prove it with specific outcomes, remove decision friction on pricing, and make the primary CTA inevitable within the first viewport, then keep the product language consistent from homepage to signup.',
      },
      {
        type: 'p',
        text: 'Founders often ask for “SaaS landing page design” when what they need is a conversion system: message, proof, pricing clarity, and a path that matches the product’s activation story. Aesthetics matter. They are not the bottleneck.',
      },
      { type: 'h2', text: 'The first viewport has one job', id: 'first-viewport' },
      {
        type: 'p',
        text: 'Above the fold should answer three questions in under five seconds: What is this? Who is it for? What should I do next? If the brand name is weak, the headline should not try to compensate with jargon. If the CTA is “Learn more,” you already lost the trial.',
      },
      {
        type: 'ul',
        items: [
          'One brand-level signal (name or product mark)',
          'One outcome-led headline',
          'One supporting sentence in plain language',
          'One primary CTA and one quieter secondary path',
          'One dominant visual of the product, not a collage of badges',
        ],
      },
      { type: 'h2', text: 'Proof that SaaS buyers actually trust', id: 'proof' },
      {
        type: 'p',
        text: 'Generic logos and “trusted by innovative teams” do nothing. Specific proof converts: “Cut response time from 19 min to 7.4 min,” named roles, short quotes with context, and screenshots that show the product doing the job. Case studies like <a href="/portfolio/petrozen-erp/">Petrozen ERP</a> and <a href="/portfolio/stealth-humanizer-ai-app/">Stealth Humanizer</a> work because the numbers are owned, not invented.',
      },
      { type: 'h2', text: 'Pricing pages: reduce anxiety, not options', id: 'pricing' },
      {
        type: 'p',
        text: 'Most SaaS pricing pages fail by offering too many plans with unclear differences. Convert by naming the plan by job (“For founding teams shipping weekly”), stating what is included in one glance, and putting the upgrade path inside the product later. For cost ranges when hiring a designer, see <a href="/blog/marketing/how-much-does-saas-website-design-cost/">SaaS website design cost in 2026</a>.',
      },
      { type: 'h2', text: 'Ten conversion patterns that still work', id: 'patterns' },
      {
        type: 'ol',
        items: [
          'Outcome headline before feature list',
          'Product UI as the hero visual (real UI, not abstract 3D)',
          'Objection-handling FAQ near the CTA',
          'Social proof adjacent to the primary button',
          'Comparison table against “status quo,” not only competitors',
          'Single primary CTA color and label sitewide',
          'Sticky CTA on long pages without covering content',
          'Integrations shown as workflow, not logo walls',
          'Security and compliance as a short trust block, not a novel',
          'Post-click continuity: signup page matches homepage language',
        ],
      },
      {
        type: 'quote',
        text: 'If the marketing site and the product speak different languages, conversion is a leak, not a traffic problem.',
      },
      { type: 'h2', text: 'How this connects to product design', id: 'product-link' },
      {
        type: 'p',
        text: 'A converting SaaS website is downstream of a clear product loop. If activation is confusing, paid traffic will amplify the confusion. Pair this guide with the <a href="/blog/product/saas-design-operating-system/">SaaS Design Operating System</a> and <a href="/services/product/">product design</a> when the site and product need to ship as one sequence.',
      },
      { type: 'divider' },
      {
        type: 'callout',
        variant: 'success',
        text: 'Need a conversion-focused SaaS site built and shipped? See <a href="/services/engineering/">web engineering</a>, <a href="/services/">all tracks</a>, or <a href="/contact/">start a project</a>.',
      },
    ],
    faqs: [
      {
        q: 'What makes a SaaS website convert?',
        a: 'Clarity of job-to-be-done, specific proof, pricing that reduces anxiety, a single primary CTA, and language continuity from marketing site into product signup.',
      },
      {
        q: 'Should I hire a SaaS landing page designer or a full product designer?',
        a: 'If the product already converts in-app and you only need a campaign page, a focused landing engagement works. If the site and product are out of sync, hire someone who can run both as one sequence.',
      },
      {
        q: 'How long does a converting SaaS marketing site take?',
        a: 'A focused homepage + pricing + contact/signup path typically ships in two to four weeks when scope is locked. Full brand-to-URL systems take longer because strategy and identity are included.',
      },
      {
        q: 'Do dark patterns help conversion?',
        a: 'They inflate short-term clicks and destroy long-term trust, especially for B2B SaaS with longer sales cycles. Design for informed trials, not trapped ones.',
      },
    ],
  },
  {
    slug: 'ai-ux-design-patterns',
    number: '009',
    title: 'Designing AI Product UX: Trust, Memory, and Recovery States',
    seoTitle: 'AI Product UX Design Patterns',
    subtitle:
      'AI UX design patterns for SaaS products, how to show confidence, remember context, and recover when the model is wrong.',
    date: '2025.12.18',
    lastUpdated: '2026.07.25',
    readingTime: 14,
    category: 'TECHNICAL',
    tags: ['ai-ux', 'product-design', 'patterns', 'saas'],
    excerpt:
      'AI features fail users when trust, memory, and recovery are treated as backend concerns. Here are the interface patterns that keep AI SaaS usable when the model is slow, partial, or wrong.',
    cover: 'rings',
    coverImage: cover.code1,
    content: [
      {
        type: 'p',
        drop: true,
        text: 'AI UX design patterns that work in production share three jobs: show how much to trust an answer, remember the right context across sessions, and give users a clean recovery path when the model is wrong, slow, or incomplete.',
      },
      {
        type: 'p',
        text: 'Pretty chat UIs are not enough. The difference between a demo and a product is how the interface behaves under uncertainty. The <a href="/portfolio/stealth-humanizer-ai-app/">Stealth Humanizer</a> redesign treats confidence, evidence, and recovery as first-class states, which is what turns an AI tool into a product people trust.',
      },
      { type: 'h2', text: 'Pattern 1, Trust and confidence', id: 'trust' },
      {
        type: 'p',
        text: 'Users need to know what the system is sure about. Surface confidence without fake precision: cite sources, show “suggested” vs “applied,” and never auto-commit high-risk actions. Prefer verbs like “Draft reply” over “Send.” Let humans confirm irreversible steps.',
      },
      {
        type: 'ul',
        items: [
          'Label AI content explicitly in the UI',
          'Separate draft, review, and send states',
          'Show citations or evidence when available',
          'Default to reversible actions',
        ],
      },
      { type: 'h2', text: 'Pattern 2, Memory that feels intentional', id: 'memory' },
      {
        type: 'p',
        text: 'Memory is not “the model remembers everything.” Memory is a product decision: what is stored, for how long, visible where, and editable by the user. Give users a memory panel. Let them delete context. Make long-term memory opt-in for sensitive domains like finance or health-adjacent SaaS.',
      },
      { type: 'h2', text: 'Pattern 3, Recovery when the model fails', id: 'recovery' },
      {
        type: 'p',
        text: 'Timeouts, partial answers, and hallucinations are UX events. Design empty, loading, and error states with next actions: retry, edit prompt, switch to manual, escalate to human. Streaming UIs should degrade gracefully, a stalled stream needs a recoverable end state, not an infinite spinner.',
      },
      {
        type: 'quote',
        text: 'If your AI feature has no recovery path, you did not design a product, you designed a demo.',
      },
      { type: 'h2', text: 'Pattern 4, Latency as a designed experience', id: 'latency' },
      {
        type: 'p',
        text: 'Users tolerate waiting when progress is honest. Use staged feedback: acknowledging, gathering, drafting, verifying. Skeleton content beats a blank chat. For long jobs, move work to an async queue with notifications instead of blocking the whole workspace.',
      },
      { type: 'h2', text: 'Pattern 5, Human takeover without shame', id: 'human' },
      {
        type: 'p',
        text: 'The best AI SaaS products make human takeover a first-class control, not a failure badge. Support copilots, ops assistants, and finance tools all need a clean handoff: preserve context, show what the model already tried, and let the human continue without retyping the world.',
      },
      { type: 'h2', text: 'How to implement these in a design system', id: 'system' },
      {
        type: 'p',
        text: 'Encode AI states as components: ConfidenceBadge, CitationList, RecoveryBanner, StreamingStatus, MemoryChip. If they are one-off screens, they will drift. Pair this with the broader <a href="/blog/product/saas-design-operating-system/">SaaS Design Operating System</a> and <a href="/services/product/">product design</a> when you need the full sequence.',
      },
      { type: 'divider' },
      {
        type: 'callout',
        variant: 'success',
        text: 'Building an AI SaaS product? See <a href="/ai-product-design/">AI product design</a>, the <a href="/portfolio/">case studies</a>, or <a href="/contact/">book a diagnosis call</a>.',
      },
    ],
    faqs: [
      {
        q: 'What are the most important AI UX design patterns?',
        a: 'Trust/confidence signaling, intentional memory controls, recovery states for failure and latency, and first-class human takeover. Together they turn a model demo into a usable product.',
      },
      {
        q: 'Should AI answers auto-apply in the product?',
        a: 'Only for low-risk, easily reversible actions. High-risk actions (send, pay, delete, publish) should stay in draft/review until a human confirms.',
      },
      {
        q: 'How do you design for model hallucinations?',
        a: 'Assume they will happen. Require citations where possible, mark uncertainty, provide edit/retry paths, and never present unverified AI output as system-of-record truth.',
      },
      {
        q: 'Can these patterns work for non-chat AI features?',
        a: 'Yes. The same trust, memory, and recovery jobs apply to copilots inside tables, canvases, inboxes, and dashboards, chat is only one surface.',
      },
    ],
  },
  {
    slug: 'freelance-designer-vs-agency-for-saas',
    number: '010',
    title: 'Freelance Designer vs Agency for SaaS: What Actually Works (2026)',
    seoTitle: 'Freelance vs Agency for SaaS: What Works',
    subtitle:
      'An honest comparison for SaaS founders choosing between an independent product designer and a multi-person agency.',
    date: '2025.12.28',
    lastUpdated: '2026.06.30',
    readingTime: 11,
    category: 'ESSAY',
    tags: ['freelance', 'agency', 'saas', 'hiring', 'pricing'],
    excerpt:
      'Freelance designer vs agency for SaaS is not a taste debate, it is a structure debate. Here is when each model wins, where each fails, and how to choose without getting burned.',
    cover: 'arc',
    coverImage: cover.solo,
    content: [
      {
        type: 'p',
        drop: true,
        text: 'Choose a freelance or single-operator designer for SaaS when you need one decision-maker from strategy to ship and a fixed scope under roughly mid-five figures. Choose an agency when you need parallel workstreams, multi-market rollout, or specialized production at a scale one operator cannot honestly cover.',
      },
      {
        type: 'p',
        text: 'Founders searching “freelance designer vs agency for SaaS” usually already feel the pain of handoffs. The wrong hire does not just cost money, it costs months of diluted positioning and a marketing site that does not match the product.',
      },
      { type: 'h2', text: 'Side-by-side comparison', id: 'comparison' },
      {
        type: 'ul',
        items: [
          '<strong>Speed of decisions</strong>, Independent: same-day. Agency: calendar-driven across account, design, and PM.',
          '<strong>Handoff tax</strong>, Independent: near zero if they also ship code. Agency: brand → product → eng seams are common.',
          '<strong>Capacity</strong>, Independent: 1-4 concurrent engagements. Agency: many, with junior execution risk.',
          '<strong>Cost shape</strong>, Independent: fixed scope packages. Agency: retainers and change orders more often.',
          '<strong>Best fit</strong>, Independent: pre-Series A SaaS. Agency: multi-brand, multi-locale, heavy production.',
        ],
      },
      { type: 'h2', text: 'When the independent operator wins', id: 'operator-wins' },
      {
        type: 'p',
        text: 'If your risk is coherence, brand, product, and site saying three different things, hire the model that removes seams. That is the thesis behind <a href="/blog/strategy/case-for-single-operator-studios/">single-operator studios</a> and the <a href="/blog/strategy/brand-to-url-operating-system/">Brand-to-URL operating system</a>. You get one answer, one sequence, one receipt.',
      },
      { type: 'h2', text: 'When the agency wins', id: 'agency-wins' },
      {
        type: 'p',
        text: 'If you need a 4-market brand rollout, a 200-page CMS, motion production, and paid media creative in parallel, an honest independent will refer you. Scale is not vanity, it is a different machine. Paying a solo operator to pretend they are an agency is how both sides get hurt.',
      },
      { type: 'h2', text: 'Cost honesty (not a bait chart)', id: 'cost' },
      {
        type: 'p',
        text: 'Independent SaaS website and product packages commonly land in the low-to-mid five figures for focused scope. Agencies targeting the same companies often start higher and expand with retainers. For a deeper breakdown, read <a href="/blog/marketing/how-much-does-saas-website-design-cost/">how much SaaS website design costs</a>. Price is not the only variable, decision latency often costs more than the invoice.',
      },
      {
        type: 'quote',
        text: 'The question is not who is cheaper. The question is which structure protects the product’s coherence.',
      },
      { type: 'h2', text: 'How to hire without getting burned', id: 'hire' },
      {
        type: 'ol',
        items: [
          'Ask who makes final design decisions, and how many people touch the work.',
          'Require fixed scope and a written exit criterion for each milestone.',
          'Review real URLs and case studies, not only Dribbble shots.',
          'Confirm whether engineering is included or handed off.',
          'Start with a paid diagnosis or audit before a six-figure commitment.',
        ],
      },
      { type: 'divider' },
      {
        type: 'callout',
        variant: 'success',
        text: 'If the single-operator model fits, see <a href="/services/">services</a>, <a href="/portfolio/">portfolio</a>, or <a href="/contact/">start a project</a>.',
      },
    ],
    faqs: [
      {
        q: 'Is a freelance designer better than an agency for SaaS?',
        a: 'It depends on structure. Independents win on decision speed and coherence for early-stage SaaS. Agencies win on parallel capacity and multi-market production. Match the machine to the problem.',
      },
      {
        q: 'What is a single-operator studio?',
        a: 'A designer-developer who runs strategy, identity, product, and code as one continuous sequence, eliminating handoffs between brand, product, and engineering vendors.',
      },
      {
        q: 'When should I not hire a freelancer?',
        a: 'When you need simultaneous workstreams at agency scale, heavy localized production, or specialized teams you cannot replace with one senior generalist.',
      },
      {
        q: 'How do I compare proposals fairly?',
        a: 'Compare decision structure, scope lock, deliverables, and who ships the URL, not only hourly rates or moodboards.',
      },
    ],
  },
  {
    slug: 'how-much-does-saas-website-design-cost',
    number: '011',
    title: 'How Much Does SaaS Website Design Cost in 2026?',
    seoTitle: 'SaaS Website Design Cost in 2026',
    subtitle:
      'An honest pricing breakdown for SaaS founders, landing pages, full marketing sites, and brand-to-URL systems.',
    date: '2026.01.07',
    lastUpdated: '2026.08.12',
    readingTime: 10,
    category: 'FIELD_NOTES',
    tags: ['pricing', 'saas', 'website-design', 'budget'],
    excerpt:
      'SaaS website design cost in 2026 ranges from a few thousand for a focused landing page to mid-five figures for a full brand-to-URL system. Here is what drives the number, and what to refuse.',
    cover: 'dots',
    coverImage: cover.notebook,
    content: [
      {
        type: 'p',
        drop: true,
        text: 'In 2026, SaaS website design typically costs $2,500-$7,500 for a focused landing or small marketing site, roughly $12K-$24K for a full brand-and-site system from an independent senior operator, and $20K-$120K+ when a multi-person agency runs strategy, design, and production in parallel.',
      },
      {
        type: 'p',
        text: 'Those ranges are not universal laws. They are what I see across indie operators and boutique agencies serving early SaaS. Your number moves with scope, proof assets, engineering inclusion, and how many decision-makers can veto the work.',
      },
      { type: 'h2', text: 'What you are actually buying', id: 'what-buying' },
      {
        type: 'ul',
        items: [
          '<strong>Landing page</strong>, message, layout, proof, CTA, basic SEO metadata. Fastest path to testing demand.',
          '<strong>Marketing site</strong>, homepage, product, pricing, about, contact, blog index. Needs IA and consistent system.',
          '<strong>Brand-to-URL system</strong>, positioning, identity, site, and often production code. Highest coherence, highest scope.',
          '<strong>Product + site</strong>, marketing and in-app UX designed together. Best when activation and conversion are both weak.',
        ],
      },
      { type: 'h2', text: 'Price drivers that matter more than fonts', id: 'drivers' },
      {
        type: 'ol',
        items: [
          'Whether strategy is included or assumed',
          'Custom illustration / motion / 3D vs product screenshots',
          'CMS and engineering (design-only vs Next.js ship)',
          'Number of stakeholders who must approve',
          'Timeline compression (48-hour and two-week sprints cost urgency)',
        ],
      },
      { type: 'h2', text: 'Independent operator ranges (this studio)', id: 'operator-ranges' },
      {
        type: 'p',
        text: 'At this studio, published tracks start here: Brand Strategy from $8,000–$12,000 (1–2 weeks), Brand Identity Systems from $12,000–$18,000 (2–3 weeks), Web Engineering from $14,000–$22,000 (2–3 weeks), and Product UI/UX Design from $14,000–$24,000 (3–4 weeks). The full 4-week <a href="/brand-to-url/">Brand-to-URL Sprint</a> is a fixed $24,000 investment covering brand positioning, visual identity, user-centric product UI, and a live Next.js codebase. The point is predictability: you know the deliverables, timeline, and exit before the first invoice. Explore all options on the <a href="/services/">services page</a>.',
      },
      { type: 'h2', text: 'Agency ranges (what founders report)', id: 'agency-ranges' },
      {
        type: 'p',
        text: 'SaaS-focused agencies often quote $20K-$60K for a marketing site rebuild and much more when brand, product, and ongoing retainers stack. Parallel HQ-class studios can exceed $100K for broader product engagements. Higher price can be rational at scale, it is rarely rational for a pre-PMF landing test.',
      },
      {
        type: 'quote',
        text: 'The expensive project is not the one with the higher invoice. It is the one that ships three different stories.',
      },
      { type: 'h2', text: 'How to budget without wasting a quarter', id: 'budget' },
      {
        type: 'ul',
        items: [
          'Fund a diagnosis before a full rebuild',
          'Prefer fixed scope over open retainers for first ship',
          'Budget engineering if you need a URL, not only Figma',
          'Keep decision rights with one founder-level owner',
          'Reuse the system for product UI, do not buy brand twice',
        ],
      },
      {
        type: 'p',
        text: 'If you are still choosing a hiring model, read <a href="/blog/strategy/freelance-designer-vs-agency-for-saas/">freelance vs agency for SaaS</a>. If you need the full design OS, start with the <a href="/blog/product/saas-design-operating-system/">SaaS Design Operating System</a>.',
      },
      { type: 'divider' },
      {
        type: 'callout',
        variant: 'success',
        text: 'Want a fixed-scope quote? <a href="/contact/">Book a diagnosis call</a> or review <a href="/services/">current service tracks</a>.',
      },
    ],
    faqs: [
      {
        q: 'How much does SaaS website design cost in 2026?',
        a: 'Focused landings often fall in the low thousands to mid four figures; full independent brand-to-URL systems commonly sit in the low-to-mid five figures; multi-person agencies frequently start around $20K and climb past $100K for broader scopes.',
      },
      {
        q: 'Why do quotes vary so widely?',
        a: 'Scope, strategy inclusion, custom motion/art, engineering, stakeholder count, and timeline compression drive price more than visual style alone.',
      },
      {
        q: 'Is design-only cheaper than design-and-code?',
        a: 'Up front, yes. Total cost of ownership often flips when a separate eng team reinterprets the file. Design-and-code packages remove that translation tax.',
      },
      {
        q: 'Should early-stage startups hire an agency?',
        a: 'Usually only when they truly need agency-scale parallel production. Most early SaaS teams get better coherence from a senior independent operator on fixed scope.',
      },
    ],
  },
];
