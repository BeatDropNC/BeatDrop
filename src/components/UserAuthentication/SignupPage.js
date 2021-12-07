import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUpUserByEmail } from '../../firebase/firebase';
import '../../styles/UserAuthentication.css';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        if (!username) {
            alert('Please enter a username')
        } else {
            await signUpUserByEmail(username, email, password, setErrorMessage);
        }
    }

    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmitSignup}>
                <h1 className="auth-page-header">Sign Up</h1>
                <div className="auth-form-field">
                    <label htmlFor="username-input">Username:</label>
                    <input
                        type="text"
                        id="username-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                    />
                </div>
                <div className="auth-form-field" onSubmit={handleSubmitSignup}>
                    <label htmlFor="email-input">Email address:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                </div>
                <div className="auth-form-field">
                    <label htmlFor="password-input">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="auth-error-message">
                    {errorMessage ? errorMessage : null}
                </div>
                <button className="auth-submit-btn">Sign Up</button>
            </form>
            <div>
                Already signed up? <Link to="/login">Login</Link>.
            </div>
        </main>
    )
}

export default SignupPage;
