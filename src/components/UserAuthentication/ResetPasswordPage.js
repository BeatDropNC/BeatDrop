import { useState } from 'react'
import { resetPasswordByEmail } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import '../../styles/UserAuthentication.css'
import resetPass from '../../assets/buttons/ResetPass.png';
import signup from '../../assets/buttons/Signup.png';
import login from '../../assets/buttons/Login.png';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [messageToUser, setMessageToUser] = useState(null)

    const handleSubmitPasswordReset = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        setMessageToUser('')
        await resetPasswordByEmail(email, setErrorMessage, setMessageToUser)
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

                <img src={resetPass} className={`reset-pass-btn`} alt="reset password submit button"  onClick={handleSubmitPasswordReset}/>
            </form>
            <Link to="/signup"><img className={`signup-btn`} src={signup} alt="sign up button" /></Link>
            <Link to="/login"><img className={`login-btn`} src={login} alt="" /></Link>
        </main>
    )
}

export default ResetPasswordPage
