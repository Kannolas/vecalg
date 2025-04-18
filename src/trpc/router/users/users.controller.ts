import { TRPCError } from '@trpc/server';

import { getError } from '../../utils/get-error';
import { procedure, router } from '../../trpc-backend';
import { createBaseSchema } from '../../utils/base-schema';

import { usersRequestSchema, usersResponseSchema } from './users.schema';
import { UsersModule } from './users.module';

export const users = router({
    getUsers: procedure
        .input(usersRequestSchema)
        .output(createBaseSchema(usersResponseSchema))
        .query(async ({ ctx, input }) => {
            const users = await UsersModule.getUsers({ ctx, input });
            if (users._isError) {
                throw new TRPCError(getError(users.error));
            }

            return users;
        }),
});
