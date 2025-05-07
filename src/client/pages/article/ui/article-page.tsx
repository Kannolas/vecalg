import { useParams } from 'next/navigation';

import { LayoutPage } from '@/app/layout-page';
import LayoutClientOnly from '@/features/layout-client-onli/ui/layout-client-onli';
import { ArticleComponent } from '@/entities/article-component/ui/articleComponent';

import { trpc } from '../../../../trpc/trpc-client';

export const ArticlePage = () => {
    const { data } = trpc.articles.getArticles.useQuery();
    const { id } = useParams();
    const article = data?.data?.find((item) => item.id === Number(id));
    return (
        <LayoutClientOnly>
            <LayoutPage articles={data?.data?.map((item) => ({ id: item.id, title: item.title })) || []}>
                {article && <ArticleComponent data={article} />}
            </LayoutPage>
        </LayoutClientOnly>
    );
};
