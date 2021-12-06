import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUpUserByEmail } from '../../firebase/firebase'
import '../../styles/UserAuthentication.css'

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const signup = () => {
        if (!username) {
            alert('Please enter a username')
        } else signUpUserByEmail(username, email, password)
    }
    return (
        <main className="auth-page">
            <h2>Sign Up</h2>
            <div className="login-form">
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
                <button onClick={signup}>Sign Up</button>
            </div>
            <p>
                Already signed up? <Link to="/login">Login</Link>.
            </p>
        </main>
    )
}

export default SignupPage
