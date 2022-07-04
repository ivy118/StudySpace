import "./Post.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {add_likes} from '../redux/postSlice';
import { produceWithPatches } from "immer";
import ReplyIcon from '@material-ui/icons/Reply';


const PostInteration = (props) => {

    const dispatch = useDispatch();

    const toggleLike = () => {

    }

    useEffect(() => {
        const fetchComment = async () => {

        }
      
    }, 
    
    []);

    return (
        <div className="postBottom">
            <div className="postBottomLeft">
                <img
                    className="likeIcon"
                    src={`https://www.citypng.com/public/uploads/preview/-51611633592qtywg4hsjd.png`}
                    alt=""
                    onClick={(props) => toggleLike(props.id)} />
                {props.liker.length >= 4 ? <p className="like-message">{props.liker[0]}, {props.liker[1]} and {props.liker.length - 2} others liked this post</p>: props.liker.forEach((like) => <p>{like}</p>)}
            <span className="postLikeCounter"></span>
                </div><div className="postBottomRight">
                <span className="postCommentText">23 comments</span>
            </div><div className="list-group comment-section">
                <ul>
                    <li className="list-group-item ">
                        <div className="d-flex w-100 justify-content-between">
                            <p className="name-text">List group item heading</p>
                            <small>3 days ago</small>
                        </div>

                        <div className="d-flex w-100 justify-content-between">
                            <small>And some small print.</small>
                            <ReplyIcon />
                        </div>
                       
                    </li>
                    <li className="list-group-item ">
                        <div className="d-flex w-100 justify-content-between">
                            <p className="name-text">List group item heading</p>
                            <small>3 days ago</small>
                        </div>

                        <div className="d-flex w-100 justify-content-between">
                            <small>And some small print.</small>
                            <ReplyIcon />
                        </div>
                       
                    </li>
                    <li className="list-group-item ">
                        <div className="d-flex w-100 justify-content-between">
                            <p className="name-text">List group item heading</p>
                            <small>3 days ago</small>
                        </div>

                        <div className="d-flex w-100 justify-content-between">
                            <small>And some small print.</small>
                            <ReplyIcon />
                        </div>
                    </li>

                    <li className="list-group-item" id="show-more-button">
                        <p className="show-more-button">Show More</p>                    
                    </li>

                    <br></br>

                    <form className="comment-form">
                        <img
                            className="shareProfileImg"
                            src={'https://images.unsplash.com/photo-1497290756760-23ac55edf36f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'}
                            alt=""
                        />
                        <textarea className="form-control textarea-comment" spellCheck="true" placeholder="Write a comment..."></textarea>
                        <button type="button" className="btn btn-outline-dark btn-sm submit-comment">Enter</button>
                    </form>
                    
                </ul>
            </div>

        </div>
    )
}

export default PostInteration;
