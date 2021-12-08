import { useState } from 'react'

const SingleLeaderboard = () => {
    const [levelToShow, setLevelToShow] = useState(0)
    const [dummyLevelData, setDummyLevelData] = useState({
        level1: { 1: 5500, 2: 1400, 3: 300, 4: 250, 5: 100 },
        level2: { 1: 500, 2: 400, 3: 300, 4: 200, 5: 100 },
        level3: { 1: 500, 2: 400, 3: 200, 4: 200, 5: 100 },
        level4: { 1: 500, 2: 400, 3: 300, 4: 0, 5: 0 },
        level5: { 1: 500, 2: 400, 3: 300, 4: 200, 5: 100 },
        level6: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    })

    return (
        <section className="single-leaderboard">
            <div className="leaderboard-chooser">
                <button>Personal</button>
                <button>Global</button>
                <button>Friends</button>
            </div>
            <p>
                {Object.keys(dummyLevelData).map((level, index) => {
                    return (
                        <button
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
                {Object.values(dummyLevelData).map((level, index) => {
                    if (index === levelToShow) {
                        return Object.values(level).map((score, index) => {
                            return (
                                <tr>
                                        <td>Level {index + 1}</td>
                                        <td>{score}</td>
                                </tr>
                            )
                        })
                    }
                })}
            </table>
        </section>
    )
}

export default SingleLeaderboard