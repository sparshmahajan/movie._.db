import { createSlice, configureStore } from "@reduxjs/toolkit";


let initialState = {};

if (localStorage.getItem("token")) {
    initialState = {
        isLoggedIn: true,
        user_data: JSON.parse(localStorage.getItem("movie")) || []
    };
} else {
    initialState = {
        isLoggedIn: false,
        user_data: JSON.parse(localStorage.getItem("movie")) || []
    };
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user_data = action.payload;
            localStorage.setItem("movie", JSON.stringify(state.user_data));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user_data = [];
            localStorage.removeItem("movie");
            localStorage.removeItem("token");
        },
        updateWatchList: (state, action) => {
            state.user_data = action.payload;
            localStorage.setItem("movie", JSON.stringify(state.user_data));
        }
    }
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});


export const { login, logout, updateWatchList } = authSlice.actions;

export default store;