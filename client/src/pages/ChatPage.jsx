import React from 'react';
import { ChatSelect } from '../components/ChatSelect';
import InboxPeople from '../components/InboxPeople';
import { Messages } from '../components/Messages';
import '../css/chat.css';

export const ChatPage = () => {
    return (
        <div className='messaging'>
            <div className='inbox_msg'>
                {/* Inbox people inicio */}
                <InboxPeople />

                {true ? <ChatSelect /> : <Messages />}
            </div>
        </div>
    );
};
