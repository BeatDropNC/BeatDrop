import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase"


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