import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DeleteWithToken, GetWithToken, PostWithToken, PutWithToken } from "../../../app/api/apiMethod"
import { toast } from "react-toastify";


const initialState = {
    loading: true,
    data: [],
    page: 1,
    totalPage: 0,
    filter: '',
    sort: ''
}

export const fetchBloodGroup = createAsyncThunk("blood/fetchBloodGroup", async ({ page, pageSize, token }) => {
    var { data } = await GetWithToken({ url: `/api/BloodGroup?PageNumber=${page}&PageSize=${pageSize}`, token: token });
    return data;
});

export const updateBoodGroup = createAsyncThunk('bloodgroup/bloodGroupUpdate', async ({ data, token }) => {
    console.log(data);
    var { data } = await PutWithToken({ url: `/api/BloodGroup/${data.id}`, token: token, body: data });
    return data;
});

export const insertBloodGroup = createAsyncThunk('bloodgroup/bloodGroupInsert', async ({ data, token }) => {

    var { data } = await PostWithToken({ url: `/api/BloodGroup/`, token: token, body: data });
    return data;
});

export const deleteBloodGroup = createAsyncThunk('bloodgroup/bloodgroupDelete', async ({ data, token }) => {
    var { data } = await DeleteWithToken({ url: `/api/BloodGroup/${data.id}`, token });
    return data;
})

const bloodGroupSlice = createSlice({
    name: 'bloodGroupSlice',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBloodGroup.fulfilled, (state, action) => {
            state.loading = false;
            var response = action.payload;
            state.data = response.data;
            state.page = response.pageNumber;
            state.totalPage = response.totalPages;
        })
        builder.addCase(updateBoodGroup.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Update bloodbank success')
        })
        builder.addCase(updateBoodGroup.rejected, (state, action) => {
            state.loading = false;
            toast.error('Update bloodbank fail')
        })
        builder.addCase(insertBloodGroup.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Insert bloodbank success')
            state.data.push(action.payload.data)
        })
        builder.addCase(insertBloodGroup.rejected, (state, action) => {
            state.loading = false;
            toast.error('Insert bloodbank fail')
        })
        builder.addCase(deleteBloodGroup.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Delete bloodbank success');
            state.data = state.data.filter(e => {
                return e.id != action.payload.data
            })

        })
        builder.addCase(deleteBloodGroup.rejected, (state, action) => {
            state.loading = false;
            toast.error('Delete bloodbank fail')
        })
    }
});

export default bloodGroupSlice.reducer;

export const { changePage } = bloodGroupSlice.actions;