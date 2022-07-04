import React, {useState, useEffect} from 'react'
import "./Sidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import FunctionsIcon from '@material-ui/icons/Functions';
import communitySlice from '../redux/communitySlice';
import {remove_community, getPersonalCommunity, change_community_view} from '../redux/communitySlice';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import store from '../redux/store'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {get_all_post} from '../redux/postSlice';
import {converting} from '../convertCommunityName';
import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


export const Sidebar = () => {

  const dispatch = useDispatch();
  let personalCommunity = useSelector(state => state.community.userCommunity);

  useEffect(() => {
      const fetchData = async () => {
        await dispatch(getPersonalCommunity(localStorage.getItem('email')));
      };

      fetchData();

      }, 
    []);


     const switchCommunityHandler = async (community) => {
      await dispatch(change_community_view(community));
      await dispatch(get_all_post(converting(community)));

      window.scrollTo(0, 0);

     }

  let number = 0;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {personalCommunity ? personalCommunity.map(x => <Link to={`/home/${converting(x)}`} key={number++} className="link"> <li className="sidebarListItem" key={number++} onClick={() => switchCommunityHandler(x)}>
            {number % 2 === 0 ? <ChevronRightIcon className="sidebarIcon" />: <ChevronRightIcon className="sidebarIcon" />}
            <span className="sidebarListItemText">{x}</span> <DeleteForeverIcon />
          </li></Link>): ''}
        </ul>
        {personalCommunity ? <button className="sidebarButton">Show More</button> : <p className="warn">Start Your Journey Now by Adding Your First Community</p>}
      </div>
    </div>
  );
}
export default Sidebar;