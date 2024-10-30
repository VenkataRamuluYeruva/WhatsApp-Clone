import React, { useEffect, createContext, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import useApiServices from "../Utils/ApiServices";

const WebSocketContext = createContext();
export const useWebSocketContext = () => useContext(WebSocketContext);

export default function WebSocketContextProvider({ children}) {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const { UserDataAPI } = useApiServices();

    useEffect(() => {
        if (!userId) {
            navigate("/authentication/login");
        }
        async function getUserData() {
            await UserDataAPI(userId);
        }
        getUserData();
    }, [userId]);

    const socketUrl = `ws://localhost:?userId=${userId}`;
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("Connected to server");
        },
        onError: (event) => {
            console.log("Error:", event);
        },
        onClose: () => {
            console.log("Disconnected from server");
        },
        shouldReconnect: () => false,
    });

    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
}
