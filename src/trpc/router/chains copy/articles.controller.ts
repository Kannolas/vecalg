import { TRPCError } from '@trpc/server';

import { getError } from '../../utils/get-error';
import { procedure, router } from '../../trpc-backend';
import { createBaseSchema } from '../../utils/base-schema';

import { ArticlesModule } from './articles.module';
import { articlesSchema } from './articles.schema';
import { z } from 'zod';

export const articles = router({
    getArticles: procedure.output(createBaseSchema(z.any())).query(async () => {
        const chains = await ArticlesModule.getArticles();
        if (chains._isError) {
            throw new TRPCError(getError(chains.error));
        }

        return chains;
    }),
});
