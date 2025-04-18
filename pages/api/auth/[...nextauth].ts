import NextAuth from 'next-auth';

import { authOptions } from '../../../src/client/shared/utils/auth';

export default NextAuth(authOptions);
