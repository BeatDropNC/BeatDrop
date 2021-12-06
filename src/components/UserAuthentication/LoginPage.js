import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { loginUserByEmail } from '../../firebase/firebase';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>Login</h1>
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
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
                <div>
                    {/* <Link to="/reset-password">Forgot Password</Link> */}
                </div>
                <div>
                    Don't have an account? <Link to="/signup">Sign up</Link> here.
                </div>
            </div>
        </div>
    )
}

export default LoginPage
