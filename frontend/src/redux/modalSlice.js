import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        appearance: false
    },
    reducers: {
        openModal: (state, action) => {
            state.appearance = true;
        },
        closeModal: (state, action) => {
            state.appearance = false;
        }
    }   

});


export const { openModal, closeModal } = modalSlice.actions;
export const changeModal = (state) => state.modal.appearance;
export default modalSlice.reducer;
