import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        convos: []
    },
    reducers: {
        update_conversation: (state, action) => {
            return { convos: action.payload }
        }
    }
});


export const add_conversation = (payload) => {
    return async (dispatch) => {
    const response = await API.post("/convo/add_conversation",
        { 
            users: payload,
        },  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async(response)=> {
        if (response.data) {
            await dispatch(update_conversation(response.data))
        }
      }).catch(function (error) {
        console.log(error, "error in add_conversation, conversationSlice");
      });
  }
}

export const get_conversations = (payload) => {
    return async (dispatch) => {
    const response = await API.get("/convo/get_conversations/:username",
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async(response)=> {
        if (response.data) {
            await dispatch(update_conversation(response.data))
        }
      }).catch(function (error) {
        console.log(error, "error in get_conversations, conversationSlice");
      });
  }
}
export const { update_conversation } = conversationSlice.actions;
export default conversationSlice.reducer;


