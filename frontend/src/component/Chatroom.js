import "./Chatroom.css";
// import { format } from "timeago.js";

export default function Chatroom(props) {
  return (
    <div className={props.own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">I'm fine, dont worry</p>
      </div>
      <div className="messageBottom">3:12 pm</div>
    </div>
  );
}