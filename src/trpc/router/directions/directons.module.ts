import { TrpcContext } from '../../trpc-context';

import { AddDirectionRequest, UpdateDirectionRequest } from './directions.types';
import { DirectionsService } from './directons.service';

export class DirectionsModule {
    static async getDirections(params: { ctx: TrpcContext }) {
        const res = (await DirectionsService.getDirections(params)).toDTO();
        return res;
    }

    static async updateDirection(params: { ctx: TrpcContext; input: UpdateDirectionRequest }) {
        const res = (await DirectionsService.updateDirection(params)).toDTO();
        return res;
    }

    static async addDirection(params: { ctx: TrpcContext; input: AddDirectionRequest }) {
        const res = (await DirectionsService.addDirection(params)).toDTO();
        return res;
    }

    static async deleteDirection(params: { ctx: TrpcContext; input: number }) {
        const res = (await DirectionsService.deleteDirection(params)).toDTO();
        return res;
    }
}
