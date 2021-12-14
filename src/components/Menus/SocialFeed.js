import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/SocialFeed.css'
import data from '../../dummy-data.json'
import SocialFeedCard from '../sub-components/SocialFeedCard';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from '@firebase/auth';

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

        const unsubscribe = onAuthStateChanged(auth, user => {

            if (!user.uid) {
            navigate('/');
        }
        })

        //When the context is released, we unsubscribe to auth changes
        return () => {
            unsubscribe()
        }


    }, [navigate]);



    return (
        <div className="SocialFeed">
            <h1 className="social-feed-title">Social</h1>
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
