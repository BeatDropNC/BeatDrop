import { getDoc, doc } from "firebase/firestore"
import { db } from "./firebase"



const getUserByUid = async (uid) => {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    return userDoc.data();
}


export {
    getUserByUid,
}