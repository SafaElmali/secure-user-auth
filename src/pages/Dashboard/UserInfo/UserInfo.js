import React from 'react';

const UserInfo = ({ authState }) => {
    const { token, expiresAt, userInfo } = authState;
    
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

export default UserInfo;