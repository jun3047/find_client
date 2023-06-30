import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Home from './pages/HomePage/Home';

function App() {
  return (
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
  </Routes>)
}

export default App;