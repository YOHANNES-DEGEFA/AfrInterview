import React from 'react';
import { Button, notification } from 'antd';

interface Props {
    title: string;
    text: string;
    duration: number;
}

const MyNotification: React.FC<Props> = ({ title, text, duration }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: 'Notification Title',
            description:
                'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
            duration: 0,
        });
    };
    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={openNotification}>
                Open the notification box
            </Button>
        </>
    );
};

export default MyNotification;
