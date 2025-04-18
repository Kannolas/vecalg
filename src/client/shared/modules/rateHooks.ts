import { trpc } from '../../../trpc/trpc-client';
import { CalculateRate } from '../../../trpc/router/rate/rate.types';

export const useRateMutations = () => {
    const calculateRateMutation = trpc.rate.calculateRate.useMutation();

    return {
        calculateRate: (data: CalculateRate) => calculateRateMutation.mutateAsync(data),
    };
};
