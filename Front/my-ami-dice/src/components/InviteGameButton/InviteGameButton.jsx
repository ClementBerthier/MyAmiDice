import { useContext, useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import api from '../../api';
import { UserContext } from '../../Context/UserContext';

import "./style.scss";

function InviteGameButton() {

    const [open, setOpen] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [user, setUser] = useContext(UserContext);
    const [message, setMessage] = useState("");

    const isMaster = (user.currentMasterID === user.id);

    function handleClick() {
        setOpen(true);
    }
    
    function handleChange(event) {
        setPseudo(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const currentGameId = user.currentGameID;

        const formData  = {
            fake_id: 0,
            status: "En cours",
            game_id: Number(currentGameId),
            pseudo: pseudo
        }
        try {
            const response = await api.post("/invites/create", formData);
            if(response.status === 200) {
                setMessage(`${pseudo} a bien été invité à votre partie n° ${currentGameId} (id de l'invitation : ${response.data.id})`);
            }
        } catch (error) {
            throw new Error (error);
        }
    }

  return (
    <>
        {isMaster ?
            <Button onClick={handleClick}>Inviter un joueur</Button>
            :
            null
        }

        <Modal
            className="invitation-modal"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="tiny"
        >
            <Modal.Header>Inviter un joueur à votre partie</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit} >
                    <Form.Input
                        type="text"
                        placeholder="Pseudo du joueur"
                        name="pseudo"
                        value={pseudo}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        negative
                    >
                        Inviter !
                    </Button>
                    {message && <p>{message}</p>}
                </Form>
            </Modal.Content>
        </Modal>
    </>
  )
}

export default InviteGameButton;