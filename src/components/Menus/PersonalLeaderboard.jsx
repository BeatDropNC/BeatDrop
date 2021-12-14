import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/PersonalLeaderboard.css';
import returnButton from '../../assets/buttons/Return.png';
import personal from '../../assets/buttons/Personal.png';
import global from '../../assets/buttons/Global.png';
const data = require('../../dummy-data.json');

const PersonalLeaderboard = () => {

    const [levelToShow, setLevelToShow] = useState(0)

    const { userUid, userInformation } = useContext(UserUidContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userUid) {
            navigate('/')
        }
    }, [userUid, navigate])


    const personalHighScores = userInformation.userScores;

    const allLevels = Object.keys(userInformation.userScores);
    
    return (
        <main className='personalLeaderboard'>
            
            <h1> {userInformation.username}'s <br></br>Scores </h1>
                <div className="leaderboard-chooser">
                    <div className='personal_leaderboard'>
                        <Link to='/personal-leaderboard'><img className='pixel-buttons' src={personal}/></Link>
                    </div>
                    <div className='global_leaderboard'> 
                        <Link to='/global-leaderboard'><img className='pixel-buttons' src={global}/></Link>
                    </div>
                </div>
            <div>
            <div className='levelButtons'>
                {allLevels.map((level, index) => {
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
                    {allLevels.map((level, index) => {
                        if (index === levelToShow) {
                            return personalHighScores[level].map((scoreObj, index) => {
                                return (
                                    <tr key={'rows' + scoreObj.score + index}>
                                        <td>{index + 1}</td>
                                        <td>{scoreObj.score}</td>
                                    </tr>
                                )
                            })
                        } else return null
                    })}
                </tbody>
            </table>
            </div>
            <Link to='/main-menu'><img className='pixel-buttons' src={returnButton}/></Link>
        </main>
    );
};

export default PersonalLeaderboard;