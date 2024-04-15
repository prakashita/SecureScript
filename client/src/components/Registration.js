import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            url: 'http://localhost:5000/register',
            method: "POST",
            data: { username, password }
        })
            .then((res) => {

                if (res.data.success) {
                    navigate('/notes', { state: { userID: res.data.ID,username: res.data.username} });
                } else {
                    alert("No such user exists");
                }
            })
            .catch(err => {
                console.error("Registration error:", err);
                alert("An error occurred during registration");
            });
    }

    return (
        <div className="container mt-5">
            <h1>Register</h1>

            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit} action="/register" method="POST">
                                <div className="form-group">
                                    <label htmlFor="username">UserName</label>
                                    <input type="username" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-dark">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Register;
