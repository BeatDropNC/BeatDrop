import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase/firebase";

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
                "achievements": ["bronze", "silver"],
                "timestamp": Timestamp.fromDate(new Date())
            }
        )
    } catch (error) {
        console.log(error)
    }
}

const createBadgeActivityBody = (achievementsArray, level) => {
    // add space in level string
    const formattedLevel = `${level.slice(0,level.length - 1)} ${level[level.length-1]}`

    // create post body
    let postBody = '';

    if (achievementsArray.length === 1) {
        postBody += `posted a new achievement! They completed the ${achievementsArray[0]} challenge while playing ${formattedLevel}.`
    } else if (achievementsArray.length === 2) {
        postBody += `posted new achievements! They completed the ${achievementsArray[0]} and ${achievementsArray[1]} challenges while playing ${formattedLevel}.`
    } else {
        postBody += `posted new achievements! They completed the `;
        // build sentence list
        let sentence = '';
        for (let i = 0; i < achievementsArray.length - 2; i++) {
            sentence += `${achievementsArray[i]}, `
        }
        sentence += achievementsArray[achievementsArray.length - 2];
        sentence += ` and ${achievementsArray[achievementsArray.length - 1]}`
        // add sentence list
        postBody += sentence;
        // end of post body
        postBody += ` challenges while playing ${formattedLevel}.`
    }
    return postBody
}

export {
    seedGlobalLeaderboardCollection,
    seedActivitiesCollection,
    createBadgeActivityBody,
}
