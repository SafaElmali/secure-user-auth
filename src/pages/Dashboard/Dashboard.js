import React, { useContext } from 'react';
import { AuthContext } from '../../context/AutContext';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_DATA } from '../../graphql';
import UserInfo from './UserInfo/UserInfo';

const Dashboard = () => {
    const authContext = useContext(AuthContext);

    const { data, loading } = useQuery(GET_DASHBOARD_DATA, {
        onError: (err) => {
            console.log(err)
        }
    })

    return (
        <div>
            <div>
                <UserInfo authState={authContext.authState} />
                <hr />
                {loading ? <h2>Loading Please wait...</h2> : (
                    <div>
                        <p>New Customers:{data?.dashboardData?.newCustomers ? data.dashboardData.newCustomers : '-'}</p>
                        <p>refunds:{data?.dashboardData?.refunds ? data.dashboardData.refunds : '-'}</p>
                        <p>Sales Volume:{data?.dashboardData?.salesVolume ? data.dashboardData.salesVolume : '-'}</p>
                    </div>
                )
                }
                <button onClick={authContext.logout}>Logout</button>
            </div>
        </div>
    )
}

export default Dashboard;