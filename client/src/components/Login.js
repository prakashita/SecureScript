import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            url: 'http://localhost:5000/login',
            method: "POST",
            data: { username, password }
        })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.ID);
                

                if (res.data.success) {
                    navigate('/notes', { state: { userID: res.data.ID,username:res.data.username} });
                } else {
                    alert("No such user exists");
                }
            })
            .catch(err => {
                console.error("Login error:", err);
                alert("An error occurred during login");
            });
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">UserName</label>
                                    <input type="username" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-dark">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
