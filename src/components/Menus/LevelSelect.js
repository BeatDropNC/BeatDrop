import '../../styles/LevelSelect.css'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext';
import arrowRight from '../../assets/next.png'
import arrowLeft from '../../assets/next.png'
import play from '../../assets/buttons/Play.png';
import returnButton from '../../assets/buttons/Return.png';
import level1 from '../../assets/levelSelect/level1.png'
import level2 from '../../assets/levelSelect/level2.png'
import level3 from '../../assets/levelSelect/level3.png'
import level4 from '../../assets/levelSelect/level4.png'
import level5 from '../../assets/levelSelect/level5.png'
import { useState } from 'react/cjs/react.development';


function LevelSelect({ setLevelChoice }) {

  const { userUid } = useContext(UserUidContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userUid) {
      navigate('/');
    }
  }, [userUid, navigate]);

  

  const levelInfo = [
    {levelName: "level1", img: level1}, 
    {levelName: "level2", img: level2}, 
    {levelName: "level3", img: level3}, 
    {levelName: "level4", img: level4}, 
    {levelName: "level5", img: level5}, 
  ]

  const [currentLevel, setCurrentLevel] = useState(0)

  // 01: ruaHERO  		  === lets_go_60_sec
  // 02: kazaCHOK		    === partying_in_russia_60_sec
  // 03: gggRIME		    === bass_trap_60_sec
  // 04: helter_sKeLtOr	=== boss_time_60_sec
  // 05: cityPOP		    === funny_bit_60_sec_edit

  return (
    <div className="Menu">
      <h1 className='title'>Level<br></br>Selector</h1>
      <h2>Level {currentLevel+1}</h2>

      {/* Only renders right button if level select is not 0 */}
      <div className='level_selector'>
        {currentLevel === 0 ? 
        ""
         : 
         <img className='arrowLeft' src={arrowLeft} onClick={()=>{
          setCurrentLevel((prevValue)=>{
            let newLevel = prevValue
            newLevel--
            return newLevel
          })
        }}/>
        }
      
        <img className='bgimage' src={levelInfo[currentLevel].img}/>

        {/* Only renders left button if level select is not 5 */}
        {currentLevel === 4 ? "" :
        <img className='arrowRight' src={arrowRight} onClick={()=>{
          setCurrentLevel((prevValue)=>{
            let newLevel = prevValue
            newLevel++
            return newLevel
          })
        }}/>
        }
        
      </div>
      <Link id={'start-button'} className={"play-button"} to={"/newgame"}><img className='pixel-buttons-play' src={play} 
      onClick={() => {setLevelChoice(`level${currentLevel+1}`)}}
      />
      </Link>
      <Link id={'main_menu'} className={'main_menu'} to='/main-menu'><img className='pixel-buttons-return' src={returnButton}/></Link>
    </div>
  );
}

export default LevelSelect;
