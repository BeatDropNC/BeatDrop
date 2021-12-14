import '../../styles/LevelSelect.css'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext';
import { getActivities } from '../../firebase/firebase.api';


function LevelSelect({ setLevelChoice, gameTime }) {
  const { userUid } = useContext(UserUidContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userUid) {
      navigate('/');
    }
  }, [userUid, navigate]);




  return (
    <div className="Menu">
      <h1>What colour should the particles be?</h1>
      <h2>{`The last game lasted for ${gameTime} seconds`}</h2>
      <div className="button-container">
        <button className="red button" onClick={() => { setLevelChoice('level1') }} >Level 1</button>
        <button className="red button" onClick={() => { setLevelChoice('level2')  }} >Level 2</button>
        <button className="red button" onClick={() => { setLevelChoice('level3')  }} >Level 3</button>
        <button className="red button" onClick={() => { setLevelChoice('level4') }} >Level 4</button>
        <button className="red button" onClick={() => { setLevelChoice('level5')  }} >Level 5</button>

      </div> <Link id={'start-button'} className={"button start-button"} to={"/newgame"}> Start Phaser</Link>
      <Link to='/main-menu'>Return to Main Menu</Link>
    </div>
  );
}



export default LevelSelect;
