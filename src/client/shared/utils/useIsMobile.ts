import { useEffect, useState } from 'react';

import { debounce } from './debounce';

interface ReturnMobileObject {
    isTablet: boolean;
    isDesktop: boolean;
}

export const useIsMobile = (): ReturnMobileObject => {
    const [{ tablet, desktop }, setCurrentInfo] = useState({
        tablet: false,
        desktop: true,
    });

    useEffect(() => {
        function update() {
            const isDesktop = window.matchMedia('(max-width: 1024px)').matches;
            const isTablet = window.matchMedia('(max-width: 768px)').matches;
            const newInfo = {
                tablet: isTablet,
                desktop: isDesktop,
            };
            setCurrentInfo(newInfo);
        }

        update();
        const debouncedUpdate = debounce(update, 150);

        window.addEventListener('resize', debouncedUpdate);

        return () => {
            window.removeEventListener('resize', debouncedUpdate);
        };
    }, [tablet, desktop]);

    return {
        isDesktop: desktop,
        isTablet: tablet,
    };
};
