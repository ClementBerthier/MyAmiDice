import { useContext, useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { UserContext } from '../../Context/UserContext';
import News from '../News/News';
import { NavLink } from 'react-router-dom';
import api from '../../api';
import moment from 'moment';
import './style.scss';

function NewMemberList () {

  const [user, setUser] = useContext(UserContext);
  const [news, setNews] = useState([]);
  let isAdmin = false;
  
  if(user) {
    isAdmin = user.is_admin;
  }
  
  function handleOnDelete(newsId) {
    setNews(news.filter(u => u.id !== newsId));
  }

  useEffect(() => {

    async function getAllNews() {
      try {
        const response = await api.get("/news/getall");
        const tempNews = response.data;
        
        // On convertit le "created_at" au format "DD/MM/YYYY" grâce à la librairie "moment"
        const format = "DD/MM/YYYY";
        const formatedNewsDate = tempNews.map((article) => {
          return {
            ...article,
            created_at: moment(article.created_at).format(format)
          }
        });

        // On inverse l'ordre du tableau pour afficher les news les plus récentes en premier
        const reversedDate = formatedNewsDate.reverse();
        setNews(reversedDate);
      } catch (error) {
          throw new Error(error);
        }
      };
      getAllNews();
    }, []);  

  return (
    <div className='news-container'>
      {isAdmin ?
        <Button as={NavLink} to="/home/createnews" className="news-modal-button" negative>Rédiger une news</Button>
        :
        null
      }
        <div className='news-list'>
            {news.map((article) => (
                <News
                    key = {article.id}
                    title = {article.title}
                    content = {article.content}
                    author = "Admin"
                    date = {article.created_at}
                    id = {article.id}
                    onDelete={handleOnDelete}        
                />
            ))}
        </div>
    </div>
  )
}
 



export default NewMemberList