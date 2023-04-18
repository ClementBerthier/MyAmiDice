import CharacterModal from '../CharacterModal/CharacterModal';
import {UserContext} from '../../Context/UserContext';

import './style.scss';
import { useContext } from 'react';


function CharactersList() { 
  
  const [user, setUser] = useContext(UserContext);
  
  let allCharacters = []
  if (user){
     allCharacters = user.characters
  }
      
  
  return (
      <div className='characters-container'>
        
        {allCharacters?
        <div className='charactersList'>
            {allCharacters.map((character) => (
              <CharacterModal 
                key = {character.id}
                firstname = {character.firstname}
                lastname= {character.lastname}
              />
            ))}
        </div>
        :
        null
        }
        
    </div>
  )
}

export default CharactersList