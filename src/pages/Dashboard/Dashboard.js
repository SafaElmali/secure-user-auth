import React, { useContext } from 'react';
import { AuthContext } from '../../context/AutContext';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_DATA } from '../../graphql/queries';
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
                        <p>New Customers:{data?.getDashboardData?.newCustomers ? data.getDashboardData.newCustomers : '-'}</p>
                        <p>refunds:{data?.getDashboardData?.refunds ? data.getDashboardData.refunds : '-'}</p>
                        <p>Sales Volume:{data?.getDashboardData?.salesVolume ? data.getDashboardData.salesVolume : '-'}</p>
                    </div>
                )
                }
                <button onClick={authContext.logout}>Logout</button>
            </div>
        </div>
    )
}

export default Dashboard;