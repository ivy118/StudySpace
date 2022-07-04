import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {add_post} from '../redux/postSlice';
import store from '../redux/store';
import './Textbox.css';
import {converting} from '../convertCommunityName';
import { useParams } from "react-router-dom";

const Textbox = (props) => {
  const [text, setText] = useState("");
  const [err, setErr] = useState();
  const [comm, setComm] = useState();
  const dispatch = useDispatch();
  const [file, setFile] = useState()
  const [image, setImage] = useState([])

  const communityView = useSelector(state => state.community.communityView);
  const defaultCommunity = useParams().communityName;


  useEffect(() => {
    if (communityView) {
      setComm(converting(communityView));
      }
    else {
      setComm(defaultCommunity);
    }
    setErr("");
    }, 
  [communityView]);

  const submitPostHandler = async (e) => {
    e.preventDefault();

    if (comm && text) {
      const formData = new FormData();
      formData.append("image", file)
      formData.append("description", text)

      const result = await dispatch(add_post([text, comm, formData]));
      setText("");
      setErr(null);
      setImage([result.image, ...image]);
    } else {
      if (!comm) {
        setErr("Please select a community to post in.");
      } else {
        setErr("Please do not leave the text area blank for submission.")
      }
    }

  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
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
            <input type="file" onChange={fileSelected} id="img" name="img" accept="image/*"/>
            <br></br>
            <div className="button-container">
              <p>{err}</p>
              <button className="shareButton" type="submit">
                Share
              </button>

              {image.map( img => (
        <div key={img}>
          <img src={img} alt="j"></img>
        </div>
      ))}

              </div>
              </form>
          </div>
        </div>
      );
}

export default Textbox;

