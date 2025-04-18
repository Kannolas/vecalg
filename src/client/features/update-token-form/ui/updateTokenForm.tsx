import { useForm } from 'react-hook-form';
import { Button, FormControl, FormControlInput, FormControlLabel } from '@plex-inc/bricks/components';

import { useTokensMutations } from '@/shared/modules/tokensHooks';

import styles from '../styles/updateTokenForm.module.css';
import { Token } from '../../../../trpc/router/tokens/tokens.types';

interface Inputs {
    minIn: number;
    maxIn: number;
    minOut: number;
    maxOut: number;
}

interface Props {
    token: Token;
    onClose: () => void;
}
export const UpdateTokenForm = ({ token, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            minIn: token.minIn,
            maxIn: token.maxIn,
            minOut: token.minOut,
            maxOut: token.maxOut,
        },
    });

    const { updateToken } = useTokensMutations();

    const onSubmit = handleSubmit(async (data: Inputs) => {
        try {
            const res = await updateToken({ ...data, tokenCode: token.code });
            if (!res._isError) {
                onClose();
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    });
    return (
        <form onSubmit={onSubmit} className={styles.updateTokenForm}>
            <div className={styles.updateTokenForm_inputs}>
                <FormControl>
                    <FormControlLabel>Мин лимит IN в {token.ticker}</FormControlLabel>
                    <FormControlInput
                        placeholder="Мин лимит"
                        size="l"
                        type="number"
                        variant="layer"
                        view={errors.minIn?.message ? 'error' : 'default'}
                        {...register('minIn', {
                            required: {
                                value: true,
                                message: 'Обязательное поле',
                            },
                        })}
                    />
                </FormControl>

                <FormControl>
                    <FormControlLabel>Макс лимит IN в {token.ticker}</FormControlLabel>
                    <FormControlInput
                        placeholder="Макс лимит"
                        size="l"
                        type="number"
                        variant="layer"
                        view={errors.minIn?.message ? 'error' : 'default'}
                        {...register('maxIn', {
                            required: {
                                value: true,
                                message: 'Обязательное поле',
                            },
                        })}
                    />
                </FormControl>

                <FormControl>
                    <FormControlLabel>Мин лимит Out в {token.ticker}</FormControlLabel>
                    <FormControlInput
                        placeholder="Мин лимит"
                        size="l"
                        type="number"
                        variant="layer"
                        view={errors.minIn?.message ? 'error' : 'default'}
                        {...register('minOut', {
                            required: {
                                value: true,
                                message: 'Обязательное поле',
                            },
                        })}
                    />
                </FormControl>

                <FormControl>
                    <FormControlLabel>Макс лимит Out в {token.ticker}</FormControlLabel>
                    <FormControlInput
                        placeholder="Макс лимит"
                        size="l"
                        type="number"
                        variant="layer"
                        view={errors.minIn?.message ? 'error' : 'default'}
                        {...register('maxOut', {
                            required: {
                                value: true,
                                message: 'Обязательное поле',
                            },
                        })}
                    />
                </FormControl>
            </div>
            <Button text="Сохранить" type="submit" view="brand" />
        </form>
    );
};
