import Topbar from "../component/TopBar"
import Sidebar from "../component/Sidebar";
import Post from "../component/Post";
import Textbox from "../component/Textbox";
import Modal from "../component/Modal";
import "./Home.css";
import React, { useEffect, useState } from "react";
import {openModal, closeModal, changeModal } from '../redux/modalSlice';
import {useSelector, useDispatch} from 'react-redux';
import API from '../api';
import { get_all_post } from "../redux/postSlice";
import {converting} from '../convertCommunityName';
import store from '../redux/store';
import { useParams, useNavigate } from "react-router-dom";
import FriendList from "../component/FriendList";

export default function Home(props) {

  const [com, setCom] = useState();
  //here is where modal state and reducers should matter;
  const appearace = useSelector(changeModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { communityName } = useParams();

  useEffect(() => {
    const fetchCommunity = async () => {
        try {
            const response = await API.get("/all/getAllCommunities");
            setCom(response.data);
        } catch (err) {
            console.log(err, "error in get to /all/getAllCommunities");
        }
    };

    const handleEdge = async () => {
      if (communityName !== "default") {
        await dispatch(get_all_post(communityName));
      }
      else {
        await dispatch(get_all_post(com));
      }}

    fetchCommunity();
    setTimeout(()=> {handleEdge()}, 2000) 
  }, []);
    
  return (
    <>
      <Topbar open={openModal} />
      <div className="homeContainer">
        <Textbox className="textbox"/>
        <Sidebar className="sidebar"/>
        {appearace ? <Modal  close={closeModal} community={com}/> : ''}
        <Post className="post"/>
        <FriendList />
      </div>
    </>
  );
}