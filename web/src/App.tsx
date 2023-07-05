import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Home from './pages/HomePage/Home';
import Chat from './pages/ChatPage/Chat';
import Write from './pages/WritePage/Write';
import Alarm from './pages/AlarmPage/Alarm';
import My from './pages/MyPage/My';
import GlobalStyle from './styles/GlobalStyle';
import { NavBar } from './components/NavBar';
import { AppBar } from './components/AppBar';
import Chating from './pages/ChatPage/Chating';
import Other from './pages/AlarmPage/Profile';
import { useEffect } from 'react';
import axios from "axios";
import { Test } from './pages/TestPage/Test';


function App() {

  return (<>
    <GlobalStyle />
    <AppBar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/test" element={<Test />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:roomNum" element={<Chating />} />
      <Route path="/write" element={<Write />} />
      <Route path="/alarm" element={<Alarm />} />
      <Route path="/my" element={<My />} />
      <Route path="/profile/:username" element={<Other />} />
    </Routes>
    <NavBar />
  </>)
}

export default App;