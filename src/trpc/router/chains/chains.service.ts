import { TrpcContext } from '../../trpc-context';
import { createHttpClient } from '../../create-http-client';
import { getError } from '../../utils/get-error';

import { GetChainsResponse } from './chains.types';
import { ChainsModel } from './chains.model';

const http = createHttpClient({ baseURL: process.env.EXCHANGER_PATH, context: 'CHAINS' });

export class ChainsService {
    static async getChains({ ctx }: { ctx: TrpcContext }) {
        try {
            const { data } = await http.get<GetChainsResponse>('/api/admin/chains', {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token}`,
                },
            });
            return ChainsModel.fromDTO(data);
        } catch (err) {
            return ChainsModel.Error(getError(err));
        }
    }
}
