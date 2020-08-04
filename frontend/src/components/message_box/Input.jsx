import React from 'react';

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form className="inputbar">
            <input className="input"
            type="text"
            placeholder="Type a message..."
            value={message} 
            onChange={(event) => setMessage(event, event.target.value)}
            onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null}/>
            <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
        </form>
    )
}

export default Input;