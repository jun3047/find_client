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
import PrivateRoute from './routes/PrivateRoute';
import { useUserInfo } from './store/userInfo';
import { Terms } from './pages/TermsPage/Terms';


function App() {

  const {userInfo} = useUserInfo()  

  return (<>
    <GlobalStyle />
    <AppBar />
    {userInfo._id !== 0 && <InitData />}
    <ErrorBoundary fallback={<div><p>이런.. 부족한 개발 실력 땜에 에러남...</p><p>아직 부족한 부분이 많아요 😭 빠르게 수정해볼게요</p></div>}>
      <Suspense fallback={<div><img src={process.env.PUBLIC_URL + '/loading.gif'} /></div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/test" element={<Test />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route path="/chat" element={<PrivateRoute component={Chat} />} />
          <Route path="/chat/:roomId" element={<PrivateRoute component={Chating} />} />
          <Route path="/write" element={<PrivateRoute component={Write} />} />
          <Route path="/alarm" element={<PrivateRoute component={Alarm} />} />
          <Route path="/my" element={<PrivateRoute component={My} />} />
          <Route path="/profile/:_id" element={<Other />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
    <NavBar />
  </>)
}

export default App;