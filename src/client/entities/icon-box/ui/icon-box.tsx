import Image from 'next/image';
import { Typography } from '@plex-inc/bricks/components';

import { Option } from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/utils/cn';

import style from '../style/icon-box.module.css';

interface ConverterItemBoxProps {
    value: Option;
}

export const IconBox = ({ value }: ConverterItemBoxProps) => {
    return (
        <div className={style.converter_wrapper} key={value.value}>
            {value?.icon && <Image alt="" src={value?.icon} width={24} height={24} />}
            <Typography.Text className={cn(style.converter_item, style.text_primary)} strong size="text_l">
                {value.text ?? 'SBPRUB'}
            </Typography.Text>
        </div>
    );
};
