import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUserByEmail } from '../../firebase/firebase'
import './UserAuthentication.css'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="login-page">
            <h1 className="auth-page-header">Login</h1>
            <div className="login__container">
                <form className="login-form">
                    <label htmlFor="email-input">Email address:</label>
                    <input
                        type="text"
                        id="email-input"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <label htmlFor="password-input">Password:</label>
                    <input
                        id="password-input"
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        className="login__btn"
                        onClick={() => loginUserByEmail(email, password)}
                    >
                        Login
                    </button>
                </form>
                <div>
                    <Link to="/reset-password">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/signup">Sign up</Link>{' '}
                    here.
                </div>
            </div>
        </div>
    )
}

export default LoginPage
