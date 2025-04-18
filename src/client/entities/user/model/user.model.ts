import { useMemo } from 'react';

import { trpc } from '../../../../trpc/trpc-client';
import { User, UsersRequest } from '../../../../trpc/router/users/users.types';

export const useUsers = (params: UsersRequest) => {
    const { data } = trpc.users.getUsers.useQuery(params);

    const users = useMemo(() => data?.data?.data.users || ([] as User[]), [data?.data?.data.users]);
    const totalUsers = useMemo(() => data?.data?.data.total_users || 0, [data?.data?.data.total_users]);
    const roles = useMemo(() => data?.data?.data.roles || ([] as string[]), [data?.data?.data.roles]);

    return { users, totalUsers, roles };
};
