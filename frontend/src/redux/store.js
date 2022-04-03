
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import communityReducer from "./communitySlice";
import postReducer from "./postSlice";


export default configureStore({
    reducer: {
        user: userReducer,
        community: communityReducer,
        post: postReducer
    }
})