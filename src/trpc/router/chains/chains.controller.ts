import { TRPCError } from '@trpc/server';

import { getError } from '../../utils/get-error';
import { procedure, router } from '../../trpc-backend';
import { createBaseSchema } from '../../utils/base-schema';

import { ChainsModule } from './chains.module';
import { chainsSchema } from './chains.schema';

export const chains = router({
    getChains: procedure.output(createBaseSchema(chainsSchema)).query(async ({ ctx }) => {
        const chains = await ChainsModule.getChains({ ctx });
        if (chains._isError) {
            throw new TRPCError(getError(chains.error));
        }

        return chains;
    }),
});
