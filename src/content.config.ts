import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
    loader: glob({
        base: './src/content/work',
        pattern: '**/*.md',
    }),

    schema: z.object({
        title: z.string(),
        publishDate: z.coerce.date(),

        img: z.string().optional(),
        img_alt: z.string().optional(),

        description: z.string(),

        tags: z.array(z.string()).default([]),

        contributions: z.array(z.string()).default([]),

        role: z.string().optional(),
        engine: z.string().optional(),
        language: z.string().optional(),
        projectType: z.string().optional(),
        playUrl: z.string().url().optional(),
        heroVideo: z.string().optional(),

        featuredImages: z
            .array(
                z.object({
                    src: z.string(),
                    alt: z.string(),
                })
            )
            .default([]),

        gallery: z.array(z.string()).default([]),
    }),
});

export const collections = {
    work,
};