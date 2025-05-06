import { router } from '../trpc-backend';

import { auth } from './auth/auth.controller';
import { articles } from './chains copy/articles.controller';

export const trpcRouter = router({
    auth,
    articles,
});

export type TrpcRouter = typeof trpcRouter;
