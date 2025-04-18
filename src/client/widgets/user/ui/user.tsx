import { Avatar, Button } from '@plex-inc/bricks/components';
import { useSession } from 'next-auth/react';

import LogoutIcon from '@/shared/assets/logout.svg';

import styles from '../styles/user.module.css';

export const User = () => {
    const { data } = useSession();
    return (
        <div className={styles.user}>
            <Avatar name={data?.user.email} size="s" />
            {data?.user.email}
            <Button variant="transparent" iconRight={<LogoutIcon />} />
        </div>
    );
};
