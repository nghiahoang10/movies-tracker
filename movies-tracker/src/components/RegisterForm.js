import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="register-form" onSubmit={(e) => {
            e.preventDefault();
            const user = {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            };
            axios.post('https://mern-movies-tracker.herokuapp.com/auth/register', user).then((response) => {
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
                <input className="form-control" type="text" placeholder="Email" value={ email } onChange={(e) => setEmail(e.target.value)}></input>
                <label className="form-label">Password:</label>
                <input className="form-control" type="password" placeholder="Password" value={ password } onChange={(e) => setPassword(e.target.value)}></input>
                <label className="form-label">Confirm your password:</label>
                <input className="form-control" type="password" placeholder="Confirm your password" value={ confirmPassword } onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <button className="btn btn-outline-primary">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm