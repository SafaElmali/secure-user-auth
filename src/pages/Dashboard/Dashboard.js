import React, { useContext } from 'react';
import { AuthContext } from '../../context/AutContext';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_DATA } from '../../graphql';

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const { token, expiresAt, userInfo } = authContext.authState;

    useQuery(GET_DASHBOARD_DATA, {
        onCompleted: (data) => {
            console.log(data)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    
    return (
        <div>
            <div>
                <p>{token}</p>
                <p>{expiresAt}</p>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
                <p>{userInfo.role}</p>
                <button onClick={authContext.logout}>Logout</button>
            </div>
        </div>
    )
}

export default Dashboard;