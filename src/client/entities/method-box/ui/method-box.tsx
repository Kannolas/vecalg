import Image from 'next/image';
import { Typography } from '@plex-inc/bricks/components';

import style from '../style/method-box.module.css';
import { TOKEN_NAMES } from '../../../shared/constants/bank-name';
import { STATUS } from '../../../shared/constants/status';

interface MethodBoxProps {
    bank: string;
    setMethod: (value: string) => void;
    setStatus: (value: STATUS) => void;
}

export const MethodBox = ({ bank, setMethod, setStatus }: MethodBoxProps) => {
    return (
        // eslint-disable-next-line no-sequences
        <div className={style.method_wrapper} onClick={() => (setMethod(bank), setStatus(STATUS.END))}>
            <Image src={`/currency/${bank}.svg`} alt="token" width={36} height={36} />
            <Typography.Text size="text_m" strong className={style.text_primary}>
                {TOKEN_NAMES[bank]}
            </Typography.Text>
        </div>
    );
};
