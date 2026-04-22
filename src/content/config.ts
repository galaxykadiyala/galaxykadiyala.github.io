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
    description: z.string(),
    url: z.string().optional(),
    github: z.string().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['active', 'archived', 'wip']).optional().default('active'),
    year: z.number(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, projects };
