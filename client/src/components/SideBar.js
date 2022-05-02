import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import SidebarChatItem from './SidebarChatItem';

export const SideBar = () => {
    const { chatState } = useContext(ChatContext);

    const { auth } = useContext(AuthContext);

    const { uid } = auth;

    return (
        <div className='inbox_chat'>
            {chatState.usuarios.map((usuario) => {
                if (usuario.uid !== uid) {
                    return <SidebarChatItem key={usuario.uid} usuario={usuario} />;
                }
            })}

            {/* Espacio extra para scroll */}
            <div className='extra_space'></div>
        </div>
    );
};
