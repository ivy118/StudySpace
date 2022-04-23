// import Sidebar from "../component/Sidebar";

// import React, {useState} from 'react';
// import Modal from '../component/Modal'
// import Textbox from '../component/Textbox'

// function Home() {

//     const [modal, setModalStatus] = useState(false);

//     //1. get the user input and
//     //2.  send the state to posts, send setState to textArea (when clicking on post button)
//     //3. so you click on the post button, send an api request to the database, save the post in database, and get it, and returned it back; after getting it back, map though it, and create individual posts! 

//   return (
//     <div className="container modal-active" >
//         <div className = "sidebar">
//             <Sidebar currentModelStatus={modal} changeModalStatus={setModalStatus} />
//         </div>

//         <div className="main-page">
//             <div className="textarea">
//                 <Textbox />
//             </div>

//         </div>

//         {modal? <div className="Modal">
//             <Modal currentModelStatus={modal} changeModalStatus={setModalStatus}/>
//         </div>: <></> }
//         {/* <div className="Modal">
//             <Modal />
//         </div> */}

//     </div>
//   )
// }

// export default Home;




























































import Topbar from "../component/TopBar"
import Sidebar from "../component/Sidebar";
import Post from "../component/Post";
import Textbox from "../component/Textbox";
import "./Home.css"

export default function Home() {


  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Textbox className="textbox"/>
        <Sidebar className="sidebar"/>
        <Post clasName="post"/>
      </div>
    </>
  );
}