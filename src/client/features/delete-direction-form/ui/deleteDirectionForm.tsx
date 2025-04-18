import { Button } from '@plex-inc/bricks/components';

import { useDirectionsMutations } from '@/shared/modules/directionsHooks';

interface Props {
    id: number;
    onClose: () => void;
}

export const DeleteDirectionForm = ({ id, onClose }: Props) => {
    const { deleteDirection } = useDirectionsMutations();
    const handleSubmit = async () => {
        try {
            const res = await deleteDirection(id);
            if (!res._isError) {
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return <Button view="danger" onClick={handleSubmit} text="Удалить" />;
};
