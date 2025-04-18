import { TrpcContext } from '../../trpc-context';

import { TokensService } from './tokens.service';
import { AddTokenRequest, UpdateTokenRequest } from './tokens.types';

export class TokensModule {
    static async getAllTokens(params: { ctx: TrpcContext }) {
        const res = (await TokensService.getAllTokens(params)).toDTO();
        return res;
    }

    static async updateToken(params: { ctx: TrpcContext; input: UpdateTokenRequest }) {
        const res = (await TokensService.updateToken(params)).toDTO();
        return res;
    }

    static async addToken(params: { ctx: TrpcContext; input: AddTokenRequest }) {
        const res = (await TokensService.addToken(params)).toDTO();
        return res;
    }

    static async deleteToken(params: { ctx: TrpcContext; input: string }) {
        const res = (await TokensService.deleteToken(params)).toDTO();
        return res;
    }
}
