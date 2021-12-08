import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/MainMenu.css'

const Homepage = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userUid) {
            navigate('/welcome-page');
        }
    }, [userUid, navigate]);

    return (
        <main className="main-menu">
            <h1>Beat Drop</h1>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </main>
    )
}

export default Homepage