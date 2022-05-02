import React, { useContext, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { ChatPage } from '../pages/ChatPage';
import { LoginPage } from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    const { auth, verificaToken } = useContext(AuthContext);

    useEffect(() => {
        verificaToken();
    }, []);

    if (auth.checking) {
        return <h1>Espere porfavor</h1>;
    }

    return (
        <Router>
            <Routes>
                <Route path='/auth' element={<AuthRouter  />}>
                    <Route exact path='login' element={<LoginPage />} />
                    <Route exact path='register' element={<RegisterPage />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Route>

                <Route exact path='/' element={<ChatPage />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </Router>
    );
};
