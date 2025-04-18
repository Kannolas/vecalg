import { router } from '../trpc-backend';

import { auth } from './auth/auth.controller';
import { chains } from './chains/chains.controller';
import { directions } from './directions/directions.controller';
import { tokens } from './tokens/tokens.controller';
import { users } from './users/users.controller';

export const trpcRouter = router({
    tokens,
    auth,
    chains,
    directions,
    users,
});

export type TrpcRouter = typeof trpcRouter;
