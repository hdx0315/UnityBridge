import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsAuthenticated(false);
        }, 3000)
    },[])

    const login = async(email, password)=>{
        try {

        } catch (error) {

        }
    }

    const logout = async()=>{
        try {

        } catch (error) {

        }
    }

    const register = async(email, password, username, profileUrl)=>{
        try {

        } catch (error) {

        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    )
}