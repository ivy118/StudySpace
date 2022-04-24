
import { configureStore } from '@reduxjs/toolkit';
import loginOrSignupReducer from "./loginOrSignupSlice";
import communityReducer from "./communitySlice";
import postReducer from "./postSlice";
import modalReducer from "./modalSlice";


const store = configureStore({
    reducer: {
        loginSignup: loginOrSignupReducer,
        community: communityReducer,
        post: postReducer,
        modal: modalReducer
    }
});

export default store;
