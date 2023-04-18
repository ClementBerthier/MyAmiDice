import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { UserContext } from '../../Context/UserContext';
import './style.scss'


function CharacterModifyPrésentation ({data, type, characterValue, id }){

    const [user, setUser] = useContext(UserContext);
    const [value, setValue] = useState(characterValue);

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handlesubmit = async (event) => {
        event.preventDefault()
        try {

            const formData ={
                id: id,
                firstName: state.firstName.trim(),
                lastName: state.lastName.trim(),
                description: state.description.trim(),
                race: state.race.trim(),
                class: state.class.trim(),
                userId: user.id, 
                gameId: user.games_invite[0].game_id, 
                avatar: "/stateavatarFile"
            }


            await api.post("/characters/update", value)
        } catch (error) {
           throw new Error(error) 
        }
    }

    return (
        <Form onSubmit={handlesubmit}>
            <Form.Input
                type={type}
                name={data}
                value={value}
                onChange={handleChange}
                inline
            />
            <Button type="submit">Valider</Button> 
        </Form>
       
    )
}

CharacterModifyPrésentation.propTypes = {
    data: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    characterValue: PropTypes.string.isRequired,
    
};

export default CharacterModifyPrésentation