import { useMemo } from 'react';

import { trpc } from '../../../../trpc/trpc-client';

export const useChains = () => {
    const { data } = trpc.chains.getChains.useQuery();

    const chains = useMemo(() => data?.data?.data || ([] as string[]), [data?.data?.data]);

    return { chains };
};
