import { FormControlInput } from '@plex-inc/bricks/components';
import { ComponentProps, forwardRef, useCallback, useState } from 'react';
import { EyeClosedStroke, EyeStroke } from '@plex-inc/icons';

interface InputPasswordProps extends ComponentProps<typeof FormControlInput> {
    copyValue?: string;
}

// eslint-disable-next-line react/display-name
export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>((props, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleShowPassword = useCallback(() => {
        setIsShowPassword((prev) => !prev);
    }, []);

    return (
        <FormControlInput
            ref={ref}
            type={isShowPassword ? 'text' : 'password'}
            iconRight={
                <span style={{ cursor: 'pointer' }} onClick={handleShowPassword}>
                    {isShowPassword ? <EyeStroke size={20} /> : <EyeClosedStroke size={20} />}
                </span>
            }
            {...props}
        />
    );
});
