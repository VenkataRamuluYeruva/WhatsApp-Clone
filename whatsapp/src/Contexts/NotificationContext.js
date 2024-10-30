import React,{useState,createContext,useContext} from "react";

const NotificationContext=createContext();

export const useNotification=()=>useContext(NotificationContext);

export const NotificationContextProvider=({children})=>{
    const [notification,setNotification]=useState(null);

    const showNotification=(message,type)=>{
        setNotification({message,type});
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }

    const hideNotification=()=>{
        setNotification(null);
    }
    return(
        <NotificationContext.Provider value={{notification,showNotification,hideNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}

