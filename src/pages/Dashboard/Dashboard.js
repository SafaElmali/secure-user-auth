import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AutContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log(authContext);
    }, [authContext])

    return (
        <div>
            <div>
                <label>Select User Roles</label>
                <select name="roles" id="roles">
                    <option value="ADMIN">Volvo</option>
                    <option value="MAINTAINER">Saab</option>
                    <option value="CUSTOMER">Opel</option>
                </select>
                <button type="button">Add This Role</button>
            </div>
        </div>
    )
}

export default Home