import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    verifyUser
} from '../redux/loginOrSignupSlice';

import store from '../redux/store';
import './signup.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";


export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorMessage] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        await dispatch(verifyUser([email,password]));

        let currState = store.getState().loginSignup.error;

        if (currState) {
            setErrorMessage(currState);
        } else {
            navigate('/home')
        }
    }

    return (
    <div className="container-login">
    <form onSubmit={loginHandler} action="" method="POST" className="signup__form">
        <p>Login</p>

        <label htmlFor="email"></label>
        <input type="text" id="email" name="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="password"></label>
        <input type="password" id="password" name="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/> 
        <p className="err-msg">{error}</p>
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