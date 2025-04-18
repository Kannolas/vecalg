import { SwitchTheme as SwitchThemeComponent } from '@plex-inc/bricks/components';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';

import LayoutClientOnly from '../../layout-client-onli/ui/layout-client-onli';

export const SwitchTheme = () => {
    const { setTheme, resolvedTheme } = useTheme();

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }, [resolvedTheme, setTheme]);

    return (
        <LayoutClientOnly>
            <SwitchThemeComponent value={resolvedTheme as Theme} onChange={toggleTheme} />
        </LayoutClientOnly>
    );
};
