import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import { getGlobalLeaderboard } from '../../firebase/firebase.api';
import '../../styles/GlobalLeaderboard.css'

const GlobalLeaderboard = () => {

    const [levelToShow, setLevelToShow] = useState(0);
    const [loading, setLoading] = useState(true);
    const [globalLeaderboardData, setGlobalLeaderboardData] = useState(undefined);

    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userUid) {
            navigate('/')
        }
    }, [userUid, navigate])

    useEffect(() => {
        let isMounted = true;

        const fetchGlobalLeaderboardData = async () => {
            let isMounted = true;
            const response = await getGlobalLeaderboard();
            if (isMounted) {
                setGlobalLeaderboardData(response)
                setLoading(false);
            }
        }
        fetchGlobalLeaderboardData();

        return () => {
            isMounted = false;
        }
    }, []);

    console.log(globalLeaderboardData)

    if (loading) {
        return <p>Loading...</p>
    } else {
        const sortedData = globalLeaderboardData[`level${levelToShow + 1}`]["scoresList"].sort(function (a, b) {
            return b.score - a.score
        })
        console.log(sortedData)
        return (
            <main className='globalLeaderboard'>
                <h1> Global Leaderboard </h1>
                <div className="leaderboard-chooser">
                    <Link to='/personal-leaderboard'><button>Personal</button></Link>
                    <Link to='/global-leaderboard'><button>Global</button></Link>
                </div>
                <div>
                    <h2>Level {levelToShow + 1}</h2>
                    <div className='levelButtons'>
                        {Object.keys(globalLeaderboardData).map((level, index) => {
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
                        {sortedData.map((data) => {
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
    }



};

export default GlobalLeaderboard;