import '../../styles/Menu.css'
import {react, useState} from 'react'
import ReactGameContainer from '../ReactGameContainer'
import { Link } from 'react-router-dom'


function Menu({colorChoice, setColorChoice, gameTime}) {

    const chooseColor = (color) => {
        setColorChoice(color)
    }

    
  return (
    <div className="Menu">
        <h1>What colour should the particles be?</h1>
        <h2>{`The last game lasted for ${gameTime} seconds`}</h2>
        <div className="button-container">
        <button className="red button" onClick={() => {chooseColor('red')}} >Red Please</button>
        <button className="yellow button" onClick={() => {chooseColor('yellow')}} >Yellow Thanks</button>
        </div> <Link id={'start-button'}className={"button start-button"}to={"/newgame"}> Start Phaser</Link>
    </div>
  );
}



export default Menu;
