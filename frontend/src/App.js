import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Signup } from './screen/Signup';
import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './component/Sidebar';
import Home from './screen/Home';
import {Login} from './screen/Login';
import TopBar from './component/TopBar';
import Textbox from './component/Textbox'
import Post from './component/Post';
import Loading from './component/Loading';
import Dropdown from './component/Dropdown';
import Chat from './screen/Chat';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/loading" element={<Loading/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/home/:communityName" element={<Home/>} />
        <Route path="/top" element={<Post/>} />
        <Route path="/side" element={<Sidebar/>} />
        <Route path="/drop" element={<Dropdown/>} />
        <Route path="/message/:user" element={<Chat/>} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App; 
