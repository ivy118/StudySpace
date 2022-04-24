import React from "react";
import './Modal.css';
import {useDispatch} from 'react-redux';
import {add_community, remove_community} from '../redux/communitySlice';

const Modal = (props) => {

    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(props.close());
    }

    const addCommunity = () => {
        dispatch(props.close());
        dispatch()

    }
    return (
        <div className ="modal" tabIndex="-1" role="dialog">
            <div className="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Select from the following communities</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <hr></hr>

                <div className="modal-body">
                    <select name="subjects" id="subjects" className="custom-select custom-select-sm">
                    <option value="Linear Algebra">Linear Algebra</option>
                    <option value="Calculus III">Calculus III</option>
                    <option value="Abstract Algebra">Abstract Algebra</option>
                    <option value="Design Patterns">Design Patterns</option>
                    </select>
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

