import {createSlice} from '@reduxjs/toolkit';
import API from '../api';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error:  null,
        communityIn: [],
        currentCommunityView: []
    },
    reducers: {
        user_login_success: (state, action) => {
            let result = action.payload;

            state.user = {
                firstname: result[0],
                lastname: result[1],
                username: result[2],
                email: result[3],
                password: result[4],
                loginStatus: true
            }
        },
        user_login_failure: (state, action) => {
            state.error = "Invalid Credentials";
            
        }, 
        user_logout: (state, action) => {
            state.user = [];
        },
        user_signup_success: (state, action) => {
            let result = action.payload;

            state.user = {
                firstname: result[0],
                lastname: result[1],
                username: result[2],
                email: result[3],
                password: result[4],
                loginStatus: true,
            }
        },


        user_signup_failure: (state) => {
            state.error = "The email you are using is associated with another account, please login instead or create another account";
        }
    }   

});

export const verifyUser = (action) => {
    return (dispatch) => {
        const response = API.post('/auth/login', {
        email: action[0],
        password: action[1],
      }).then((response)=> {
          console.log("response in login", response)
        if (response.data === "Password or Email is incorrect") {
            dispatch(user_signup_failure());
        } else {
            dispatch(user_signup_success(action));
        }
      }).catch(function (error) {
        console.log(error);
      });
  }
}

export const storeUser = (action) => {
    return (dispatch) => {
        const response = API.post('/auth/register', {
        firstname: action[0],
        lastname: action[1],
        username: action[2],
        email: action[3],
        password: action[4],
      }).then((response)=> {
          console.log("response in signup", response)
        if (response.data) {
            dispatch(user_signup_failure());
        } else {
            dispatch(user_signup_success(action));
        }
      }).catch(function (error) {
        console.log(error);
      });
  }
}

export const { user_login_success, user_login_failure, user_logout, user_signup_success, user_signup_failure } = userSlice.actions;

export default userSlice.reducer;
