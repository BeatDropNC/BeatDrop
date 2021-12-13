import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const { globalLeaderboard: dummyData } = require('../../dummy-data.json');

const GlobalLeaderboard = () => {

    const [levelToShow, setLevelToShow] = useState(1)

    const sortedData = dummyData.globalLeaderboardDocument[`level${levelToShow + 1}`].sort(function(a, b) {
        return b.score - a.score
    })

    console.log("SORTED",sortedData)

    // var numArray = [140000, 104, 99];
    // numArray.sort(function(a, b) {
    // return a - b;
    // });


    return (
        <main className='globalLeaderboard'>
            <h1> Global Leaderboard </h1>
            <div className="leaderboard-chooser">
                <Link to='/leaderboards/personal'><button>Personal</button></Link>
                <Link to='/leaderboards/friends'><button>Friends</button></Link>
                <Link to='/leaderboards/global'><button>Global</button></Link>
            </div>
            <div>
                <h2> Level {levelToShow + 1} </h2>
                <p>
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
            </p>
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
        </main>
    );
};

export default GlobalLeaderboard;