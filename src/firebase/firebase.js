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

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

const loginUserByEmail = async (email, password, setErrorMessage) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        setErrorMessage('')
    } catch (error) {
        console.log([error.message])
        let frontendErrorMessage
        switch (error.message) {
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
}

const logoutUser = async () => {
    try {
        await auth.signOut();
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
