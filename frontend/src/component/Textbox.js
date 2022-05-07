import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {add_post} from '../redux/postSlice';
import store from '../redux/store';
import './Textbox.css';
import {converting} from '../convertCommunityName';
const Textbox = (props) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState([]);
  const [err, setErr] = useState();
  const [comm, setComm] = useState();
  const dispatch = useDispatch();
  const communityView = store.getState().community.communityInView;
  
  useEffect(() => {
    if (communityView) {
      setComm(converting(communityView));
      setErr("");
      }
    }, 
  [communityView]);

  const submitPostHandler = async (e) => {
    e.preventDefault();

    if (comm && text) {
      await dispatch(add_post([text, comm, null]));
      setText("");
      setErr(null);
    } else {
      if (!comm) {
        setErr("Please select a community to post in.");
      } else {
        setErr("Please do not leave the text area blank for submission.")
      }
    }

  }
    return (
        <div className="share">
          <div className="shareWrapper">
            <form onSubmit={(e)=>submitPostHandler(e)}>
            <div className="shareTop">
              <img
                className="shareProfileImg"
                src={'https://images.unsplash.com/photo-1497290756760-23ac55edf36f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'}
                alt=""
              />

              <input
                placeholder={"What's in your mind"}
                className="shareInput"
                value={text}
                type="textarea"
                onChange={e => setText(e.target.value)}
              />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <hr className="shareHr" />
            <input type="file" id="img" name="img" accept="image/*"/>
            <br></br>
            <div className="button-container">
              <p>{err}</p>
              <button className="shareButton" type="submit">
                Share
              </button>

              </div>
              </form>
          </div>
        </div>
      );
}

export default Textbox;

