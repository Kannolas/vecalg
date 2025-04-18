import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { getError } from '../../utils/get-error';
import { procedure, router } from '../../trpc-backend';
import { createBaseSchema } from '../../utils/base-schema';

import { TokensModule } from './tokens.module';
import {
    addTokenRequestSchema,
    addTokenResponseSchema,
    successResponseSchema,
    tokensSchemaResponse,
    updateTokenResponseSchema,
    updateTokenSchema,
} from './tokens.schema';

export const tokens = router({
    getAllTokens: procedure.output(createBaseSchema(tokensSchemaResponse)).query(async ({ ctx }) => {
        const tokens = await TokensModule.getAllTokens({ ctx });
        if (tokens._isError) {
            throw new TRPCError(getError(tokens.error));
        }

        return tokens;
    }),

    updateToken: procedure
        .input(updateTokenSchema)
        .output(createBaseSchema(updateTokenResponseSchema))
        .mutation(async ({ ctx, input }) => {
            const tokens = await TokensModule.updateToken({ ctx, input });
            if (tokens._isError) {
                throw new TRPCError(getError(tokens.error));
            }

            return tokens;
        }),

    addToken: procedure
        .input(addTokenRequestSchema)
        .output(createBaseSchema(addTokenResponseSchema))
        .mutation(async ({ ctx, input }) => {
            const tokens = await TokensModule.addToken({ ctx, input });
            if (tokens._isError) {
                throw new TRPCError(getError(tokens.error));
            }

            return tokens;
        }),

    deleteToken: procedure
        .input(z.string())
        .output(createBaseSchema(successResponseSchema))
        .mutation(async ({ ctx, input }) => {
            const tokens = await TokensModule.deleteToken({ ctx, input });
            if (tokens._isError) {
                throw new TRPCError(getError(tokens.error));
            }

            return tokens;
        }),
});
