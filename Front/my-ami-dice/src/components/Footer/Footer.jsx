import React from 'react';
import logo from '../../assets/images/logoDice.png'
import './style.scss';

function Footer() {
  return (
    <div className='footer'>
        <img src={logo} alt="logo-MyAmiDice" />
        <span>© 2023 - Tous droits réservés - MyAmiDice </span>
    </div>
  )
}

export default Footer