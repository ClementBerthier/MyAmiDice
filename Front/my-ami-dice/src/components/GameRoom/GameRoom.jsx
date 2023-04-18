import DiceGenerator from "../DiceGenerator/DiceGenerator";
import Notes from "../Notes/Notes";
import Map from "../Map/Map"
import AvatarContainer from "../AvatarContainer/AvatarContainer";
import ChatRoom from "../ChatRoom/Chatroom";
import { UserContext } from "../../Context/UserContext";
import { NavLink } from 'react-router-dom';

import { socket, SocketContext } from "../../Context/SocketContext";
import { useContext, useEffect } from "react";
import api from '../../api';
import InviteGameButton from "../InviteGameButton/InviteGameButton";
import MapUploadButton from "../MapUploadButton/MapUploadButton";
import masterIMG from "../../assets/images/masterIMG.png";
import { Button } from "semantic-ui-react";
import "./style.scss";


function GameRoom() {

  const [user, setUser] = useContext(UserContext);
  const masterId = user.currentMasterID;
  const isAdmin = user.is_admin;

  // Au mount initial, on lance la requête pour récupérer toutes les informations
  useEffect(() => {

    async function gameData() {
      try {
        console.log("dans le mount de la GameRoom masterId : ", user.currentMasterID, user.id, user.currentGameID);

        const [{data: game}, {data: characters}] = await Promise.all([
          api.get(`/games/${user.currentGameID}/${user.id}`), 
          api.get(`/games/${user.currentGameID}/${masterId}`)
        ])
console.log("apres requete promiseall");
        setUser((user) => ({
          ...user, 
          allCharacters: characters.Gameroom.personnages,
          currentGameData: game
        }));

      } catch (error) {
          throw new Error(error);
      }
    };
    gameData();
  }, []);  

console.log("user GAMEROOM", user);

  return (
    <SocketContext.Provider value={socket}>
        <div className='gameroom'>
          
          <div className="left-container">
              <img className="master-img" src={masterIMG} alt="Image du Maitre de jeu" />
            
            {/* <MapUploadButton /> */}
            <InviteGameButton />
            {/* <Notes /> */}
            <DiceGenerator />        
          </div>

          <div className="center-container">
            <Map />
            {isAdmin ?
              <Button className="home-button" as={NavLink} to="/home/admin" >Retour à l'accueil </Button>
              :
              <Button className="home-button" as={NavLink} to="/home/user" >Retour à l'accueil </Button>
            }
          </div>
          
          <div className="right-container">
            <AvatarContainer />
            <ChatRoom />
          </div>

        </div>
      </SocketContext.Provider>
  )
}

export default GameRoom
