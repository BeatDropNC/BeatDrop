import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext'
import SingleLeaderboard from './SingleLeaderboard'
import '../../styles/MainMenu.css'
import PersonalLeaderboard from './PersonalLeaderboard'
import GlobalLeaderboard from './GlobalLeaderboard'
import FriendsLeaderboard from './FriendsLeaderboard'

const Leaderboards = () => {
    const { userUid } = useContext(UserUidContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userUid) {
            navigate('/')
        }
    }, [userUid, navigate])

    const [levelToShow, setLevelToShow] = useState(0)
    const [dummyLevelData] = useState({
        level1: { 1: 5500, 2: 1400, 3: 300, 4: 250, 5: 100 },
        level2: { 1: 500, 2: 400, 3: 300, 4: 200, 5: 100 },
        level3: { 1: 500, 2: 400, 3: 200, 4: 200, 5: 100 },
        level4: { 1: 500, 2: 400, 3: 300, 4: 0, 5: 0 },
        level5: { 1: 500, 2: 400, 3: 300, 4: 200, 5: 100 },
        level6: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    })

    const [personalLeaderboard, setPersonalLeaderboard] = useState(true);
    const [globalLeaderboard, setGlobalLeaderboard] = useState(false);
    const [friendsLeaderboard, setFriendsLeaderboard] = useState(false);
    const [levelLeaderboard, setLevelLeaderboard] = useState(dummyLevelData.level1);


    return (
        <main className="main-menu">
            <h1>Leaderboards</h1>
            <button className='personalLeaderBoardButton' onClick={() => {
                setPersonalLeaderboard(true);
                setGlobalLeaderboard(false);
                setFriendsLeaderboard(false);
                // Default to level 1, show personal stats
            }}>
                <PersonalLeaderboard />
                Personal leaderboard
            </button>
            <button className='globalLeaderBoardButton' onClick={() => {
                setPersonalLeaderboard(false);
                setGlobalLeaderboard(true);
                setFriendsLeaderboard(false);
                // Default to level 1, show global stats
            }}>
                <GlobalLeaderboard />
                Global leaderboard
            </button>
            <button className='friendsLeaderBoardButton' onClick={() => {
                setPersonalLeaderboard(false);
                setGlobalLeaderboard(false);
                setFriendsLeaderboard(true);
                // Default to level 1, show friend stats
            }}>
                <FriendsLeaderboard />
                Friends leaderboard
            </button>
            

            <p>
                {Object.keys(dummyLevelData).map((level, index) => {
                    return (
                        <button
                            key={'buttons' + level + index}
                            onClick={() => {
                                setLevelToShow(index)
                            }}
                        >
                            Level {index + 1}
                        </button>
                    )
                })}
            </p>
            <table className="leaderboard-table">
                <tbody>
                    {Object.values(dummyLevelData).map((level, index) => {
                        if (index === levelToShow) {
                            return Object.values(level).map((score, index) => {
                                return (
                                    <tr key={'rows' + score + index}>
                                        <td>{index + 1}</td>
                                        <td>{score}</td>
                                    </tr>
                                )
                            })
                        } else return null
                    })}
                </tbody>
            </table>


            {/* <SingleLeaderboard /> */}


            <p>
                <Link to="/main-menu">Return to Main Menu</Link>
            </p>
        </main>
    )
}

export default Leaderboards
