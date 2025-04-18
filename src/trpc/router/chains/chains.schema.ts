import { z } from 'zod';

export const chainsSchema = z.object({
    data: z.string().array(),
});
