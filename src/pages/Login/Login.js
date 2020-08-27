import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AutContext';

const Login = () => {
    const authContext = useContext(AuthContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const [loginUser] = useMutation(LOGIN, {
        onError: (err) => {
            console.log(err)
        },
        onCompleted: (data) => {
            setName('');
            setPassword('');
            console.log(data);
            console.log("Redirecting to login page");
            authContext.setAuthState((data.login));
            setTimeout(() => {
                setRedirectToDashboard(true);
            })
        }
    })

    const handleLogin = (event) => {
        event.preventDefault();

        loginUser({ variables: { name, password } });
    }

    return (
        <>
            {redirectToDashboard && <Redirect to="/dashboard" />}
            <form onSubmit={handleLogin}>
                <div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="name" value={name} onChange={({ target }) => setName(target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" placeholder="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <button type="submit">Let me in!</button>
                </div>
            </form>
        </>
    )
}

export default Login;