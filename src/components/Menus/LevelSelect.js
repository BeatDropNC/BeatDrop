import '../../styles/LevelSelect.css'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext';
import arrowRight from '../../assets/next.png'
import arrowLeft from '../../assets/next.png'

function LevelSelect({ setLevelChoice }) {

  const { userUid } = useContext(UserUidContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userUid) {
      navigate('/');
    }
  }, [userUid, navigate]);

  // 01: ruaHERO  		  === lets_go_60_sec
  // 02: kazaCHOK		    === partying_in_russia_60_sec
  // 03: gggRIME		    === bass_trap_60_sec
  // 04: helter_sKeLtOr	=== boss_time_60_sec
  // 05: cityPOP		    === funny_bit_60_sec_edit

  return (
    <div className="Menu">
      <h1>Level Selector</h1>
      <h2>Level title on change</h2>
      <div className='level_selector'>
      <img className='arrowLeft' src={arrowLeft}/>
        <img className='bgimage'/>
        <img className='arrowRight' src={arrowRight}/>
      </div>
      <div className="button-container">
        <button className="red button" onClick={() => {setLevelChoice('level1')}}>Level 1</button>
        <button className="red button" onClick={() => {setLevelChoice('level2')}}>Level 2</button>
        <button className="red button" onClick={() => {setLevelChoice('level3')}}>Level 3</button>
        <button className="red button" onClick={() => {setLevelChoice('level4')}}>Level 4</button>
        <button className="red button" onClick={() => {setLevelChoice('level5')}}>Level 5</button>
      </div> <Link id={'start-button'} className={"button start-button"} to={"/newgame"}> Start Phaser</Link>
      <Link to='/main-menu'>Return to Main Menu</Link>
    </div>
  );
}

export default LevelSelect;
