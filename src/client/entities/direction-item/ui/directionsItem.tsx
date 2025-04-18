import { Button, Switch, TableCell, TableRow } from '@plex-inc/bricks/components';
import { useState } from 'react';

import { TokenBox } from '@/entities/token-box';
import { TOKEN_NAMES } from '@/shared/constants/bank-name';
import EditIcon from '@/shared/assets/edit.svg';
import DeleteIcon from '@/shared/assets/delete.svg';
import { Modal } from '@/shared/ui/modal';
import { UpdateDirectionForm } from '@/features/update-direction-form';
import { DeleteDirectionForm } from '@/features/delete-direction-form';
import { useDirectionsMutations } from '@/shared/modules/directionsHooks';

import styles from '../styles/directionsItem.module.css';
import { Direction } from '../../../../trpc/router/directions/directions.types';

interface Props {
    direction: Direction;
}
export const DirectionsItem = ({ direction }: Props) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isActive, setIsActive] = useState(direction.active);
    const { updateDirection } = useDirectionsMutations();
    const handleChangeStatus = async () => {
        try {
            const res = await updateDirection({ active: !isActive, pairId: direction.id, margin: direction.margin });
            if (!res._isError) {
                setIsActive((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <TableRow>
                <TableCell width={80}>{direction.id}</TableCell>
                <TableCell width={160}>
                    <TokenBox code={direction.from} name={TOKEN_NAMES[direction.from] || direction.from} />
                </TableCell>
                <TableCell width={160}>
                    <TokenBox code={direction.to} name={TOKEN_NAMES[direction.to] || direction.to} />
                </TableCell>
                <TableCell width={80}>{direction.margin}</TableCell>
                <TableCell width={140} className={styles.directions_actions}>
                    <Button onClick={() => setOpenUpdate(true)} size="s" iconRight={<EditIcon size={16} />} />
                    <Button onClick={() => setOpenDelete(true)} size="s" iconRight={<DeleteIcon size={16} />} />
                    <Switch size="m" checked={isActive} onChange={handleChangeStatus} />
                </TableCell>
            </TableRow>
            <Modal open={openUpdate} onClose={() => setOpenUpdate(false)} title="Обновить напраление">
                <UpdateDirectionForm onClose={() => setOpenUpdate(false)} direction={direction} />
            </Modal>
            <Modal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                title="Вы уверены что хотите удалить направление?"
            >
                <DeleteDirectionForm onClose={() => setOpenDelete(false)} id={direction.id} />
            </Modal>
        </>
    );
};
