import { getUserByUid } from "../firebase/firestore.utils";


/* 
initialTestUserDocument:

*uid* : {
    authProvider: "local",
    email: "modasi2384@hagendes.com",
    friends: [],
    highScores: {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        level5: 0,
        level6: 0,
    },
    scoreHistory: [],
    uid: *uid*,
    username: "user-signup-example", 
}
 */


describe("getUserByUid", () => {
    describe("Successful requests", () => {
        test("Test 1: Returns a user object in the correct form", async () => {
            const uid = "StcKOHV1aDZsvk34HC0XpLU8ewq1";
            const userObj = await getUserByUid(uid)
            expect(userObj).toEqual(
                expect.objectContaining({
                    uid: expect.any(String),
                    username: expect.any(String),
                    email: expect.any(String),
                    authProvider: expect.any(String),
                    friends: expect.any(Array),
                    highScores: expect.objectContaining({
                        level1: expect.any(Number),
                        level2: expect.any(Number),
                        level3: expect.any(Number),
                        level4: expect.any(Number),
                        level5: expect.any(Number),
                        level6: expect.any(Number),
                    }),
                    scoreHistory: expect.any(Array),
                })
            )
        })
        test("Test 2: Returns the correct user object", async () => {
            const uid = "StcKOHV1aDZsvk34HC0XpLU8ewq1";
            const userObj = await getUserByUid(uid);
            expect(userObj.username).toBe("user-signup-example");
        })
    })
    describe('Errors', () => {
        test('Test 3: Unique ID supplied not found in database', async () => {
            const uid = "notAUniqueId";
            await expect(getUserByUid(uid)).rejects.toEqual({
                status: 404,
                msg: "404 Error: User not found"
            });
        })
    })
})