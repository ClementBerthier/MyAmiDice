import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import InviteModal from '../InviteModal/InviteModal'
import LoginSigninModal from '../LoginSigninModal/LoginSigninModal';
import {UserContext} from '../../Context/UserContext';

import './style.scss';


function Header() {

  const [user, setUser] = useContext(UserContext);
  const areUser = localStorage.getItem("User")

  const location = useLocation();
  
  // On vérifie l'url pour savoir sur quelle page l'utilisateur est
  const onProfile = location.pathname.includes("profile");
  const onDemo = location.pathname.includes("demo");
  const onCreateGame = location.pathname.includes("creategame");
  const onCreateNews = location.pathname.includes("createnews");

  // Est ce que l'utilisateur est admin
  const isAdmin = user?.is_admin;
  let isGameInvite = null
  if(user){
    isGameInvite = user.games_invite
  }

  return (
    <header className='header'>
        <div className='header-container'>

          {/*  Affiche le bouton Accueil lorsque l'utilisateur est sur la page Profil, Démo ou CreateGame, avec la redirection appropriée */ }
          { onDemo ? <div><Button as={NavLink} to="/" className="home-button">Accueil</Button></div> : null }
          { onCreateGame ? <div><Button as={NavLink} to="/home/user" className="home-button">Accueil</Button></div> : null } 
          { (onProfile && isAdmin) || onCreateNews ? <div><Button as={NavLink} to="/home/admin" className="home-button">Accueil</Button></div> : null } 
          { (onProfile && !isAdmin) ? <div><Button as={NavLink} to="/home/user" className="home-button">Accueil</Button></div> : null } 

          { isGameInvite? <InviteModal
                        masterName={user.games_invite[0].pseudo}
                        gameName={user.games_invite[0].name} />
                        :
                        null }

          <h1 className='header-container-title'>
              MyAmiDice
          </h1>
          { user? <Button as={NavLink} to="/home/profile">Mon Profil</Button> : null}          
          <LoginSigninModal className='header-container-buttonconnect' negative />

        </div>
        
    </header>
  )
}

export default Header