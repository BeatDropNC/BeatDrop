import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext'

const WelcomePage = () => {
    const { userUid } = useContext(UserUidContext);
    console.log(userUid);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userUid) {
            navigate('/');
        }
    }, [userUid]);

    return (
        <div>
            <h1>Beat Drop Welcome Page</h1>
            <Link to='/main-menu'>Press Start</Link>
        </div>
    )
}

export default WelcomePage
