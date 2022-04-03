import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    verifyUser
} from '../redux/userSlice';

import store from '../redux/store';
import './signup.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";



export const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(verifyUser([email,password]));
    }

    return (
    <div className="container-login">
    <form onSubmit={loginHandler} action="" method="POST" className="signup__form">
        <p>Login</p>

        <label htmlFor="email"></label>
        <input type="text" id="email" name="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="password"></label>
        <input type="password" id="password" name="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/> 

        <button type="submit" >Login</button> 
        <ul>
            <li>
                <Link to="/signup">
                    Create a new account
                </Link>
            </li>
        </ul>
    </form>
    </div>
    )
}