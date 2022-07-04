
import { configureStore } from '@reduxjs/toolkit';
import loginOrSignupReducer from "./loginOrSignupSlice";
import communityReducer from "./communitySlice";
import postReducer from "./postSlice";
import modalReducer from "./modalSlice";
import messageReducer from "./messageSlice";
import conversationReducer from "./conversationSlice";
import friendReducer from "./friendSlice";


const store = configureStore({
    reducer: {
        loginSignup: loginOrSignupReducer,
        community: communityReducer,
        post: postReducer,
        modal: modalReducer,
        message: messageReducer,
        conversation: conversationReducer,
        friend: friendReducer
    }
});

export default store;
