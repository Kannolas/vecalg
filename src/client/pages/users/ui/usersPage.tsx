import { Pagination, Table, TableCell, TableHead, Typography } from '@plex-inc/bricks/components';
import { useState } from 'react';

import { LayoutPage } from '@/app/layout-page';
import { useUsers } from '@/entities/user/model/user.model';
import { UserItem } from '@/entities/user';

import styles from '../styles/usersPage.module.css';

export const UsersPage = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(7);
    const { users, totalUsers } = useUsers({ limit, offset: (page - 1) * limit, emailFilter: '' });

    return (
        <LayoutPage>
            <div className={styles.users}>
                <div className={styles.users_header}>
                    <Typography.Text size="text_header_1">Пользователи</Typography.Text>
                </div>
                <Table>
                    <TableHead>
                        <TableCell width={120}>Email</TableCell>
                        <TableCell width={120}>TG</TableCell>
                        <TableCell width={120}>Создан</TableCell>
                        <TableCell width={120}>Роль</TableCell>
                    </TableHead>
                    {users.map((user) => (
                        <UserItem user={user} key={user.id} />
                    ))}
                </Table>
                <Pagination
                    currentPage={page}
                    onChange={(page) => setPage(page)}
                    totalCount={Math.ceil(totalUsers / limit)}
                />
            </div>
        </LayoutPage>
    );
};
