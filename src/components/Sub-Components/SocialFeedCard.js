import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/SocialFeedCard.css'

const SocialFeedCard = () => {
    const { userUid } = useContext(UserUidContext);
 
    
    return (
        <div className="SocialFeedCard">
       
            <div className="social-card-container">
                <img className="social-card-image"></img>
                <h3 className="social-card-username">UserName</h3>
                <h4 className="social-card-timestamp">TimeStamp</h4>
                <h2 className="social-card-description">TimeStamp</h2>
                <button className="social-card-show-comments">C</button>

            </div>
            <Link to='/main-menu'>Return to Main Menu</Link>
        </div>
    )
}

export default SocialFeedCard
