import "../../styles/UserBadges.css";
import gold from '../../assets/medals/20.png'
import silver from '../../assets/medals/19.png'
import bronze from '../../assets/medals/18.png'
import React, { useContext, useState, useEffect } from 'react'
import { UserUidContext } from '../../contexts/UserUidContext';

const UserBadges = ({}) => {
const [levelToShow, setLevelToShow] = useState('level1')
const {  userInformation} = useContext(UserUidContext);
const [badgesEarned, setBadgesEarned] = useState({bronze: false, silver: false, gold:false})

useEffect(() => {
    if (userInformation && userInformation !== null){
        setBadgesEarned(userInformation.badges[levelToShow])
    }

}, [levelToShow, userInformation]) 


  return (
    <div className="UserBadges">
              <h2 className="badges-title">Badges Earned</h2>

      <h2 className="badges-level-select-title">Level</h2>
      <div className="badges-level-select-container">
        
    <button className={`badges-level-select-button ${levelToShow === 'level1' ? "selected-button" : ""}`} onClick={()=>{setLevelToShow('level1')}}>1</button>
    <button className={`badges-level-select-button ${levelToShow === 'level2' ? "selected-button" : ""}`} onClick={()=>{setLevelToShow('level2')}}>2</button>
    <button className={`badges-level-select-button ${levelToShow === 'level3' ? "selected-button" : ""}`} onClick={()=>{setLevelToShow('level3')}}>3</button>
    <button className={`badges-level-select-button ${levelToShow === 'level4' ? "selected-button" : ""}`}onClick={()=>{setLevelToShow('level4')}}>4</button>
    <button className={`badges-level-select-button ${levelToShow === 'level5' ? "selected-button" : ""}`} onClick={()=>{setLevelToShow('level5')}}>5</button>

      </div>
      <div className="badges-container">
      <img className={`badges-bronze badge ${badgesEarned.bronze ? 'badge-earned' : ""}`} src={bronze}></img>
        <img className={`badges-silver badge ${badgesEarned.silver ? 'badge-earned' : ""}`} src={silver}></img>
        <img className={`badges-gold badge ${badgesEarned.gold ? 'badge-earned' : ""}`} src={gold}></img>

        </div>
 
    </div>
  );
};

export default UserBadges;
