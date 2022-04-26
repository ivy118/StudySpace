import "./Post.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Post.css'


const Post = () =>  {
    return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <Link to="/"}> */}
              <img
                className="postProfileImg"
                src={
                    `https://www.citypng.com/public/uploads/preview/-51611633592qtywg4hsjd.png`
                }
                alt=""
              />
            {/* </Link> */}
            <span className="postUsername">Ivy</span>
            <span className="postDate">Jan 12, 2016</span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">"when you wake up late"</span>
          <img className="postImg" src='https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80' alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`https://www.citypng.com/public/uploads/preview/-51611633592qtywg4hsjd.png`}
              alt=""
            />
            <img
              className="likeIcon"
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1548ZsnBSUJVoMehBd2_wRxUdDYfhIkNDtA&usqp=CAU`}
              alt=""
            />
            <span className="postLikeCounter">99 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">23 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post