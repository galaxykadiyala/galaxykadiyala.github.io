import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    status: z.enum(['active', 'shipped', 'archived']),
    category: z.enum(['professional', 'personal', 'community']),
    techStack: z.array(z.string()),
    externalUrl: z.string().optional(),
    blogPostSlug: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { blog, projects };
