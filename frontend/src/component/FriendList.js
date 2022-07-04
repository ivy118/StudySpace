import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './FriendList.css'

const FriendList = (props) => {
    return (
        <div className="friend-list">
        <br></br>
        <p>Recent Contacts</p>
        <div className="list-group">
        <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
            The current button
        </button>
        <button type="button" className="list-group-item list-group-item-action">         
        <img
            className="likeIcon"
            src={`https://images.unsplash.com/photo-1651236966234-604124a1dae9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80`}
            alt=""
        /> A second item</button>
        <button type="button" className="list-group-item list-group-item-action">         
        <img
            className="likeIcon"
            src={`https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80`}
            alt=""
        />A third button item</button>
        <button type="button" className="list-group-item list-group-item-action">         
        <img
            className="likeIcon"
            src={`https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80`}
            alt=""
        />A fourth button item</button>
        </div>
        </div>
    )
}

export default FriendList;