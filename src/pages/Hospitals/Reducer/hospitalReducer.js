import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetWithToken, PutWithToken, PostWithToken, DeleteWithToken } from "../../../app/api/apiMethod";
import { toast } from "react-toastify";


const initialState = {
    loading: true,
    data: [],
    page: 1,
    totalPage: 0,
    filter: '',
    sort: ''
}

export const fetchHospital = createAsyncThunk("Hospital/fetchHospital", async ({ page, pageSize, token }) => {

    var { data } = await GetWithToken({ url: `/api/Hospital?PageNumber=${page}&PageSize=${pageSize}`, token: token });

    return data;
});

export const updateHospital = createAsyncThunk('Hospital/HospitalUpdate', async ({ data, token }) => {
    console.log(data);
    var { data } = await PutWithToken({ url: `/api/Hospital/${data.id}`, token: token, body: data });
    return data;
});

export const insertHospital = createAsyncThunk('Hospital/HospitalInsert', async ({ data, token }) => {

    var { data } = await PostWithToken({ url: `/api/Hospital/`, token: token, body: data });
    return data;
});

export const deleteHospital = createAsyncThunk('Hospital/HospitalDelete', async ({ data, token }) => {

    console.log({ data, token });
    var { data } = await DeleteWithToken({ url: `/api/Hospital/${data.id}`, token });
    console.log(data);
    return data;
})

const HospitalSlice = createSlice({
    name: 'HospitalSlice',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHospital.fulfilled, (state, action) => {
            state.loading = false;
            // console.log(action);
            var response = action.payload;
            state.data = response.data;
            state.page = response.pageNumber;
            state.totalPage = response.totalPages;
        })
        builder.addCase(updateHospital.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Update Hospital success')
        })
        builder.addCase(updateHospital.rejected, (state, action) => {
            state.loading = false;
            toast.error('Update Hospital fail')
        })
        builder.addCase(insertHospital.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Insert Hospital success')
            state.data.push(action.payload.data)
        })
        builder.addCase(insertHospital.rejected, (state, action) => {
            state.loading = false;
            toast.error('Insert Hospital fail')
        })
        builder.addCase(deleteHospital.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Delete Hospital success');
            state.data = state.data.filter(e => {
                return e.id != action.payload.data
            })
        })
        builder.addCase(deleteHospital.rejected, (state, action) => {
            state.loading = false;
            toast.error('Delete Hospital fail')
        })
    }
});

export default HospitalSlice.reducer;

export const { changePage } = HospitalSlice.actions;