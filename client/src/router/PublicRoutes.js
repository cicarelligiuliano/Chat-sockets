import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicRoutes = ({ isAuthenticated, component: Component, ...rest }) => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default PublicRoutes;
