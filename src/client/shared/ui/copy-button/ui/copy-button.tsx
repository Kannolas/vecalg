import React, { useEffect, useState } from 'react';

import CopySuccessIcon from '@/shared/assets/tick.svg';
import CopyButtonIcon from '@/shared/assets/copy-button.svg';

import { nullable } from '../../../utils/nullable';

interface CopyButtonProps {
    value: string;
    size?: number;
    className?: string;
}

export const CopyButton = ({ className, value }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator?.clipboard?.writeText(value);
        setCopied(true);
    };

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => setCopied(false), 1000);
            return () => clearTimeout(timeout);
        }
    }, [copied]);

    return (
        <button className={className} style={{ cursor: 'pointer' }} type="button" onClick={copy}>
            <div>
                {nullable(
                    !copied,
                    () => (
                        <CopyButtonIcon />
                    ),
                    <CopySuccessIcon />,
                )}
            </div>
        </button>
    );
};
