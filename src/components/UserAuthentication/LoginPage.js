import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserByEmail } from '../../firebase/firebase'
import '../../styles/UserAuthentication.css'
import { UserUidContext } from '../../contexts/UserUidContext'
import '../../styles/LoginPage.css'
import login from '../../assets/buttons/Login.png'
import signup from '../../assets/buttons/Signup.png'

const LoginPage = () => {
    const { userUid } = useContext(UserUidContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        await loginUserByEmail(email, password, setErrorMessage).then((result) => {
        })
    }

    useEffect(() => {
        if (userUid !== undefined && userUid !== null){
            //The user is logged in
            navigate('/main-menu')

        } else {
            //The user is not logged in
        }
        
    }, [userUid, navigate])


    return (
        <main className="LoginPage">
               <h1 className="login-page-title">LOGIN</h1>
            <form className="login-page-form" onSubmit={handleSubmitLogin}>
             
                <div className="login-page-fields-container">
                    <label htmlFor="login-page-email-label">E-mail address:</label>
                    <input
                    className="login-page-input"
                        type="text"
                        id="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                    />
                    <label className="login-page-password-label" htmlFor="password-input">Password:</label>
                    <input
                    className="login-page-input"
                        id="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                    />
                </div>
                <p className="auth-error-message login-page-error-message">
                    {errorMessage ? errorMessage : null}
                </p>
                <button type="submit" className="login-page-submit-button">
                    REPLACE W LOGIN PIXEL
                </button>
            </form>
            <p className="login-page-reset-password-link">
                <Link to="/reset-password">Forgot Password</Link>
            </p>
            <p>Don't have<br></br>an account?</p>
            <div className="login-page-signup-link">
                <Link  to="/signup">Sign up</Link>
            </div>
        </main>
    )
}

export default LoginPage
