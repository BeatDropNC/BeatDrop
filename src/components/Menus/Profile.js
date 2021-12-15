import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import { patchUserAvatar } from '../../firebase/firebase.api';
import '../../styles/Profile.css'
import fox from '../../assets/sprites/char_select_fox.png'
import penguin from '../../assets/sprites/char_select_penguin.png'
import robot_1 from '../../assets/sprites/char_select_robot_1.png'
import robot_2 from '../../assets/sprites/char_select_robot_2.png'
import robot_3 from '../../assets/sprites/char_select_robot_3.png'
import robot_4 from '../../assets/sprites/char_select_robot_4.png'
import bronze from '../../assets/medals/18.png'
import silver from '../../assets/medals/19.png'
import gold from '../../assets/medals/20.png'
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

    const [currentAvatar, setCurrentAvatar] = useState(userInformation?.avatar_url);

    console.log(currentAvatar)
    
    // Temp character sprites
    const spriteLinks = [
        fox,
        penguin,
        robot_1,
        robot_2,
        robot_3,
        robot_4
    ]

    const badgesLink = [
        bronze,
        silver,
        gold
    ]

    console.log(levelToShow)
    console.log(userInformation)

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
                <img src={currentAvatar} alt={userInformation.username}></img>
            </div>
            <h2 className='character_select_title'>Character Select</h2>
            <h2 className='character_select_title_mobile'>Character Select</h2>
            <div className='character_select_container'>
                <div className='character_select'>
                    {spriteLinks.map((sprite) => {
                        return (
                            <button className='charSelectButton' key={sprite} onClick={() => {
                                setCurrentAvatar((prevSprite)=>{
                                    if(sprite !== prevSprite) {
                                        return sprite
                                    }
                                    return prevSprite
                                });
                                // Patch user with new sprite
                            }}>
                                <img className={sprite} key={sprite} src={sprite} alt={sprite}></img>
                            </button>
                        )
                    })}
                </div>
                <button onClick={async ()=>{
                    if(userInformation.avatar_url !== currentAvatar) {
                        setUserInformation(currentUserInformation => {
                            const  newUserInformation = JSON.parse(JSON.stringify(currentUserInformation))
                            newUserInformation.avatar_url = currentAvatar
                            return newUserInformation
                        })
                        await patchUserAvatar(userUid, currentAvatar)
                        .then(()=>{
                            console.log("Patched")
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    } 
                }}>Submit</button>
            </div>
            <h2>Badges - Level {levelToShow + 1}</h2>
            <div>
                <div className='levelButtons'>
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
                <Link to='/main-menu'>Return to Main Menu</Link>
            </div>
            
        </div>
    )
}

export default Profile
