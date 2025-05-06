import { ReactNode } from 'react';
import { Typography } from '@plex-inc/bricks/components';

import { nullable } from '@/shared/utils/nullable';

import styles from '../styles/box.module.css';
import { cn } from '../../../utils/cn';

interface BoxProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

export const Box = ({ children, className, title }: BoxProps) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            {nullable(title, (title) => (
                <Typography.Text size="text_header_2">{title}</Typography.Text>
            ))}
            {children}
        </div>
    );
};
