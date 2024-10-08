import React, { useState } from 'react';
import Menu from "./Components/Menu";
import HomePage from "./Components/HomePage";
import LoginPage from './Components/Login';
import Profile from "./Components/Profile";
import Register from './Components/Register';
import Media from './Components/Media';
import JoinGroup from './Components/JoinGroup';
import ViewPosts from './Components/ViewPosts';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CreateGroup from './Components/CreateGroup';

const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
            <Route path="register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
            <Route path="login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
            <Route path="profile" element={<ProtectedRoute element={<Profile isLoggedIn={isLoggedIn} setUsername={userName} />} isLoggedIn={isLoggedIn} />} />
            <Route path="media" element={<ProtectedRoute element={<Media isLoggedIn={isLoggedIn} />} isLoggedIn={isLoggedIn} />} />
            <Route path="groups" element={<ProtectedRoute element={<CreateGroup isLoggedIn={isLoggedIn} />} isLoggedIn={isLoggedIn} />} />
            <Route path="join-groups" element={<ProtectedRoute element={<JoinGroup isLoggedIn={isLoggedIn} />} isLoggedIn={isLoggedIn} />} />
            <Route path="view-posts" element={<ProtectedRoute element={<ViewPosts isLoggedIn={isLoggedIn} />} isLoggedIn={isLoggedIn} />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
};

export default App;
