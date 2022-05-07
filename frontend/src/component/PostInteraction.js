import "./Post.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {add_likes} from '../redux/postSlice';


const PostInteration = (props) => {

    const dispatch = useDispatch();


    const addLiker = async (id) => {
        await dispatch(add_likes(id));
    }

    return (
        <div className="postBottom">
        <div className="postBottomLeft">
        <img
            className="likeIcon"
            src={`https://www.citypng.com/public/uploads/preview/-51611633592qtywg4hsjd.png`}
            alt=""
            onClick={(props) => addLiker(props.id)}
        />
        <span className="postLikeCounter">99 people like it</span>
        </div>
        <div className="postBottomRight">
        <span className="postCommentText">23 comments</span>
        </div>

        <div class="list-group comment-section">
            <ul>
            <li class="list-group-item ">
                <div class="d-flex w-100 justify-content-between">
                <p className="name-text">List group item heading</p>
                <small>3 days ago</small>
                </div>
                <small>And some small print.</small>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                <p className="name-text">List group item heading</p>
                <small class="text-muted">3 days ago</small>
                </div>
                <small class="text-muted">And some muted small print.</small>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                <p className="name-text">List group item heading</p>
                <small class="text-muted">3 days ago</small>
                </div>
                <small class="text-muted">And some muted small print.</small>
            </li>
            </ul>
            </div>

        </div>
    )
}

export default PostInteration;
