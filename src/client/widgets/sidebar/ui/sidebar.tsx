import Link from 'next/link';
import cls from 'classnames';
import { useRouter } from 'next/router';

import { Box } from '@/shared/ui/box';
import { User } from '@/widgets/user';
import Logo_s from '@/shared/assets/Logo_l.svg';
import { SwitchTheme } from '@/features/switch-theme';
import { routes } from '@/shared/hooks/router';

import styles from '../styles/sidebar.module.css';

interface Article {
    title: string;
    id: number;
}

interface SidebarProps {
    articles: Article[];
}

export const Sidebar = ({ articles }: SidebarProps) => {
    const { route } = useRouter();
    const sidebar = articles.map((item) => ({ label: item.title, route: routes.article(item.id) }));
    return (
        <Box className={styles.sidebar}>
            <div className={styles.sidebar_logo}>
                <Logo_s />
                <SwitchTheme />
            </div>
            <User />
            {sidebar.map((item) => (
                <Link
                    href={item.route}
                    className={cls(styles.sidebar_link, {
                        [styles.sidebar_link__active]: item.route === route,
                    })}
                    key={item.label}
                >
                    {item.label}
                </Link>
            ))}
        </Box>
    );
};
