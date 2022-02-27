import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    return (
        <div className="login-form" onSubmit={(e) => {
            e.preventDefault();
            const user = {
                email: email,
                password: password,
            };
            axios.post('https://mern-movies-tracker.herokuapp.com/auth/login', user).then((response) => {
                console.log(response);
                navigate('/', {state: {
                    authenticated: true,
                    token: response.data.token,
                    userID: response.data.user.id
                }});
            }).catch((err) => {
                alert('Incorrect password');
            });
        }}>
            <form>
                <label className="form-label">Email:</label>
                <input className="form-control" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label className="form-label">Password:</label>
                <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit" className="btn btn-outline-primary">Login</button>
            </form>
        </div>
    )
}

export default LoginForm