import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserUidContext } from '../../contexts/UserUidContext';
import '../../styles/Homepage.css'

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
            <button className={`signup-button homepage-button`} onClick={() => navigate('/signup')}>SIGN UP</button>
            <button className={`login-button homepage-button`} onClick={() => navigate('/login')}>LOGIN</button>
        </main>
        // Replace buttons with pixel buttons images 
    )
}

export default Homepage