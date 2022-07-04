import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';


export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: []
    },
    reducers: {
        update_message: (state, action) => {
            return { messages: action.payload };
        }
    }
});

export const get_messages = (action) => {
    return async (dispatch) => {
    const response = await API.get("/message/:user1-user2",  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async(response)=> {
        if (response.data) {
            await dispatch(update_message(response.data))
        }
      }).catch(function (error) {
        console.log(error, "error in get_messages, messageSlice");
      });
  }
}

export const add_message = (payload) => {
    return async (dispatch) => {
    const response = await API.post("/message/add_messages",
        { user1: payload[0],
          user2: payload[1],
          message: payload[2], 
          messageOwner: payload[3]
        },  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async(response)=> {
        if (response.data) {
            await dispatch(update_message(response.data))
        }
      }).catch(function (error) {
        console.log(error, "error in add_messages, messageSlice");
      });
  }
}

export const { update_message } = messageSlice.actions;
export default messageSlice.reducer;


