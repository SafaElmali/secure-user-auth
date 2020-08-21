import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../graphql';
import { useHistory } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const [saveUser] = useMutation(SIGN_UP, {
        onError: (error) => {
            console.log(error)
        },
        onCompleted: () => {
            setName('');
            setEmail('');
            setPassword('');
            console.log("Redirecting to login page");
            history.push('/login');
        }
    })
    const handleSignup = (event) => {
        event.preventDefault();

        saveUser({ variables: { name, email, password } })
    }

    return (
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="name" value={name} onChange={({ target }) => setName(target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="email" value={email} onChange={({ target }) => setEmail(target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" placeholder="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type='submit'>Signup</button>
        </form>
    )
}

export default Signup;