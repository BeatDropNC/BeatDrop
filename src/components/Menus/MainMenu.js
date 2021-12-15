import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUidContext } from '../../contexts/UserUidContext'
import { logoutUser } from '../../firebase/firebase'
import '../../styles/MainMenu.css'
import play from '../../assets/buttons/Play.png'
import social from '../../assets/buttons/Social.png'
import profile from '../../assets/buttons/Profile.png'
import leaderboards from '../../assets/buttons/Leaderboards.png'
import signout from '../../assets/buttons/Signout.png'

const MainMenu = () => {
    const { userUid, setUserUid } = useContext(UserUidContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userUid) {
            navigate('/')
        }
    }, [userUid, navigate])

    const onClickSignOut = () => {
        logoutUser()
        setUserUid(null)
        navigate('/')
    }
    return (
        <main className="main-menu">
            <h1>Main Menu</h1>
            <Link to="/level-select"><img className='pixel-buttons-play' src={play}/></Link>
            <Link to="/social"><img className='pixel-buttons-social' src={social}/></Link>
            <Link to="/profile"><img className='pixel-buttons-profile' src={profile}/></Link>
            <Link to="/personal-leaderboard"><img className='pixel-buttons-leaderboards' src={leaderboards}/></Link>
            <img className='pixel-buttons-signout' src={signout} onClick={onClickSignOut}/>
        </main>
    )
}

export default MainMenu
