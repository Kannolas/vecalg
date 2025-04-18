import { AddDirectionRequest, UpdateDirectionRequest } from '../../../trpc/router/directions/directions.types';
import { trpc } from '../../../trpc/trpc-client';
import { notifyPromise } from '../utils/notifications/notifyPromise';

export const useDirectionsMutations = () => {
    const updateDirection = trpc.directions.updateDirection.useMutation();
    const addDirection = trpc.directions.addDirection.useMutation();
    const deleteDirection = trpc.directions.deleteDirection.useMutation();

    return {
        updateDirection: (data: UpdateDirectionRequest) => notifyPromise(updateDirection.mutateAsync(data), 'default'),
        addDirection: (data: AddDirectionRequest) => notifyPromise(addDirection.mutateAsync(data), 'default'),
        deleteDirection: (data: number) => notifyPromise(deleteDirection.mutateAsync(data), 'default'),
    };
};
