import React, {useState} from  'react';
import { useDispatch } from 'react-redux';
import './ChatTopBar.css';
import AddCommentIcon from '@material-ui/icons/AddComment';

const ChatTopBar = (props) => {
  const dispatch = useDispatch();

    return (
        <div className="topbarContainer">
          <div className="topbarLeft">
              <span className="logo">StudySpace</span>
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