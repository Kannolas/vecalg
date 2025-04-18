import { TrpcContext } from '../../trpc-context';

import { ChainsService } from './chains.service';

export class ChainsModule {
    static async getChains(params: { ctx: TrpcContext }) {
        const res = (await ChainsService.getChains(params)).toDTO();
        return res;
    }
}
