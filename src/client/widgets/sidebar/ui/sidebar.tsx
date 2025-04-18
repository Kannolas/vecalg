import Link from 'next/link';
import cls from 'classnames';
import { useRouter } from 'next/router';

import { Box } from '@/shared/ui/box';
import { User } from '@/widgets/user';
import Logo_s from '@/shared/assets/expocket-s.svg';
import UserIcon from '@/shared/assets/user.svg';
import TokensIcon from '@/shared/assets/tokens.svg';
import DirectionsIcon from '@/shared/assets/directions.svg';
import { SwitchTheme } from '@/features/switch-theme';
import { routes } from '@/shared/hooks/router';

import styles from '../styles/sidebar.module.css';

export const sidebar = [
    {
        label: 'Токены',
        route: routes.tokens(),
        icon: <TokensIcon />,
    },
    {
        label: 'Направления',
        route: routes.directions(),
        icon: <DirectionsIcon />,
    },
    {
        label: 'Пользователи',
        route: routes.users(),
        icon: <UserIcon />,
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
                    {item.icon}
                    {item.label}
                </Link>
            ))}
        </Box>
    );
};
