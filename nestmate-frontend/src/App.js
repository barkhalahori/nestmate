import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewListing from './pages/NewListing';
import Match from './pages/Match';
import Profile from './pages/Profile';
import Chatbot from './components/Chatbot';
import Payment from './pages/Payment';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listings/new" element={<NewListing />} />
        <Route path="/match" element={<Match />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        /<Route path="/payment" element={<Payment />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
