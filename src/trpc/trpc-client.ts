import { httpBatchLink, httpLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import { transformer } from '../client/shared/utils/transformer';

import type { TrpcRouter } from './router/index';

function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // browser should use relative path
        return '';
    }
    return process.env.NEXTAUTH_URL;
}

const isProd = process.env.NODE_ENV === 'production';

export const trpc = createTRPCNext<TrpcRouter>({
    config: ({ ctx }) => {
        return {
            transformer,

            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        /**
                         * Since we have SSR for the majority of pages,
                         * we don't need to refetch data on mount
                         * on the client by default.
                         */
                        refetchOnMount: false,
                    },
                },
            },

            links: [
                (isProd ? httpBatchLink : httpLink)({
                    url: `${getBaseUrl()}/api/trpc`,
                    headers: async () => {
                        if (ctx?.req) {
                            // https://trpc.io/docs/nextjs/ssr#q-why-do-i-need-to-delete-the-connection-header-when-using-ssr-on-node-18
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { connection, ...headers } = ctx.req.headers;

                            return {
                                ...headers,
                                // Optional: inform server that it's an SSR request
                                'x-ssr': '1',
                            };
                        }

                        return {};
                    },
                }),
            ],
        };
    },
    ssr: false,
});
