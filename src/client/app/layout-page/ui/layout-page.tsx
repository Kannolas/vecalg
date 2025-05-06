import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes';

import { Sidebar } from '@/widgets/sidebar/ui/sidebar';

import styles from '../styles/layout-page.module.css';
import { Container } from '../../../shared/ui/container';

interface PageProps {
    children: ReactNode;
    isProtected?: boolean;
}

export const LayoutPage = ({ children, isProtected }: PageProps) => {
    const { resolvedTheme } = useTheme();
    return (
        <>
            <Head>
                <link rel="stylesheet" id="themeVariables" href={`/theme/${resolvedTheme}.css`}></link>
                <link rel="stylesheet" href="/theme/default.css"></link>
            </Head>
            <main className={styles.layout}>
                <Container size="l">
                    <div className={styles.layout_content}>
                        <div style={{ width: '100%' }}>
                            <div className={styles.layout_content_box}>
                                {!isProtected && <Sidebar />}
                                {children}
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    );
};
