import { useForm } from 'react-hook-form';
import { Button, FormControl, FormControlInput, FormControlLabel } from '@plex-inc/bricks/components';
import { useState } from 'react';

import { DropdownMenu } from '@/shared/ui/dropdown-menu';
import { TOKEN_NAMES } from '@/shared/constants/bank-name';
import { useDirectionsMutations } from '@/shared/modules/directionsHooks';

import styles from '../styles/addDirectionForm.module.css';

interface Props {
    onClose: () => void;
}

interface Inputs {
    margin: number;
}

export const AddDirectionForm = ({ onClose }: Props) => {
    const options = Object.keys(TOKEN_NAMES).map((key) => ({
        text: TOKEN_NAMES[key],
        value: key,
        icon: `/currency/${key}.svg`,
    }));
    const [from, setFrom] = useState(options[0]);
    const [to, setTo] = useState({ value: 'USDTTRC', text: TOKEN_NAMES.USDTTRC, icon: '/currency/USDTTRC.svg' });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const { addDirection } = useDirectionsMutations();
    const onSubmit = handleSubmit(async (data: Inputs) => {
        try {
            const res = await addDirection({
                margin: Number(data.margin),
                from: from.value,
                to: to.value,
                active: false,
            });
            if (!res._isError) {
                onClose();
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    });
    return (
        <form onSubmit={onSubmit} className={styles.addDirectionForm}>
            <FormControl>
                <FormControlLabel>Маржа</FormControlLabel>
                <FormControlInput
                    placeholder="Маржа"
                    size="l"
                    variant="layer"
                    type="number"
                    view={errors.margin?.message ? 'error' : 'default'}
                    {...register('margin', {
                        required: {
                            value: true,
                            message: 'Обязательное поле',
                        },
                    })}
                />
            </FormControl>

            <div className={styles.addDirectionForm_limits}>
                <FormControl>
                    <FormControlLabel>From</FormControlLabel>
                    <DropdownMenu search options={options} value={from} onChange={(value) => setFrom(value)} />
                </FormControl>
                <FormControl>
                    <FormControlLabel>To</FormControlLabel>
                    <DropdownMenu search options={options} value={to} onChange={(value) => setTo(value)} />
                </FormControl>
            </div>
            <Button text="Добавить" type="submit" view="brand" />
        </form>
    );
};
