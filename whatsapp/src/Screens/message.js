import React, {} from "react";
import "../styles/Messages.css";
import { useParams} from "react-router-dom";

export default function Message({ receiverName}) {
  const { id } = useParams();

  if (parseInt(id) === 0) {
    return (
      <div className="message-container">
        <div className="content">
          <img src="/whats-app.png" alt="whatsapp" />
          <h4>Chat Applications for Window</h4>
          <p>Send and receive messages without keeping your website online</p>
          <p>We provide encoding and decoding for your data to keep it secure from cyber attackers</p>
        </div>
      </div>
    );
  }
    
  return (
    // <>
    //   <div className="message-box">

    //     <div className="message-box-header">

    //       <div className="message-box-header-left">
    //         <div className="image">
    //           <span className="material-symbols-outlined">arrow_back</span>
    //           <img src="/whats-app.png" alt="whatsapp" />
    //         </div>
    //         <div className="message-box-username">
    //           <p className="username">{receiverName}</p>
    //           <p className="last-message">hello</p>
    //         </div>
    //       </div>

    //       <div className="message-box-header-right">
    //         <button className="call-icons"><span className="material-symbols-outlined">videocam</span></button>
    //         <button className="call-icons"><span className="material-symbols-outlined">phone</span></button>
    //         <button className="call-icons"><span className="material-symbols-outlined">search</span></button>
    //       </div>
    //     </div>

    //     <div className="message-box-body">
    //       {/* {allMessages.map((msg, index) => (
    //         <MessageList key={index} message={msg} />
    //       ))}
    //     </div>
    //     <MessageInput sendMessage={handleMessagesend} /> */}
    // </div>
    <div>hello</div>
  );
}
