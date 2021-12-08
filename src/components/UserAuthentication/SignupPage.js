import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpUserByEmail } from '../../firebase/firebase'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '../../firebase/firebase'
import '../../styles/UserAuthentication.css'
import { UserUidContext } from '../../contexts/UserUidContext'
import { setFrontendErrorMessage } from '../../firebase/errors'

const SignupPage = () => {
    const { setUserUid } = useContext(UserUidContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmitSignup = async (e) => {
        e.preventDefault()
        if (!username) {
            alert('Please enter a username')
        } else {
            await signUpUserByEmail(username, email, password)
                .then(() => {
                    navigate('/welcome-page')
                })
                .catch(error => {
                    setFrontendErrorMessage(error, setErrorMessage);
                })

        }
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid } = user
                setUserUid(uid)
                if (uid !== undefined) {
                    navigate('/welcome-page')
                }
            } else {
                setUserUid(null)
            }
        })
    }, [setUserUid, navigate])

    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmitSignup}>
                <h1>Sign Up</h1>
                <div className="auth-form-fields">
                    <label htmlFor="username-input">Username:</label>
                    <input
                        type="text"
                        id="username-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                    />
                    <label htmlFor="email-input">Email address:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <label htmlFor="password-input">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <p className="auth-error-message">
                    {errorMessage ? errorMessage : null}
                </p>
                <button className="auth-submit-btn">Sign Up</button>
            </form>
            <p>
                Already signed up? <Link to="/login">Login</Link>.
            </p>
        </main>
    )
}

export default SignupPage
