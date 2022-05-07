import React, {useEffect, useState} from "react";
import './Modal.css';
import {useDispatch, useSelector} from 'react-redux';
import {remove_community, add_community, cancel_community_add} from '../redux/communitySlice';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import store from '../redux/store';
import './Loading.css';



const Loading = () => {
    return (
        <div className="container">
            <p>Page Loading....</p>
        </div>
    )
}

export default Loading;