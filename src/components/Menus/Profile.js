import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import { auth } from '../../firebase/firebase';

const Profile = () => {
    const { userUid } = useContext(UserUidContext);
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
            <h1>Profile</h1>
        </div>
    )
}

export default Profile
