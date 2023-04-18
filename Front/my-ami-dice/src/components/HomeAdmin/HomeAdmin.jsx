import { useContext } from 'react';
import Footer from '../Footer/Footer';
import GameList from '../GameList/GameList';
import Header from '../Header/Header';
import NewMemberList from '../NewMemberList/NewMemberList';
import UsersList from '../UsersList/UsersList';
import { UserContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';

import './style.scss';

function HomeAdmin() {

  const [user, setUser] = useContext(UserContext);

// Est ce que l'utilisateur est admin
const isAdmin = user?.is_admin;
if(!isAdmin){
  return <Navigate to="/home/user" />
}

  return (
    <div className='home-admin'>
        <Header />
        <div className="lists-container">
          <div className="games-users-list">
            <GameList />
            <UsersList />
          </div>
          <div className="admin-news-list">
            <NewMemberList />
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default HomeAdmin