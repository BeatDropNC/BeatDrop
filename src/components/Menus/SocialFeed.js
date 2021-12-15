import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/SocialFeed.css'
import SocialFeedCard from '../sub-components/SocialFeedCard';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { getActivities } from '../../firebase/firebase.api';
import returnButton from '../../assets/buttons/Return.png';

const SocialFeed = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();
    const [socialData, setSocialData] = useState([])



    useEffect(() => {
        console.log("Request made to get activities")
       getActivities().then((activities) => {
        setSocialData(activities)
       })
        
    }, [setSocialData]) 


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
            {socialData.map((singleActivityObject) => {
                const activityKey = Object.keys(singleActivityObject)[0]
                const postData = singleActivityObject[activityKey]
                return <SocialFeedCard key={activityKey} postData={postData} postKey={activityKey}></SocialFeedCard>


            })}

                
            </div>
            <Link to='/main-menu'><img className='pixel-buttons-return' src={returnButton}/></Link>
        </div>
    )
}

export default SocialFeed
