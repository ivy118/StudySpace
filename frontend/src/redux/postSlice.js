import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: []
    },
    reducers: {
        add_post: (state, action) => {
            const response = API.post('/addPost', {
                username: action.payload[0],
                text: action.payload[1],
                postCommunity: action.payload[2]
            }).then((response) => {
                // if successful, get the states back, sorted by time (just posted to last posted)
                if (response.data) {
                    const getAllPosts = API.post('/getPost', {
                        postCommunity: action.payload[2]
                    }).then((response) =>{
                        if (response.data) {
                            state.posts = response.data;
                        }
                    }).catch((err) => {
                        console.error(err);
                    })
                } 
            }).catch((err) => {
                console.log(err)
            })
        },
    }   

});



export const { add_post } = postSlice.actions;

export default postSlice.reducer;
