import { trpc } from '../../../trpc/trpc-client';
import { Login } from '../../../trpc/router/auth/auth.types';
import { notifyPromise } from '../utils/notifications/notifyPromise';

export const useAuthMutations = () => {
    const signInMutation = trpc.auth.login.useMutation();

    return {
        signIn: (data: Login) => notifyPromise(signInMutation.mutateAsync(data), 'signIn'),
    };
};
