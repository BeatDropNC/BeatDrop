import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const getUserDoc = async (uid) => {
    if (uid === undefined) {
        console.log("User Unique ID is undefined")
    } else {
        const userDocRef = doc(db, "users", uid);
        try {
            const userDoc = await getDoc(userDocRef)
            if (userDoc.exists()) {
                return userDoc.data()
            } else {
                console.log("User document not found")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    getUserDoc,
}