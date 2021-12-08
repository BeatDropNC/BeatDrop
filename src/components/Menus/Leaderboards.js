import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';

const Leaderboards = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!userUid) {
            navigate('/');
        }
    }, [userUid, navigate]);

    return (
        <div>
            <h1>Leaderboards</h1>
            <Link to='/main-menu'>Return to Main Menu</Link>
        </div>
    )
}

export default Leaderboards