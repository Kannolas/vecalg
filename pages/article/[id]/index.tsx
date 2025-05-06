import { ArticlePage } from '@/pages';

import { declareSsrProps } from '../../../src/client/shared/utils/declare-ssr-props';

export const getServerSideProps = declareSsrProps(async ({ ssrTime }) => {
    return { ssrTime };
});

export default ArticlePage;
