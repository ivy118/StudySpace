import React from "react";
import './Modal.css'

const Modal = props => {

    const closeModal = () => {
        props.changeModalStatus(!props.currentModelStatus);
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <label htmlFor="subjects">Select from the following subjects</label>
                </div>

                <div className="modal-body">
                    <select name="subjects" id="subjects">
                    <option value="Linear Algebra">Linear Algebra</option>
                    <option value="Calculus III">Calculus III</option>
                    <option value="Abstract Algebra">Abstract Algebra</option>
                    <option value="Design Patterns">Design Patterns</option>
                    </select>
                    <button className="button" onClick={closeModal}>Add</button>
                </div>
                <div className="modal-footer">

                </div>
            </div>
        </div> 
    )
}

export default Modal;

