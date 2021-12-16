import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/Homepage.css'
import signup from '../../assets/buttons/Signup.png'
import login from '../../assets/buttons/Login.png'
import fox from '../../assets/char_select_fox.png';
import penguin from '../../assets/char_select_penguin_flipped.png';

const Homepage = () => {
    const { userUid } = useContext(UserUidContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userUid) {
            navigate('/main-menu');
        }
    }, [userUid, navigate]);




    return (
        <main className="Homepage">
            
            <div className='titles'>
                <h1 className='beat'>BEAT</h1>
                <h1 className='drop'>DROP</h1>
                <div className='img_container'>
                    <div className='fox_container'>
                        <img src={fox} alt='fox' className='fox_img'/>
                    </div>
                    <div className='penguin_container'>
                        <img src={penguin} alt="penguin" className='penguin_img'/>
                    </div>
                </div>
            </div>
            <div className='homepage_buttons'>
                <img src={signup} alt='signup' className={`signup-button homepage-button`} onClick={() => navigate('/signup')}/>
                <img src={login} alt='login' className={`login-button homepage-buttonTwo`} onClick={() => navigate('/login')}/>
            </div>
        </main>
    )
}

export default Homepage