import { getDoc, doc } from "firebase/firestore"
import { db } from "./firebase"



const getUserByUid = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            return Promise.reject({
                status: 404,
                msg: "404 Error: User not found"
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export {
    getUserByUid,
}