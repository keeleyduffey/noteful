import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'


function Header() {
  return (
    <header className="Header">
      <h1>
      	<Link to="/" className="Header_Link">Noteful</Link>
      </h1>
    </header> 
  );
}

export default Header;
