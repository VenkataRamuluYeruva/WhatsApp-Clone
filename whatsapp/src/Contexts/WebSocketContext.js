import React, { useEffect, createContext, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import useApiServices from "../Utils/ApiServices";
import { useSelector,useDispatch } from "react-redux";
import { usersDisputch } from "../Redux/actions/Login";

const WebSocketContext = createContext();
export const useWebSocketContext = () => useContext(WebSocketContext);

export default function WebSocketContextProvider({ children}) {
    const userId = useSelector((state) => state.login.data.userId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) {
            navigate("/authentication/login");
        }
        dispatch(usersDisputch(userId));
    }, [userId]);

    const socketUrl = `ws://localhost:4000?userId=${userId}`;
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
