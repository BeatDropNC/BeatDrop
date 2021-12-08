import { useState } from 'react'
import { resetPasswordByEmail } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import '../../styles/UserAuthentication.css'
import { setFrontendErrorMessage } from '../../firebase/errors'

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [messageToUser, setMessageToUser] = useState(null)

    const handleSubmitPasswordReset = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setMessageToUser('');
        await resetPasswordByEmail(email, setErrorMessage, setMessageToUser)
            .then(() => {
                setMessageToUser('Your reset password link has been sent. Please check your emails including your spam folder.');
            })
            .catch(error=> {
                setFrontendErrorMessage(error, setErrorMessage);
            })
    }
    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmitPasswordReset}>
                <h1 className="auth-page-header">Reset Password</h1>
                <div className="auth-form-fields">
                    <label htmlFor="email-input">Email address:</label>
                    <input
                        type="text"
                        id="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Registered Email Address"
                    />
                </div>
                <p className="auth-error-message">
                    {errorMessage ? errorMessage : null}
                </p>
                <p className="auth-user-message">
                    {messageToUser ? messageToUser : null}
                </p>

                <button type="submit" className="auth-submit-btn">
                    Reset Password
                </button>
            </form>
            <p>
                Haven't made an account yet?
                <Link to="/signup"> Register</Link> now.
            </p>
            <p>
                Already have an account? <Link to="/login">Login</Link>.
            </p>
        </main>
    )
}

export default ResetPasswordPage
