import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Label, Modal } from 'semantic-ui-react';
import './style.scss';
import { UserContext } from '../../Context/UserContext';
import api from '../../api';

function News({ title, content, author, date, id, onDelete }) {

    const [open, setOpen] = useState(false)
    const [user, setUser] = useContext(UserContext);
    let isAdmin = false;
  
    if(user) {
      isAdmin = user.is_admin;
    }
    async function handleClick() {
        try {
            const response = await api.delete(`/news/${id}`);    
            console.log("response DELETE NEWS: ", response);
            setOpen(false);
            onDelete(id);
          } catch (error) {
            throw new Error (error);
          }
    }

  return (
    <>
    <article className='news-container'>
        <Modal className='news-modal'
            closeIcon
            open={open}
            trigger={<h1>{title}</h1>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
        <Header content = {title} />
        <Modal.Content>
            <div className='newsModale'>
                <time>{date}</time>
                <Label>{author}</Label>
                <p>{content}</p>
            </div>
            {isAdmin ?
                <Button className="news-modal-button" onClick={handleClick} negative>Supprimer la news</Button>
                :
                null}
        </Modal.Content>      
        </Modal>
        <time>{date}</time>
        <Label>{author}</Label>
        <p>{content}</p>        
    </article>
    </>  
  )
}

News.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default News