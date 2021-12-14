import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/LeaderboardsPage.css'
import Leaderboard from '../../components/sub-components/Leaderboard'
const LeaderboardsPage = () => {

    const { userUid, userInformation } = useContext(UserUidContext)
    const [leaderboardToShow, setLeaderboardToShow] = useState('personal')
    const [scoreObjects, setScoreObjects] = useState([])
    const navigate = useNavigate()
    const [levelToShow, setLevelToShow] = useState('level1')
    const [globalScores, setGlobalScores] = useState({})
    useEffect(() => {
        if (!userUid) {
            navigate('/')
        }
    }, [userUid, navigate])

    useEffect(() => {
        console.log("useeffect called")

        if (leaderboardToShow === 'personal' && userInformation !== null && userInformation){
            console.log("fetching personal scores from context")
            const userScoresForLevel = userInformation.userScores[levelToShow]
            const sortedScores = userScoresForLevel.sort((a, b) => {return b.score - a.score})
            setScoreObjects(sortedScores)
        } else if (leaderboardToShow === 'global'){

        }

    }, [leaderboardToShow, levelToShow])
    
    return (
        <main className='LeaderboardsPage'>
            <h1 className="leaderboards-title">Leaderboards</h1>
            <div className="leaderboard-container">
                <div className="leaderboards-choice-container">
                   <button className={`leaderboards-choice-button  ${leaderboardToShow === 'personal' ? 'selected-button' : ""}`} onClick={() => {setLeaderboardToShow('personal')}}>Personal Bests</button>
                   <button className={`leaderboards-choice-button ${leaderboardToShow === 'global' ? 'selected-button' : ""}`} onClick={() => {setLeaderboardToShow('global')}}>World Records</button>
            </div>
            <Leaderboard scoreObjects={scoreObjects} levelToShow={levelToShow} setLevelToShow={setLevelToShow} leaderboardToShow={leaderboardToShow}></Leaderboard>
        
            </div>
            <Link to='/main-menu'>Return to Main Menu</Link>
        </main>
    );
};

export default LeaderboardsPage;