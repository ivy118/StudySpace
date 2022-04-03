import React, {useState} from  'react';
import { useDispatch } from 'react-redux';
import {add_post} from '../redux/postSlice';
import store from '../redux/store';


const Textbox = () => {

    const [text, setText] = useState();
    const [isFilePicked, setPickedFile] = useState(false);
    const [fileInfo, setFileInfo] = useState();

    let currUser = store.getState().user.user.email;
    let currCommunity = store.getState().user.currentCommunityView;

    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(add_post([currUser, text, currCommunity]));
    }

    const textHandler = (e) => {
        setText(e.target.value);

    }

    const fileHandler = (e) => {
        setPickedFile(true);
        setFileInfo(e.target.files)


    }

    return (
        <div className="container">
            <form method="POST" onSubmit={submitHandler}>
                <label htmlFor="text"></label>
                <textarea id="text" name="text" rows="4" cols="50" value={text} onChange={textHandler}>
                    {text}
                </textarea>
                <label for="photo">Choose a photo!</label>
                <input type="file" id="photo" name="photo" accept="image/*" onChange={fileHandler}/>
                <button type="submit"/>
            </form>

        </div>

    )
}

export default Textbox;