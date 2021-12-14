import { collection, doc, getDoc, getDocs, updateDoc, query, orderBy, limit } from 'firebase/firestore';
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

const patchUserScores = async (userUid, newLevelScores, levelChoice) => {
    const userDocRef = doc(db, "users", userUid);
    const keyString = `userScores.${levelChoice}`;
    try {
        updateDoc(userDocRef, {
            [keyString]: newLevelScores
        })
    } catch (error) {
        console.log(error)
    }
}

const getGlobalLeaderboard = async () => {
    const globalLeaderboardRef = collection(db, "globalLeaderboard");
    try {
        const querySnapshot = await getDocs(globalLeaderboardRef);
        let currentGlobalLeaderboard = {};
        querySnapshot.forEach(doc => {
            currentGlobalLeaderboard[doc.id] = doc.data();
        })
        return currentGlobalLeaderboard;
    } catch (error) {
        console.log(error)
    }
}

const patchGlobalLeaderboardScore = async (gameLevel, newGlobalLevelHighScores, username) => {
    const globalLeaderboardDocRef = doc(db, "globalLeaderboard", gameLevel);
    try {
        await updateDoc(globalLeaderboardDocRef, {
            scoresList: newGlobalLevelHighScores,
            username
        })
    } catch (error) {
        console.log(error)
    }
}

const patchUserAvatar = async (uid, avatar_url) => {
    const userDocRef = doc(db,"users", uid);
    try {
        await updateDoc(userDocRef, {
            avatar_url
        })
    } catch (error) {
        
    }
}


const getActivities = async () => {
    const activitiesRef = collection(db,"activities");
    const q = query(activitiesRef, orderBy('timestamp'), limit(2));
    const activityDocuments = []
    try {
     const querySnapshot = await getDocs(q)
     querySnapshot.forEach((doc) => {
         console.log(doc.id, " => ", doc.data(), "This is an activity doc")
         activityDocuments.push({[doc.id]: doc.data()})
     })

    return activityDocuments        
    } catch (error) {
        console.log("there was an error getting activities")
    }
}

export {
    getUserDoc,
    patchUserScores,
    getGlobalLeaderboard,
    patchGlobalLeaderboardScore,
    patchUserAvatar,
    getActivities
}