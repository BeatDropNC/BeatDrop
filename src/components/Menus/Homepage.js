import React from 'react'
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <main>
            <h1>Beat Drop</h1>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </main>
    )
}

export default Homepage