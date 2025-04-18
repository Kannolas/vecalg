import React, { FC } from 'react';
import { Modal as CustomModal, ModalCloseButton, ModalHeader, ModalHeaderText } from '@plex-inc/bricks/components';
import { XStroke } from '@plex-inc/icons';

import { nullable } from '../../../utils/nullable';

interface Props {
    open: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
    title?: string;
    overlayClose?: boolean;
}

export const Modal: FC<Props> = ({ open, onClose, className, children, title, overlayClose = true }) => {
    return (
        <>
            <CustomModal className={className} isOpen={open} overlayClose={overlayClose} onClose={onClose}>
                <ModalHeader>
                    {nullable(
                        title,
                        (title) => (
                            <ModalHeaderText title={title} />
                        ),
                        <div></div>,
                    )}
                    <ModalCloseButton>
                        <XStroke size={20} onClick={onClose} />
                    </ModalCloseButton>
                </ModalHeader>
                {children}
            </CustomModal>
        </>
    );
};
