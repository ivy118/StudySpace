import './Conversation.css'
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Conversation.css'

const Conversation =() => {
    return (
        <div className="conversation">
        <img
            className="conversationImg"
            src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2353&q=80"
            alt=""
        />
        <span className="conversationName">Ivy Yu</span>
        </div>
    )
}

export default Conversation;