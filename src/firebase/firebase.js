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
    collection,
    addDoc,
    getDocs,
    where,
    query,
} from 'firebase/firestore'
import { setFrontendErrorMessage } from './errors'

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

const loginUserByEmail = async (email, password, setErrorMessage) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        setErrorMessage('')
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
        const collectionRef = collection(db, 'users')
        await addDoc(collectionRef, {
            uid: user.uid,
            username,
            email,
            authProvider: 'local',
            friends: [],
            scores: {
                level1: 0,
                level2: 0,
                level3: 0,
                level4: 0,
                level5: 0,
                level6: 0,
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

const getUserByUid = async (uid) => {
    try {
        const collectionRef = collection(db, 'users')
        const queryToUse = query(collectionRef, where('uid', '==', uid))
        const querySnapshot = await getDocs(queryToUse)
        let user
        querySnapshot.forEach((item) => {
            user = item.data()
        })
        return user
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

export {
    auth,
    loginUserByEmail,
    logoutUser,
    signUpUserByEmail,
    resetPasswordByEmail,
    getUserByUid,
}
