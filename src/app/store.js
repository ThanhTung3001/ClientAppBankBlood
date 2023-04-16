import { configureStore, createStore } from "@reduxjs/toolkit";
import signInReducer from "../pages/Authentication/signupSlice";
import UserReducer from "../pages/UserManager/userSlice";
import bloodGroudReducer from "../pages/BloodGroup/Reducer/bloodGroudReducer";

export default configureStore({
    reducer:{
        SignUp:signInReducer,
        UserReducer:UserReducer,
        BloodGroup:bloodGroudReducer
    }
})