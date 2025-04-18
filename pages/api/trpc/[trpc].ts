import * as trpcNext from '@trpc/server/adapters/next';

import { trpcRouter } from '../../../src/trpc/router';
import { createContext } from '../../../src/trpc/trpc-context';

export default trpcNext.createNextApiHandler({
    router: trpcRouter,
    createContext,
    onError() {},
});
