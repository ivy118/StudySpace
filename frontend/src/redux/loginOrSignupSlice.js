import { getNativeSelectUtilityClasses } from '@mui/material';
import {createSlice} from '@reduxjs/toolkit';
import API from '../api';

export const loginOrSignupSlice = createSlice({
    name: 'loginSignup',
    initialState: {
        error:  null,
    },
    reducers: {
        user_login_success: (state, action) => {
            state.error = null;
        },

        user_login_failure: (state, action) => {
            state.error = action.payload;
        }, 

        user_logout: (state, action) => {
    
        },

        user_signup_success: (state, action) => {
            state.error = null;
        },


        user_signup_failure: (state, action) => {
            state.error = action.payload;
        }
    }
});

const updateLocalStorage = async (boolean, info1, info2) => {
    if (boolean) {
        await localStorage.setItem('username', info1);
        await localStorage.setItem('email', info2);
        await localStorage.setItem('loginStatus', true);
    } else {
        await localStorage.removeItem('username');
        await localStorage.removeItem('email');
        await localStorage.setItem('loginStatus', false);
    }

}

export const verifyUser = (action) => {
    return async (dispatch) => {
        const response = await API.post('/auth/login', {
        email: action[0],
        password: action[1],
      }).then((response)=> {
        if (response.data === "Password or email is incorrect.") {
            dispatch(user_login_failure(response.data));
            updateLocalStorage(false);
        } else {
            dispatch(user_login_success(action));
            updateLocalStorage(true, action[0], action[1]);
        }
      }).catch(function (error) {
        console.log(error, "erorr in /login ");
      });
  }
}

export const storeUser = (action) => {
    return async (dispatch) => {
        const response = await API.post('/auth/signup', {
        firstname: action[0],
        lastname: action[1],
        username: action[2],
        email: action[3],
        password: action[4],
      }).then( async (response)=> {
          console.log("response in signup: ", response.data)
        //if sign up is successful, store the JWT token in loca storage
        if (response.data.token) {
            await localStorage.setItem('JWTtoken',response.data.token);
            await dispatch(user_signup_success());
            updateLocalStorage(true, action[2], action[3]);
        } else {
            await dispatch(user_signup_failure(response.data));
            updateLocalStorage(false);
        }
        console.log(response.data.token, "JWT")
      }).catch(function (error) {
        console.log("error in /signup,", error.response.data);
      });
  }
}

export const { user_login_success, user_login_failure, user_logout, user_signup_success, user_signup_failure } = loginOrSignupSlice.actions;
export default loginOrSignupSlice.reducer;
