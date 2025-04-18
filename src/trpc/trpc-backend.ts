import { TRPCError, initTRPC } from '@trpc/server';

import { transformer } from '../client/shared/utils/transformer';

import type { TrpcContext } from './trpc-context';

const t = initTRPC.context<TrpcContext>().create({
    transformer,
});

const sessionCheck = t.middleware(({ next, ctx }) => {
    const { session } = ctx;

    if (!session) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
        });
    }

    return next({
        ctx: { session, headers: ctx.headers },
    });
});

export const protectedProcedure = t.procedure.use(sessionCheck);

export const { middleware } = t;
export const { router, procedure } = t;
