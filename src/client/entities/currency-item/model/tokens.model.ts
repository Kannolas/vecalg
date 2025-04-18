import { useMemo } from 'react';

import { trpc } from '../../../../trpc/trpc-client';
import { Token } from '../../../../trpc/router/tokens/tokens.types';

export const useTokens = () => {
    const { data } = trpc.tokens.getAllTokens.useQuery();

    const tokens = useMemo(() => data?.data?.data || ([] as Token[]), [data?.data?.data]);

    const tokensMap = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return tokens.reduce<Record<string, Token>>((acc: any, cur: Token) => {
            acc[cur.code] = cur;
            return acc;
        }, {});
    }, [tokens]);

    return { tokens, tokensMap };
};
