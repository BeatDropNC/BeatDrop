import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/LeaderboardsPage.css'
import Leaderboard from '../../components/sub-components/Leaderboard'
import { getGlobalLeaderboard } from '../../firebase/firebase.api';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../firebase/firebase';
import returnButton from '../../assets/buttons/Return.png';

const LeaderboardsPage = () => {

    const { userUid, userInformation } = useContext(UserUidContext)
    const [leaderboardToShow, setLeaderboardToShow] = useState('personal')
    const [scoreObjects, setScoreObjects] = useState([])
    const navigate = useNavigate()
    const [levelToShow, setLevelToShow] = useState('level1')
    const [globalScores, setGlobalScores] = useState({})

    useEffect(() => {
        if (!userUid || userUid === undefined || userUid === null){
            navigate('/')
        }
    }, [userUid, navigate])
    
 

    //This is triggered when the user selects the type of leaderboard or the level they
    //want to see. It will pull information from the state/context by default and make a
    //call to firebase if the global scores are not already in state.
    useEffect(() => {
        if (leaderboardToShow === 'personal' && userInformation !== null && userInformation){
            const userScoresForLevel = userInformation.userScores[levelToShow]
            const sortedScores = userScoresForLevel.sort((a, b) => {return b.score - a.score})
            setScoreObjects(sortedScores)
        } else if (leaderboardToShow === 'global' && Object.keys(globalScores).length === 0){
            getGlobalLeaderboard().then((response) => {
                setGlobalScores(response)
                const scoresForLevel = response[levelToShow]['scoresList']
                const sortedScores = scoresForLevel.sort((a, b) => {return b.score - a.score})
                setScoreObjects(sortedScores)
            })
        } else if (leaderboardToShow === 'global'){
            const scoresForLevel = globalScores[levelToShow]['scoresList']
            const sortedScores = scoresForLevel.sort((a, b) => {return b.score - a.score})
            setScoreObjects(sortedScores)
        }

    }, [leaderboardToShow, levelToShow, globalScores])
    
    return (
        <main className='LeaderboardsPage'>
            <h1 id='leaderboards-title' className="leaderboards-title">Leaderboards</h1>
            <div className="leaderboard-container">
                <div className="leaderboards-choice-container">
                   <button className={`leaderboards-choice-button  ${leaderboardToShow === 'personal' ? 'selected-button' : ""}`} onClick={() => {setLeaderboardToShow('personal')}}>Personal Bests</button>
                   <button className={`leaderboards-choice-button ${leaderboardToShow === 'global' ? 'selected-button' : ""}`} onClick={() => {setLeaderboardToShow('global')}}>World Records</button>
            </div>
            <Leaderboard scoreObjects={scoreObjects} levelToShow={levelToShow} setLevelToShow={setLevelToShow} leaderboardToShow={leaderboardToShow}></Leaderboard>
            </div>
            <div className='return-container'>
                <Link id={'main_menu'} className={'main_menu'} to='/main-menu'><img className='pixel-buttons-return' src={returnButton}/></Link>
            </div>
            
        </main>
    );
};

export default LeaderboardsPage;