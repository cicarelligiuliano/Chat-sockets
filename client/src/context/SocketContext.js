import { createContext, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth.logged) {
            conectarSocket();
        }
    }, [auth]);

    useEffect(() => {
        if (!auth.logged) {
            desconectarSocket();
        }
    }, [auth]);

    return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};