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

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home/" element={<Home/>} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App; 
