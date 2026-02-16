import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishedAt: z.coerce.date(),
      tags: z.array(
        z.enum([
          'article',
          'photo',
          'product',
          'code',
          'tech',
          'music',
          'track',
          'playlist',
          'video',
          'quote',
          'note',
          'website',
          'app',
          'movie',
          'tv',
        ])
      ),
      url: z.string().url().optional(),

      // Alternate links for additional platforms (music, video, etc.)
      alternateLinks: z
        .object({
          spotify: z.string().url().optional(),
          bandcamp: z.string().url().optional(),
          youtube: z.string().url().optional(),
          soundcloud: z.string().url().optional(),
          mixcloud: z.string().url().optional(),
        })
        .optional(),

      image: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  posts,
};
