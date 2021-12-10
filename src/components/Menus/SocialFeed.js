import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/SocialFeed.css'
import data from '../../dummy-data.json'
import SocialFeedCard from '../sub-components/SocialFeedCard';

const SocialFeed = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();
    const [socialData, setSocialData] = useState([])

    const getSocialData = () => {
        setSocialData(data.activities)
        
    }

    useEffect(() => {
        getSocialData()
        console.log(socialData)
    }, [socialData]) 


    useEffect(() => {

        if (!userUid) {
            navigate('/');
        }
    }, [userUid, navigate]);



    return (
        <div className="SocialFeed">
            <h1>Social</h1>
            <div className="social-feed-container">
            {Object.keys(socialData).map((key) => {
                const postData = socialData[key]
                return <SocialFeedCard key={key} postData={postData}></SocialFeedCard>


            })}

                
            </div>
            <Link to='/main-menu'>Return to Main Menu</Link>
        </div>
    )
}

export default SocialFeed
