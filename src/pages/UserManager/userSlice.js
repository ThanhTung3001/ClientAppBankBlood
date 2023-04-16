import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteWithToken, GetWithToken, PatchWithToken } from "../../app/api/apiMethod";
import { BASE_URL } from "../../BaseUrl";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";



const initialState = {
    users:[],
    status:'init',
    statusUpdate:'init'
};

export const FetchUserAsync = createAsyncThunk("user/fetchUsers",async(token)=>{
    // console.log(token);
    var {data} = await GetWithToken({url:`/api/Admin/alluserwithroles`,token:token},);
    return data;
})
export const UpdateRoleForUser = createAsyncThunk("user/updateRoles",async({data,token,username})=>{
    var {data} = await PatchWithToken({url:`/api/Account/update-roles`,body:{
        roles:data,
        userName:username
    },token:token});
    return data;
})
export const DeleteUser = createAsyncThunk("user/userDelete",async({username,token})=>{
    var {data} =  await DeleteWithToken({url:`/api/Account/delete-users/${username}`,token:token});
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
        builder.addCase(UpdateRoleForUser.pending,(state,action)=>{
            state.statusUpdate  ='loading'
         
        })
        builder.addCase(UpdateRoleForUser.fulfilled,(state,action)=>{
            state.statusUpdate  ='success';
            toast.success('Update role for user success');
            // const Apptoken = useSelector(state => state.SignUp.token);
            // const dispatch = useDispatch();
            // dispatch(FetchUserAsync(Apptoken))
        })
        builder.addCase(UpdateRoleForUser.rejected,(state,action)=>{
            state.statusUpdate  ='success';
            toast.error('Update role for user fail');
        })
        builder.addCase(DeleteUser.fulfilled,(state,action)=>{
           // state.statusUpdate  ='success';
            toast.success('Delete user success');
            // const Apptoken = useSelector(state => state.SignUp.token);
            // const dispatch = useDispatch();
            // dispatch(FetchUserAsync(Apptoken))
        })
        builder.addCase(DeleteUser.rejected,(state,action)=>{
           // state.statusUpdate  ='success';
            toast.error('Delete  user fail');
        })
    }
})
export default userSlice.reducer;