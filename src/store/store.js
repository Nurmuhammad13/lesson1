import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../slice/posts";
import authReducer from "../slice/auth";
import myPostsSlice from "../slice/myPosts";
import todoSlice from "../slice/todo";


const store = configureStore({
    reducer: {
        postsSlice,
        authReducer,
        myPostsSlice,
        todoSlice
    }
});

export default store;