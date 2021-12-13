import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/PersonalLeaderboard.css'
const data = require('../../dummy-data.json');

const PersonalLeaderboard = () => {

    const [levelToShow, setLevelToShow] = useState(0)

    const { userUid } = useContext(UserUidContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userUid) {
            navigate('/')
        }
    }, [userUid, navigate])

    //waiting on firebase data
    const [dummyLevelData] = useState({
        level1: { 1: 5500, 2: 1400, 3: 300, 4: 250, 5: 100 },
        level2: { 1: 500, 2: 400, 3: 300, 4: 200, 5: 100 },
        level3: { 1: 500, 2: 400, 3: 200, 4: 200, 5: 100 },
        level4: { 1: 500, 2: 400, 3: 300, 4: 0, 5: 0 },
        level5: { 1: 500, 2: 400, 3: 300, 4: 200, 5: 100 },
        level6: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    })
    
    return (
        <main className='personalLeaderboard'>
            
            <h1> {data.users.userDocument1.username}'s Scores </h1>
                <div className="leaderboard-chooser">
                    <div className='personal_leaderboard'>
                        <Link to='/leaderboards/personal'><button>Personal</button></Link>
                    </div>
                    <div className='global_leaderboard'> 
                        <Link to='/leaderboards/global'><button>Global</button></Link>
                    </div>
                </div>
            <div>
            <div className='levelButtons'>
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
            </div>
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
            </div>
            <Link to='/main-menu'>Return to Main Menu</Link>
        </main>
    );
};

export default PersonalLeaderboard;