import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';
const axios = require('axios');


export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        userCommunity: [],
        communityInView: null,
        error: null,

    },
    reducers: {
        add_community: (state, action) => {
            const response = API.post('/addCommunity', {
                email: action.payload[0],
                communityToAdd: action.payload[1]
            }).then((response) => {
                // if successful, change state;
                if (response.data) {
                    return {...state, userCommunity: [action.payload[1], ...state.userCommunity]};
                } else {
                    return Object.assign(state, {error: response.data})
                }
            })
        },
        remove_community: (state, action) => {
             return state.userCommunity.filter(com => com !== state.communityInView);

            
        },
        change_community_in_view: (state, action) => {
            let currentCommunity = action.payload;
            return Object.assign(state, {communityInView: action.payload});
        },

        community_load_failure:  (state, action) => {
            

        }
    }   

});


export const { add_community, remove_community } = communitySlice.actions;

export default communitySlice.reducer;


