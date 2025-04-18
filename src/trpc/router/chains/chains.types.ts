import { z } from 'zod';

import { chainsSchema } from './chains.schema';

export type GetChainsResponse = z.infer<typeof chainsSchema>;
