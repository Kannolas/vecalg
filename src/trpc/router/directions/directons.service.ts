import { TrpcContext } from '../../trpc-context';
import { createHttpClient } from '../../create-http-client';
import { getError } from '../../utils/get-error';

import {
    AddDirectionRequest,
    AddDirectionResponse,
    DeleteDirection,
    DirectionsResponse,
    UpdateDirectionRequest,
    UpdateDirectionResponse,
} from './directions.types';
import { DirectionsModel } from './directons.model';

const http = createHttpClient({ baseURL: process.env.EXCHANGER_PATH, context: 'DIRECTIONS' });

export class DirectionsService {
    static async getDirections({ ctx }: { ctx: TrpcContext }) {
        try {
            const { data } = await http.get<DirectionsResponse>('/api/admin/pair', {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token.trim()}`,
                },
            });
            return DirectionsModel.fromDTO(data);
        } catch (err) {
            return DirectionsModel.Error(getError(err));
        }
    }

    static async updateDirection({ ctx, input }: { ctx: TrpcContext; input: UpdateDirectionRequest }) {
        try {
            const { data } = await http.put<UpdateDirectionResponse>('/api/admin/pair', input, {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token}`,
                },
            });
            return DirectionsModel.fromDTO(data);
        } catch (err) {
            return DirectionsModel.Error(getError(err));
        }
    }

    static async addDirection({ ctx, input }: { ctx: TrpcContext; input: AddDirectionRequest }) {
        try {
            const { data } = await http.post<AddDirectionResponse>('/api/admin/pair', input, {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token}`,
                },
            });
            return DirectionsModel.fromDTO(data);
        } catch (err) {
            return DirectionsModel.Error(getError(err));
        }
    }

    static async deleteDirection({ ctx, input }: { ctx: TrpcContext; input: number }) {
        try {
            const { data } = await http.delete<DeleteDirection>(`/api/admin/pair?pairId=${input}`, {
                headers: {
                    Authorization: `Bearer ${ctx.session?.user.token}`,
                },
            });
            return DirectionsModel.fromDTO(data);
        } catch (err) {
            return DirectionsModel.Error(getError(err));
        }
    }
}
