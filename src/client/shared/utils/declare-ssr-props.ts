import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { createServerSideHelpers, DecoratedProcedureSSGRecord } from '@trpc/react-query/server';

import { trpcRouter, TrpcRouter } from '../../../trpc/router';

import { transformer } from './transformer';

export interface SSRProps<P = { [key: string]: string }> {
    user?: Session['user'];
    req: GetServerSidePropsContext['req'];
    params: P;
    query: Record<string, string | string[] | undefined>;
    ssrTime: number;
    ssrHelpers: DecoratedProcedureSSGRecord<TrpcRouter>;
}

export interface ExternalPageProps<P = { [key: string]: string }> extends SSRProps<P> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export function declareSsrProps<T = ExternalPageProps>(
    cb?: ({ user, req, params, query }: SSRProps) => T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
) {
    return async ({ req, params = {}, query }: GetServerSidePropsContext) => {
        // FIXME: getServerSession. Problem with serialazing createdAt, updatedAt

        const ssrHelpers = createServerSideHelpers({
            router: trpcRouter,
            ctx: {
                headers: req.headers,
                session: {
                    access_token: 'sfasf',
                    expires: 'asdasd',
                },
            },
            transformer,
        });

        const ssrTime = Date.now();

        const resProps = cb
            ? await cb({
                  req,
                  user: { name: '' },
                  params: params as Record<string, string>,
                  query,
                  ssrTime,
                  ssrHelpers,
              })
            : {};

        // @ts-ignore
        if (resProps?.notFound || resProps?.redirect) {
            return resProps;
        }

        return {
            props: {
                ...resProps,
                params: params as Record<string, string>,
                cookies: req.cookies,
                user: null,
                ssrTime,
                trpcState: ssrHelpers.dehydrate(),
            },
        };
    };
}
