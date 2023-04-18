import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import api from '../../api';
import { UserContext } from '../../Context/UserContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './style.scss';

function CreateGame() {

  const [user, setUser] = useContext(UserContext);
  const [game, setGame] = useState({
    name: "",
    description: "",
    max_player: ""
  });  
  const [error, setError] = useState("");
   
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setGame({
      ...game,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    setError("");
    
    const formData = {
      fake_id: 0,
      name: game.name.trim(),
      description: game.description.trim(),
      max_player: Number(game.max_player),
      user_id: user.id,
      notes: "Début de la partie", //TODO: lié la note
      status: "En cours"
    }
    
    // Envoi en BDD de la demande de création de partie
    try {
      const responseCreateGame = await api.post("/games/create", formData);
      const dataGame = responseCreateGame.data
      dataGame.pseudo = user.pseudo
      console.log("datagame", dataGame)
      setUser({...user, currentMasterID: dataGame.user_id,  currentGameID: dataGame.id, games: [...(user.games || []), {...dataGame}]});

    } catch (error) {
      console.log("error", error);
      throw new Error (error);
    }
    navigate("/home/gameroom")
  }

  return (
    <>
      <Header />
      <div className="create-div">
        <h1 className="create-div-title">Création de partie</h1>
        <Form
          onSubmit={handleSubmit}
          unstackable
        >            
          <Form.Input
              placeholder="Nom de la partie"
              type="text"
              name="name"
              value={game.name} 
              onChange={handleChange}
              inline 
              required
          />
          <Form.TextArea 
              placeholder="Description de la partie"
              name="description"
              value={game.description}
              onChange={handleChange}
              inline
              required
          />
          <Form.Input
              placeholder="Nombre de joueurs maximum"
              type="number"
              name="max_player"
              value={game.max_player}
              onChange={handleChange}
              min="1"
              inline
              required
          />
            <Button
                type="submit"
                negative
                
            >
                Créer la partie
            </Button>
          {error && <p>{error}</p>}
        </Form>
      </div>
      <Footer />
    </>
  )
}

export default CreateGame