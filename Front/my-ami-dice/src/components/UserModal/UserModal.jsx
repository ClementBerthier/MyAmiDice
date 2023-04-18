import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Modal } from 'semantic-ui-react'
import api from '../../api';
import './style.scss';

function UserModal({id, pseudo, email, firstname, lastname, onDelete }) {

  const [open, setOpen] = useState(false);
  
  async function handleClick() {
    try {
      const response = await api.delete(`/users/${id}`);
        
      setOpen(false);

      onDelete(id);

    } catch (error) {
      throw new Error (error);
    }
  }

  return (   
    <div className="user-modal">
      <Modal
        closeIcon
        open={open}
        trigger={<Button className="user-modal-button">{`${firstname} ${lastname}`}</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header content = {`${firstname} ${lastname}`} />
        <Modal.Content>
        <div className="div-user-modal">
              <ul>
                  <li>Identifiant: {id}</li>
                  <li>Pseudo: {pseudo}</li>
                  <li>Email: {email}</li>
                  <li>Prénom: {firstname}</li>
                  <li>Nom: {lastname}</li>
              </ul>
          </div> {/*TODO: styliser l'affichage des information */}
          <Button
              onClick={handleClick}
              negative
          >
              Supprimer l'utilisateur 
          </Button>
        </Modal.Content>      
      </Modal>
      
    </div>
  ) //TODO: RAJOUTER UNE MODALE DE CONFIRMATION DE SUPPRESSION
}

UserModal.propTypes = {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
};


export default UserModal
