import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import { getGlobalLeaderboard } from '../../firebase/firebase.api';
import personal from '../../assets/buttons/Personal.png';
import global from '../../assets/buttons/Global.png';
import returnButton from '../../assets/buttons/Return.png';
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

    if (loading) {
        return <p>Loading...</p>
    } else {
        const sortedData = globalLeaderboardData[`level${levelToShow + 1}`]["scoresList"].sort(function (a, b) {
            return b.score - a.score
        })
        return (
            <main className='globalLeaderboard'>
                <h1> Global Leaderboard </h1>
                <div className="leaderboard-chooser">
                    <Link to='/personal-leaderboard'><img className='pixel-buttons-personal' src={personal}/></Link>
                    <Link to='/global-leaderboard'><img className='pixel-buttons-global' src={global}/></Link>
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
                        {sortedData.map((data, index) => {
                            return (
                                <div key={data.score + index}>
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
                    <Link id={'main_menu'} className={'main_menu'} to='/main-menu'><img className='pixel-buttons-return' src={returnButton}/></Link>
                </div>
            </main>
        );
    }



};

export default GlobalLeaderboard;