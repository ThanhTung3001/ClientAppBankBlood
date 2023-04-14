import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo: {},
    status: 'init'
}

const signUpAsync = createAsyncThunk("user/signinAsync", ({ username, firstName, lastName, email, password, confirmPassword }))

const SignUpSlice = createSlice({
    name: 'User/SignIn',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase()
    })
})