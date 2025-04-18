import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { getError } from '../../utils/get-error';
import { procedure, router } from '../../trpc-backend';
import { createBaseSchema } from '../../utils/base-schema';

import { DirectionsModule } from './directons.module';
import {
    addDirectionResponseSchema,
    addDirectionSchema,
    directionsResponseSchema,
    successResponseSchema,
    updateDirectionSchema,
} from './directons.schema';

export const directions = router({
    getDirections: procedure.output(createBaseSchema(directionsResponseSchema)).query(async ({ ctx }) => {
        const directions = await DirectionsModule.getDirections({ ctx });
        if (directions._isError) {
            throw new TRPCError(getError(directions.error));
        }

        return directions;
    }),

    updateDirection: procedure
        .input(updateDirectionSchema)
        .output(createBaseSchema(addDirectionResponseSchema))
        .mutation(async ({ ctx, input }) => {
            const res = await DirectionsModule.updateDirection({ ctx, input });
            if (res._isError) {
                throw new TRPCError(getError(res.error));
            }

            return res;
        }),

    addDirection: procedure
        .input(addDirectionSchema)
        .output(createBaseSchema(addDirectionResponseSchema))
        .mutation(async ({ ctx, input }) => {
            const res = await DirectionsModule.addDirection({ ctx, input });
            if (res._isError) {
                throw new TRPCError(getError(res.error));
            }

            return res;
        }),

    deleteDirection: procedure
        .input(z.number())
        .output(createBaseSchema(successResponseSchema))
        .mutation(async ({ ctx, input }) => {
            const res = await DirectionsModule.deleteDirection({ ctx, input });
            if (res._isError) {
                throw new TRPCError(getError(res.error));
            }

            return res;
        }),
});
