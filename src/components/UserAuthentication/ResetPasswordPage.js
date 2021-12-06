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
<<<<<<< HEAD
                <label htmlFor="email-input">Email address:</label>
=======
                <label htmlFor="email-input">Registered Email address:</label>
>>>>>>> 588a02961091cf08e602509f902e9227b06a6f8c
                <input
                    type="text"
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
                    placeholder="Registered Email Address"
=======
                    placeholder="Email Address"
>>>>>>> 588a02961091cf08e602509f902e9227b06a6f8c
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
