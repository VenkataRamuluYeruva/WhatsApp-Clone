import React,{useState,useEffect} from "react";
import { useNotification } from "../Contexts/NotificationContext";
import '../styles/Notification.css';

export default function Alert({alertmessage}){
    const {notification,hideNotification}=useNotification();

    if (!notification){
        return null;
    }
    return(

        <div className={`Notification ${notification.type}`}>
            <p className="message">{notification.message}</p>
        </div>
    )
}