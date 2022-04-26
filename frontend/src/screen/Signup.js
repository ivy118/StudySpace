import APIHandler from '../api';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    storeUser
} from '../redux/loginOrSignupSlice';

import userSelector from '../redux/loginOrSignupSlice'
import store from '../redux/store';
import './signup.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";


export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorMessage] = useState();

    const signupHandler = async (e) => {
        e.preventDefault();

        await dispatch(storeUser([fname,lname, username, email,password]));

        let currState = store.getState().loginSignup.error;
        if (currState) {
            setErrorMessage(currState);
        } else {
            navigate('/home');

        }

    }

    return (
    <div className="container">
    <form onSubmit={signupHandler} action="" method="POST" className="signup__form">
        <p>Sign up</p>
        <label htmlFor="fname"></label>
        <input type="text" id="fname" name="fname" placeholder="First Name" value={fname} onChange={e => setFname(e.target.value)} />

        <label htmlFor="lname"></label>
        <input type="text" id="lname" name="lname" placeholder="Last Name" value={lname} onChange={e => setLname(e.target.value)}/>

        <label htmlFor="username"></label>
        <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>

        <label htmlFor="email"></label>
        <input type="text" id="email" name="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="password"></label>
        <input type="password" id="password" name="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/> 

        <p className="err-msg">{error}</p>
        <button type="submit">
            <Link to="/Home"></Link>Sign Up</button> 
        <ul>
            <li>
                <Link to="/login">
                    Already have an account? Login instead
                </Link>
            </li>
        </ul>
    </form>
    </div>
    )
}