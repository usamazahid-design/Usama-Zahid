'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  cardType?: 'pricing' | 'process' | 'casestudies' | 'cal';
  showCalBtn?: boolean;
  time: string;
}

const CAL_URL = 'https://cal.com/usama-zahid-haadwj/secret';
const BYNARA_ENDPOINT = 'https://router.bynara.id/v1/chat/completions';
const BYNARA_MODEL = 'laguna-s-2.1';
const BYNARA_KEY = 'sk-nry-IKnZg3P6PIebF9tGDd3LTk1zzF3z7Gqspsp-NfgKoj4';

function getNowTime(): string {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Usama Zahid Official Geometric Studio Logo Mark
 * Exact SVG geometry with brand indigo square
 */
const StudioLogo = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 328 4319 3662"
    aria-hidden="true"
    className={className}
    style={{
      width: size,
      height: Math.round((size * 3662) / 4319),
      display: 'block',
      flexShrink: 0,
    }}
  >
    <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
    <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
    <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
    <rect x="3380" y="3052" width="938" height="938" fill="#4B3FFF" />
  </svg>
);

/**
 * High-Intelligence Studio Knowledge Engine
 * Speaks organically, conversationally, and authoritatively about Usama Zahid's studio,
 * case studies, workflow, pricing, and technical standards.
 */
function queryStudioKnowledge(userQuery: string, history: ChatMessage[] = []): { text: string; cardType?: ChatMessage['cardType']; showCalBtn: boolean } {
  const q = userQuery.toLowerCase().trim();

  // 1. Warm greetings & conversational openers
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ') ||
    q === 'yo' ||
    q === 'salam' ||
    q === 'assalam u alaikum' ||
    q === 'good morning' ||
    q === 'good afternoon' ||
    q === 'good evening'
  ) {
    return {
      text: "Hello! Welcome to Usama Zahid's studio. I'm his AI concierge. You can ask me about our 4-week **Brand-to-URL** builds, view past case studies (like Petrozen ERP or Begum Couture), or discuss project pricing. What kind of venture or product are you currently building?",
      showCalBtn: false,
    };
  }

  if (q.includes('how are you') || q.includes("what's up") || q.includes('how r u') || q.includes('how are things')) {
    return {
      text: "Doing great! The studio is actively designing and engineering upcoming founder cohorts. Are you looking to launch a brand-new venture, redesign an existing SaaS product, or explore our engineering workflow?",
      showCalBtn: false,
    };
  }

  if (q.includes('thank') || q === 'thanks' || q === 'cool' || q === 'ok' || q === 'okay' || q === 'great' || q === 'awesome' || q === 'perfect' || q === 'sounds good') {
    return {
      text: "You're very welcome! If you'd like to dive deeper or review how we can tailor a 4-week sprint for your product, Usama's calendar is always open for a direct 15-minute alignment call.",
      showCalBtn: true,
    };
  }

  // 2. Who is Usama / Bio / Experience / Location
  if (
    q.includes('who are you') ||
    q.includes('who is usama') ||
    q.includes('about usama') ||
    q.includes('background') ||
    q.includes('where are you') ||
    q.includes('where is') ||
    q.includes('location') ||
    q.includes('lahore') ||
    q.includes('pakistan') ||
    q.includes('experience') ||
    q.includes('years') ||
    q.includes('education') ||
    q.includes('comsats')
  ) {
    return {
      text: "**Usama Zahid** is an independent Brand & Product Systems Architect based in Lahore, Pakistan (COMSATS graduate). He brings **6 years of Brand Identity & Systems** and **3 years of SaaS UI/UX & Web Engineering** experience, having shipped **50+ projects for 30+ venture-backed startups** across San Francisco, New York, London, Berlin, and Dubai.",
      showCalBtn: false,
    };
  }

  // 3. Why Usama vs Agency / Zero Handoff Gap
  if (
    q.includes('agency') ||
    q.includes('why usama') ||
    q.includes('why hire') ||
    q.includes('difference') ||
    q.includes('solo') ||
    q.includes('team') ||
    q.includes('freelance') ||
    q.includes('outsource') ||
    q.includes('handoff')
  ) {
    return {
      text: "Traditional agencies separate strategy, design, and engineering across account managers, junior contractors, and outsourced dev teams—causing massive delays and lost vision. **Usama operates as a solo senior principal**: the person you brief is the exact person designing the Figma system and writing the production Next.js code. Zero translation loss, one invoice, and 4-week delivery instead of 4 months.",
      showCalBtn: false,
    };
  }

  // 4. Pricing / Cost / Budget / Rates
  if (
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('cost') ||
    q.includes('how much') ||
    q.includes('rate') ||
    q.includes('fee') ||
    q.includes('budget') ||
    q.includes('hourly') ||
    q.includes('retainer') ||
    q.includes('investment')
  ) {
    return {
      text: "Our flagship engagement is the **Brand-to-URL Sprint at a fixed $24,000 for 4 weeks**—delivering strategy, brand identity, user-centric SaaS UI/UX, and production Next.js code. Modular tracks are also available depending on your exact scope:",
      cardType: 'pricing',
      showCalBtn: true,
    };
  }

  // 5. 4-Week Process / Brand-to-URL / Roadmap
  if (
    q.includes('brand-to-url') ||
    q.includes('brand to url') ||
    q.includes('process') ||
    q.includes('roadmap') ||
    q.includes('timeline') ||
    q.includes('how it work') ||
    q.includes('how does it work') ||
    q.includes('weeks') ||
    q.includes('sprint') ||
    q.includes('method') ||
    q.includes('deliverable')
  ) {
    return {
      text: "**Brand-to-URL** is an intensive 4-week sequence engineered to eliminate the gap between brand perception and complex product engineering:",
      cardType: 'process',
      showCalBtn: true,
    };
  }

  // 6. Case Studies & Portfolio proof
  if (
    q.includes('case') ||
    q.includes('portfolio') ||
    q.includes('work') ||
    q.includes('project') ||
    q.includes('clients') ||
    q.includes('proof') ||
    q.includes('examples')
  ) {
    return {
      text: "Usama has shipped **50+ projects for 30+ venture-backed startups** (pre-seed to Series A). Key production case studies include:",
      cardType: 'casestudies',
      showCalBtn: true,
    };
  }

  // 7. Specific Case Studies
  if (q.includes('petrozen') || q.includes('erp') || q.includes('table') || q.includes('financial') || q.includes('fintech')) {
    return {
      text: "**Petrozen ERP** is a finance-first oil trading ERP platform. Usama designed high-density financial data tables with keyboard shortcuts and inline reconciliation workflows, cutting multi-day invoice reconciliation down to minutes.",
      showCalBtn: true,
    };
  }

  if (q.includes('stealth') || q.includes('humanizer') || q.includes('ai app') || q.includes('trust state')) {
    return {
      text: "**Stealth Humanizer AI** addressed high user churn caused by skepticism over AI rewriting. Usama designed probabilistic highlighting, confidence metrics, and inline tone diffing so users always feel in full control of AI-generated content.",
      showCalBtn: true,
    };
  }

  if (q.includes('begum') || q.includes('bridal') || q.includes('couture') || q.includes('fashion') || q.includes('luxury')) {
    return {
      text: "For **Begum Bridal Couture**, Usama transformed a high-fashion luxury house into a digital flagship with editorial typography and sub-second Next.js page transitions, reducing the custom appointment booking flow from 6 steps to 3.",
      showCalBtn: true,
    };
  }

  if (q.includes('codestreak') || q.includes('devtools') || q.includes('developer tool')) {
    return {
      text: "For **CodeStreaks**, Usama crafted a developer-focused infrastructure identity and modular component system, creating high visual credibility for engineering founders.",
      showCalBtn: true,
    };
  }

  // 8. Tech Stack & Engineering
  if (
    q.includes('stack') ||
    q.includes('tech') ||
    q.includes('next.js') ||
    q.includes('nextjs') ||
    q.includes('react') ||
    q.includes('tailwind') ||
    q.includes('typescript') ||
    q.includes('code') ||
    q.includes('developer') ||
    q.includes('engineering') ||
    q.includes('performance') ||
    q.includes('lighthouse')
  ) {
    return {
      text: "Usama builds with **Next.js 14/15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP**. Every build is architected for sub-second transitions, semantic HTML, comprehensive JSON-LD schemas, and 95+ Core Web Vitals on desktop.",
      showCalBtn: false,
    };
  }

  // 9. Design tools & Figma
  if (q.includes('figma') || q.includes('design system') || q.includes('token') || q.includes('component') || q.includes('wireframe')) {
    return {
      text: "All design work is conducted in **Figma** using scalable atomic design systems—including typography tokens, mathematical color ramps, auto-layout components, and interactive micro-prototypes that mirror production code 1:1.",
      showCalBtn: false,
    };
  }

  // 10. Webflow / WordPress / No-Code comparison
  if (q.includes('webflow') || q.includes('wordpress') || q.includes('framer') || q.includes('nocode') || q.includes('no-code')) {
    return {
      text: "While no-code tools like Webflow or Framer are suitable for basic landing pages, venture-backed startups quickly hit walls with custom product logic, state management, and bespoke security. Usama provides **production Next.js code** that your engineering team can immediately clone, deploy, and scale.",
      showCalBtn: false,
    };
  }

  // 11. Mobile apps / iOS / Android
  if (q.includes('mobile') || q.includes('ios') || q.includes('android') || q.includes('app')) {
    return {
      text: "Usama designs mobile-first responsive SaaS platforms as well as comprehensive native iOS & Android component design systems in Figma. What type of mobile product or workflow are you developing?",
      showCalBtn: false,
    };
  }

  // 12. Availability / Booking / Meeting
  if (
    q.includes('book') ||
    q.includes('meeting') ||
    q.includes('call') ||
    q.includes('schedule') ||
    q.includes('calendar') ||
    q.includes('talk') ||
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('start') ||
    q.includes('availab') ||
    q.includes('hire')
  ) {
    return {
      text: "Usama takes on a limited number of founders per cohort. You can reserve a **15-minute discovery call** directly on his calendar below to evaluate fit and discuss your roadmap:",
      cardType: 'cal',
      showCalBtn: true,
    };
  }

  // 13. Conversational default / General query
  return {
    text: "Usama specializes in **Brand-to-URL: delivering brand strategy, visual identity systems, SaaS UI/UX, and production Next.js code in 4 weeks ($24,000)**. Would you like to review our pricing tracks, examine the 4-week roadmap, inspect past case studies, or schedule a quick 15-minute discovery call?",
    showCalBtn: history.length >= 2,
  };
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-0',
      sender: 'bot',
      text: "Hey! I'm Usama's studio concierge. Ask me anything about our 4-week Brand-to-URL builds, pricing, product design systems, or client case studies—or book a direct discovery call below.",
      showCalBtn: false,
      time: getNowTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCalModal, setShowCalModal] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleQuickTopic = (topic: 'pricing' | 'process' | 'casestudies' | 'cal') => {
    let prompt = '';
    if (topic === 'pricing') prompt = 'What is your pricing and service scope?';
    if (topic === 'process') prompt = 'How does the 4-week Brand-to-URL sprint work?';
    if (topic === 'casestudies') prompt = 'Show me past case studies and clients.';
    if (topic === 'cal') prompt = 'I would like to schedule a 15-minute discovery call.';

    const answer = queryStudioKnowledge(prompt, messages);
    const userMsg: ChatMessage = { id: String(Date.now()), sender: 'user', text: prompt, time: getNowTime() };
    const botMsg: ChatMessage = {
      id: String(Date.now() + 1),
      sender: 'bot',
      text: answer.text,
      cardType: answer.cardType,
      showCalBtn: answer.showCalBtn,
      time: getNowTime(),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    if (topic === 'cal') setShowCalModal(true);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      time: getNowTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const systemPrompt = `You are the executive AI studio concierge for Usama Zahid (https://usamazahid.design), an independent Brand & Product Systems Architect in Lahore, Pakistan.
Background: 6 years Brand Identity & Systems, 3 years SaaS UI/UX and Next.js engineering. 50+ projects shipped for 30+ venture-backed startups (pre-seed to Series A).
Core thesis: Zero handoff gap. The person you brief is the person who designs the Figma system and writes the production Next.js code.
Flagship build: Brand-to-URL (4 weeks, $24,000 fixed). Takes founders from strategy & identity to product UX & production Next.js code.
Modular tracks: Visual Infrastructure ($12K-$18K), Product & AI UX ($14K-$24K), Web Engineering ($14K-$22K), Market Strategy ($8K-$12K).
Case studies: Petrozen ERP (financial data tables), Begum Couture (luxury Next.js commerce), CodeStreaks (infrastructure identity), Stealth Humanizer AI (AI UX trust states), The Laila Majnu (luxury gifting).
Tone: Conversational, sharp, articulate, confident (2-3 sentences max). Talk naturally like an elite design partner.
Directive: If the user asks about booking or scheduling, provide the link ${CAL_URL}.`;

    let reply = '';
    let success = false;

    try {
      const recentTurns = messages.slice(-4).map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.text,
      }));

      const res = await fetch(BYNARA_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BYNARA_KEY}`,
        },
        body: JSON.stringify({
          model: BYNARA_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            ...recentTurns,
            { role: 'user', content: query },
          ],
          max_tokens: 220,
          temperature: 0.5,
        }),
      }).catch(() => null);

      if (res && res.ok) {
        const json = await res.json();
        const content = json.choices?.[0]?.message?.content?.trim();
        if (content) {
          reply = content;
          success = true;
        }
      }
    } catch {}

    if (!success) {
      // Natural conversational fallback engine
      const fallback = queryStudioKnowledge(query, messages);
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: fallback.text,
        cardType: fallback.cardType,
        showCalBtn: fallback.showCalBtn,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
      return;
    }

    const lower = reply.toLowerCase();
    const wantsCal =
      lower.includes('cal.com') ||
      lower.includes('call') ||
      lower.includes('schedule') ||
      lower.includes('discovery') ||
      lower.includes('book');

    const botMsg: ChatMessage = {
      id: String(Date.now() + 1),
      sender: 'bot',
      text: reply,
      showCalBtn: wantsCal,
      time: getNowTime(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Editorial Launcher with Official Studio Logo Mark */}
      {!isOpen && (
        <div className="uz-chat-launcher">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="uz-launcher-capsule"
            aria-label="Open studio concierge"
            aria-expanded={false}
          >
            <span className="uz-launcher-mark" title="Usama Zahid Studio">
              <StudioLogo size={18} />
            </span>
            <span className="uz-launcher-copy">
              <span className="uz-launcher-title">ASK USAMA’S AI</span>
              <span className="uz-launcher-sub">
                <i className="uz-status-dot" /> STUDIO CONCIERGE
              </span>
            </span>
            <span className="uz-launcher-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        </div>
      )}

      {/* Editorial Concierge Panel */}
      {isOpen && (
        <aside className="uz-chat-window" role="dialog" aria-label="Usama Zahid Studio AI Concierge">
          <header className="uz-win-header">
            <div className="uz-win-lead">
              <div className="uz-win-avatar" title="Usama Zahid Official Brand Logo">
                <StudioLogo size={20} />
              </div>
              <div className="uz-win-meta">
                <div className="uz-win-name-row">
                  <h3 className="uz-win-name">USAMA ZAHID</h3>
                  <span className="uz-win-role-pill">CONCIERGE // AI</span>
                </div>
                <p className="uz-win-tagline">Brand &amp; Product Systems Architect · 4-Week Builds</p>
              </div>
            </div>
            <div className="uz-win-actions">
              <button
                type="button"
                onClick={() => setShowCalModal(true)}
                className="uz-win-cal-btn"
                title="Book a 15-minute call"
              >
                CALENDAR <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="uz-win-close-btn"
                aria-label="Close concierge"
              >
                ×
              </button>
            </div>
          </header>

          <div className="uz-win-chips" aria-label="Suggested topics">
            <span className="uz-chips-label">EXPLORE</span>
            <button type="button" className="uz-chip-pill" onClick={() => handleQuickTopic('pricing')}>
              PRICING &amp; SCOPE <span>↗</span>
            </button>
            <button type="button" className="uz-chip-pill" onClick={() => handleQuickTopic('process')}>
              4-WEEK PROCESS <span>↗</span>
            </button>
            <button type="button" className="uz-chip-pill" onClick={() => handleQuickTopic('casestudies')}>
              CASE STUDIES <span>↗</span>
            </button>
          </div>

          <div className="uz-win-body" tabIndex={0}>
            <div className="uz-session-label">
              <span>SESSION / 001</span>
              <span>
                <i className="uz-status-dot" /> STUDIO ONLINE
              </span>
            </div>

            {messages.map((m) => (
              <div key={m.id} className={`uz-msg-row ${m.sender === 'user' ? 'is-user' : 'is-bot'}`}>
                {m.sender === 'bot' && (
                  <div className="uz-msg-index">
                    <span className="uz-msg-mark">
                      <StudioLogo size={14} />
                    </span>
                    <span> / AI</span>
                  </div>
                )}
                <div className={`uz-msg-card ${m.sender === 'user' ? 'user-card' : 'bot-card'}`}>
                  <div className="uz-msg-meta">
                    <span>{m.sender === 'user' ? 'YOU' : 'USAMA ZAHID // CONCIERGE'}</span>
                    <time>{m.time}</time>
                  </div>
                  <div className="uz-msg-text">
                    {m.text.split('\n\n').map((para, idx) => (
                      <p key={idx} className="uz-msg-p">
                        {para.split('**').map((chunk, cIdx) =>
                          cIdx % 2 === 1 ? <strong key={cIdx}>{chunk}</strong> : chunk
                        )}
                      </p>
                    ))}
                  </div>

                  {m.cardType === 'pricing' && (
                    <div className="uz-embedded-card uz-pricing-box">
                      <div className="uz-card-kicker">01 / FLAGSHIP ENGAGEMENT</div>
                      <div className="uz-p-headline">
                        <div>
                          <h4 className="uz-p-title">Brand-to-URL Sprint</h4>
                          <span className="uz-p-time">FOUR WEEKS · CONTINUOUS BUILD</span>
                        </div>
                        <div className="uz-p-price">$24,000</div>
                      </div>
                      <p className="uz-p-desc">
                        Brand strategy, visual identity system, user-centric product UI/UX, and production Next.js code with zero handoff gap.
                      </p>
                      <div className="uz-p-modular">
                        <div className="uz-p-tier">
                          <span>Visual Infrastructure</span>
                          <b>$12K–$18K</b>
                        </div>
                        <div className="uz-p-tier">
                          <span>Product &amp; AI UX</span>
                          <b>$14K–$24K</b>
                        </div>
                        <div className="uz-p-tier">
                          <span>Web Engineering</span>
                          <b>$14K–$22K</b>
                        </div>
                        <div className="uz-p-tier">
                          <span>Market Strategy</span>
                          <b>$8K–$12K</b>
                        </div>
                      </div>
                    </div>
                  )}

                  {m.cardType === 'process' && (
                    <div className="uz-embedded-card uz-process-box">
                      <div className="uz-step-row">
                        <span className="uz-step-badge">W1</span>
                        <div>
                          <b>Strategy &amp; Positioning</b>
                          <p>Category differentiation, ICP diagnosis, narrative architecture.</p>
                        </div>
                      </div>
                      <div className="uz-step-row">
                        <span className="uz-step-badge">W2</span>
                        <div>
                          <b>Brand Identity System</b>
                          <p>Scalable logo family, color tokens, typography scale &amp; Figma library.</p>
                        </div>
                      </div>
                      <div className="uz-step-row">
                        <span className="uz-step-badge">W3</span>
                        <div>
                          <b>Product &amp; AI UX</b>
                          <p>Information architecture, wireframes, component kits &amp; prototype.</p>
                        </div>
                      </div>
                      <div className="uz-step-row">
                        <span className="uz-step-badge">W4</span>
                        <div>
                          <b>Production Web Engineering</b>
                          <p>Next.js App Router, TypeScript, 95+ Lighthouse, deployed to live URL.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {m.cardType === 'casestudies' && (
                    <div className="uz-embedded-card uz-cases-box">
                      <div className="uz-case-card">
                        <div className="uz-case-top">
                          <b>Petrozen ERP</b>
                          <span className="uz-case-tag">PRODUCT &amp; CODE</span>
                        </div>
                        <p>Finance-first oil ERP with high-density data tables; cut invoice reconciliation from days to minutes.</p>
                        <a href="/portfolio/petrozen-erp/" className="uz-case-btn">
                          VIEW CASE STUDY ↗
                        </a>
                      </div>
                      <div className="uz-case-card">
                        <div className="uz-case-top">
                          <b>Begum Bridal Couture</b>
                          <span className="uz-case-tag">BRAND &amp; E-COMMERCE</span>
                        </div>
                        <p>Luxury bridal couture experience; reduced booking flow from 6 steps to 3 with sub-second page loads.</p>
                        <a href="/portfolio/begum-bridal-couture-website/" className="uz-case-btn">
                          VIEW CASE STUDY ↗
                        </a>
                      </div>
                      <div className="uz-case-card">
                        <div className="uz-case-top">
                          <b>CodeStreaks</b>
                          <span className="uz-case-tag">IDENTITY SYSTEM</span>
                        </div>
                        <p>Developer tools branding with brand guidelines and a component library.</p>
                        <a href="/branding/codestreaks/" className="uz-case-btn">
                          VIEW CASE STUDY ↗
                        </a>
                      </div>
                    </div>
                  )}

                  {m.showCalBtn && (
                    <div className="uz-cta-cluster">
                      <button
                        type="button"
                        onClick={() => setShowCalModal(true)}
                        className="uz-primary-booking-btn"
                      >
                        <span>SCHEDULE A 15-MIN DISCOVERY CALL</span>
                        <span>→</span>
                      </button>
                      <a
                        href={CAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uz-secondary-tab-link"
                      >
                        OPEN CAL.COM IN NEW TAB ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="uz-msg-row is-bot">
                <div className="uz-msg-index">
                  <span className="uz-msg-mark">
                    <StudioLogo size={14} />
                  </span>
                  <span> / AI</span>
                </div>
                <div className="uz-msg-card bot-card uz-thinking-card">
                  <span className="uz-thinking-dot" />
                  <span className="uz-thinking-dot" />
                  <span className="uz-thinking-dot" />
                  <span className="uz-thinking-label">THINKING</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className="uz-win-footer" onSubmit={handleSend}>
            <span className="uz-input-prompt" aria-hidden="true">
              &gt;
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire regarding scope, pricing, or 4-week builds..."
              className="uz-text-input"
              disabled={isLoading}
              aria-label="Message to Usama Zahid Studio"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="uz-send-arrow-btn"
              aria-label="Send message"
            >
              SEND <span>↵</span>
            </button>
          </form>

          <div className="uz-win-status">
            <button type="button" onClick={() => setIsOpen(false)}>
              <span>×</span> DISMISS CONCIERGE <kbd>ESC</kbd>
            </button>
            <span className="uz-online">
              <i className="uz-status-dot" /> ONLINE
            </span>
          </div>
        </aside>
      )}

      {/* Seamless Cal.com Booking Modal */}
      {showCalModal && (
        <div
          className="uz-cal-modal-overlay"
          onClick={() => setShowCalModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Calendar Discovery Call Booking"
        >
          <div className="uz-cal-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="uz-cal-modal-bar">
              <div>
                <span className="uz-cal-eyebrow">DISCOVERY CALENDAR</span>
                <h4 className="uz-cal-heading">Schedule 15-Minute Brand &amp; Product Review</h4>
              </div>
              <div className="uz-cal-bar-actions">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uz-cal-ext-pill"
                >
                  Open in Tab ↗
                </a>
                <button
                  type="button"
                  onClick={() => setShowCalModal(false)}
                  className="uz-cal-close-btn"
                  aria-label="Close calendar"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="uz-cal-frame-container">
              <iframe
                src={`${CAL_URL}?embed=1`}
                title="Schedule 15-minute call with Usama Zahid"
                className="uz-cal-frame-element"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic Swiss Brutalism — compact zero-radius interface */}
      <style jsx global>{`
        :root {
          --uz-ink: #040404;
          --uz-paper: #F6F6F6;
          --uz-indigo: #4B3FFF;
          --uz-graphite: #1C1C1C;
          --uz-slate: #4A4A4A;
          --uz-silver: #9A9A9A;
          --uz-line: rgba(4, 4, 4, 0.16);
        }
        .uz-chat-launcher {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9998;
          font-family: var(--sans, Arial, sans-serif);
        }
        .uz-launcher-capsule {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 48px;
          padding: 6px 14px 6px 6px;
          color: var(--uz-paper);
          background: var(--uz-ink);
          border: 1px solid var(--uz-ink);
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .uz-launcher-capsule:hover {
          color: var(--uz-paper);
          background: var(--uz-indigo);
          border-color: var(--uz-indigo);
        }
        .uz-launcher-mark {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          background: #ffffff;
          color: #040404;
          padding: 4px;
          box-sizing: border-box;
        }
        .uz-win-avatar {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          background: #040404;
          color: #ffffff;
          padding: 5px;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .uz-launcher-copy {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .uz-launcher-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .uz-launcher-sub {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 8.5px;
          letter-spacing: 0.1em;
          opacity: 0.72;
        }
        .uz-launcher-arrow {
          margin-left: 6px;
          font-size: 15px;
        }
        .uz-status-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #16A36A;
          flex: 0 0 auto;
        }

        /* Compact, high-density chat window */
        .uz-chat-window {
          position: fixed;
          z-index: 9999;
          right: 24px;
          bottom: 24px;
          width: min(390px, calc(100vw - 32px));
          height: min(550px, calc(100vh - 50px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: var(--uz-ink);
          background: var(--uz-paper);
          border: 1px solid var(--uz-ink);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22);
          font-family: var(--sans, Arial, sans-serif);
          animation: uz-panel-in 0.2s ease both;
        }
        @keyframes uz-panel-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .uz-win-header {
          min-height: 56px;
          box-sizing: border-box;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid var(--uz-line);
          background: var(--uz-paper);
        }
        .uz-win-lead {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .uz-win-meta {
          min-width: 0;
        }
        .uz-win-name-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }
        .uz-win-name {
          margin: 0;
          font-size: 12px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .uz-win-role-pill {
          padding: 2px 5px;
          color: var(--uz-indigo);
          background: rgba(75, 63, 255, 0.09);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .uz-win-tagline {
          margin: 3px 0 0;
          color: var(--uz-slate);
          font-family: var(--serif, Georgia, serif);
          font-size: 10px;
          font-style: italic;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 170px;
        }
        .uz-win-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 0 0 auto;
        }
        .uz-win-cal-btn,
        .uz-win-close-btn {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          min-height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .uz-win-cal-btn {
          padding: 0 9px;
          color: #fff;
          background: var(--uz-indigo);
        }
        .uz-win-cal-btn:hover,
        .uz-primary-booking-btn:hover {
          background: #3328D9;
        }
        .uz-win-close-btn {
          width: 24px;
          color: var(--uz-slate);
          font-size: 18px;
          font-weight: 300;
        }

        .uz-win-chips {
          min-height: 34px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
          overflow-x: auto;
          border-bottom: 1px solid var(--uz-line);
          scrollbar-width: none;
        }
        .uz-win-chips::-webkit-scrollbar {
          display: none;
        }
        .uz-chips-label {
          color: var(--uz-silver);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }
        .uz-chip-pill {
          all: unset;
          cursor: pointer;
          flex: 0 0 auto;
          color: var(--uz-slate);
          font-size: 8.5px;
          font-weight: 800;
          letter-spacing: 0.06em;
          transition: color 0.15s;
        }
        .uz-chip-pill span {
          padding-left: 3px;
          color: var(--uz-indigo);
        }
        .uz-chip-pill:hover {
          color: var(--uz-indigo);
        }

        .uz-win-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 12px 14px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-color: var(--uz-silver) transparent;
          scrollbar-width: thin;
        }
        .uz-session-label {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: var(--uz-silver);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .uz-session-label span:last-child {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--uz-slate);
        }

        .uz-msg-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }
        .uz-msg-row.is-user {
          justify-content: flex-end;
        }
        .uz-msg-index {
          width: 48px;
          padding-top: 5px;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--uz-indigo);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.06em;
        }
        .uz-msg-mark {
          color: var(--uz-ink);
          display: inline-block;
        }
        .uz-msg-index span {
          color: var(--uz-silver);
        }

        .uz-msg-card {
          box-sizing: border-box;
          max-width: calc(100% - 54px);
          min-width: 0;
          padding: 9px 12px 11px;
          font-size: 12px;
          line-height: 1.52;
          overflow-wrap: anywhere;
        }
        .bot-card {
          flex: 1;
          color: var(--uz-ink);
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid var(--uz-line);
          border-left: 2px solid var(--uz-indigo);
        }
        .user-card {
          max-width: 82%;
          color: var(--uz-paper);
          background: var(--uz-graphite);
          border: 1px solid var(--uz-graphite);
        }
        .uz-msg-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 5px;
          color: var(--uz-indigo);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.09em;
        }
        .user-card .uz-msg-meta {
          color: rgba(255, 255, 255, 0.65);
        }
        .uz-msg-meta time {
          color: var(--uz-silver);
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0;
        }
        .uz-msg-p {
          margin: 0 0 6px;
        }
        .uz-msg-p:last-child {
          margin-bottom: 0;
        }
        .uz-msg-p strong {
          font-weight: 800;
        }

        .uz-embedded-card {
          margin-top: 9px;
          padding: 10px;
          background: var(--uz-paper);
          border: 1px solid var(--uz-line);
        }
        .uz-card-kicker {
          margin-bottom: 5px;
          color: var(--uz-indigo);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .uz-p-headline {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 4px;
        }
        .uz-p-title {
          margin: 0;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .uz-p-time {
          display: block;
          color: var(--uz-slate);
          font-size: 7.5px;
          letter-spacing: 0.08em;
          margin-top: 1px;
        }
        .uz-p-price {
          color: var(--uz-indigo);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .uz-p-desc {
          margin: 0 0 8px;
          color: var(--uz-slate);
          font-size: 10.5px;
          line-height: 1.45;
        }
        .uz-p-modular {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
          padding-top: 6px;
          border-top: 1px solid var(--uz-line);
        }
        .uz-p-tier {
          display: flex;
          flex-direction: column;
          gap: 1px;
          font-size: 8.5px;
        }
        .uz-p-tier span {
          color: var(--uz-slate);
        }
        .uz-p-tier b {
          color: var(--uz-ink);
          font-weight: 800;
        }

        .uz-step-row {
          display: flex;
          gap: 8px;
          padding: 5px 0;
          border-bottom: 1px solid var(--uz-line);
          font-size: 10.5px;
        }
        .uz-step-row:last-child {
          border-bottom: none;
        }
        .uz-step-badge {
          display: inline-block;
          width: 20px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          font-size: 8px;
          font-weight: 800;
          color: #fff;
          background: var(--uz-indigo);
          flex: 0 0 auto;
        }
        .uz-step-row b {
          display: block;
          font-size: 10.5px;
          margin-bottom: 1px;
        }
        .uz-step-row p {
          margin: 0;
          color: var(--uz-slate);
          font-size: 9.5px;
          line-height: 1.35;
        }

        .uz-cases-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .uz-case-card {
          padding: 7px;
          background: #ffffff;
          border: 1px solid var(--uz-line);
          font-size: 10.5px;
        }
        .uz-case-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
        }
        .uz-case-top b {
          font-size: 11px;
        }
        .uz-case-tag {
          font-size: 7.5px;
          color: var(--uz-indigo);
          font-weight: 800;
          letter-spacing: 0.05em;
        }
        .uz-case-card p {
          margin: 0 0 5px;
          color: var(--uz-slate);
          font-size: 9.5px;
          line-height: 1.35;
        }
        .uz-case-btn {
          font-size: 8px;
          font-weight: 800;
          color: var(--uz-indigo);
          text-decoration: underline;
        }

        .uz-cta-cluster {
          margin-top: 9px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .uz-primary-booking-btn {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          width: 100%;
          min-height: 34px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          background: var(--uz-indigo);
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          transition: background 0.15s;
        }
        .uz-secondary-tab-link {
          color: var(--uz-slate);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-decoration: underline;
          align-self: flex-start;
        }
        .uz-secondary-tab-link:hover {
          color: var(--uz-indigo);
        }

        .uz-thinking-card {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
        }
        .uz-thinking-dot {
          width: 4px;
          height: 4px;
          background: var(--uz-indigo);
          display: inline-block;
          animation: uz-pulse 1s infinite alternate;
        }
        .uz-thinking-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .uz-thinking-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        .uz-thinking-label {
          margin-left: 6px;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--uz-slate);
        }
        @keyframes uz-pulse {
          from {
            opacity: 0.25;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        .uz-win-footer {
          min-height: 44px;
          box-sizing: border-box;
          padding: 7px 10px 7px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 1px solid var(--uz-line);
          background: #ffffff;
        }
        .uz-input-prompt {
          color: var(--uz-indigo);
          font-size: 12px;
          font-weight: 800;
        }
        .uz-text-input {
          all: unset;
          flex: 1;
          min-width: 0;
          font-size: 11px;
          color: var(--uz-ink);
        }
        .uz-text-input::placeholder {
          color: var(--uz-silver);
          font-size: 10px;
        }
        .uz-send-arrow-btn {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          min-height: 28px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #fff;
          background: var(--uz-indigo);
          transition: background 0.15s;
        }
        .uz-send-arrow-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .uz-win-status {
          min-height: 26px;
          box-sizing: border-box;
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-size: 8px;
          letter-spacing: 0.08em;
          border-top: 1px solid var(--uz-line);
          background: var(--uz-paper);
        }
        .uz-win-status button {
          all: unset;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--uz-slate);
        }
        .uz-win-status kbd {
          padding: 1px 3px;
          font-size: 7px;
          border: 1px solid var(--uz-line);
          background: #fff;
        }
        .uz-online {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #16A36A;
          font-weight: 800;
        }

        /* Cal.com Modal */
        .uz-cal-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(4, 4, 4, 0.75);
          backdrop-filter: blur(4px);
          display: grid;
          place-items: center;
          padding: 20px;
          font-family: var(--sans, Arial, sans-serif);
        }
        .uz-cal-modal-window {
          width: min(840px, 100%);
          height: min(680px, 90vh);
          background: #ffffff;
          border: 1px solid var(--uz-ink);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
        }
        .uz-cal-modal-bar {
          min-height: 54px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid var(--uz-line);
          background: var(--uz-paper);
        }
        .uz-cal-eyebrow {
          display: block;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--uz-indigo);
          margin-bottom: 2px;
        }
        .uz-cal-heading {
          margin: 0;
          font-size: 13px;
          font-weight: 800;
        }
        .uz-cal-bar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .uz-cal-ext-pill {
          padding: 4px 10px;
          font-size: 9px;
          font-weight: 800;
          color: #fff;
          background: var(--uz-indigo);
          text-decoration: none;
        }
        .uz-cal-close-btn {
          all: unset;
          cursor: pointer;
          font-size: 16px;
          color: var(--uz-slate);
          padding: 4px 8px;
        }
        .uz-cal-frame-container {
          flex: 1;
          width: 100%;
          height: 100%;
        }
        .uz-cal-frame-element {
          width: 100%;
          height: 100%;
          border: none;
        }

        @media (max-width: 640px) {
          .uz-chat-window {
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100dvh;
            border: none;
          }
          .uz-chat-launcher {
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>
    </>
  );
}
