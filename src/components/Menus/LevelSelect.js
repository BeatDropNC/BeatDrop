import '../../styles/Menu.css'
import { react, useContext, useEffect, useState } from 'react'
import ReactGameContainer from '../ReactGameContainer'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';


function Menu({ colorChoice, setColorChoice, gameTime }) {
  const { userUid } = useContext(UserUidContext);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigate('/');
      }
    })
  }, [auth])
  const chooseColor = (color) => {
    setColorChoice(color)
  }


  return (
    <div className="Menu">
      <h1>What colour should the particles be?</h1>
      <h2>{`The last game lasted for ${gameTime} seconds`}</h2>
      <div className="button-container">
        <button className="red button" onClick={() => { chooseColor('red') }} >Red Please</button>
        <button className="yellow button" onClick={() => { chooseColor('yellow') }} >Yellow Thanks</button>
      </div> <Link id={'start-button'} className={"button start-button"} to={"/newgame"}> Start Phaser</Link>
    </div>
  );
}



export default Menu;
