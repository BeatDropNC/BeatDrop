import { doc, setDoc } from "firebase/firestore";
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
                    [leaderboardDoc.level]:
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

export {
    currentDateTimeString,
    seedGlobalLeaderboardCollection
}
