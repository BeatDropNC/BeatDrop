import firebaseConfig from './firebaseConfig.json'
import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

const loginUserByEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        alert(error.message)
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
        console.log(error)
        alert(error.message)
    }
}

const resetPasswordByEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

export { auth, loginUserByEmail, signUpUserByEmail, resetPasswordByEmail }
