import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext'
import SingleLeaderboard from './SingleLeaderboard'
import '../../styles/MainMenu.css'

const Leaderboards = () => {
    const { userUid } = useContext(UserUidContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userUid) {
            navigate('/')
        }
    }, [userUid, navigate])

    return (
        <main className="main-menu">
            <h1>Leaderboards</h1>
            <SingleLeaderboard />
            <p>
                <Link to="/main-menu">Return to Main Menu</Link>
            </p>
        </main>
    )
}

export default Leaderboards
