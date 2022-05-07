import './Chat.css'
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Conversation from '../component/Conversation';
import Chatroom from '../component/Chatroom';
import ChatTopBar from '../component/ChatTopBar';

const Chat =() => {
    return (
        <div>
            <div className="messenger">
                <ChatTopBar />
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input className="chatMenuInput" placeholder="Search Friends" />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Chatroom  own={true}/>
                            <Chatroom/>
                            <Chatroom/>
                            <Chatroom  own={true}/>
                        </div>

                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                            ></textarea>
                            <button className="chatSubmitButton" >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <div className="chatDetail">
                    <div className="chatDetailWrapper">
                        <p>Files</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;