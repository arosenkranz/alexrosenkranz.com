import type { SITE_CONFIG } from './site-config';

type SiteConfig = typeof SITE_CONFIG;

export function buildWebSiteSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.url,
  };
}

export function buildPersonSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.author.name,
    url: config.author.url,
    sameAs: [config.social.github],
  };
}

export function buildArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  image?: string;
  author: { name: string; url: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished.toISOString(),
    ...(params.image ? { image: params.image } : {}),
    author: {
      '@type': 'Person',
      name: params.author.name,
      url: params.author.url,
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
