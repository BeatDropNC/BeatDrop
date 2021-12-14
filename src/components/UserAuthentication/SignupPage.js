import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpUserByEmail } from '../../firebase/firebase'
import '../../styles/UserAuthentication.css'
import { UserUidContext } from '../../contexts/UserUidContext'

const SignupPage = () => {
    const { userUid } = useContext(UserUidContext)

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
            await signUpUserByEmail(username, email, password, setErrorMessage).then((result) => {
            })

        }
    }

    useEffect(() => {

        if (userUid !== undefined && userUid !== null){
             //The user has logged in
            navigate('/main-menu')
        } else {
            //The user is not logged in
        }
        
    }, [userUid, navigate])

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
            <p>Already <br></br>signed up?</p>
            <div className='login_link'>
                <Link to="/login">login</Link>
            </div>

        </main>
    )
}

export default SignupPage
