import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'Google-Extended',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot-Extended',
          'cohere-ai',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://usamazahid.design/sitemap.xml',
  };
}
