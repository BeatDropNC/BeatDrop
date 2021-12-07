import { createContext, useState } from "react";

export const UserUidContext = createContext();

export const UserUidProvider = ({children}) => {
    const [userUid, setUserUid] = useState(null);

    return(
        <UserUidContext.Provider value={{userUid, setUserUid}}>
            {children}
        </UserUidContext.Provider>
    )
}