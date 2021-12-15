import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import { patchUserAvatar } from '../../firebase/firebase.api';
import '../../styles/ProfilePage.css'
import fox from '../../assets/sprites/fox.png'
import penguin from '../../assets/sprites/penguin.png'
import robot_1 from '../../assets/sprites/robot_1.png'
import robot_2 from '../../assets/sprites/robot_2.png'
import robot_3 from '../../assets/sprites/robot_3.png'
import robot_4 from '../../assets/sprites/robot_4.png'
import bronze from '../../assets/medals/18.png'
import silver from '../../assets/medals/19.png'
import gold from '../../assets/medals/20.png'
import returnButton from '../../assets/buttons/Return.png';
import UserBadges from '../sub-components/UserBadges';
const data = require('../../dummy-data.json');


const ProfilePage = () => {

    const { userUid, userInformation, setUserInformation } = useContext(UserUidContext);
    const [levelToShow, setLevelToShow] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        if (!userUid) {
            navigate('/');
        }
    }, [userUid, navigate]);

    let defaultAvatarObject = userInformation !== null ? {avatarName: userInformation.avatar, avatarSrc: userInformation.avatar_url} : {avatarName: "fox", avatarSrc: fox }


    const [currentAvatar, setCurrentAvatar] = useState(defaultAvatarObject);


    const updateUserAvatarInFirebase = async () => {

        if(userInformation.avatar !== currentAvatar.avatarName) {
            setUserInformation(currentUserInformation => {
                const  newUserInformation = JSON.parse(JSON.stringify(currentUserInformation))
                newUserInformation.avatar = currentAvatar.avatarName
                newUserInformation.avatar_src = currentAvatar.avatarSrc
                return newUserInformation
            })
            await patchUserAvatar(userUid, currentAvatar.avatarName, currentAvatar.avatarSrc)
            .then(()=>{
                console.log("Patched")
            })
            .catch((err)=>{
                console.log(err)
            })
        } 
    }
    

    const chooseAvatar = (avatar) => {

        setCurrentAvatar(avatar)
    }

    const avatars = [
        {avatarName: "fox", avatarSrc: fox},
        {avatarName: "penguin", avatarSrc: penguin},
        {avatarName: "robot_1", avatarSrc: robot_1},
        {avatarName: "robot_2", avatarSrc: robot_2},
        {avatarName: "robot_3", avatarSrc: robot_3},
        {avatarName: "robot_4", avatarSrc: robot_4},

    ]


    if(!userInformation) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div className='ProfilePage'>

            <h1 className="profile-title">{userInformation.username}'s Profile</h1>

            <div className="main-profile-container">
            <div className="avatar-select-container">

            <h2 className="profile-subtitle">Current Avatar</h2>
            <div className='current_avatar'>
                <img className={`current-avatar-image`}src={currentAvatar.avatarSrc} alt={userInformation.username}></img>
            </div>
            <h2 className='character_select_title profile-subtitle'>Choose a New Character</h2>

            <div className='character_select_container'>

                <div className='character_select'>
                    {avatars.map((avatarObject) => {
                        return (
                            <button className={`character-select-button ${avatarObject.avatarName === currentAvatar.avatarName ? 'selected-button' : ""}`} key={avatarObject.avatarName} onClick={() => {
                                chooseAvatar(avatarObject)

                            }}>
                                <img className={`avatar-button-image`} key={avatarObject.avatarName} src={avatarObject.avatarSrc} alt={avatarObject.avatarName}></img>
                            </button>
                        )
                    })}
                </div>
                <button className={`avatar-submit-button`} onClick={async ()=>{
                   updateUserAvatarInFirebase()
                }}>Save Avatar Choice</button>
            </div>
            </div>
                <UserBadges></UserBadges>

            <div className='main_menu_link'>
                <Link to='/main-menu'><img className='pixel-buttons-return' src={returnButton}/></Link>
            </div>
            </div>
        </div>
    )
}

export default ProfilePage
