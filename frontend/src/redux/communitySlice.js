import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';
const axios = require('axios');


export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        community: [],
        error: '',
    },
    reducers: {
        add_community: (state, action) => {
            const response = API.post('/add-community', {
                username: action.payload[0],
                community: action.payload[1]
            }).then((response) => {
                // if successful, change state;
                if (response.data) {
                    state.community.push(action.payload[1]);
                } else {
                    state.error = response.data;
                }
            })


        },
        remove_community: (state, action) => {

            
        }
    }   

});




export const { add_community, remove_community } = communitySlice.actions;

export default communitySlice.reducer;
