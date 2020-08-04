import React from 'react';

import Infobar from './Infobar';
import Input from './Input';
import Messages from './Messages';


const Chat = ({ name, room, message, messages, send_message, set_message }) => {
    return (
        <div className="container">
            <Infobar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={set_message} sendMessage={send_message}/>
        </div>
    )
}

export default Chat;