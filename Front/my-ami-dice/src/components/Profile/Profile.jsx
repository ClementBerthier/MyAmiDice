import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './style.scss'
import ModifyProfileModal from '../ModifyProfileModal/ModifyProfileModal';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

function Profile() {

  const [user, setUser] = useContext(UserContext);

  return (
        <>
        <Header />
        <div className='profile-container'>
          <div className='profile'>
            <h1>Mon Profil</h1>
            <div className='profile-pseudo'>
              <p>Pseudo: {user.pseudo}</p>
            </div>
            <div className='profile-firstName'>
              <p>Prénom: {user.firstname}</p>
            </div>
            <div className='profile-lastName'>
              <p>Nom: {user.lastname}</p>
            </div>
            <div className='profile-email'>
              <p>Email: {user.email} </p>
            </div>
            <ModifyProfileModal data={"Modifier votre Profil"} />
            {/* <div className='profile-password'>
              <p>Password  </p>
              <ModifyProfileModal data={"Modifier votre Password"} isPassword={true}/>
            </div> */}
            <div className='profile-delete'>
            <ModifyProfileModal data={"Vous êtes sur de vouloir supprimer votre compte?"} toDelete={true} />
            </div>
          </div>
        </div>
        <Footer />
        </>
  )
}

export default Profile
