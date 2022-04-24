import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import store from '../redux/store';
import "./Sidebar.css";
import { useDispatch } from 'react-redux';
import FunctionsIcon from '@material-ui/icons/Functions';
import communitySlice from '../redux/communitySlice';
import { add_community, remove_community } from '../redux/communitySlice';
import API from '../api';


export const Sidebar = () => {

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await API.post("/user/getUsersCommunities", {
            email: localStorage.getItem("email")
          },
          {
          headers: {
            'Content-Type': 'application/json',
            'token': `${localStorage.getItem('JWTtoken')}`
            }
          });
          console.log('responseincommunity', response)
        } catch (err) {
          console.log(err)
        }
      };

      fetchData();
    }, [])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <FunctionsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Math</span>
          </li>
          <li className="sidebarListItem">
            <FunctionsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Math</span>
          </li>
          <li className="sidebarListItem">
            <FunctionsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Math</span>
          </li>
          <li  className="sidebarListItem">
            <FunctionsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Math</span>
          </li>
          <li className="sidebarListItem">
            <FunctionsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Math</span>
          </li>
          <li className="sidebarListItem">
            <FunctionsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Math</span>
          </li>
          <li className="sidebarListItem">
            <FunctionsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Math</span>
          </li>
          <li className="sidebarListItem">
            <FunctionsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Math</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>

      </div>
    </div>
  );
}


export default Sidebar;









































// function Sidebar(props) {
//     const [sidebar, setSidebar] = useState(false);


//     const showSidebar = () => {
//         setSidebar(!sidebar);
//     }

//     const modalHandler = () => {
//         props.changeModalStatus(!props.currentModelStatus);
//     }
//     return (
//     <div className="Navbar-container">
//         <nav className={ sidebar ? 'nav-menu nm-active': 'nav-menu' }>

//         <div className="toggle-bar">
//             <Link to="#" className={sidebar ? "menu-bars active": "menu-bars"}>
//                 <FaIcons.FaBars onClick={showSidebar}/>

//             </Link>
//         </div>
        
//         {sidebar ? 
//         <ul className="menu-list">
//         <li className="community-link">
//             <Link to="#">
//                 Dashboard
//             </Link>
//         </li>
//         <li className="community-link">
//             <Link to="#">
//                 Dashboard
//             </Link>
//         </li>
//         <li className="community-link">
//             <Link to="#">
//                 Dashboard
//             </Link>
//         </li>
//         <li className="community-link">
//             <Link to="#">
//                 Dashboard
//             </Link>
//         </li>
//         <li className="community-link">
//             <Link to="#">
//                 Dashboard
//             </Link>
//         </li>

//         <li className="add-community" onClick={modalHandler}>
        
//             <i className="fas fa-star text-danger"></i>
//              Explore Community
//         </li>
//         </ul>
//      : <></>}
//         </nav> 

//     </div>
//     )
// }

// export default Sidebar;




