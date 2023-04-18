

import Header from '../Header/Header';

import Footer from '../Footer/Footer';

import CharactersList from '../CharactersList/CharactersList';

import GameList from '../GameList/GameList';

import NewMemberList from '../NewMemberList/NewMemberList';

import './style.scss';



function HomeMember() {



  return (

    <div className='home'>

        <Header />

        <div className="container-member-page">

            <div className="characters-games-list">

              <div className="characters-list-member">

                <h2 className="h2-section">Vos personnages !</h2>

                <CharactersList />

              </div>

              <div className="games-list-member">

              <h2 className="h2-section">Vos parties !</h2>

                <GameList />

              </div>

          </div>

          <div className="news-list-member">

            <NewMemberList />

          </div>

        </div>

        <Footer />

    </div>

  )

}



export default HomeMember