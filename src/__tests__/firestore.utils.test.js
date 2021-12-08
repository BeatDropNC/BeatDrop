import { getUserByUid } from "../firebase/firestore.utils";



describe("getUserByUid", () => {
    describe("Successful requests", () => {
        test("Test 1: Returns a user object in the correct form", async () => {
            const uid = "tSrxjGzmnqUC2ouS78h1Qfnp3833";
            const userObj = await getUserByUid(uid)
            expect(userObj).toEqual(
                expect.objectContaining({
                    uid: expect.any(String),
                    username: expect.any(String),
                    email: expect.any(String),
                    authProvider: expect.any(String),
                    friends: expect.any(Array),
                    scores: expect.objectContaining({
                        level1: expect.any(Number),
                        level2: expect.any(Number),
                        level3: expect.any(Number),
                        level4: expect.any(Number),
                        level5: expect.any(Number),
                        level6: expect.any(Number),
                    })
                })
            )
        })
    })
})