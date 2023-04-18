import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from '../../Context/UserContext';
import CreateGame from '../CreateGame/CreateGame';
import CreateNews from '../CreateNews.jsx/CreateNews';
import Demo from '../Demo/Demo';
import GameRoom from '../GameRoom/GameRoom';
import Home from '../Home/Home';
import HomeAdmin from '../HomeAdmin/HomeAdmin';
import HomeMember from '../HomeMember/HomeMember';
import Page404 from '../Page404/Page404';
import Profile from '../Profile/Profile'
import './style.scss'

function App() { 

  
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/user/" element={<HomeMember />} />
        <Route path="/home/profile/" element={<Profile />} />
        <Route path="/demo/" element={<Demo />} />
        <Route path="/home/creategame/" element={<CreateGame />} />
        <Route path="/home/createnews/" element={<CreateNews />} />
        <Route path="/home/gameroom/" element={<GameRoom />} /> 
        <Route path="/home/admin/" element={<HomeAdmin />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  )
}

export default App
