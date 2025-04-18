import { Button, TableCell, TableRow } from '@plex-inc/bricks/components';
import { useState } from 'react';

import { TokenBox } from '@/entities/token-box';
import EditIcon from '@/shared/assets/edit.svg';
import DeleteIcon from '@/shared/assets/delete.svg';
import { Modal } from '@/shared/ui/modal';
import { UpdateTokenForm } from '@/features/update-token-form';
import { DeleteTokenForm } from '@/features/delete-token-form';

import { Token } from '../../../../trpc/router/tokens/tokens.types';
import styles from '../styles/currency-item.module.css';

interface CurrencyItemProps {
    item: Token;
}

export const TokenItem = ({ item }: CurrencyItemProps) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    return (
        <>
            <TableRow>
                <TableCell width={120}>
                    <TokenBox name={item.name} code={item.code} />
                </TableCell>
                <TableCell width={80}>{item.ticker}</TableCell>
                <TableCell width={200}>
                    {item.minIn} - {item.maxIn}
                </TableCell>
                <TableCell width={200}>
                    {item.minOut} - {item.maxOut}
                </TableCell>
                <TableCell width={100} className={styles.token_actions}>
                    <Button onClick={() => setOpenUpdate(true)} size="s" iconRight={<EditIcon size={16} />} />
                    <Button onClick={() => setOpenDelete(true)} size="s" iconRight={<DeleteIcon size={16} />} />
                </TableCell>
            </TableRow>
            <Modal open={openUpdate} title="Обновление токена" onClose={() => setOpenUpdate(false)}>
                <UpdateTokenForm token={item} onClose={() => setOpenUpdate(false)} />
            </Modal>
            <Modal open={openDelete} title="Вы уверены что хотите удалить токен?" onClose={() => setOpenDelete(false)}>
                <DeleteTokenForm code={item.code} onClose={() => setOpenDelete(false)} />
            </Modal>
        </>
    );
};
