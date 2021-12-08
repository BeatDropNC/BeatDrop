import firebaseConfig from './firebaseConfig.json'
import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    // deleteUser,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    setDoc,
} from 'firebase/firestore'

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

const loginUserByEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log([error.message])
        return Promise.reject(error);
    }
}

const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const signUpUserByEmail = async (username, email, password) => {
    try {
        // create user authentication
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        // add to users collection
        const documentRef = doc(db, 'users', user.uid);
        await setDoc(documentRef, {
            uid: user.uid,
            username,
            email,
            authProvider: 'local',
            friends: [],
            highScores: {
                level1: 0,
                level2: 0,
                level3: 0,
                level4: 0,
                level5: 0,
                level6: 0,
            },
            scoreHistory: [

            ]
        },)
    } catch (error) {
        //console.log([error.message])
        return Promise.reject(error)
    }
}

const resetPasswordByEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error) {
        return Promise.reject(error);
    }
}

export {
    auth, db,
    loginUserByEmail,
    logoutUser,
    signUpUserByEmail,
    resetPasswordByEmail,
}
