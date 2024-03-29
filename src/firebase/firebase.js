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


const signUpUserByEmail = async (username, email, password, setErrorMessage, avatarUrl) => {
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
            badges: {
                "level1": {
                    "gold": false,
                    "silver": false,
                    "bronze": false,
                },
                "level2": {
                    "gold": false,
                    "silver": false,
                    "bronze": false,
                },
                "level3": {
                    "gold": false,
                    "silver": false,
                    "bronze": false,
                },
                "level4": {
                    "gold": false,
                    "silver": false,
                    "bronze": false,
                },
                "level5": {
                    "gold": false,
                    "silver": false,
                    "bronze": false,
                }
            },
            authProvider: 'local',
            friends: [],
            avatar_url: avatarUrl,
            avatar: "fox",
            userScores: {
                "level1": [
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                ],
                "level2": [
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                ],
                "level3": [
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                ],
                "level4": [
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                ],
                "level5": [
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                    { "score": 0, "timeCompletedAt": "" },
                ]
            },
        })
    } catch (error) {
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