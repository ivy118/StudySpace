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

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
