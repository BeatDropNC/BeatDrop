import { useState } from 'react'
import { resetPasswordByEmail } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
// import {useAuthState} from 'react-firebase-hooks'

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('')

    return (
        <div>
            <h1>Reset Password</h1>
            <div className="reset-password-container"></div>
            <input
                type="text"
                className="reset-password-linktextBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Registered Email Address"
            />
            <button
                className="resetbtn"
                onClick={() => resetPasswordByEmail(email)}
            >
                Reset Password
            </button>
            <div>
                Haven't made an account yet?
                <Link to="/signup">Register</Link> now.
            </div>
        </div>
    )
}

export default ResetPasswordPage
