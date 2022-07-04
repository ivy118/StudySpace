import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';


export const friendSlice = createSlice({
    name: 'message',
    initialState: {
        friends: [],
        error: null
    },
    reducers: {
        update_friends: (state, action) => {
            return {...state, friends: action.payload};
        }
    }
});

export const get_friends = (action) => {
    return async (dispatch) => {
    const response = await API.get("/home/friends/:username",  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async(response)=> {
        if (response.data) {
            await dispatch(update_friends(response.data))
        }
      }).catch(function (error) {
        console.log(error, "error in get_friends, friendSlice");
      });
  }
}

export const { update_friends } = friendSlice.actions;
export default friendSlice.reducer;


