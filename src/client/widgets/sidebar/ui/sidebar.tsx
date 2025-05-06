import Link from 'next/link';
import cls from 'classnames';
import { useRouter } from 'next/router';

import { Box } from '@/shared/ui/box';
import { User } from '@/widgets/user';
import Logo_s from '@/shared/assets/Logo_l.svg';
import { SwitchTheme } from '@/features/switch-theme';
import { routes } from '@/shared/hooks/router';

import styles from '../styles/sidebar.module.css';

export const sidebar = [
    {
        label: 'Понятие вектора',
        route: routes.article(1),
    },
    {
        label: 'Векторы в пространстве',
        route: routes.article(1),
    },
    {
        label: 'Компланарность векторов',
        route: routes.article(1),
    },
];
export const Sidebar = () => {
    const { route } = useRouter();

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
