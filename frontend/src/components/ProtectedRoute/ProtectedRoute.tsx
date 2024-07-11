import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { APP_NAV } from '../../utils/constants';

interface Props extends React.PropsWithChildren {
    isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
    if (!isAllowed) {
        return <Navigate to={APP_NAV.home} />;
    }

    return children as ReactElement;
};

export default ProtectedRoute;
