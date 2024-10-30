import React from "react";
import '../styles/User.css';
import { useNavigate } from "react-router-dom";

export default function User({user}) {
  const navigate = useNavigate();
  return (
    <div className="Userlist-List-Item" onClick={()=>navigate(`/home/chat/message/${user.id}`)}>
      <div className="Userlist-List-Item-Image">
        <img src="/whats-app.png" alt='whatsapp-ocppm'/>
      </div>
      <div className="Userlist-List-Item-Text">
        <p style={{fontSize:17,color:'rgba(0,0,0,0.9)',fontFamily:'inherit'}}>{user.username}</p>
        <p style={{fontSize:12}}>Hey! How are you?</p>
      </div>
      <div className="Userlist-List-Item-Time">
        <p>12:00</p>
      </div>
    </div>
  );
}