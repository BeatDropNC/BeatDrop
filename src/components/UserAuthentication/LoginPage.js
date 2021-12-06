import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUserByEmail } from '../../firebase/firebase'
import '../../styles/UserAuthentication.css'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <main className="auth-page">
            <h2>Login</h2>
            <section className="login-form">
                <label htmlFor="email-input">Email address:</label>
                <input
                    type="text"
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                />
                <label htmlFor="password-input">Password:</label>
                <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={() => loginUserByEmail(email, password)}>
                    Login
                </button>
            </section>
            <Link to="/reset-password">Forgot Password</Link>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link> here.
            </p>
        </main>
    )
}

export default LoginPage
