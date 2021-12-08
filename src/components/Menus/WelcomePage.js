import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext'
import { auth } from '../../firebase/firebase';

const WelcomePage = () => {
    const { userUid } = useContext(UserUidContext);
    console.log(userUid);
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                navigate('/');
            }
        })
    }, [auth])

    return (
        <div>
            <h1>Beat Drop Welcome Page</h1>
            <Link to='/main-menu'>Press Start</Link>
        </div>
    )
}

export default WelcomePage
