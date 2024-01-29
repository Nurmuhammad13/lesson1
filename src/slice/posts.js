import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    "postsSlice/fetchPosts",
    async (_, param) => {
        try {
            const responce = await fetch("https://jsonplaceholder.typicode.com/posts");
            const result = await responce.json();
            if(!responce.ok){
                throw new Error(responce.status)
            }

            return result;
        } catch (error) {
            return param.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    data: [],
    partData: [],
    status: null,
    error: null,
    limit: 10
}

const postsSlice = createSlice({
    name: "postsSlice",
    initialState,
    reducers: {
        paginate: (state, { payload }) => {
            state.partData = state.data.slice(payload, (state.limit + payload));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.partData = payload.slice(0, state.limit);
            state.status = "success";
            state.error = null;
        });
        builder.addCase(fetchPosts.rejected, (state, { payload }) => {
            state.status = "failed";
            state.error = "Error: " + payload;
        });
    }
});

export const { paginate } = postsSlice.actions;

export default postsSlice.reducer;