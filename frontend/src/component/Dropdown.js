import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
import React, {useState} from  'react';

const Dropdown = () => {
    const logOutHandler = () => {
        
    }

return (
<div class="list-group">
  <Link to="/" class="list-group-item list-group-item-action active" onClick={logOutHandler}aria-current="true">
    Log Out
  </Link>
</div>

    )
}

export default Dropdown;