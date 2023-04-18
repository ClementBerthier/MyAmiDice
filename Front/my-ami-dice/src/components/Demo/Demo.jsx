import React from 'react';

import './style.scss';
import logo1 from '../../assets/images/dicegenerator.png'
import logo2 from '../../assets/images/chatroom.png'
import logo3 from '../../assets/images/ficheperso.png'
import logo4 from '../../assets/images/gameroom.png'
import logo5 from '../../assets/images/mapmonde.png'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Demo() {


  return (
    <div className='home'>
      <Header />
        <div className='feature'>
          
              <div className='feature-container'>
                <div className='feature-container-text'>
                  Un générateur de dés allant de D4 à D100, le résultat de chaque dés est envoyé dans un système de chat. Un sytème d'envoi privé et public est présent permettant au joueur d'envoyé un resultat de dés de manière cacher au maitre du jeu.  
                </div>
                <img className='feature-container-image' src={logo1} alt="logo-MyAmiDice" />
              </div>
          
            <div className='feature-container'>
              <img className='feature-container-image' src={logo2} alt="logo-MyAmiDice" />
              <div className='feature-container-text'>
                Un système de chat en temps réel permettant aux joueurs de discuter ensemble dans un salon général, ou en privée entre eux ou avec le maitre du jeu. 
              </div>
            </div>
            
            <div className='feature-container'>
              <div className='feature-container-text'>
                Une fiche de personnage dynamique et modifiable detaillant le personnage créer par l'utilisateur. La fiche perso est visible sur le systeme de partie appelé Gameroom ainsi que sur la page d'acceuil de l'utilisateur.
              </div>
              <img className='feature-container-image' src={logo3} alt="logo-MyAmiDice" />
            </div>

            <div className='feature-container'>
              <img className='feature-container-image' src={logo4} alt="logo-MyAmiDice" />
              <div className='feature-container-text'>
              La Gameroom est un outil permettant au joueur et au maitre du jeu de réaliser leur partie de jeu de role. Elle contient le générateur de dés, un systeme de note en temps reel, un chat en temps reel, la ou les fiches des persoonages, les avatard de chaque personnage ainsi qu'une map sur laquelle la partie est joué.
              </div>
            </div>

            <div className='feature-container'>
              <div className='feature-container-text'>
              Un systeme d'importation de fichier pour que le maitre du jeu puisse importer ses cartes du monde permettant au joueur de mieux se representer leur environnement durant la partie de jeu de rôle.
              </div>
              <img className='feature-container-image' src={logo5} alt="logo-MyAmiDice" />
            </div>

        </div>
      <Footer />
    </div>
  )
}

export default Demo