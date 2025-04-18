import { TrpcRequest } from '../../trpcTypes';
import { createHttpClient } from '../../create-http-client';
import { getError } from '../../utils/get-error';

import { AuthModel } from './auth.model';
import { Login, SignInResponse } from './auth.types';

const http = createHttpClient({ baseURL: process.env.EXCHANGER_PATH, context: 'RATE' });

export class AuthService {
    static async login({ input }: TrpcRequest<Login>) {
        try {
            const { data } = await http.post<SignInResponse>('api/user/login', input);

            return AuthModel.fromDTO(data);
        } catch (err) {
            return AuthModel.Error(getError(err));
        }
    }
}
