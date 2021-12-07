import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
    return (
        <div>
            <h1>Beat Drop Welcome Page</h1>
            <Link to='/main-menu'>Press Start</Link>
        </div>
    )
}

export default WelcomePage
