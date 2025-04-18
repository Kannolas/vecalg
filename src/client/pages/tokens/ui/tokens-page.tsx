import { Button, Table, TableCell, TableHead, Typography } from '@plex-inc/bricks/components';
import { useState } from 'react';

import { LayoutPage } from '@/app/layout-page';
import { useTokens } from '@/entities/currency-item/model/tokens.model';
import { TokenItem } from '@/entities/currency-item';
import { Modal } from '@/shared/ui/modal';
import { AddTokenForm } from '@/features/add-token-form';

import styles from '../styles/tokens.module.css';

export const TokensPage = () => {
    const { tokens } = useTokens();
    const [openAdd, setOpenAdd] = useState(false);

    return (
        <LayoutPage>
            <div className={styles.tokens}>
                <div className={styles.tokens_header}>
                    <Typography.Text size="text_header_1">Токены</Typography.Text>
                    <Button view="brand" text="Добавить токен" onClick={() => setOpenAdd(true)} />
                </div>
                <Table>
                    <TableHead>
                        <TableCell width={120}>Токен</TableCell>
                        <TableCell width={80}>Валюта</TableCell>
                        <TableCell width={200}>Лимиты IN</TableCell>
                        <TableCell width={200}>Лимиты Out</TableCell>
                        <TableCell width={100}></TableCell>
                    </TableHead>
                    {tokens.map((item) => (
                        <TokenItem item={item} key={item.code} />
                    ))}
                </Table>
            </div>
            <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Добавление токена">
                <AddTokenForm onClose={() => setOpenAdd(false)} />
            </Modal>
        </LayoutPage>
    );
};
