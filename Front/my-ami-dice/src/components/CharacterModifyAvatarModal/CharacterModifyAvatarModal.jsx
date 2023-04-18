import { useState } from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';


import './style.scss';

function CharacterModifyAvatarModal({toClose}) {

  const [open, setOpen] = useState(true)
  const [file, setFile] = useState(null)
  const handleClose = () =>{
     setOpen(false)
     toClose() 
  }

  const handleChangeFile = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await api.post("/", file) //TODO: mettre la bonne route 
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <Modal className='CharacterModifyAvatarModal'
        closeIcon
        open={open}
        onClose={handleClose}
        onOpen={() => setOpen(true)}
        closeOnEscape={false}
        closeOnDimmerClick={false}

      >
        <Header content= "Modifiez l'avatar de votre personnage" />
        <Modal.Content >
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label="Avatar de votre personnage"
                    type="file"
                    name="avatarFile"
                    onChange={handleChangeFile}
                    inline
                />
                <Button type="submit">Valider</Button> 
            </Form>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
      </Modal>
  )

  
}

CharacterModifyAvatarModal.propTypes = {
  toClose: PropTypes.func.isRequired,
  
};


export default CharacterModifyAvatarModal