import React from "react";  
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Chat from "../Screens/Chat";
import '../styles/home.css';
import { useSelector } from "react-redux";

export default function Home() {
    const userData = useSelector(state => state.user.userDetails);

    return (
        <div className='home-container'>
            <div className="Header">
                <div className='header-title-home'>
                    <img src="/WhatsApp-icon.png" alt="whatsapp" />
                    <p>whatsapp</p>
                </div>
                <div className='header-user'>
                    <p>{userData ? userData.username : "Guest"}</p> {/* Conditional check here */}
                    <span className="material-symbols-outlined">person</span> 
                </div>
            </div>
            <div className="Content">
                <div className='side-bar'>
                    <ul className="first">
                        <li className="menu"><span className="material-symbols-outlined">menu</span></li>
                        <li><Link to='/home/chat'><span className="material-symbols-outlined">chat</span></Link></li>
                        <li><Link to='/home/contact'><span className="material-symbols-outlined">phone_enabled</span></Link></li>
                    </ul>
                    <ul className="last">
                        <li><span className="material-symbols-outlined">settings</span></li>
                        <li onClick={() => {
                            localStorage.removeItem('userId');
                            localStorage.removeItem('accessToken');
                        }}><span className="material-symbols-outlined">person</span></li>
                    </ul>
                </div>
                <div className='Chat-content'>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home/chat" />} />
                        <Route path="/chat/*" element={<Chat />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
