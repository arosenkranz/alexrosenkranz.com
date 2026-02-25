import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const allPosts = await getCollection('posts');
  const posts = allPosts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: 'Alex Rosenkranz',
    description: 'Things I find interesting',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      link: post.data.url ?? `${context.site}posts/${post.slug}`,
      categories: post.data.tags,
      description: post.data.tags.join(', '),
    })),
  });
}
