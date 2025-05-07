import { z } from 'zod';

export const vectorSchema = z.object({
    color: z.string().optional().nullable(),
    startX: z.number().optional().nullable(),
    startY: z.number().optional().nullable(),
    startZ: z.number().optional().nullable(),
    endLabel: z.string().optional().nullable(),
    startLabel: z.string().optional().nullable(),
    vectorLabel: z.string().optional().nullable(),
    animationEndX: z.number().optional().nullable(),
    animationEndY: z.number().optional().nullable(),
    animationEndZ: z.number().optional().nullable(),
    zIndex: z.number().optional().nullable(),
});

export const blockSchema = z.object({
    id: z.number(),
    articleId: z.number(),
    type: z.string(),
    content: z.string().nullable(),
    svgData: z.array(vectorSchema).nullable(),
    title: z.string().nullable(),
});

export const articleSchema = z.object({
    id: z.number(),
    title: z.string(),
    blocks: z.array(blockSchema),
});

export const articlesSchema = z.array(articleSchema);
