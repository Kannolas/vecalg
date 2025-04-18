import { useForm } from 'react-hook-form';
import { Button, FormControl, FormControlInput, FormControlLabel } from '@plex-inc/bricks/components';

import { useDirectionsMutations } from '@/shared/modules/directionsHooks';

import styles from '../styles/updateDirectionForm.module.css';
import { Direction } from '../../../../trpc/router/directions/directions.types';

interface Inputs {
    margin: number;
}

interface Props {
    direction: Direction;
    onClose: () => void;
}
export const UpdateDirectionForm = ({ direction, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            margin: direction.margin,
        },
    });

    const { updateDirection } = useDirectionsMutations();

    const onSubmit = handleSubmit(async (data: Inputs) => {
        try {
            const res = await updateDirection({
                margin: Number(data.margin),
                pairId: direction.id,
                active: direction.active,
            });
            if (!res._isError) {
                onClose();
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    });
    return (
        <form onSubmit={onSubmit} className={styles.updateDirectionForm}>
            <FormControl>
                <FormControlLabel>Маржа</FormControlLabel>
                <FormControlInput
                    placeholder="Маржа"
                    size="l"
                    type="number"
                    variant="layer"
                    view={errors.margin?.message ? 'error' : 'default'}
                    {...register('margin', {
                        required: {
                            value: true,
                            message: 'Обязательное поле',
                        },
                    })}
                />
            </FormControl>

            <Button text="Сохранить" type="submit" view="brand" />
        </form>
    );
};
