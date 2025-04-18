import { TableCell, TableRow, Typography } from '@plex-inc/bricks/components';
import { formatDate } from 'date-fns';
import cls from 'classnames';

import { User } from '../../../../trpc/router/users/users.types';
import styles from '../styles/user.module.css';

interface Props {
    user: User;
}

export const UserItem = ({ user }: Props) => {
    return (
        <TableRow>
            <TableCell width={120}>
                <Typography.Text className={cls({ [styles.text__brand]: user.isEmailVerified })}>
                    {user.email}
                </Typography.Text>
                <Typography.Text className={styles.text__under}>ID: {user.id}</Typography.Text>
            </TableCell>
            <TableCell width={120}>
                <Typography.Text>{user.tgTag}</Typography.Text>
                <Typography.Text className={styles.text__under}>{user.tgId}</Typography.Text>
            </TableCell>
            <TableCell width={120}>
                <Typography.Text>{formatDate(user.createdAt, 'yyyy.MM.dd')}</Typography.Text>
            </TableCell>
            <TableCell width={120}>
                <Typography.Text>{user.userRole}</Typography.Text>
            </TableCell>
        </TableRow>
    );
};
