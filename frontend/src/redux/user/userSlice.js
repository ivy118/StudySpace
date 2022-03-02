import {createSlice} from '@reduxjs/toolkit';
import API from '../../api';
const axios = require('axios');


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        user_login_success: (state, action) => {

        },
        user_login_failure: (state, action) => {
            
        }, 
        user_logout: (state, action) => {
            
        },
        user_signup_success: (state, action) => {
            let result = action.payload;
            state.user = {
                firstname: result[0],
                lastname: result[1],
                username: result[2],
                password: result[3],
                loginStatus: result[4],
            }
        },
        user_signup_failure: (state) => {
            state.user = {
                error: "The email you are using is associated with another account, please login instead"
            }
        }
    }   

});

export const storeUser = (state, action) => (dispatch) => {
      // give the backend the input received by the user
        const response = API.post('/signup/', {
        firstname: action.payload[0],
        lastname: action.payload[1],
        username: action.payload[2],
        password: action.payload[3],
      }).then((response)=> {
        if (response.data) {
            dispatch(user_signup_success(action));
        } else {
            dispatch(user_signup_failure());
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

export const { user_login_success, user_login_failure, user_logout, user_signup_success, user_signup_failure } = userSlice.actions;

export default userSlice.reducer;
