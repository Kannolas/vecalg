import { z } from 'zod';

import { userSchema, usersRequestSchema, usersResponseSchema } from './users.schema';

export type User = z.infer<typeof userSchema>;

export type UsersResponse = z.infer<typeof usersResponseSchema>;

export type UsersRequest = z.infer<typeof usersRequestSchema>;
