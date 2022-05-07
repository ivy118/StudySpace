import React, {useEffect, useState} from "react";
import './Modal.css';
import {useDispatch, useSelector} from 'react-redux';
import {remove_community, add_community, cancel_community_add} from '../redux/communitySlice';
import API from '../api';
import store from '../redux/store';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {converting} from '../convertCommunityName';

const Modal = (props) => {
   const [communitie, setCommunitie] = useState();
   const navigation = useNavigate();
   const dispatch = useDispatch();
   const {communityName} = useParams();
   const err = useSelector(state => state.community.error);
    const closeModal = async () => {
        await dispatch(props.close());
        await dispatch(cancel_community_add());
    }

    const addCommunity = async () => {
        const community = communityName;
        await dispatch(add_community(communitie));

        if (!store.getState().community.error) {
            await dispatch(props.close());
            navigation(`/home/${community}`);
        }
    } 


    useEffect(()=> {

    }, [err]);

    return (
        <div className ="modal" tabIndex="-1" role="dialog">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">Select from the following communities</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <hr></hr>
                <div className="modal-body">
                    <select name="subjects" id="subjects" className="custom-select custom-select-sm" value={communitie} onChange={e => setCommunitie(e.target.value)}>
                        {props.community ? props.community.map(com => <option key={com} value={com}>{com}</option>): null}
                    </select>
                    <br></br>
                    <p className="err-msg">{err}</p>
                </div>
                <hr></hr>

                <div className="modal-footer">
                    <button className="button" onClick={addCommunity}>Add</button>
                </div>
            </div>
        </div> 
    )
}

export default Modal;

