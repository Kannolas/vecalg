import { ReactNode } from 'react';

import styles from '../styles/box.module.css';
import { cn } from '../../../utils/cn';

interface BoxProps {
    children: ReactNode;
    className?: string;
}

export const Box = ({ children, className }: BoxProps) => {
    return <div className={cn(styles.wrapper, className)}>{children}</div>;
};
