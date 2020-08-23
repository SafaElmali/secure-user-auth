import React, { useContext } from 'react';
import { AuthContext } from '../../context/AutContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const { token, expiresAt, userInfo } = authContext.authState;
    return (
        <div>
            <p>{token}</p>
            <p>{expiresAt}</p>
            <p>{userInfo.name}</p>
            <p>{userInfo.email}</p>
            <p>{userInfo.role}</p>
        </div>
    )
}

export default Home