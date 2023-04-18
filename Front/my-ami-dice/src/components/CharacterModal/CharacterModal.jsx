import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Modal } from 'semantic-ui-react'
import './style.scss';
import CharacterSheet from '../CharacterSheet/CharacterSheet';
import api from '../../api';

function CharacterModal({firstname, lastname, key}) {

  const [open, setOpen] = useState(false)

 const handleClick = async () => {
    try {
      const response = await api.delete(`/characters/${key}`);
    } catch (error) {
      throw new Error(error);
    }
  };


  return (   

    <Modal className='character-modal'
      closeIcon
      open={open}
      trigger={<Button>{`${firstname} ${lastname}`}</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content = {`${firstname} ${lastname}`} />
      <Modal.Content>
       <CharacterSheet />
      </Modal.Content>

      <Button onClick={handleClick}>Supprimer</Button>      
    </Modal>
  )
}

CharacterModal.propTypes = {
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
};


export default CharacterModal

