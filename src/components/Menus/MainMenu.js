import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import { logoutUser, auth } from '../../firebase/firebase';
const MainMenu = () => {
    const { userUid, setUserUid } = useContext(UserUidContext);
    const navigate = useNavigate();
    console.log(auth.currentUser)
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                navigate('/');
            }
        })
    }, [auth])

    const onClickSignOut = () => {
        logoutUser();
        setUserUid(null);
        navigate('/');
    }
    return (
        <div>
            <h1>Main Menu</h1>
            <Link to='/level-select'>Play</Link>
            <Link to='/social'>Social</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/leaderboards'>Leaderboards</Link>
            <button onClick={onClickSignOut}>Sign Out</button>
        </div>
    )
}

export default MainMenu
