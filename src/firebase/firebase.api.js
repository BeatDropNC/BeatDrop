import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
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

const patchUserScores = async (userUid, sortedScores, levelChoice) => {
    const userDocRef = doc(db, "users", userUid);
    try {
        updateDoc(userDocRef, {
            userScores: { [levelChoice]: sortedScores }
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

const patchGlobalLeaderboardScore = async (gameLevel, newGlobalLevelHighScores) => {
    const globalLeaderboardDocRef = doc(db, "globalLeaderboard", gameLevel);
    try {
        await updateDoc(globalLeaderboardDocRef, {
            scoresList: { [gameLevel]: newGlobalLevelHighScores }
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

export {
    getUserDoc,
    patchUserScores,
    getGlobalLeaderboard,
    patchGlobalLeaderboardScore,
    patchUserAvatar,
}