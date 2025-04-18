import { useMemo } from 'react';

import { trpc } from '../../../../trpc/trpc-client';
import { Direction } from '../../../../trpc/router/directions/directions.types';

export const useDirections = () => {
    const { data } = trpc.directions.getDirections.useQuery();

    const directions = useMemo(() => data?.data?.data || ([] as Direction[]), [data?.data?.data]);

    return { directions };
};
