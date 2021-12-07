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

        default:
            break
    }



    setErrorMessage(frontendErrorMessage)
}