import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const loginResponseSchema = z.object({
    data: z.object({
        success: z.boolean(),
        token: z.string(),
    }),
});

export const successResponseSchema = z.object({
    data: z.object({
        success: z.boolean(),
    }),
});
