import { TrpcRequest } from '../../trpcTypes';

import { AuthService } from './auth.service';
import { Login } from './auth.types';

export class AuthModule {
    static async login(params: TrpcRequest<Login>) {
        const res = (await AuthService.login(params)).toDTO();
        return res;
    }
}
