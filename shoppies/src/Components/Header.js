import React from "react";
import theshoppieslogo from './theshoppieslogo.png';

const Header = (props) => {
  return (
    <header className="App-header">
      <h2>{props.text}</h2>
      <img className="logo" src={theshoppieslogo} alt="Shoppies Logo"></img>
      <h3>nominate up to 5 of your favourite movies!</h3>
    </header>
  );
};

export default Header;