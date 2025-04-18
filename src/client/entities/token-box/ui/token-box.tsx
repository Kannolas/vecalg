import Image from 'next/image';
import { Typography } from '@plex-inc/bricks/components';
import { ComponentProps } from 'react';

import { nullable } from '../../../shared/utils/nullable';
import styles from '../styles/token-box.module.css';
import { Skeleton } from '../../../shared/ui/skeleton/ui/skeleton';

interface ItokenParams {
    imageSize: number;
    name: ComponentProps<typeof Typography.Text>['size'];
    description: ComponentProps<typeof Typography.Text>['size'];
}

const sizeMap: Record<'xs' | 's' | 'm', ItokenParams> = {
    xs: {
        imageSize: 20,
        name: 'text_m',
        description: 'text_s',
    },
    s: {
        imageSize: 32,
        name: 'text_m',
        description: 'text_s',
    },
    m: {
        imageSize: 40,
        name: 'text_l',
        description: 'text_m',
    },
};

interface TokenBoxProps {
    code: string;
    name: string;
    size?: keyof typeof sizeMap;
}

export const TokenBox = ({ code, name, size = 's' }: TokenBoxProps) => {
    return (
        <>
            {!code || !name ? (
                <div className={styles.item_token}>
                    <Skeleton width={40} height={40} borderRadius={300} />
                    <div className={styles.item_box}>
                        <Skeleton width={50} height={24} borderRadius={8} />
                    </div>
                </div>
            ) : (
                <div className={styles.item_token}>
                    <Image
                        src={`/currency/${code}.svg`}
                        alt="token"
                        width={sizeMap[size].imageSize}
                        height={sizeMap[size].imageSize}
                    />
                    <div className={styles.item_box}>
                        {nullable(
                            name,
                            () => (
                                <Typography.Text size={sizeMap[size].name} strong className={styles.text_primary}>
                                    {name}
                                </Typography.Text>
                            ),
                            <Typography.Text size={sizeMap[size].name} strong className={styles.text_primary}>
                                {code}
                            </Typography.Text>,
                        )}
                        {nullable(code, () => (
                            <Typography.Text size={sizeMap[size].description} className={styles.text_secondary}>
                                {code}
                            </Typography.Text>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
