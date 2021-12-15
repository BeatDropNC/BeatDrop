import { collection, doc, getDoc, getDocs, updateDoc, query, orderBy, limit, arrayUnion, addDoc, Timestamp } from 'firebase/firestore';
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

const patchGlobalLeaderboardScore = async (gameLevel, newGlobalLevelHighScores) => {
    const globalLeaderboardDocRef = doc(db, "globalLeaderboard", gameLevel);
    try {
        await updateDoc(globalLeaderboardDocRef, {
            scoresList: newGlobalLevelHighScores,
        })
    } catch (error) {
        console.log(error)
    }
}

const patchUserAvatar = async (uid, avatar_url) => {
    const userDocRef = doc(db, "users", uid);
    try {
        await updateDoc(userDocRef, {
            avatar_url
        })
    } catch (error) {

    }
}

const postNewActivity = async (username, newBadges, newScore, level) => {
    const activityCollectionRef = collection(db, "activities");
    //const temporaryDocRef = doc(db, "activities", "test-post")
    console.log(username, newBadges, newScore, level)
    try {
        await addDoc(activityCollectionRef, {
            "highscore": newScore,
            level,
            username,
            "comments": [],
            "achievements": newBadges,
            "timestamp": Timestamp.fromDate(new Date()),
        })
    } catch (error) {
        console.log(error)
    }
}

const patchUserBadges = async (userUid, badges) => {
    const userDocRef = doc(db, "users", userUid);
    try {
        await updateDoc(userDocRef, {
            badges
        })
    } catch (error) {
        console.log(error)
    }
}


const getActivities = async () => {
    const activitiesRef = collection(db,"activities");
    const q = query(activitiesRef, orderBy('timestamp', "desc"), limit(5));
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


const postCommentToActivity = async (activityRef, commentToAdd) => {
    console.log("making a post request to activity comments", activityRef, commentToAdd)
    const docRef = doc(db,"activities", activityRef);
    try {
     return await updateDoc(docRef, {
         comments: arrayUnion(commentToAdd)
     })

    } catch (error) {
        console.log("there was an error Posting to activities")
    }
}


export {
    getUserDoc,
    patchUserScores,
    getGlobalLeaderboard,
    patchGlobalLeaderboardScore,
    patchUserAvatar,
    postNewActivity,
    patchUserBadges,
    getActivities,
    postCommentToActivity
}