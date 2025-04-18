import React, { FC } from 'react';
import toasts, { Toast as ToastProps } from 'react-hot-toast';
import { XCircleStroke, InfoCircleStroke, ExclamationCircleStroke, LoaderStroke, XSmallStroke } from '@plex-inc/icons';
import { Typography } from '@plex-inc/bricks/components';

import CheckIcon from '@/shared/assets/tick.svg';

import style from '../style/toast.module.css';
import { cn } from '../../../utils/cn';
import { NotificationEvents } from '../../../utils/notifications/notificationsMap';

export interface HandleToastProps {
    data: ToastProps;
    message: string | React.ReactNode;
    type: 'info' | 'success' | 'error' | 'loading' | 'warning' | NotificationEvents;
}

export interface PromiseToastOptions {
    loading: string;
    success: string;
    error: string;
    duration?: number;
}

export const Toast: FC<HandleToastProps> = ({ data, message, type }) => {
    return (
        <div
            className={cn(
                style.Toast_wrapper,
                {
                    [style.Toast__animate_enter]: data.visible,
                },
                {
                    [style.Toast__animate_leave]: !data.visible,
                },
            )}
        >
            <div className={style.Toast__content}>
                {type && (
                    <div className={style.Toast__content_block}>
                        {type === 'warning' && (
                            <ExclamationCircleStroke size={24} className={style.Toast__contentBlock_warning} />
                        )}
                        {type === 'error' && <XCircleStroke size={24} className={style.Toast__contentBlock_error} />}
                        {type === 'success' && (
                            <CheckIcon size={24} width={24} height={24} className={style.Toast__contentBlock_success} />
                        )}
                        {type === 'info' && <InfoCircleStroke size={24} className={style.Toast__contentBlock_info} />}
                        {type === 'loading' && <LoaderStroke size={24} className={style.Toast__contentBlock_loading} />}
                    </div>
                )}
                <Typography.Text className={style.Toast__contentBlock_message}>{message}</Typography.Text>
            </div>
            <button className={style.Toast__button_onClose} onClick={() => toasts.dismiss(data?.id)}>
                <XSmallStroke size={20} />
            </button>
        </div>
    );
};

export function handleToast<T>(
    messageOrPromise: string | React.ReactNode | Promise<T>,
    options?: PromiseToastOptions | 'error' | 'info' | 'success' | 'loading' | 'warning',
) {
    const promiseOptions = options as PromiseToastOptions;
    if (messageOrPromise instanceof Promise && options && typeof options !== 'string') {
        // Обработка Promise
        const toastId = toasts.custom((t) => (
            <Toast type="loading" message={promiseOptions.loading as string} data={t} />
        ));

        messageOrPromise
            .then(() => {
                toasts.custom((t) => <Toast type="success" message={promiseOptions.success} data={t} />, {
                    id: toastId,
                    duration: promiseOptions.duration || 5000,
                });
            })
            .catch(() => {
                toasts.custom((t) => <Toast type="error" message={promiseOptions.error} data={t} />, {
                    id: toastId,
                    duration: promiseOptions.duration || 5000,
                });
            });
    } else {
        // Обработка обычного сообщения
        toasts.custom(
            (t) => (
                <Toast
                    type={options as 'error' | 'info' | 'success' | 'loading' | 'warning'}
                    message={messageOrPromise as string}
                    data={t}
                />
            ),
            {
                duration: promiseOptions.duration || 5000,
            },
        );
    }
}

export const sendToast = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint
    promise: <T extends any>(promise: Promise<T>, options: PromiseToastOptions) => handleToast(promise, options),
    default: (message: string | React.ReactNode) => handleToast(message),
    loading: (message: string | React.ReactNode) => handleToast(message, 'loading'),
    warning: (message: string | React.ReactNode) => handleToast(message, 'warning'),
    info: (message: string | React.ReactNode) => handleToast(message, 'info'),
    success: (message: string | React.ReactNode) => handleToast(message, 'success'),
    error: (message: string | React.ReactNode) => handleToast(message, 'error'),
};
