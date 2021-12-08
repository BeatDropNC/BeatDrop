import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import { auth } from '../../firebase/firebase';

const Leaderboards = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(!user) {
                navigate('/');
            }
        })
    }, [auth])

    return (
        <div>
            <h1>Leaderboards</h1>
        </div>
    )
}

export default Leaderboards