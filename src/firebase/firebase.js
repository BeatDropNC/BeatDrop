import firebaseConfig from './firebaseConfig.json'
import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    
} from 'firebase/auth'
import {
    getFirestore,
    setDoc,
    doc,
} from 'firebase/firestore'
import { setFrontendErrorMessage } from './errors'


initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()


const loginUserByEmail = async (email, password, setErrorMessage) => {
    try {
        const signInResult = await signInWithEmailAndPassword(auth, email, password)
        return signInResult
    
    } catch (error) {
        console.log([error.message])
        setFrontendErrorMessage(error, setErrorMessage)
    }
}

const logoutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}


const signUpUserByEmail = async (username, email, password, setErrorMessage) => {
    try {
        // create user authentication
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        // add to users collection
        //const collectionRef = collection(db, 'users')
        const userDocRef = doc(db, 'users', user.uid)
        await setDoc(userDocRef, {
            uid: user.uid,
            username,
            email,
            authProvider: 'local',
            friends: [],
            userScores: {
                "level1": [
                    {"score": 376700, "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 269500,  "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 197700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 187700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 173700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                ],   
                "level2": [
                    {"score": 376700, "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 269500,  "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 197700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 187700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 173700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                ],
                "level3": [
                    {"score": 376700, "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 269500,  "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 197700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 187700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 173700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                ],
                "level4": [
                    {"score": 376700, "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 269500,  "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 197700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 187700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 173700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                ],
                "level5": [
                    {"score": 376700, "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 269500,  "timeCompletedAt": "23 July 2021 at 17:00:00 UTC"},
                    {"score": 197700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 187700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                    {"score": 173700,  "timeCompletedAt": "15 March 2021 at 8:00:00 UTC"},
                ]
            },
        })
    } catch (error) {
        //console.log([error.message])
        setFrontendErrorMessage(error, setErrorMessage);
    }
}

const resetPasswordByEmail = async (email, setErrorMessage, setMessageToUser) => {
    try {
        await sendPasswordResetEmail(auth, email)
        setMessageToUser('Your reset password link has been sent. Please check your emails including your spam folder.')
    } catch (error) {
        setFrontendErrorMessage(error, setErrorMessage)
    }
}


export {
    auth, db,
    loginUserByEmail,
    logoutUser,
    signUpUserByEmail,
    resetPasswordByEmail,
}