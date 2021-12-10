import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/SocialFeed.css'
const Social = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userUid) {
            navigate('/');
        }
    }, [userUid, navigate]);
    return (
        <div className="SocialFeed">
            <h1>Social</h1>
            <div className="social-feed-container">


                
            </div>
            <Link to='/main-menu'>Return to Main Menu</Link>
        </div>
    )
}

export default SocialFeed
