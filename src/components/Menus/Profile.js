import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import { patchUserAvatar } from '../../firebase/firebase.api';
import '../../styles/Profile.css'
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
const data = require('../../dummy-data.json');


const Profile = () => {

    const { userUid, userInformation, setUserInformation } = useContext(UserUidContext);
    const [levelToShow, setLevelToShow] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        if (!userUid) {
            navigate('/');
        }
    }, [userUid, navigate]);

    const defaultAvatar = userInformation !== null ? {avatarName: userInformation.avatar, avatarSrc: userInformation.avatar_url} : {avatarName: "fox", avatarSrc: fox}
    const [currentAvatar, setCurrentAvatar] = useState(defaultAvatar);


    const updateUserAvatarInFirebase = async () => {

        if(userInformation.avatar !== currentAvatar.avatarName) {
            setUserInformation(currentUserInformation => {
                const  newUserInformation = JSON.parse(JSON.stringify(currentUserInformation))
                newUserInformation.avatar = currentAvatar.avatarName
                newUserInformation.avatar_src = currentAvatar.avatarSrc
                return newUserInformation
            })
            await patchUserAvatar(userUid, currentAvatar.avatarName, currentAvatar.avatarSrc)
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
    // Temp character sprites
    // const spriteLinks = [
    //     fox,
    //     penguin,
    //     robot_1,
    //     robot_2,
    //     robot_3,
    //     robot_4
    // ]

    const badgesLink = [
        bronze,
        silver,
        gold
    ]

    if(!userInformation) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div className='Profile'>
            <h1>{userInformation.username}'s Profile</h1>
            <h2>Avatar</h2>
            <div className='current_avatar'>
                <img src={currentAvatar.avatarSrc} alt={userInformation.username}></img>
            </div>
            <h2 className='character_select_title'>Character Select</h2>
            {/* <h2 className='character_select_title_mobile'>Character Select</h2> */}
            <div className='character_select_container'>
                <div className='character_select'>
                    {avatars.map((avatarObject) => {
                        return (
                            <button className='charSelectButton' key={avatarObject.avatarName} onClick={() => {
                                chooseAvatar(avatarObject)

                            }}>
                                <img className={avatarObject.avatarName} key={avatarObject.avatarName} src={avatarObject.avatarSrc} alt={avatarObject.avatarName}></img>
                            </button>
                        )
                    })}
                </div>
                <button onClick={async ()=>{
                   updateUserAvatarInFirebase()
                }}>Submit</button>
            </div>
            <h2>Badges - Level {levelToShow + 1}</h2>
            <div>
                <div className='profile-levelButtons'>
                    {Object.keys(userInformation.badges).map((level, index) => {
                        return (
                            <button
                                key={'buttons' + level + index}
                                onClick={() => {
                                    setLevelToShow(index)
                                }}
                            >
                                Level {index + 1}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className='user_badges'>

                {!userInformation.badges[`level${levelToShow + 1}`].bronze 
                && !userInformation.badges[`level${levelToShow + 1}`].silver 
                && !userInformation.badges[`level${levelToShow + 1}`].gold ? 
                <p>No badges for this level yet!</p> : ""}

                {userInformation.badges[`level${levelToShow + 1}`].bronze ? <img src={bronze}/>: ""}
                {userInformation.badges[`level${levelToShow + 1}`].silver ? <img src={silver}/> : ""}
                {userInformation.badges[`level${levelToShow + 1}`].gold ? <img src={gold}/> : ""}
            </div>
            <div className='main_menu_link'>
                <Link to='/main-menu'><img className='pixel-buttons-return' src={returnButton}/></Link>
            </div>
            
        </div>
    )
}

export default Profile
