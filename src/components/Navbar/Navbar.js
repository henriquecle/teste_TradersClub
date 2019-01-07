import React from 'react';
import './Navbar.css';

const navbar = (props) => {

  return (
    <div className="Navbar">
      <input
        type="text"
        placeholder="Pesquise por um veículo"
        value={props.value} 
        onChange={(event) => props.changed(event)} />
      <div 
        className="RegisterButton"
        onClick={props.registerButtonClicked} >
        Cadastrar
      </div>
    </div>
  )
}

export default navbar;