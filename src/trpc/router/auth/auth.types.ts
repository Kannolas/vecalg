import { z } from 'zod';

import { loginResponseSchema, loginSchema, successResponseSchema } from './auth.schema';

export type Login = z.infer<typeof loginSchema>;

export type SignInResponse = z.infer<typeof loginResponseSchema>;

export type SuccessResponse = z.infer<typeof successResponseSchema>;
