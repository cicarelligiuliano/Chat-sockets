import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { ChatSelect } from '../components/ChatSelect';
import InboxPeople from '../components/InboxPeople';
import { Messages } from '../components/Messages';
import { ChatContext } from '../context/chat/ChatContext';
import '../css/chat.css';

export const ChatPage = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);

    useEffect(() => {
        if (!auth.logged) {
            navigate('/auth/login');
        }
    }, [auth]);

    return (
        <div className='messaging'>
            <div className='inbox_msg'>
                {/* Inbox people inicio */}
                <InboxPeople />

                {chatState.chatActivo ? <Messages /> : <ChatSelect />}
            </div>
        </div>
    );
};
