import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/Homepage.css'
import signup from '../../assets/buttons/Signup.png'
import login from '../../assets/buttons/Login.png'

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
            
            <div>
                <h1 className='beat'>BEAT</h1>
                <h1 className='drop'>DROP</h1>
            </div>
            <img src={signup} className={`signup-button homepage-button`} onClick={() => navigate('/signup')}/>
            <img src={login} className={`login-button homepage-button`} onClick={() => navigate('/login')}/>
        </main>
    )
}

export default Homepage