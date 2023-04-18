import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {UserContext} from '../../Context/UserContext';
import { Button } from 'semantic-ui-react';
import api from '../../api';
import GameModal from '../GameModal/GameModal';
import './style.scss';

function GameList() {
  const [allGamesAdmin, setAllGamesAdmin] = useState([]);
  const [user, setUser] = useContext(UserContext);

  let isAdmin = ""
  let allGamesPlayer=[]
  if (user){
    allGamesPlayer = user.games
    isAdmin = user.is_admin
  }
console.log("user :", user)
  /* function handleOnDelete(gameId) {
    setUser({...users, allUsers.filter(u => u.id !== userId)) //TODO: refaire ce que Quentin a modifié dans UsersList
  } */

  useEffect(() => {
    async function getAllGame(){
      try {
        const response = await api.get("/games/getall");
        setAllGamesAdmin(response.data);
console.log("response.data allgames : ", response.data);
      } catch (error) {
        throw new Error (error)
      }
    };
    getAllGame()
  }, []);  

  return (
    <div className='game-container'>

      {isAdmin ? 
          //TODO: checker ce que l'on donne a l'admin pour la liste des partie qu'est ce qui lui est necessaire (voir avec guillaume)
        <div className='games-list'>        
            {allGamesAdmin.map((game) => (
              <GameModal
                key = {game.id}
                name = {game.name}
                id = {game.id}
                masterName = {game.id} //TODO: pseudo du MJ Inconnu
                masterId = {game.user_id}
                status = {game.status}
                description = {game.description}
                nbPlayer = {game.max_players}
              />
            ))}
        </div>

        :
        <>
        {allGamesPlayer? 
        <div className='gameList'>        
            {allGamesPlayer.map((game) => (
              <GameModal
                key = {game.id}
                name = {game.name}
                id = {game.id}
                masterName = {game.pseudo}
                masterId = {game.user_id}
                status = {game.status}
                description = {game.description}
                nbPlayer = {game.max_players}
              />
            ))}
        </div>
        :
        null }
        
        <Button as={NavLink} to="/home/creategame">Créer une partie</Button>
        </>
        }
    </div>
  )
}
 



export default GameList