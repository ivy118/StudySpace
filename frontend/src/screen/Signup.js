import APIHandler from '../api';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    storeUser
} from '../redux/userSlice';

import store from '../redux/store';
import './signup.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";


export const Signup = () => {
    const dispatch = useDispatch();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupHandler = (e) => {
        e.preventDefault();
        dispatch(storeUser([fname,lname, email,password]));
    }


    return (
    <div className="container">
    <form onSubmit={signupHandler} action="" method="POST" className="signup__form">
        <p>Sign up</p>
        <label htmlFor="fname"></label>
        <input type="text" id="fname" name="fname" placeholder="First Name" value={fname} onChange={e => setFname(e.target.value)} />

        <label htmlFor="lname"></label>
        <input type="text" id="lname" name="lname" placeholder="Last Name" value={lname} onChange={e => setLname(e.target.value)}/>

        <label htmlFor="email"></label>
        <input type="text" id="email" name="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="password"></label>
        <input type="password" id="password" name="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/> 

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