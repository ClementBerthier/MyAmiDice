import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import api from '../../api';
import { UserContext } from '../../Context/UserContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './style.scss';

function CreateNews() {

  const [user, setUser] = useContext(UserContext);
  const [news, setNews] = useState({
    title: "",
    content: "",
  });
   
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    console.log("event.target.name: ", event.target.name);
    console.log("event.target.value: ", event.target.value);
    setNews({
      ...news,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
      fake_id: 0,
      title: news.title.trim(),
      content: news.content.trim(),
      user_id: user.id,
    }
    
    // Envoi en BDD de la demande de création de partie
    try {
      const response = await api.post("/news/create", formData);
      const dataNews = response.data;

console.log("dataNews", dataNews);

    } catch (error) {
      throw new Error (error);
    }
    navigate("/home/admin")
  }

  return (
    <>
      <Header />
      <div className="create-news-div">
        <h1 className="create-news-div-title">Création de news</h1>
        <Form
          onSubmit={handleSubmit}
          unstackable
        >            
          <Form.Input
              placeholder="Titre de la news"
              name="title"
              type="text"
              title="title"
              value={news.title} 
              onChange={handleChange}
              inline 
              required
          />
          <Form.TextArea 
              placeholder="Contenu"
              name="content"
              value={news.content}
              onChange={handleChange}
              inline
              required
          />
            <Button
                type="submit"
                negative
            >
                Publier la news
            </Button>
        </Form>
      </div>
      <Footer />
    </>
  )
}

export default CreateNews;