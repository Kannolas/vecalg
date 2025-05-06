import { LayoutPage } from '@/app/layout-page';
import LayoutClientOnly from '@/features/layout-client-onli/ui/layout-client-onli';
import { ArticleComponent } from '@/entities/article-component/ui/articleComponent';
import { trpc } from '../../../../trpc/trpc-client';

export const ArticlePage = () => {
    const { data } = trpc.articles.getArticles.useQuery();

    return (
        <LayoutClientOnly>
            <LayoutPage>{data?.data?.[7] && <ArticleComponent data={data?.data[7]} />}</LayoutPage>
        </LayoutClientOnly>
    );
};
