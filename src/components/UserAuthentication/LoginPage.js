import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserByEmail } from '../../firebase/firebase'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '../../firebase/firebase'

import '../../styles/UserAuthentication.css'
import { UserUidContext } from '../../contexts/UserUidContext'

const LoginPage = () => {
    const { setUserUid } = useContext(UserUidContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        await loginUserByEmail(email, password, setErrorMessage)
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { uid } = user
                setUserUid(uid)
                if (uid !== undefined) {
                    navigate('/homepage')
                }
            } else {
                setUserUid(null)
            }
        })
    }, [setUserUid, navigate])

    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmitLogin}>
                <h1 className="auth-page-header">Login</h1>
                <div className="auth-form-field">
                    <label htmlFor="email-input">Email address:</label>
                    <input
                        type="text"
                        id="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                </div>
                <div className="auth-form-field">
                    <label htmlFor="password-input">Password:</label>
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>

                <div className="auth-error-message">
                    {errorMessage ? errorMessage : null}
                </div>
                <button type="submit" className="auth-submit-btn">
                    Login
                </button>
            </form>
            <div>
                <Link to="/reset-password">Forgot Password</Link>
            </div>
            <div>
                Don't have an account? <Link to="/signup">Sign up</Link> here.
            </div>
        </main>
    )
}

export default LoginPage
