import { z } from 'zod';

export const vectorSchema = z.object({
    color: z.string().nullable().optional(),
    startX: z.number().nullable().optional(),
    startZ: z.number().nullable().optional(),
    startY: z.number().nullable().optional(),
    vectorLabel: z.string().nullable().optional(),
    animationEndX: z.number().nullable().optional(),
    animationEndZ: z.number().nullable().optional(),
    animationEndY: z.number().nullable().optional(),
});

export const blockSchema = z.object({
    id: z.number(),
    articleId: z.number(),
    type: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    svgData: z.array(vectorSchema).nullable().optional(),
    title: z.string().nullable().optional(),
});

export const articleSchema = z.object({
    id: z.number(),
    title: z.string(),
    blocks: z.array(blockSchema),
});

export const articlesSchema = z.array(articleSchema).nullable();
