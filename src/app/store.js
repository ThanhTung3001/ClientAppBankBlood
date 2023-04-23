import { configureStore, createStore } from "@reduxjs/toolkit";
import signInReducer from "../pages/Authentication/signupSlice";
import UserReducer from "../pages/UserManager/userSlice";
import bloodGroudReducer from "../pages/BloodGroup/Reducer/bloodGroudReducer";
import hospitalReducer from "../pages/Hospitals/Reducer/hospitalReducer";
import registerReducer from "../pages/Register/Reducer/registerReducer";
import categoryReducer from "../pages/Category/reducer/categoryReducer";
import blogReducer from "../pages/Blog/Reducer/blogReducer";
import EventReducer from "../pages/Event/Reducer/EventReducer";
// import blogReducer from "../pages/Blogs/Reducer/blogReducer";

export default configureStore({
    reducer: {
        SignUp: signInReducer,
        UserReducer: UserReducer,
        BloodGroup: bloodGroudReducer,
        Hospital: hospitalReducer,
        Register: registerReducer,
        Category:categoryReducer,
        Blog:blogReducer,
        Event:EventReducer
    }
})