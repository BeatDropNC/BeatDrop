import { useState } from 'react';
import { resetPasswordByEmail } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import '../../styles/UserAuthentication.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [messageToUser, setMessageToUser] = useState(null);

    const handleSubmitPasswordReset = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setMessageToUser('');
        await resetPasswordByEmail(email, setErrorMessage, setMessageToUser);
    }
    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmitPasswordReset}>
                <h1 className="auth-page-header">Reset Password</h1>
                <div className="auth-form-field">
                    <label htmlFor="email-input">Email address:</label>
                    <input
                        type="text"
                        id="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Registered Email Address"
                    />
                </div>
                <div className="auth-error-message">
                    {errorMessage ? errorMessage : null}
                </div>
                <div className='auth-user-message'>
                    {messageToUser ? messageToUser : null}
                </div>

                <button type="submit" className="auth-submit-btn">
                    Reset Password
                </button>
            </form>
            <div>
                Haven't made an account yet?
                <Link to="/signup"> Register</Link> now.
            </div>
            <div>
                Already have an account? <Link to='/login'>Login</Link>.
            </div>
        </main>
    )
}

export default ResetPasswordPage;
