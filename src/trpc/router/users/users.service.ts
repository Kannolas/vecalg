import { TrpcContext } from '../../trpc-context';
import { createHttpClient } from '../../create-http-client';
import { getError } from '../../utils/get-error';

import { UsersRequest, UsersResponse } from './users.types';
import { UsersModel } from './users.model';

const http = createHttpClient({ baseURL: process.env.EXCHANGER_PATH, context: 'USERS' });

export class UsersService {
    static async getUsers({ ctx, input }: { ctx: TrpcContext; input: UsersRequest }) {
        try {
            const { data } = await http.post<UsersResponse>('/api/admin/users', input, {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token}`,
                },
            });
            return UsersModel.fromDTO(data);
        } catch (err) {
            return UsersModel.Error(getError(err));
        }
    }
}
