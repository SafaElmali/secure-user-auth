import React, { useContext } from 'react';
import { faChartLine, faChartPie, faAddressCard, faCogs, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/AutContext';

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
        <ul>
            {navItems.map(item => {
                return (
                    <>
                        {authContext.isAdmin() && item.allowedRoles.includes(role) && (
                            <a href={item.path}>
                                <li>{item.label}</li>
                            </a>
                        )}
                    </>
                )
            })
            }
        </ul>
    )
}

export default Sidebar;