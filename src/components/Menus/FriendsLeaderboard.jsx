import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const data = require('../../dummy-data.json');

const FriendsLeaderboard = () => {

    const [levelToShow, setLevelToShow] = useState(0)

    return (
        <main className='friendsLeaderboard'>
            <h1> Friends Leaderboard </h1>
            <div className="leaderboard-chooser">
                <Link to='/leaderboards/personal'><button>Personal</button></Link>
                <Link to='/leaderboards/friends'><button>Friends</button></Link>
                <Link to='/leaderboards/global'><button>Global</button></Link>
            </div>
            <div>
                <h2> Level {levelToShow + 1} </h2>
            <p>
                {Object.keys(data.globalLeaderboard.globalLeaderboardDocument).map((level, index) => {
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
            </div>
        </main>
    );
};

export default FriendsLeaderboard;