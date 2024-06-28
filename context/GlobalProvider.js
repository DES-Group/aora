import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";


//Create a context 
const GlobalContext = createContext() 

// Create a hook useGlobalContext in order to use the GlobalContext we already created
export const useGlobalContext = () => useContext(GlobalContext)


//Create a Provider : a ordinary React function 
export const GlobalProvider = ({children}) => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        getCurrentUser()
            .then((res) => {
                if (res) 
                {
                    setIsLoggedIn(true)
                    setUser(res)
                }
                else 
                {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setIsLoading(false)
            })
    }, [])
    
    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn, 
                setIsLoggedIn,
                isLoading,
                user,
                setUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}