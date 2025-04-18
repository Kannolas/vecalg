import { ReactNode } from 'react';

import styles from '../styles/container.module.css';
import { cn } from '../../../utils/cn';

const sizeMap = {
    s: styles.container_size_s,
    m: styles.container_size_m,
    l: styles.container_size_l,
    xl: styles.container_size_xl,
};

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: keyof typeof sizeMap;
}

export const Container = ({ children, className, size = 'l' }: ContainerProps) => {
    return <div className={cn(styles.wrapper, sizeMap[size], className)}>{children}</div>;
};
