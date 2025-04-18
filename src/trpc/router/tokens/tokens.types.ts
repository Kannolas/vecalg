import { z } from 'zod';

import {
    addTokenRequestSchema,
    addTokenResponseSchema,
    successResponseSchema,
    tokenSchema,
    tokensSchemaResponse,
    updateTokenResponseSchema,
    updateTokenSchema,
} from './tokens.schema';

export type Token = z.infer<typeof tokenSchema>;

export type TokensSchemaResponse = z.infer<typeof tokensSchemaResponse>;

export type UpdateTokenRequest = z.infer<typeof updateTokenSchema>;

export type UpdateTokenResponse = z.infer<typeof updateTokenResponseSchema>;

export type DeleteTokenResponse = z.infer<typeof successResponseSchema>;

export type AddTokenRequest = z.infer<typeof addTokenRequestSchema>;

export type AddTokenResponse = z.infer<typeof addTokenResponseSchema>;
