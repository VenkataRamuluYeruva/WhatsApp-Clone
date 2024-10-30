import React, { useState } from "react";
import "./messageInput.css";

export default function MessageInput({sendMessage}) {
    const [message,setMessage]=useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        sendMessage(message);   
    }


    return (
        <div className="message-box-footer">
            <div className="message-box-footer-icons">
                <span class="material-symbols-outlined">insert_emoticon</span>
                <input type="file" name="image-file" id="image-file" style={{display:"none"}}/><label htmlFor='image-file' class="material-symbols-outlined">attach_file</label>
            </div>
            <form className="message-box-footer-input" onSubmit={handleSubmit}>
                <input type="text" placeholder="Type a message" value={message} onChange={(e)=>{
                    setMessage(e.target.value);

                }}/>
            </form>
            <div className="message-box-footer-icons">
                <span class="material-symbols-outlined">mic</span>
            </div>
        </div>
    )
}