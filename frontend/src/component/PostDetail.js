import "./Post.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const PostDetail = (props) => {
    return (
        <div className="postCenter">
        <span className="postText">{props.desc}</span>
        <img className="postImg" src={props.img} alt="" />
      </div>
    )
}

export default PostDetail;