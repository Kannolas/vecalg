import { z } from 'zod';

const errorSchema = z.object({
    code: z.number(),
    message: z.string(),
});

export const baseSchema = z.object({
    _isError: z.boolean(),
    _isDefault: z.boolean(),
    error: errorSchema.nullable().optional(),
    data: z.unknown().nullable(),
});

export const createBaseSchema = <S extends z.ZodTypeAny>(schema: S) => {
    return z.object({
        _isError: z.boolean(),
        _isDefault: z.boolean(),
        data: schema.nullable(),
        error: z
            .object({
                code: z.string().optional(),
                message: z.string().optional(),
            })
            .nullable(),
    });
};
