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
import { Suspense, useEffect } from 'react';
import axios from "axios";
import { Test } from './pages/TestPage/Test';
import ErrorBoundary from './components/ErrorBoundary';
import { InitData } from './components/InitData';


function App() {

  return (<>
    <GlobalStyle />
    <InitData />
    <AppBar />
    <ErrorBoundary fallback={<div><p>이런.. 부족한 개발 실력 땜에 에러남...</p><p>아직 부족한 부분이 많아요 😭 빠르게 수정해볼게요</p></div>}>
      <Suspense fallback={<div><img src={process.env.PUBLIC_URL + '/loading.gif'} /></div>}>
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
      </Suspense>
    </ErrorBoundary>
    <NavBar />
  </>)
}

export default App;