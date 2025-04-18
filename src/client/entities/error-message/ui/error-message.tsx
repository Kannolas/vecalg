import { Typography } from '@plex-inc/bricks/components';

import styles from '../styles/error-message.module.css';

import ErrorIcon from '@/shared/assets/error-icon.svg';

interface ErrorMessageProps {
    error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
    return (
        <div className={styles.message_wrapper}>
            <ErrorIcon />
            <Typography.Text size="text_m" strong className={styles.text_secondary}>
                {error}
            </Typography.Text>
        </div>
    );
};
