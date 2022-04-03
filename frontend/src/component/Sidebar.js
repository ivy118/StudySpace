import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import store from '../redux/store';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar(props) {
    const [sidebar, setSidebar] = useState(false);


    const showSidebar = () => {
        setSidebar(!sidebar);
    }

    const modalHandler = () => {
        props.changeModalStatus(!props.currentModelStatus);
    }
    return (
    <div className="Navbar-container">
        <nav className={ sidebar ? 'nav-menu nm-active': 'nav-menu' }>

        <div className="toggle-bar">
            <Link to="#" className={sidebar ? "menu-bars active": "menu-bars"}>
                <FaIcons.FaBars onClick={showSidebar}/>

            </Link>
        </div>
        
        {sidebar ? 
        <ul className="menu-list">
        <li className="community-link">
            <Link to="#">
                Dashboard
            </Link>
        </li>
        <li className="community-link">
            <Link to="#">
                Dashboard
            </Link>
        </li>
        <li className="community-link">
            <Link to="#">
                Dashboard
            </Link>
        </li>
        <li className="community-link">
            <Link to="#">
                Dashboard
            </Link>
        </li>
        <li className="community-link">
            <Link to="#">
                Dashboard
            </Link>
        </li>

        <li className="add-community" onClick={modalHandler}>
        
            <i className="fas fa-star text-danger"></i>
             Explore Community
        </li>
        </ul>
     : <></>}
        </nav> 

    </div>
    )
}

export default Sidebar;