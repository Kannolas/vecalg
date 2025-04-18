import { TrpcContext } from '../../trpc-context';
import { createHttpClient } from '../../create-http-client';
import { getError } from '../../utils/get-error';

import { TokensModel } from './tokens.model';
import {
    AddTokenRequest,
    AddTokenResponse,
    DeleteTokenResponse,
    TokensSchemaResponse,
    UpdateTokenRequest,
    UpdateTokenResponse,
} from './tokens.types';

const http = createHttpClient({ baseURL: process.env.EXCHANGER_PATH, context: 'TOKENS' });

export class TokensService {
    static async getAllTokens({ ctx }: { ctx: TrpcContext }) {
        try {
            const { data } = await http.get<TokensSchemaResponse>('/api/admin/token', {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token.trim()}`,
                },
            });
            return TokensModel.fromDTO(data);
        } catch (err) {
            return TokensModel.Error(getError(err));
        }
    }

    static async updateToken({ ctx, input }: { ctx: TrpcContext; input: UpdateTokenRequest }) {
        try {
            const { data } = await http.put<UpdateTokenResponse>('/api/admin/token', input, {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token}`,
                },
            });
            return TokensModel.fromDTO(data);
        } catch (err) {
            return TokensModel.Error(getError(err));
        }
    }

    static async addToken({ ctx, input }: { ctx: TrpcContext; input: AddTokenRequest }) {
        try {
            const { data } = await http.post<AddTokenResponse>('/api/admin/token', input, {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token}`,
                },
            });
            return TokensModel.fromDTO(data);
        } catch (err) {
            return TokensModel.Error(getError(err));
        }
    }

    static async deleteToken({ ctx, input }: { ctx: TrpcContext; input: string }) {
        try {
            const { data } = await http.delete<DeleteTokenResponse>(`/api/admin/token?tokenCode=${input}`, {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token}`,
                },
            });
            return TokensModel.fromDTO(data);
        } catch (err) {
            return TokensModel.Error(getError(err));
        }
    }
}
