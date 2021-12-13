import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/GlobalLeaderboard.css'
const { globalLeaderboard: dummyData } = require('../../dummy-data.json');

const GlobalLeaderboard = () => {

    const [levelToShow, setLevelToShow] = useState(0)

    const { userUid } = useContext(UserUidContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userUid) {
            navigate('/')
        }
    }, [userUid, navigate])

    const sortedData = dummyData.globalLeaderboardDocument[`level${levelToShow + 1}`].sort(function(a, b) {
        return b.score - a.score
    })

    return (
        <main className='globalLeaderboard'>
            <h1> Global Leaderboard </h1>
            <div className="leaderboard-chooser">
                <Link to='/leaderboards/personal'><button>Personal</button></Link>
                <Link to='/leaderboards/global'><button>Global</button></Link>
            </div>
            <div>
                <h2>Level {levelToShow + 1}</h2>
                <div className='levelButtons'>
                {Object.keys(dummyData.globalLeaderboardDocument).map((level, index) => {
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
            <div className="leaderboard-div">       
                    {sortedData.map((data)=>{
                        return (
                            <div key={data.score}>
                            <p>
                                {data.score}
                            </p>
                            <p>
                                {data.user}
                            </p>
                            </div>
                        )
                    })}
            </div>
            </div>
            <div className='main_menu'>
                <Link to='/main-menu'>Return to Main Menu</Link>
            </div>
            
        </main>
    );
};

export default GlobalLeaderboard;