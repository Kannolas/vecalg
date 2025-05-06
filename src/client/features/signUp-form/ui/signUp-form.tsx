import { Button, FormControl, FormControlInput, Typography } from '@plex-inc/bricks/components';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { signIn } from 'next-auth/react';

import { InputPassword } from '../../../shared/ui/input-password';
import { FormInputError } from '../../../shared/ui/form-input-error';
import { nullable } from '../../../shared/utils/nullable';
import { routes, useRouter } from '../../../shared/hooks/router';
import styles from '../style/signUp-form.module.css';
import { sendToast } from '../../../shared/ui/toast';

interface Inputs {
    email: string;
    password: string;
}

interface Props {
    onSignIn: () => void;
}

export const SignUpForm = ({ onSignIn }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const router = useRouter();

    const onSubmit = handleSubmit(async (data: Inputs) => {
        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: routes.tokens(),
            });

            if (res?.status === 200) {
                sendToast.success('Successful authorization');
                return router.tokens();
            }
            return sendToast.error('Authorization error');
        } catch (error) {
            sendToast.error('Authorization error');
            console.log('ERROR', error);
        }
    });

    return (
        <form onSubmit={onSubmit} className={styles.signInForm__blockForm}>
            <div className={styles.signInForm__blockForm_title}>
                <Typography.Text as="h1" strong size="text_header_1">
                    Авторизация
                </Typography.Text>
                <Typography.Text onClick={onSignIn} className={styles.Text__brand}>
                    Нет аккаунта?
                </Typography.Text>
            </div>
            <div className={styles.signInForm__blockForm_boxInputs}>
                <FormControl className={styles.signInForm__formControl}>
                    <FormControlInput
                        placeholder="Введите Email"
                        size="l"
                        view={errors.email?.message ? 'error' : 'default'}
                        variant="layer"
                        className={styles.signInForm__input}
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Обязательное поле',
                            },
                            minLength: {
                                value: 3,
                                message: 'Минимум 3 символа',
                            },
                            validate: {
                                isEmail: (value) => isEmail(value) || 'Неверный формат Email',
                            },
                        })}
                    />
                    {nullable(errors.email?.message && { message: errors.email?.message }, (error) => (
                        <FormInputError text={error.message} />
                    ))}
                </FormControl>
                <FormControl className={styles.signInForm__formControl}>
                    <InputPassword
                        placeholder="Введите пароль"
                        size="l"
                        variant="layer"
                        view={errors.password?.message ? 'error' : 'default'}
                        className={styles.signInForm__input}
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Обязательное поле',
                            },
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[./\-_$&!?,()@*%#])(?=.{8,})/,
                                message: 'Минимум 1 число, 1 заглавная буква и 1 символ (./-_$&!?,()@*%#)',
                            },
                            minLength: {
                                value: 8,
                                message: 'минимум 8 символов',
                            },
                            maxLength: {
                                value: 40,
                                message: 'Не более 40 символов',
                            },
                        })}
                    />
                    {nullable(errors.password?.message && { message: errors.password?.message }, (error) => (
                        <FormInputError text={error.message} />
                    ))}
                </FormControl>
            </div>
            <div className={styles.signInForm__blockForm_boxButton}>
                <Button type="submit" variant="primary" size="l" view="brand" text="Войти" />
            </div>
        </form>
    );
};
