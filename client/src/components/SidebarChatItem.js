import React, { useContext, useEffect } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from '../types/types';

const SidebarChatItem = ({ usuario }) => {
    const { nombre, online, uid } = usuario;

    const { chatState, dispatch } = useContext(ChatContext);
    const { chatActivo } = chatState;

    const onClick = async () => {
        dispatch({
            type: types.activarChat,
            payload: uid,
        });

        //Cargar mensajes del chat
        const resp = await fetchConToken(`mensajes/${usuario.uid}`);

        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes,
        });
    };

    useEffect(() => {
        scrollToBottom('mensajes');
    }, [chatState.mensajes]);

    return (
        <div onClick={onClick} className={`chat_list ${uid === chatActivo && 'active_chat'}`}>
            <div className='chat_people'>
                <div className='chat_img'>
                    <img
                        src='https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg'
                        alt='sunil'
                    />
                </div>
                <div className='chat_ib'>
                    <h5>{nombre}</h5>
                    {online ? (
                        <span className='text-success'>Online</span>
                    ) : (
                        <span className='text-danger'>Offline</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidebarChatItem;
