import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserByEmail } from '../../firebase/firebase'
import '../../styles/UserAuthentication.css'
import { UserUidContext } from '../../contexts/UserUidContext'

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
            navigate('/welcome-page')

        } else {
            //The user is not logged in
        }
        
    }, [userUid, navigate])


    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmitLogin}>
                <h1>Login</h1>
                <div className="auth-form-fields">
                    <label htmlFor="email-input">Email address:</label>
                    <input
                        type="text"
                        id="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <label htmlFor="password-input">Password:</label>
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <p className="auth-error-message">
                    {errorMessage ? errorMessage : null}
                </p>
                <button type="submit" className="auth-submit-btn">
                    Login
                </button>
            </form>
            <p>
                <Link to="/reset-password">Forgot Password</Link>
            </p>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link> here.
            </p>
        </main>
    )
}

export default LoginPage
