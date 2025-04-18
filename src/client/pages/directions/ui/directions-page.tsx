import { Button, Table, TableCell, TableHead, Typography } from '@plex-inc/bricks/components';
import { useState } from 'react';

import { LayoutPage } from '@/app/layout-page';
import { useDirections } from '@/entities/direction-item/model/directionsItem.model';
import { DirectionsItem } from '@/entities/direction-item';
import { Modal } from '@/shared/ui/modal';
import { AddDirectionForm } from '@/features/add-direction-form';

import styles from '../styles/directions-page.module.css';

export const DirectionsPage = () => {
    const { directions } = useDirections();
    const [openAdd, setOpenAdd] = useState(false);
    return (
        <LayoutPage>
            <div className={styles.directions}>
                <div className={styles.directions_header}>
                    <Typography.Text size="text_header_1">Направления</Typography.Text>
                    <Button view="brand" text="Добавить направление" onClick={() => setOpenAdd(true)} />
                </div>
                <Table>
                    <TableHead>
                        <TableCell width={80}>ID</TableCell>
                        <TableCell width={160}>From</TableCell>
                        <TableCell width={160}>To</TableCell>
                        <TableCell width={80}>Маржа</TableCell>
                        <TableCell width={140}>Активный</TableCell>
                    </TableHead>
                    {directions.map((direction) => (
                        <DirectionsItem direction={direction} key={direction.id} />
                    ))}
                </Table>
            </div>
            <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Добавить направление">
                <AddDirectionForm onClose={() => setOpenAdd(false)} />
            </Modal>
        </LayoutPage>
    );
};
