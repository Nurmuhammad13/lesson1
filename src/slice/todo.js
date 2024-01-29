import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todoSlice/fetchTodos",
    async (id) => {
        const responce = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
        const result = await responce.json();

        return result;
    }
);

export const postTodo = createAsyncThunk(
    "todoSlice/postTodo",
    async (todo,{rejectWithValue,dispatch}) => {
        const responce = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const result = await responce.json();

        dispatch(addTodo(todo));
    }
)

const initialState = {
    data: [],
    status: null,
    error: null
}

const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        addTodo: (state, { payload }) => {
            state.data.unshift(payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.status = "success";
            state.error = null;
        });
    }
})
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;