import type { AppProps } from 'next/app';
import { Nunito_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

import useFont from '@/shared/hooks/useFont';
import { cn } from '@/shared/utils/cn';

const source = Nunito_Sans({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-family',
    style: ['normal', 'italic'],
});

const defaultThemes: Theme[] = ['light', 'dark'];

export function App({ Component, pageProps }: AppProps) {
    useFont(source);
    return (
        <div id="font" className={cn(source.variable)}>
            <SessionProvider>
                <ThemeProvider attribute="class" themes={defaultThemes}>
                    <Component {...pageProps} />
                    <div id="menu"></div>
                    <Toaster position="top-right" />
                </ThemeProvider>
            </SessionProvider>
        </div>
    );
}
