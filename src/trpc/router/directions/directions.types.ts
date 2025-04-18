import { z } from 'zod';

import {
    addDirectionResponseSchema,
    addDirectionSchema,
    directionSchema,
    directionsResponseSchema,
    successResponseSchema,
    updateDirectionSchema,
} from './directons.schema';

export type Direction = z.infer<typeof directionSchema>;

export type DirectionsResponse = z.infer<typeof directionsResponseSchema>;

export type AddDirectionRequest = z.infer<typeof addDirectionSchema>;

export type AddDirectionResponse = z.infer<typeof addDirectionResponseSchema>;

export type UpdateDirectionRequest = z.infer<typeof updateDirectionSchema>;

export type UpdateDirectionResponse = z.infer<typeof addDirectionResponseSchema>;

export type DeleteDirection = z.infer<typeof successResponseSchema>;
