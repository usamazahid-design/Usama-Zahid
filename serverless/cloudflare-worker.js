/**
 * Cloudflare Worker: Brand Kit AI Proxy
 *
 * Secure serverless gateway that protects your AI API key, enforces strict CORS locked
 * to your domain, implements IP-based rate limiting, sanitizes text inputs, and guarantees
 * strict JSON responses for the Brand Kit Generator.
 *
 * ENVIRONMENT VARIABLES (configured in Cloudflare Dashboard or wrangler.toml):
 * - AI_BASE_URL: e.g. "https://api.openai.com/v1" or "https://generativelanguage.googleapis.com/v1beta/openai"
 * - AI_API_KEY: Your private AI provider API key
 * - AI_MODEL: e.g. "gpt-4o-mini" or "gemini-1.5-flash"
 */

// Simple in-memory rate limiting map (IP -> timestamps array)
const ipRequestMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Allowed origins
const ALLOWED_ORIGINS = [
  'https://usamazahid.design',
  'http://localhost:3000',
  'http://localhost:3001',
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);
    const corsHeaders = {
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    // 1. Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Rate Limiting by IP
    const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const timestamps = (ipRequestMap.get(clientIp) || []).filter((t) => now - t < RATE_LIMIT_WINDOW);

    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait a minute before retrying.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    timestamps.push(now);
    ipRequestMap.set(clientIp, timestamps);

    try {
      // 3. Input Validation & Sanitization (Strictly text-only, no images)
      const body = await request.json();
      const brandName = String(body.brandName || '').slice(0, 60).trim();
      const industry = String(body.industry || 'General').slice(0, 60).trim();
      const colors = Array.isArray(body.colors)
        ? body.colors.slice(0, 8).map((c) => String(c).slice(0, 10))
        : [];
      const scalabilityScore = Number(body.scalabilityScore || 8.0);

      if (!brandName) {
        return new Response(JSON.stringify({ error: 'Brand name is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 4. Provider Configuration
      const baseUrl = env.AI_BASE_URL || 'https://api.openai.com/v1';
      const apiKey = env.AI_API_KEY;
      const model = env.AI_MODEL || 'gpt-4o-mini';

      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: 'AI proxy not configured with AI_API_KEY on server.' }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // 5. Construct Strict JSON Prompt
      const systemPrompt = `You are an elite brand strategist and creative director at a high-end design firm.
Generate a concise, professional brand identity voice and copy system for the given brand.
Return ONLY valid, parseable JSON conforming strictly to this TypeScript schema:
{
  "voiceWords": string[], // 5 evocative brand adjectives (e.g. ["Precise", "Sculptural", "Systematic"])
  "brandStory": string,  // 2-3 sentences explaining origin and brand posture
  "mission": string,     // 1 inspiring, concise mission statement
  "taglines": string[],  // 3 punchy, memorable taglines
  "fontPairId": string,  // pick best match from: "space-inter", "playfair-jakarta", "outfit-inter", "syne-archivo", "plusjakarta-public", "fraunces-urbanist", "merriweather-source"
  "colorNames": string[], // creative designer names for the extracted colors (e.g. ["Obsidian Slate", "Cobalt Aura"])
  "logoUsageNotes": string, // 1 sentence guideline on using the mark
  "dosAndDonts": [
    { "do": string, "dont": string },
    { "do": string, "dont": string },
    { "do": string, "dont": string }
  ]
}
Do not wrap in markdown quotes. Return raw JSON only.`;

      const userPrompt = `Brand Name: ${brandName}
Industry: ${industry}
Brand Colors: ${colors.join(', ')}
Logo Scalability Score: ${scalabilityScore}/10`;

      // 6. Call OpenAI-compatible /chat/completions endpoint
      const aiResponse = await fetch(`${baseUrl.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 800,
          response_format: { type: 'json_object' },
        }),
      });

      if (!aiResponse.ok) {
        const errText = await aiResponse.text();
        return new Response(JSON.stringify({ error: 'AI provider error', details: errText }), {
          status: aiResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const aiData = await aiResponse.json();
      const content = aiData.choices?.[0]?.message?.content || '{}';
      const parsed = JSON.parse(content);

      return new Response(JSON.stringify(parsed), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to process AI request', message: String(err) }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
