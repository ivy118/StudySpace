import React, {useState} from  'react';
import './ChatTopBar.css';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { useNavigate } from 'react-router-dom';
import store from '../redux/store';
import {converting} from "../convertCommunityName";
import { useDispatch, useSelector } from 'react-redux';

const ChatTopBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultCommunity = useSelector(state => state.community.userCommunity[0]);
  const toHomePage = () => {
      navigate(`/home/${converting(defaultCommunity)}`)
  }

    return (
        <div className="topbarContainer">
          <div className="topbarLeft">
              <span className="logo" onClick={toHomePage}>StudySpace</span>
          </div>

          <div className="topbarRight">
            <div className="topbarIcons">
              <div className="topbarIconItem">
                <AddCommentIcon className="icons"/>
              </div>
            </div>
              <img
                src={`https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg`}
                alt=""
                className="topbarImg"
              />
          </div>
        </div>
    )

}

export default ChatTopBar;