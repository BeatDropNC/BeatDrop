export const setFrontendErrorMessage = ({ message }, setErrorMessage) => {
    let frontendErrorMessage
    switch (message) {
        case 'Firebase: Error (auth/wrong-password).':
            frontendErrorMessage =
                'Wrong password was supplied. Please try again.'
            break

        case 'Firebase: Error (auth/user-not-found).':
            frontendErrorMessage =
                "No user with provided Email Address was found. Don't have an account? Sign up below."
            break

        case 'Firebase: Error (auth/invalid-email).':
            frontendErrorMessage =
                'Invalid Email Address was provided. Please try again.'
            break

        case 'Firebase: Error (auth/email-already-in-use).':
            frontendErrorMessage = 'Email Address already in use.'
            break

        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
            frontendErrorMessage = 'Password must be atleast 6 characters.'
            break

        case 'Firebase: Email quota exceeded (auth/quota-exceeded).':
            frontendErrorMessage =
                'You have tried to reset your password too many times. Please try again later.'
            break
        case 'Firebase: Error (auth/too-many-requests).':
            frontendErrorMessage =
                'Your request limit has been exceeded. Please try again later.'
            break
        default:
            frontendErrorMessage = message
            break
    }

    setErrorMessage(frontendErrorMessage)
}
