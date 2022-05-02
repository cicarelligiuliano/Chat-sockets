import React from 'react';

const SidebarChatItem = () => {
    return (
        <div className='chat_list'>
            <div className='chat_people'>
                <div className='chat_img'>
                    <img
                        src='https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg'
                        alt='sunil'
                    />
                </div>
                <div className='chat_ib'>
                    <h5>Some random name</h5>
                    <span className='text-success'>Online</span>
                    <span className='text-danger'>Offline</span>
                </div>
            </div>
        </div>
    );
};

export default SidebarChatItem;
