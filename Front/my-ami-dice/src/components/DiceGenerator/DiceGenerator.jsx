import { useContext, useEffect, useState } from "react";
import { SocketContext } from '../../Context/SocketContext';
import { Button} from "semantic-ui-react"
import { UserContext } from "../../Context/UserContext";

import './style.scss';


function DiceGenerator() {
    
    const [user, setUser] = useContext(UserContext);
    
    // Connexion à socket.io côté serveur
    const socket = useContext(SocketContext);
    
    // On récupère les infos nécessaires
    const currentGameId = user.currentGameID;
    const myId = user.id;
    const masterId = user.currentMasterID;
    let myCharacterName = "";

    // Si je suis MJ, j'ajoute (MJ) à mon pseudo
    if (myId === masterId) {
        myCharacterName = `(MJ) ${user.pseudo}`;
    } else {
        myCharacterName = user.pseudo;
    }

    // On écoute l'évènement "connect"
    socket.on("connect", () => {
        console.log("Connexion dicegenerator id : ", socket.id);
    })

    const masterSocketId = socket.id;

    const [dataDice, setDataDice] = useState({
        diceName: "",
        diceValue: "",
        dicePrivate:"",
    });

const [toggleButtonPublic, setToggleButtonPublic] = useState(true)
    const [toggleButtonPrivate, setToggleButtonPrivate] = useState(false)

    const handleClickToggle = (event) => {
        if(event.target.name === "public"){
            setToggleButtonPublic(true);
            setToggleButtonPrivate(false)
        } else if (event.target.name === "private"){
            setToggleButtonPublic(false);
            setToggleButtonPrivate(true)
        }
    }
    
    const rollDice= (event) =>{
        const maxValueDice = event.currentTarget.value
        const rollresult = Math.round(Math.random()*(maxValueDice -1)) +1;
        setDataDice(prevState => ({
            ...prevState,
            diceName: `D${maxValueDice}`,
            diceValue: `${rollresult}`,
            dicePrivate: toggleButtonPrivate
        }))
        
    }
    //TODO: rajouter "joueur1 à MJ" quand un user fait un jet privé au MJ
    useEffect(() => {
        if(dataDice.diceValue !== ""){
            let recipientId = currentGameId;
            if(dataDice.dicePrivate === true) {
                recipientId = masterSocketId;
                console.log('masterSocketId dans le IF : ', masterSocketId);
            }
console.log("recipientId", recipientId);

            const diceMessage = `Résultat du ${dataDice.diceName}: ${dataDice.diceValue}`
console.log("Jet de dés envoyé : myCharacterName : ", myCharacterName, " message : ", diceMessage, "envoyé à : ", recipientId);
            socket.emit("send-dice-roll", {pseudo: myCharacterName, message: diceMessage}, recipientId);
        }
   
    }, [dataDice.diceValue])   

    return (
      <div className='diceGenerator'>     

        <Button.Group widths={3}>
            <Button className="dice-button" name="public" toggle active={toggleButtonPublic} onClick={handleClickToggle} inverted>
                Public
            </Button>
                <Button compact className="dice-button" type="submit" value={4} color='red' onClick={rollDice} inverted> 
                    D4
                </Button>
            <Button compact className="dice-button" name="private" toggle active={toggleButtonPrivate} onClick={handleClickToggle} inverted>
                Privé
            </Button>
        </Button.Group>

        <Button.Group widths={3}>
                <Button className="dice-button" type="submit" value={6} color='red' onClick={rollDice} inverted> 
                    D6
                </Button>            
                <Button className="dice-button" type="submit" value={8} color='red' onClick={rollDice} inverted> 
                    D8
                </Button>
                <Button className="dice-button" type="submit" value={10} color='red' onClick={rollDice} inverted> 
                    D10
                </Button>
        </Button.Group>
        
        <Button.Group widths={3}>
                <Button className="dice-button" type="submit" value={12} color='red' onClick={rollDice} inverted> 
                    D12
                </Button>            
                <Button className="dice-button" type="submit" value={20} color='red' onClick={rollDice} inverted> 
                    D20
                </Button>
                <Button className="dice-button" type="submit" value={100} color='red' onClick={rollDice} inverted> 
                    D100
                </Button>
        </Button.Group>
        
        <div className="diceResult">
           <p>Resultat du {dataDice.diceName}: {dataDice.diceValue}</p> 
        </div>



      </div>
    )
  }
  
  export default DiceGenerator