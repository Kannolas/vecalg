import { useForm } from 'react-hook-form';
import { Button, FormControl, FormControlInput, FormControlLabel } from '@plex-inc/bricks/components';
import { useMemo, useState } from 'react';

import { DropdownMenu } from '@/shared/ui/dropdown-menu';
import { FIAT_TOKENS, TOKENS_NAME } from '@/shared/constants/token-name';
import { useTokensMutations } from '@/shared/modules/tokensHooks';
import { useChains } from '@/entities/chain/model/chains.model';

import styles from '../styles/addTokenForm.module.css';

interface Props {
    onClose: () => void;
}

interface Inputs {
    code: string;
    name: string;
    pcName: string;
    minIn: number;
    maxIn: number;
    minOut: number;
    maxOut: number;
}

export const AddTokenForm = ({ onClose }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const { chains } = useChains();
    const [chain, setChain] = useState({ value: 'FIAT', text: 'FIAT' });
    const chainsOptions = useMemo(() => chains?.map((item) => ({ text: item, value: item })) || [], [chains]);
    const decimals = -2;
    const { addToken } = useTokensMutations();
    const fiatOptions = FIAT_TOKENS.map((token) => ({
        value: token,
        text: TOKENS_NAME[token],
        icon: `/currency/${token}.svg`,
    }));
    const [ticker, setTicker] = useState(fiatOptions[0]);
    const onSubmit = handleSubmit(async (data: Inputs) => {
        try {
            const res = await addToken({
                ...data,
                minIn: Number(data.minIn),
                maxIn: Number(data.maxIn),
                minOut: Number(data.minOut),
                maxOut: Number(data.maxOut),
                decimals,
                chain: chain.value,
                ticker: ticker.value,
            });
            if (!res._isError) {
                onClose();
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    });
    return (
        <form onSubmit={onSubmit} className={styles.addTokenForm}>
            <FormControl>
                <FormControlLabel>Код</FormControlLabel>
                <FormControlInput
                    placeholder="Код"
                    size="l"
                    variant="layer"
                    view={errors.code?.message ? 'error' : 'default'}
                    {...register('code', {
                        required: {
                            value: true,
                            message: 'Обязательное поле',
                        },
                    })}
                />
            </FormControl>

            <FormControl>
                <FormControlLabel>Название</FormControlLabel>
                <FormControlInput
                    placeholder="Название"
                    size="l"
                    variant="layer"
                    view={errors.name?.message ? 'error' : 'default'}
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Обязательное поле',
                        },
                    })}
                />
            </FormControl>

            <FormControl>
                <FormControlLabel>pcName</FormControlLabel>
                <FormControlInput
                    placeholder="pcName"
                    size="l"
                    variant="layer"
                    view={errors.pcName?.message ? 'error' : 'default'}
                    {...register('pcName', {
                        required: {
                            value: true,
                            message: 'Обязательное поле',
                        },
                    })}
                />
            </FormControl>

            <div className={styles.addTokenForm_limits}>
                <FormControl>
                    <FormControlLabel>Валюта</FormControlLabel>
                    <DropdownMenu options={fiatOptions} value={ticker} onChange={(value) => setTicker(value)} />
                </FormControl>
                <FormControl>
                    <FormControlLabel>Сеть</FormControlLabel>
                    <DropdownMenu options={chainsOptions} value={chain} onChange={(value) => setChain(value)} />
                </FormControl>
                <FormControl>
                    <FormControlLabel>Мин лимит IN</FormControlLabel>
                    <FormControlInput
                        placeholder="Мин лимит"
                        size="l"
                        variant="layer"
                        type="number"
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
                    <FormControlLabel>Макс лимит IN</FormControlLabel>
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
                    <FormControlLabel>Мин лимит Out</FormControlLabel>
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
                    <FormControlLabel>Макс лимит Out</FormControlLabel>
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
            <Button text="Добавить" type="submit" view="brand" />
        </form>
    );
};
