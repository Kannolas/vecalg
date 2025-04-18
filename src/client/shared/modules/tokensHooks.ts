import { AddTokenRequest, UpdateTokenRequest } from '../../../trpc/router/tokens/tokens.types';
import { trpc } from '../../../trpc/trpc-client';
import { notifyPromise } from '../utils/notifications/notifyPromise';

export const useTokensMutations = () => {
    const updateToken = trpc.tokens.updateToken.useMutation();
    const addToken = trpc.tokens.addToken.useMutation();
    const deleteToken = trpc.tokens.deleteToken.useMutation();

    return {
        updateToken: (data: UpdateTokenRequest) => notifyPromise(updateToken.mutateAsync(data), 'default'),
        addToken: (data: AddTokenRequest) => notifyPromise(addToken.mutateAsync(data), 'default'),
        deleteToken: (data: string) => notifyPromise(deleteToken.mutateAsync(data), 'default'),
    };
};
