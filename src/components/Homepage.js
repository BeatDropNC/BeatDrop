import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../firebase/firebase'

const Homepage = () => {
    const navigate = useNavigate();

    const onLogOutClickHandler = () => {
        logoutUser();
        navigate('/login')
    }
    return (
        <main>
            <h1>Homepage</h1>
            <button onClick={onLogOutClickHandler}>Log Out</button>
        </main>
    )
}

export default Homepage