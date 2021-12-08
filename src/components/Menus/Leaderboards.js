import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';

const Leaderboards = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!userUid) {
            navigate('/');
        }
    }, [userUid]);

    return (
        <div>
            <h1>Leaderboards</h1>
        </div>
    )
}

export default Leaderboards