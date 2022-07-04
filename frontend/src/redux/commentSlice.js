import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';


export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        friends: []
    },
    reducers: {
        update_friends: (state, action) => {
            return {...state, friends: action.payload};
        }
    }
});



export const { update_friends } = commentSlice.actions;
export default commentSlice.reducer;


