
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import communityReducer from "./communitySlice";
import postReducer from "./postSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        community: communityReducer,
        post: postReducer
    }
});

export default store;
