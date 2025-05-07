import { useEffect } from 'react';

import { useRouter } from '@/shared/hooks/router';

export const Main = () => {
    const { article } = useRouter();
    useEffect(() => {
        article(1);
    }, [article]);
    return <div></div>;
};
