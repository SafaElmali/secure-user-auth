import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

// When user logs in or signup we can set the authentication details
const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    const expiresAt = localStorage.getItem('expiresAt');

    const [authState, setAuthState] = useState({
        token,
        expiresAt,
        userInfo: userInfo ? JSON.parse(userInfo) : {}
    })

    const setAuthInfo = ({ token, userInfo, expiresAt }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('expiresAt', JSON.stringify(expiresAt));
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