import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isAuthenticated, component: Component, ...rest }) => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default PrivateRoutes;
