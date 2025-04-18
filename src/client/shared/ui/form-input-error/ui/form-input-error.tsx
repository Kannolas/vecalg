import { Typography } from '@plex-inc/bricks/components';

import style from '../styles/form-input-error.module.css';

interface FormInputError {
    text: React.ReactNode;
}

export const FormInputError = ({ text }: FormInputError) => {
    return (
        <Typography.Text size="text_s" className={style.formInputText}>
            {text}
        </Typography.Text>
    );
};
