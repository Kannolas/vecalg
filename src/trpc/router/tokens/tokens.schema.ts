import { z } from 'zod';

export const tokenSchema = z.object({
    ticker: z.string(),
    name: z.string(),
    code: z.string(),
    minIn: z.number(),
    maxIn: z.number(),
    minOut: z.number(),
    maxOut: z.number(),
});

export const tokensSchemaResponse = z.object({
    data: z.array(tokenSchema),
});

export const updateTokenSchema = z.object({
    tokenCode: z.string(),
    minIn: z.number(),
    maxIn: z.number(),
    minOut: z.number(),
    maxOut: z.number(),
});

export const updateTokenResponseSchema = z.object({
    data: tokenSchema,
});

export const successResponseSchema = z.object({
    data: z.string(),
});

export const addTokenRequestSchema = z.object({
    chain: z.string(),
    ticker: z.string(),
    decimals: z.number(),
    code: z.string(),
    name: z.string(),
    pcName: z.string(),
    minIn: z.number(),
    maxIn: z.number(),
    minOut: z.number(),
    maxOut: z.number(),
});

export const addTokenResponseSchema = z.object({
    data: addTokenRequestSchema,
});
