import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/Homepage.css'

const Homepage = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userUid) {
            navigate('/welcome-page');
        }
    }, [userUid, navigate]);

    return (
        <main className="Homepage">
            <h1>BEAT<br/>DROP</h1>
            <button className={`signup-button homepage-button`} onClick={() => navigate('/signup')}>SIGN UP</button>
            <button className={`login-button homepage-button`} onClick={() => navigate('/login')}>LOGIN</button>
        </main>
    )
}

export default Homepage