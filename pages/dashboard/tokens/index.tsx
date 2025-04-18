import { TokensPage } from '@/pages/tokens/ui/tokens-page';

import { declareSsrProps } from '../../../src/client/shared/utils/declare-ssr-props';

export const getServerSideProps = declareSsrProps(
    async ({ ssrTime }) => {
        return { ssrTime };
    },
    {
        private: true,
    },
);

export default TokensPage;
