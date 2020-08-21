import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [loginUser] = useMutation(LOGIN, {
        onError: (err) => {
            console.log(err)
        },
        onCompleted: (data) => {
            console.log("Successfully logged in!");
            console.log(data);
            setName('');
            setPassword('');
        }
    })

    const handleLogin = (event) => {
        event.preventDefault();

        loginUser({ variables: { name, password } });
    }

    return (
        <div>
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
        </div>
    )
}

export default Login;