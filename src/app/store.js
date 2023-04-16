import { configureStore, createStore } from "@reduxjs/toolkit";
import signInReducer from "../pages/Authentication/signupSlice";
import UserReducer from "../pages/UserManager/userSlice";

export default configureStore({
    reducer:{
        SignUp:signInReducer,
        UserReducer:UserReducer
    }
})