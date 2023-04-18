import React, { useState } from 'react';
import { useContext } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import api from '../../api';
import { UserContext } from '../../Context/UserContext';
import CharacterCreationModal from "../CharacterCreationModal/CharacterCreationModal"
import './style.scss';



function InviteModal({masterName, gameName}) {

  const [user, setUser] = useContext(UserContext);

  const [open, setOpen] = useState(false)
  const [CharacterCreationModalOpen , setCharacterCreationModalOpen] = useState(false)

  const handleClick = () => {
    setCharacterCreationModalOpen(true)
    setOpen(false)
  }

  const handleClickDecline = async () => {    
    setOpen(false)

    try {
console.log("dans le try de suppression de l'invit : ", user.games_invite[0].id);
      const response = await api.delete(`/invites/${user.games_invite[0].id}`);
console.log(`après suppression de l'invitation ${user.games_invite[0].id} :` , response);
    } catch (error) {
        throw new Error(error)
    }
  }

  const handleOpen = () => {
    setOpen(true)
    setCharacterCreationModalOpen(false)
  }


  

  return (
    <>
      <Modal className='invitation-modal'
        trigger={<Button>Invitation</Button>}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={handleOpen}
      >
        <Header content='Invitation en cours' />
        <Modal.Content >
          <p >
            Vous avez été invité par {masterName} pour participer à la partie {gameName}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' onClick={handleClickDecline}> Refuser </Button>
          <Button color='grey' onClick={handleClick}> Accepter </Button>         
        </Modal.Actions>
      </Modal>
      {CharacterCreationModalOpen? <CharacterCreationModal /> : null }         
    </>      
  )
}

export default InviteModal
