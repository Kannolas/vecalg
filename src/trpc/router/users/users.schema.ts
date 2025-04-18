import { z } from 'zod';

export const usersRequestSchema = z.object({
    emailFilter: z.string(),
    limit: z.number(),
    offset: z.number(),
});

export const userSchema = z.object({
    id: z.number(),
    email: z.string(),
    tgTag: z.string().nullable(),
    tgId: z.string().nullable(),
    createdAt: z.string(),
    isEmailVerified: z.boolean(),
    userRole: z.string(),
});

export const usersResponseSchema = z.object({
    data: z.object({
        users: userSchema.array(),
        roles: z.string().array(),
        total_users: z.number(),
    }),
});
