import { useState } from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import './style.scss';

function CharacterModifyDescription(id, characterValue) {

    const [description, setDescription] = useState("")

    const handleChange = (event) => {

        setDescription(event.target.value)
   }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("description", description)
    }
  
  return (
    <Modal className='CharacterModifyAvatarModal'
        closeIcon
        open={open}
        onOpen={() => setOpen(true)}
        closeOnEscape={false}
        closeOnDimmerClick={false}

    >
        <Header content= "Modifiez la description de votre personnage" />
        <Modal.Content >
            <Form onSubmit={handleSubmit}>
                <Form.TextArea
                    label="Description de votre personnage"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    inline
                />
                <Button type="submit">Valider</Button> 
            </Form>
        </Modal.Content>
    </Modal>
  )
}

export default CharacterModifyDescription