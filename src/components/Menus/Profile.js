import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/Profile.css'
const data = require('../../dummy-data.json');

const Profile = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userUid) {
            navigate('/');
        }
    }, [userUid, navigate]);

    const [currentAvatar, setCurrentAvatar] = useState('https://img.favpng.com/13/21/14/sprite-animation-2d-computer-graphics-game-character-png-favpng-JfchZaT8PcD0SyBxicgteE54g.jpg');



    // Temp character sprites
    const spriteLinks = [
        'https://img.favpng.com/13/21/14/sprite-animation-2d-computer-graphics-game-character-png-favpng-JfchZaT8PcD0SyBxicgteE54g.jpg',
        'https://img.favpng.com/14/1/21/cartoon-character-animation-game-png-favpng-dt9BZDhZxuwemLxuqz1pmXPXy.jpg',
        'https://www.pinclipart.com/picdir/middle/559-5591551_2d-character-sprite-transparent-clipart.png',
        'https://www.pinclipart.com/picdir/middle/559-5599557_rpg-character-png-2d-clipart.png',
        'https://www.pinclipart.com/picdir/middle/495-4951686_10-nobodys-hero-2d-sprites-character-egypt-clipart.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKWnct6W7vy_S_nYF3lKgXqtvBBrX2Dw3wz7naEZi8xHpw6zfxXD2NY1VfTYvS-hAFbpU&usqp=CAU',
    ]

    const badgesLink = [
        'https://cdn.imgbin.com/16/21/8/imgbin-gold-badge-white-seal-badge-with-gold-decor-round-gold-frame-illutsration-7uCZV8fzRdEett5xPSEsXdBdw.jpg',
        'https://toppng.com/uploads/preview/seal-badge-blue-png-11546988382eu7lmbuich.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR83MNqrxjXDb0yOdURuaOWFjFFGzRBjUTP6Lxe_i7q-Z-6pcwXruAhNY_V7tJn5GPUGf8&usqp=CAU',
    ]

    return (
        <div className='Profile'>
            <h1>{data.users.userDocument1.username}</h1>
            <h2>Avatar</h2>
            <div className='current_avatar'>
                <img src={currentAvatar}></img>
            </div>
            <h2 className='character_select_title'>Character Select</h2>
            <h2 className='character_select_title_mobile'>Character Select</h2>
            <div className='character_select_container'>
                <div className='character_select'>
                    {spriteLinks.map((sprite) => {
                        return (
                            <button key={sprite} onClick={() => {
                                setCurrentAvatar(sprite);
                                // Patch user with new sprite
                            }}>
                                <img className={sprite} key={sprite} src={sprite}></img>
                            </button>
                        )
                    })}
                </div>
            </div>
            <h2>Badges</h2>
            <div className='user_badges'>
                {badgesLink.map((badge) => {
                    return (
                        <img className={badge} key={badge} src={badge}></img>
                    )
                })}
            </div>
            <div className='main_menu_link'>
                <Link to='/main-menu'>Return to Main Menu</Link>
            </div>
            
        </div>
    )
}

export default Profile
