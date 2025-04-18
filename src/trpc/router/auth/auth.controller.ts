import { TRPCError } from '@trpc/server';

import { getError } from '../../utils/get-error';
import { procedure, router } from '../../trpc-backend';
import { createBaseSchema } from '../../utils/base-schema';

import { loginResponseSchema, loginSchema } from './auth.schema';
import { AuthModule } from './auth.module';

export const auth = router({
    login: procedure
        .input(loginSchema)
        .output(createBaseSchema(loginResponseSchema))
        .mutation(async ({ ctx, input }) => {
            const data = await AuthModule.login({ ctx, input });

            if (data._isError) {
                throw new TRPCError(getError(data.error));
            }

            return data;
        }),
});
