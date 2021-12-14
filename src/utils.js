import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase/firebase";

const currentDateTimeString = () => {
    const today = new Date();
    const datetimeString = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    return datetimeString
}

const seedGlobalLeaderboardCollection = async () => {
    const leaderboardDocRefs = [
        { ref: doc(db, 'globalLeaderboard', "level1"), level: "level1" },
        { ref: doc(db, 'globalLeaderboard', "level2"), level: "level2" },
        { ref: doc(db, 'globalLeaderboard', "level3"), level: "level3" },
        { ref: doc(db, 'globalLeaderboard', "level4"), level: "level4" },
        { ref: doc(db, 'globalLeaderboard', "level5"), level: "level5" },
    ];
    leaderboardDocRefs.forEach(async (leaderboardDoc) => {
        try {
            await setDoc(leaderboardDoc.ref,
                {
                    scoresList:
                        [
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                            { "score": 0, "username": "", "timeCompletedAt": "" },
                        ]
                }
            )
        } catch (error) {
            console.log(error)
        }
    })
}

const seedActivitiesCollection = async () => {
    const activityCollectionRef = collection(db, "activities");
    try {
        await addDoc(activityCollectionRef,
            {
                "highscore": null,
                "level": "level 1",
                "username": "wadawdaw",
                "comments": [
                    {
                        "username": "ssi75121",
                        "commentBody": "Congrats! Thats such a good badge to get! you are pretty good at this now!",
                        "timestamp": Timestamp.fromDate(new Date())
                    }, {
                        "username": "ssi75121",
                        "commentBody": "Congrats! Thats such a good badge to get! you are pretty good at this now!",
                        "timestamp": Timestamp.fromDate(new Date())
                    }, {
                        "username": "ssi75121",
                        "commentBody": "Congrats! Thats such a good badge to get! you are pretty good at this now!",
                        "timestamp": Timestamp.fromDate(new Date())
                    }, {
                        "username": "ssi75121",
                        "commentBody": "Congrats! Thats such a good badge to get! you are pretty good at this now!",
                        "timestamp": Timestamp.fromDate(new Date())
                    }, {
                        "username": "ssi75121",
                        "commentBody": "Congrats! Thats such a good badge to get! you are pretty good at this now!",
                        "timestamp": Timestamp.fromDate(new Date())
                    }
                ],
                "achievement": "Badge1",
                "timestamp": Timestamp.fromDate(new Date())
            }
        )
    } catch (error) {
        console.log(error)
    }
}

export {
    currentDateTimeString,
    seedGlobalLeaderboardCollection,
    seedActivitiesCollection,
}
