import { useContext, useEffect, useState } from "react";
import J4 from "../../assets/images/joueur4.jpg"
import { UserContext } from "../../Context/UserContext";
import PropTypes from 'prop-types';
import CharacterModifyAvatarModal from '../CharacterModifyAvatarModal/CharacterModifyAvatarModal';
import CharacterModifyPrésentation from '../CharacterModifyPrésentation/CharacterModifyPrésentation';
import './style.scss';
import BarreStatPvPM from "../BarreStatPvPm/BarreStatPvPm";
import CharacterModifyDescription from "../CharacterModifyDescription/CharacterModifyDescription";

function CharacterSheet({characterId}) { 
 
  const [user, setUser] = useContext(UserContext) 
  const [openModal, setOpenModal] = useState(false)
  const [isClick, setIsClick] = useState("")
  const [userFull, setUserFull] = useState(false)
  const isMj = user.id === user.currentMasterID

  useEffect(()=>{
    setUserFull(user.allCharacters)
  },[user.allCharacters])

  let character=[]

  if(userFull){
    if(characterId){
      character = user.allCharacters.filter((character) => character.id === Number(characterId))
    }else{
      character = user.allCharacters.filter((character) => { return (
        user.characters.some((characterFind)=>{
          return character.id === characterFind.id
        })
      )})
    }
  }
    

  const handleClickAvatar = () => {
    if(user.id !== user.currentMasterID){
      setOpenModal(!openModal);
    }
      
    }

  const handleClick = (event) => {
    const nameModal = event.target.getAttribute("name")
    console.log("NAMEMODAL", event.target.getAttribute("name"))
    if(user.id !== user.currentMasterID){
      setIsClick(nameModal)
    } else {
      setIsClick(false)
    }
  }
    
    const handleCloseModal = () => {
      setOpenModal(false)
    }
    
  return (

    <div className='characterSheet'>
    {userFull?
        <div className="headContainer">
          <div className="info-character">
            
            
            <div className="presentation-character">
              <img className="character-avatar" src={J4} alt="character-avatar" onClick={handleClickAvatar} /* au clic sur l'image une modale s'ouvre et donne l'input file*/ />
        {openModal? <CharacterModifyAvatarModal toClose={handleCloseModal} /> : null }       
              <div className="presentation-lastname" name="lastname" onClick={handleClick}>
                {(isClick === "lastname")? 
                <CharacterModifyPrésentation  id={character.id}   data={"Nom"} type={"text"} characterValue={character[0].lastname} />
                :
                `${character[0].lastname}`} 
              </div>
              <div className="presentation-firstname" name={"firstname"} onClick={handleClick} >
              {(isClick === "firstname")? 
                <CharacterModifyPrésentation  id={character.id}  data={"Prenom"} type={"text"} characterValue={character[0].firstname} />
                :
                `${character[0].firstname}`}  
              </div>
              <div className="presentation-race" name={"race"} onClick={handleClick}>
              {(isClick === "race")? 
                <CharacterModifyPrésentation id={character.id}  data={"Race"} type={"text"} characterValue={character[0].race} />
                :
                `${character[0].race}`}  
              </div>
              <div className="presentation-class" name={"class"} onClick={handleClick}>
              {(isClick === "class")? 
                <CharacterModifyPrésentation  id={character.id} data={"Classe"} type={"text"} characterValue={character[0].class} />
                :
                `${character[0].class}`} 
              </div>
              <div  className="presentation-class" name={"level"} onClick={handleClick}>
              {(isClick === "level")? 
                <CharacterModifyPrésentation  id={character.id} data={"level"} type={"number"} characterValue={character[0].Characteristics[0].level} />
                :
                `${character[0].Characteristics[0].level}`}   
              </div>
            </div>


            <div className="lifepoint-mana">
              <div className="lifePoint" name={"pv"}>
                <BarreStatPvPM isMj={isMj} maxData={character[0].Characteristics[0].max_hp} currentData={character[0].Characteristics[0].current_hp} HPorMP={"hp"} hisCharacter={character[0]}  />
              </div>
              <div className="manaPoint" name={"mp"}>
                <BarreStatPvPM isMj={isMj} maxData={character[0].Characteristics[0].max_mana} currentData={character[0].Characteristics[0].current_mana} HPorMP={"mp"} hisCharacter={character[0]} />
              </div>
            </div>
          </div>
          <div className="description-character" name={"description"} onClick={handleClick}>
          {(isClick === "description")? 
                <CharacterModifyDescription  id={character.id}  characterValue={character[0].description} />
                :
                `${character[0].description}`}  
          </div>
          <div>
            <div className="characteristic-character">
              <div>
                <div>FOR: 15 </div>
              </div>
              <div>
                <div>DEX: 12 </div>
              </div>
              <div>
                <div>WIS: 13</div>
              </div>
              <div>
                <div>CHA: 16</div>
              </div>
              <div>
                <div>INT: 16</div>
              </div>
              <div>
                <div>CONST: 15</div>
              </div>            
            </div>
            <div>
              <div>nom du skill</div>
              <div>description du skill</div>
            </div>
          </div>
          <div className="item-character">
            <div>Epee de chevalier</div>
            <div>1</div>
            <div>Une épee de chevalier de bonne facture</div>
          </div>
        </div>
        :
        null}
      </div>
    
    
  )
}


CharacterSheet.propTypes = {
  characterId: PropTypes.string
};
export default CharacterSheet