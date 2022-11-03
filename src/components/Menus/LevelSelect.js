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

  const [currentLevel, setCurrentLevel] = useState(0);

  // 01: ruaHERO  		  === lets_go_60_sec
  // 02: kazaCHOK		    === partying_in_russia_60_sec
  // 03: gggRIME		    === bass_trap_60_sec
  // 04: helter_sKeLtOr	=== boss_time_60_sec
  // 05: cityPOP		    === funny_bit_60_sec_edit

  return (
    <div className="LevelSelect">
      <h1 className='level-select-title'>Choose Your Level</h1>

      <div className={`level-select-container`}>
      <h2 className={`level-selected-title`}>Level {currentLevel+1}</h2>

      <div className='level-select-level-choice-container'>

         <img className={`level-select-arrow arrow-left ${currentLevel === 0 ? 'disabled-button' : ""}`} alt='arrowLeft' src={arrowLeft} onClick={()=>{
          setCurrentLevel((prevValue)=>{
            let newLevel = prevValue
            newLevel--
            return newLevel
          })
        }}/>
      
      
        <img className='level-select-level-image' src={levelInfo[currentLevel].img} alt='levelImage'/>

   
        <img className={`level-select-arrow arrow-right ${currentLevel === 4 ? 'disabled-button' : ""}`} alt='arrowRight' src={arrowRight} onClick={()=>{
          setCurrentLevel((prevValue)=>{
            let newLevel = prevValue
            newLevel++
            return newLevel
          })
        }}/>
    
        
      </div>
      <Link id={'start-button'} className={"play-button"} to={"/newgame"}><img className='level-select-play-button' src={play} alt='new game' 
      onClick={() => {setLevelChoice(`level${currentLevel+1}`)}}
      />
      </Link>

      <Link id={'main_menu'} className={'main_menu'} to='/main-menu'><img className='level-select-return-button' src={returnButton} alt='returnButton'/></Link>
      </div>
    </div>
  );
}

export default LevelSelect;
