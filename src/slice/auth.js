import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (userData, param) => {
        try {
            const responce = await fetch("https://jsonplaceholder.typicode.com/users");
            const result = await responce.json();
            if(!responce.ok){
                throw new Error(responce.status);
            }
            const data = await result.find(item => item.email == userData.email && item.username == userData.name);
            return data;
        } catch (error) {
            return param.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    loged: false,
    isLoging: false,
    error: null
}

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.loged = false;
            localStorage.removeItem("user");
        },
        login: (state, { payload }) => {
            state.user = payload;
            state.loged = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.user = null;
            state.isLoging = true;
        });
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            if(!payload){
                state.isLoging = false;
                state.error = "user notfounded";
                return;
            }
            state.user = payload;
            state.loged = true;
            state.isLoging = false;
            localStorage.setItem("user", JSON.stringify(payload));
        });
builder.addCase(getUser.rejected, (state, { payload }) => {
            state.error = payload;
        })
    }
});
export const { logOut, login } = authReducer.actions;
export default authReducer.reducer;