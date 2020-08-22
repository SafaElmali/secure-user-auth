import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

// When user logs in or signup we can set the authentication details
const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        userInfo: {},
        expiresAt: null
    })

    const setAuthInfo = ({ token, userInfo, expiresAt }) => {
        setAuthState({
            token,
            userInfo,
            expiresAt
        })
    }

    return (
        <Provider value={{ authState, setAuthState: authInfo => setAuthInfo(authInfo) }}>
            {children}
        </Provider>
    )
}

export { AuthContext, AuthProvider }