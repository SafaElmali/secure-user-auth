import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

// When user logs in or signup we can set the authentication details
const AuthProvider = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo');
    const expiresAt = localStorage.getItem('expiresAt');
    const history = useHistory();

    const [authState, setAuthState] = useState({
        token: null,
        expiresAt,
        userInfo: userInfo ? JSON.parse(userInfo) : {}
    })

    const setAuthInfo = ({ token, userInfo, expiresAt }) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('expiresAt', JSON.stringify(expiresAt));
        setAuthState({
            userInfo,
            expiresAt
        })
    }

    //Remove localstorage && redirect to login
    const logout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('expiresAt');
        setAuthState({
            expiresAt: null,
            userInfo: {}
        });
        history.push("/login");
    }

    //Check user role for conditionally displaying components
    const isAdmin = () => {
        return authState.userInfo.role === 'ADMIN';
    }

    // Check has token && token is valid
    const isAuthenticated = () => {
        if (!authState.token || !authState.expiresAt) {
            return false;
        }

        return new Date().getTime() / 1000 < authState.expiresAt;
    }

    return (
        <Provider value={{ authState, setAuthState: authInfo => setAuthInfo(authInfo), isAuthenticated, logout, isAdmin }}>
            {children}
        </Provider>
    )
}

export { AuthContext, AuthProvider }