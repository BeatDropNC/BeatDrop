import { useState } from 'react';
import { resetPasswordByEmail } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import '../../styles/UserAuthentication.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmitPasswordReset = async (e) => {
        e.preventDefault();
        await resetPasswordByEmail(email);
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
                <button type="submit" className="auth-submit-btn">
                    Reset Password
                </button>
            </form>
            <div>
                Haven't made an account yet?
                <Link to="/signup"> Register</Link> now.
            </div>
        </main>
    )
}

export default ResetPasswordPage;
