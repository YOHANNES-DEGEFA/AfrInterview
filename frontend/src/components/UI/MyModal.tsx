import React from 'react';
import { Modal } from 'antd';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    cancelText?: string;
}
const MyModal: React.FC<Props> = ({
    isOpen,
    onClose,
    children,
    cancelText,
}) => {
    return (
        <Modal
            title="Basic Modal"
            open={isOpen}
            onCancel={onClose}
            cancelText={cancelText || 'Close'}
        >
            {children}
        </Modal>
    );
};

export default MyModal;
