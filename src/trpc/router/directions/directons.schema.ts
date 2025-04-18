import { z } from 'zod';

export const directionSchema = z.object({
    id: z.number(),
    from: z.string(),
    to: z.string(),
    margin: z.number(),
    active: z.boolean(),
});

export const directionsResponseSchema = z.object({
    data: directionSchema.array(),
});

export const addDirectionSchema = z.object({
    from: z.string(),
    to: z.string(),
    margin: z.number(),
    active: z.boolean(),
});

export const addDirectionResponseSchema = z.object({
    data: directionSchema,
});

export const updateDirectionSchema = z.object({
    pairId: z.number(),
    margin: z.number(),
    active: z.boolean(),
});

export const successResponseSchema = z.object({
    data: z.string(),
});
