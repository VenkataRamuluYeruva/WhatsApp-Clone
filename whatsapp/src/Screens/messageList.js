import React from "react";
import "./messageList.css";
import { useSelector } from "react-redux";

export default function MessageList({ message }) {
    const data = useSelector((state) => state.user);
    const senderId = parseInt(message.senderId, 10);
    const userId = parseInt(data.userId, 10);
    if(senderId === userId){
        return (
            <div className="message-box-body-left">
                <img src="/whats-app.png" alt="whatsapp" />
                <div className="message-box-body-left-content message-box-content">
                    <p>{message.messagebody}{message.content}</p>
                </div>
            </div>
        )

    }
    else{
        return (
            <div className="message-box-body-right">
                <img src="/whats-app.png" alt="whatsapp" />
                <div className="message-box-body-right-content message-box-content">
                    <p>{message.messagebody}{message.content}</p>
                </div>
            </div>
        )
    }
    
}
