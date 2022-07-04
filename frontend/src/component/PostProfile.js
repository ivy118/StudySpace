import "./Post.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const PostProfile = (props) => {

    return (
        <div className="postTop">
        <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                  `https://images.unsplash.com/photo-1439405326854-014607f694d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80`
              }
              alt=""
            />
          <span className="postUsername">{props.user}</span>
          <span className="postDate">{props.time}</span>
        </div>
      </div>
    )
}

export default PostProfile;