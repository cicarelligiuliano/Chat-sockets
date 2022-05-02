import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../css/login-register.css';

export const AuthRouter = () => {
    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth.logged) {
            navigate('/');
        }
    }, [auth]);

    return (
        <div>
            <div className='limiter'>
                <div className='container-login100'>
                    <div className='wrap-login100 p-t-50 p-b-90'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
