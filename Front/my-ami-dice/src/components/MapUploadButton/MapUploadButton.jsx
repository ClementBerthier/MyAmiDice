import { stripBasename } from '@remix-run/router';
import { useContext, useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import api from '../../api';
import { UserContext } from '../../Context/UserContext';


function MapUploadButton() {

    const [user, setUser] = useContext(UserContext);

    const [open, setOpen] = useState(false);
    const [map, setMap] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const isMaster = (user.currentMasterID === user.id);

    function handleClick() {
        setOpen(true);
    }

    function handleChangeFile(event) {
console.log("dans le handleChangefile / event.target.files[0] : ", event.target.files[0])
        setMap(event.target.files[0]);
    };

    function handleChange(event) {
        setName(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const currentGameId = user.currentGameID;

        const formData = {
            fake_id: 0, // Obligatoire
            name: name,
            category: "donjon",
            url: "/map", // en front = file
            game_id: currentGameId
        }

        try {
console.log("AVANT REQUETE MAP : ", formData);
            const response = await api.post("/maps/create", formData);
console.log("response APRES LA REQUETE MAP : ", response);
            
            if(response.status === 200) {
                setMessage(`La carte a bien été uploadée !`);
                setName("");
            }
        } catch (error) {
            throw new Error (error);
        }
    }

  return (
    <>
        {isMaster ?
            <Button onClick={handleClick}>Uploader une carte</Button>
            :
            null
        }

        <Modal
            className="upload-map-modal"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="tiny"
        >
            <Modal.Header>Choisissez une carte à uploader</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit} >
                    <Form.Input
                        type="file"
                        name="map"
                        onChange={handleChangeFile}
                        required
                    />
                   <Form.Input
                        type="text"
                        placeholder="Nom de la carte"
                        name="name"
                        value={name} 
                        onChange={handleChange}
                        inline 
                        required
                    />
                    <Button
                        type="submit"
                        negative
                    >
                        Télécharger !
                    </Button>
                    {message && <p>{message}</p>}
                </Form>
            </Modal.Content>
        </Modal>
    </>
  )
}

export default MapUploadButton;