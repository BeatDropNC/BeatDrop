import { useState } from 'react'
import { resetPasswordByEmail } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import '../../styles/UserAuthentication.css'

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('')

    return (
        <main className="auth-page">
            <h2>Reset Password</h2>
            <section className="login-form">
                <label htmlFor="email-input">Email address:</label>
                <input
                    type="text"
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Registered Email Address"
                />
                <button onClick={() => resetPasswordByEmail(email)}>
                    Reset Password
                </button>
            </section>
            <p>
                Haven't made an account yet?
                <Link to="/signup"> Register</Link> now.
            </p>
        </main>
    )
}

export default ResetPasswordPage
