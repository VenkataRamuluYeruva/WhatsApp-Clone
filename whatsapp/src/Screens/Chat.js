import React,{useEffect, useState} from "react";
import "../styles/Chat.css";
import UserList from "../Components/userlist";
import Message from "../Screens/message";
import {Routes,Route, Navigate} from "react-router-dom";
import useApiServices from "../Utils/ApiServices";
 
export default function Chat() {
  const [isMobile,setIsmobile]=useState(window.innerWidth<=500);

  const userId = localStorage.getItem("userId");
  const { OtherUsersAPI } = useApiServices();

  useEffect(()=>{
    const fetchUsers = async (userId) => {
      await OtherUsersAPI(userId);
    }
    fetchUsers(userId);
    const handleResize=()=>{
      setIsmobile(window.innerWidth<=500)
    };
    window.addEventListener('resize',handleResize);
    return ()=>{
      window.removeEventListener('resize',handleResize);
    }
  },[]);


    return (
      <div className="Chat-Container">
        <UserList/>
        <Routes>
          <Route path="/" element={<Navigate to="/home/chat/message/0" />} />
          <Route path="/message/:id" element={<Message />} />
        </Routes>
        {/* {isMobile? (
          receiverName.length===0 ? (<UserList/>):(<Message receiverName={receiverName}/>)
        ):<>
        <UserList/>
        <Message receiverName={receiverName}/>
        </>
        } */}
        
      </div>
  );

}
