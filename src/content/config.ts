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
          'music',
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
      image: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  posts,
};
