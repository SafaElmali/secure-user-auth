import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AutContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    return (
        <nav>
            <ul>
                <li>
                    <Link to={authContext.isAuthenticated() ? '/dashboard' : 'login'}>Login</Link>
                </li>
                <li>
                    <Link to='/signup'>Signup</Link>
                </li>
                <li>
                    <Link to={authContext.isAuthenticated() ? '/dashboard' : 'signup'}>Get Started</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Home;