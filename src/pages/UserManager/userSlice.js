import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetWithToken } from "../../app/api/apiMethod";
import { BASE_URL } from "../../BaseUrl";



const initialState = {
    users:[],
    status:'init'
};

export const FetchUserAsync = createAsyncThunk("user/fetchUsers",async(token)=>{
    // console.log(token);
    var {data} = await GetWithToken({url:`${BASE_URL}/api/Admin/alluserwithroles`,token:token},);
    return data;
})

const userSlice =  createSlice({
    name:'user/CrudUser',
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(FetchUserAsync.pending,(state,action)=>{
            state.status = 'loading';
         
        })
        builder.addCase(FetchUserAsync.fulfilled,(state,action)=>{
            state.status = 'success';
          
            state.users = action.payload;
            // console.log(action.payload);
        })
        builder.addCase(FetchUserAsync.rejected,(state,action)=>{
            state.status = 'faild';
        })
    }
})
export default userSlice.reducer;