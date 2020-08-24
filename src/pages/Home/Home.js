import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/Signup">Signup</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Home;