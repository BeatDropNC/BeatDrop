import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { getUserDoc } from "../firebase/firebase.api";

export const UserUidContext = createContext();

export const UserUidProvider = ({ children }) => {
    const [userUid, setUserUid] = useState(null);
    const [userInformation, setUserInformation] = useState(null);
    useEffect(() => {
        //When the context is first rendered it subscribes to any firebase auth changes
        //Any changes to User Id are set in the context so componenets can subscribe to
        //changes.

        const unsubscribe = onAuthStateChanged(auth, user => {
            setUserUid(user?.uid);
            getUserDoc(user?.uid)
                .then(response => {
                    if(response !== undefined) {
                        console.log("current user object ", response)
                        setUserInformation(response);

                    }
                })
        })

        //When the context is released, we unsubscribe to auth changes
        return () => {
            unsubscribe()
        }
    }, []);

    return (
        <UserUidContext.Provider value={{ userUid, setUserUid, userInformation, setUserInformation }}>
            {children}
        </UserUidContext.Provider>
    )
}