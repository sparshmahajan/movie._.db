import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


let initialState = {};

if (Cookies.get("token")) {
    initialState = {
        isLoggedIn: true,
    };
} else {
    initialState = {
        isLoggedIn: false,
    };
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            Cookies.remove("token");
        }
    }
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});


export const { login, logout } = authSlice.actions;

export default store;