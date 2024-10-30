import React from 'react';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import Authscreen from './Screens/Authscreen';
import Notification from './Components/Notification';
import Home from './Screens/home';
import WebSocketContextProvider from './Contexts/WebSocketContext';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Notification/>
        <Routes>
          <Route path="/" element={< Navigate to="/authentication/login"/>} />
          <Route path="/authentication/*" element={<Authscreen />} />
          <Route path="/home/*" 
            element={
              <WebSocketContextProvider>
                <Home/>
              </WebSocketContextProvider>
            }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;





