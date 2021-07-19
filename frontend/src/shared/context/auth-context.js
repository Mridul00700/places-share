import { createContext } from 'react';



// create context object that we can use anywhere in out app...
export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
});