import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { signUpUserByEmail } from '../../firebase/firebase';


const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const signup = () => {
        if (!username) { alert("Please enter a username") }
        else signUpUserByEmail(username, email, password);
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <div className="signup__container">
                <input
                    type="text"
                    className='signup__textBox'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder='Choose a username'
                />
                <input
                    type="text"
                    className='signup__textBox'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='E-mail Address'
                />
                <input
                    type="password"
                    className='signup__textBox'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <button
                    className="signup__btn"
                    onClick={signup}
                >
                    Sign Up
                </button>
                <div>
                    Already signed up? <Link to='/login'>Login</Link>.
                </div>
            </div>
        </div>
    )
}

export default SignupPage
