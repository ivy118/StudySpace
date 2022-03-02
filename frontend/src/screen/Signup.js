import APIHandler from '../api';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    user_signup_success
} from '../redux/user/userSlice';
import store from '../redux/store';
const axios = require('axios');



export const Signup = () => {
    const dispatch = useDispatch();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(user_signup_success([fname,lname,username,password,true]));

    }

    return (
    <div>
    <form onSubmit={submitHandler}>
        <label htmlFor="fname">First name:</label>
        <input type="text" id="fname" name="fname" value={fname} onChange={e => setFname(e.target.value)} />

        <label htmlFor="lname">Last name:</label>
        <input type="text" id="lname" name="lname" value={lname} onChange={e => setLname(e.target.value)}/>

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/> 

        <button type="submit">Submit</button> 
    </form>
    </div>
    )
}