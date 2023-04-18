import { useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Label, Modal } from 'semantic-ui-react'
import './style.scss';
import {UserContext} from '../../Context/UserContext';
import { useNavigate } from 'react-router';
import api from '../../api';

function GameModal({name, id, masterName, masterId, status, description, nbPlayer }) {
    
    const [open, setOpen] = useState(false)
    const [user, setUser] = useContext(UserContext);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const navigate = useNavigate();
    let isAdmin = false;
    
    if(user) {
        isAdmin = user.is_admin;
    }

    function handleClick(id, masterId) {
        setUser({...user, currentGameID: id, currentMasterID: masterId});
        setConfirmOpen(true);   
        setOpen(false);
    }

    function handleClickConfirm() {
        setConfirmOpen(false);
        navigate("/home/gameroom");
    }

    async function handleClickDelete() {
        try {
            const response = await api.delete(`/games/${id}`);    
            setOpen(false);
      
          } catch (error) {
            throw new Error (error);
          }
    }

  return (
       <>  
        <div className='game'>   
            <Modal
                closeIcon
                open={open}
                trigger={<span>{name}</span>}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
            <Header content = {name} />
            <Modal.Content className='game-description'>
                <div className='gameModale'>
                    <div className='gameModale-label'>
                        <Label className='labelGame-status' color="green" key={"green"}>{status}</Label>
                        <Label className='labelGame-masterName' color="black" key={"black"}>{`MJ: ${masterName}`}</Label>
                        <Label className='labelGame-nbPlayer' color="grey" key={"grey"}>{`${nbPlayer} Joueurs`}</Label>
                        <p className='game-description'>{description}</p>
                    </div>
                </div>
            {isAdmin ?
                <Button className="game-modal-button" onClick={handleClickDelete} negative>Supprimer la partie</Button>
                :
                null
            }
            </Modal.Content>      
            </Modal>
            <Label color="green" key={"green"}>{status}</Label>
            {isAdmin ?
                null
                :
                <Button className="game-modal-button" onClick={() => handleClick(id, masterId)}>Rejoindre</Button>
            }
            <Modal
                closeIcon
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onOpen={() => setConfirmOpen(true)}
            >
                <Header content = "Etes-vous sûr de vouloir rejoindre cette partie?" />
                <Modal.Content>
                <div className="div-game">
                    <p>{`Rejoindre la partie de ${masterName} ?`}</p>
                </div>
                <Button
                    onClick={handleClickConfirm}
                    negative
                >
                    Rejoindre
                </Button>
                </Modal.Content>      
            </Modal>
            
        </div>

        </>
  )
}

GameModal.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number,
    masterName: PropTypes.string.isRequired,
    masterId: PropTypes.number,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    nbPlayer: PropTypes.number.isRequired
};


export default GameModal
