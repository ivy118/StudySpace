import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';


export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        error: null
    },
    reducers: {
        fill_posts: (state, action) => {
            return {...state, posts: action.payload};
        },
        get_post_failure: (state, action) => {
            return {...state, error: "Network request failed, please check your connection."}
        }
    }   

});

export const get_all_post = (payload) => {
    return async (dispatch) => {
    const response = await API.get(`/post/getPost/${payload}`, {headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async (response)=> {
        if (response.data) {
            await dispatch(fill_posts(response.data));
            

        } else {         
            await dispatch(get_post_failure());
        }
      }).catch(function (error) {
        console.log(error, "error in get_all_post, postSlice");
      });
  }
}

export const add_post = (payload) => {
    return async (dispatch) => {
    const response = await API.post("/post/addPost", {
            username: localStorage.getItem("username"),
            text: payload[0], 
            communityName: payload[1],
            uploadResultsKey: payload[2]
        },  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async (response)=> {
        if (response.data === "Uploaded post succesfully") {
            await dispatch(get_all_post(payload[1]));
        } else {         
            await dispatch(get_post_failure());
        }
      }).catch(function (error) {
        console.log(error, "error in add_post, postSlice");
      });
  }
}

export const add_likes = (payload) =>  {
  return async (dispatch) => {
    const response = await API.post("/post/likepost", {
            username: localStorage.getItem("username"), 
            postID: payload
        },  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async (response)=> {
        if (response.data === "Uploaded post succesfully") {
            await dispatch(get_all_post(payload[1]));
        } else {         
            await dispatch(get_post_failure());
        }
      }).catch(function (error) {
        console.log(error, "error in add_likes, postSlice");
      });
  }
}


export const add_comments = (payload) =>  {
  return async (dispatch) => {
    const response = await API.post("/post/addComment", {
            username1: localStorage.getItem("username"), 
            username2: payload[0],
            postID: payload[1],
            commentText: payload[2]
        },  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async (response)=> {
        if (response.data === "Uploaded post succesfully") {
            await dispatch(get_all_post(payload[1]));
        } else {         
            await dispatch(get_post_failure());
        }
      }).catch(function (error) {
        console.log(error, "error in add_comments, postSlice");
      });
  }
}


export const { fill_posts, get_post_failure } = postSlice.actions;
export default postSlice.reducer;
