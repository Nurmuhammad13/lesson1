import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserPosts = createAsyncThunk(
    "myPostsSlice/fetchUserPosts",
    async (id)=>{
        const responce = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const result = await responce.json();

        return result;
    }
);

const initialState = {
    data: null,
    loading: true
}

const myPostsSlice = createSlice({
    name: "myPostsSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUserPosts.fulfilled,(state,{payload})=>{
            state.data = payload;
            state.loading = false;
        });
    }
});

export default myPostsSlice.reducer;