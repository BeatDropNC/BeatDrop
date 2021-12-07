import React from 'react'
import { Link } from 'react-router-dom'
const MainMenu = () => {
    return (
        <div>
            <h1>Main Menu</h1>
            <Link to='/level-select'>Play</Link>
            <Link to='/social'>Social</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/leaderboards'>Leaderboards</Link>
        </div>
    )
}

export default MainMenu
