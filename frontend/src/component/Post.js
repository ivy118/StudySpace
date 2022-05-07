import "./Post.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import PostProfile from './PostProfile';
import PostDetail from './PostDetail';
import PostInteraction from './PostInteraction';

const Post = () =>  {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  

  return (
      <div className="post"> 
      <br></br>
      <hr></hr>
      {posts ? posts.map((post) => {
        return (
          <div className="postWrapper" key={post.post_id}>
            <PostProfile/> 
            <PostDetail desc={post.post_description}/> 
            <PostInteraction id={post.post_id}/>
            <br></br>
            <hr></hr>
            <br></br>
          </div>
        )
      }): <p>No postings are found for this community.</p>}
    </div> 
  )
}

export default Post;































