import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';

const Homepage = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userUid) {
            navigate('/welcome-page');
        }
    }, [userUid]);

    return (
        <main>
            <h1>Beat Drop</h1>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </main>
    )
}

export default Homepage