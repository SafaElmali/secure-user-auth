import React from 'react';
import Sidebar from '../SideBar/SideBar';

const AppShell = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Sidebar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AppShell;