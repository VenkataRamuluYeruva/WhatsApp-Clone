import React from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

export default function Authscreen() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/authentication/login"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    )
}