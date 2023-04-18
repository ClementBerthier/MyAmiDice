import React from 'react';

import './style.scss';
import logo from '../../assets/images/logoDice.png'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/* function Page404() {

  return (
    <div className='home'>
      <Header />
        <div className='page404'>
              <div className='container'>
                <div className='page404-images'>
                    <img className='page404-image' src={logo} alt="logo-MyAmiDice" />
                    <img className='page404-image' src={logo} alt="logo-MyAmiDice" />
                </div>
              </div>
              <h1 className="page404-text">Vous avez fait un échec critique et vous vous êtes perdu.</h1>
        </div>
      <Footer />
    </div>
  )
}

export default Page404; */

import { useState } from 'react';


function Page404() {
  const [animation, setAnimation] = useState(false);

  return (
    <div className='home'>
      <Header />
        <div className='page404'>
          <div className='container'>
            <div className='page404-images'>
              <img
                className={`page404-image ${animation ? 'shake' : ''}`}
                src={logo}
                alt="logo-MyAmiDice"
                onClick={() => setAnimation(!animation)}
              />
              <img
                className={`page404-image ${animation ? 'shake' : ''}`}
                src={logo}
                alt="logo-MyAmiDice"
                onClick={() => setAnimation(!animation)}
              />
            </div>
          </div>
          <h1 className="page404-text">Vous avez fait un échec critique et vous vous êtes perdu.</h1>
        </div>
      <Footer />
    </div>
  );
};

export default Page404;