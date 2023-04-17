import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SignInApi, SignUpApi } from "./api/signupApi"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";



const initialState = {
    response: {},
    status: 'init',
    userResponse: {},
    token: '',
    auth: false,
    role: []
}

export const signUpAsync = createAsyncThunk("user/singUpAsync", async ({ username, firstName, lastName, email, password, confirmPassword }) => {
    var data = await SignUpApi({ username, firstName, lastName, email, password, confirmPassword });
    return data;
})
export const signInAsync = createAsyncThunk("user/SignInAsync", async ({ email, password }) => {
    var response = await SignInApi({ email, password });
    return response;
});
const SignUpSlice = createSlice({
    name: 'User/SignIn',
    initialState: initialState,
    reducers: {
        initToken: (state, action) => {
            state.token = action.payload;
            state.auth = true;

        },
        initUserInfo: (state, action) => {
            state.userResponse = action.payload;
            state.auth = true;
        }
    },
    extraReducers: (builder => {
        builder.addCase(signUpAsync.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(signInAsync.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(signUpAsync.fulfilled, (state, action) => {

            state.status = 'sucesss';
            state.response = action.payload;
            toast.success("Register success, please check mail confirm your account");
            setTimeout(() => {
                window.location.href = "/";
            }, 3000)
        })
        builder.addCase(signInAsync.fulfilled, (state, action) => {

            state.status = 'sucesss';
            state.userResponse = action.payload;
            toast.success("Login success, redirect to home");
            localStorage.setItem("UserInfo", JSON.stringify(action.payload));
            localStorage.setItem("Token", `Bearer ${action.payload.data.jwToken}`);
            state.auth = true;
            setTimeout(() => {
                window.location.href = "/";
            }, 3000)
        })
        builder.addCase(signUpAsync.rejected, (state, action) => {
            state.status = 'fail';
            state.response = action.payload;
            toast.error(`Register fail, try again`);
        })
        builder.addCase(signInAsync.rejected, (state, action) => {
            state.status = 'fail';
            state.userResponse = action.payload;
            //  console.log(action);
            toast.error(`Login fail error: Password not valid or account not confirm `);
        })
    })
});

export default SignUpSlice.reducer;
export const { initToken, initUserInfo } = SignUpSlice.actions;
export const token = state => state.SignUp.token;