import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow everything except API internals
      { userAgent: '*', allow: '/', disallow: ['/api/'] },

      // OpenAI — training + real-time search (allow both)
      { userAgent: 'GPTBot',        allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User',  allow: '/' },

      // Anthropic — three separate bots (allow all)
      { userAgent: 'ClaudeBot',        allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User',      allow: '/' },

      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },

      // Google — standard + AI/Gemini crawler
      { userAgent: 'Googlebot',    allow: '/' },
      { userAgent: 'GoogleOther',  allow: '/' },

      // Microsoft / Copilot
      { userAgent: 'Bingbot', allow: '/' },

      // xAI / Grok
      { userAgent: 'GrokBot', allow: '/' },

      // Common Crawl (used by open-source LLM training sets)
      { userAgent: 'CCBot', allow: '/' },

      // Block low-quality / scraper bots that add no citation value
      { userAgent: 'MJ12bot',     disallow: '/' },
      { userAgent: 'Bytespider',  disallow: '/' },
      { userAgent: 'AhrefsBot',   disallow: '/' },
      { userAgent: 'SemrushBot',  disallow: '/' },
      { userAgent: 'DotBot',      disallow: '/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
