import { TrpcContext } from '../../trpc-context';

import { UsersService } from './users.service';
import { UsersRequest } from './users.types';

export class UsersModule {
    static async getUsers(params: { ctx: TrpcContext; input: UsersRequest }) {
        const res = (await UsersService.getUsers(params)).toDTO();
        return res;
    }
}
