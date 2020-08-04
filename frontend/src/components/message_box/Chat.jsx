import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Infobar from './Infobar';
import Input from './Input';
import Messages from './Messages';

let socket;

const Chat = ({ name, room, message, messages, send_message, set_message }) => {
    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    // const ENDPOINT = 'http://localhost:5000';

    // useEffect(() => {
    //     const {name, room} = queryString.parse(location.search);
    //     socket = io(ENDPOINT);

    //     setName(name);
    //     setRoom(room);

    //     socket.emit('join', { name, room },  (error) => {
    //     });
    //     // third param corresponds to the third param of the handler on the server side.
    //     // this lets us call functions defined by the client side that we pass to the server, as a callback

    //     return () => {
    //         socket.emit('disconnect');
    //         socket.off();
    //         // this will turn off this instance of the socket
    //     }
    // }, [ENDPOINT, location.search]);

    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         setMessages([...messages, message]);
    //     });
    // }, [messages]);

    // const sendMessage = (event) => {
    //     event.preventDefault();
    //     if(message) {
    //         socket.emit('sendMessage', message, () => setMessage(''));
    //     }
    // }


    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={set_message} sendMessage={send_message}/>
            </div>
        </div>
    )
}

export default Chat;