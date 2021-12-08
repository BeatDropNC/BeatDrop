import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const UserUidContext = createContext();

export const UserUidProvider = ({ children }) => {
    const [userUid, setUserUid] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUserUid(user?.uid);
        })
    }, []);

    return (
        <UserUidContext.Provider value={{ userUid, setUserUid }}>
            {children}
        </UserUidContext.Provider>
    )
}