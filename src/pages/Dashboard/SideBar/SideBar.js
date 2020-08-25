import React, { useContext } from 'react';
import { faChartLine, faChartPie, faAddressCard, faCogs, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/AutContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navItems = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: faChartLine,
        allowedRoles: ['USER', 'ADMIN']
    },
    {
        label: 'Inventory',
        path: '/inventory',
        icon: faChartPie,
        allowedRoles: ['ADMIN']
    },
    {
        label: 'Account',
        path: '/account',
        icon: faAddressCard,
        allowedRoles: ['USER', 'ADMIN']
    },
    {
        label: 'Settings',
        path: '/settings',
        icon: faCogs,
        allowedRoles: ['USER', 'ADMIN']
    },
    {
        label: 'Users',
        path: '/users',
        icon: faDoorOpen,
        allowedRoles: ['ADMIN']
    }
];

const Sidebar = () => {
    const authContext = useContext(AuthContext);
    const { role } = authContext.authState.userInfo;

    return (
        <ul style={{ listStyle: 'none', marginRight: 10 }}>
            {navItems.map(item => {
                return (
                    <>
                        {authContext.isAdmin() && item.allowedRoles.includes(role) && (
                            <div>
                                <a href={item.path} style={{ display: 'flex' }}>
                                    <FontAwesomeIcon icon={item.icon} />  <li>{item.label}</li>
                                </a>
                            </div>
                        )}
                    </>
                )
            })
            }
        </ul>
    )
}

export default Sidebar;