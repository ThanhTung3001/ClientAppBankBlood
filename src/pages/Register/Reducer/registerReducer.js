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

export const fetchRegistration = createAsyncThunk("blood/fetchRegistration", async ({ page, pageSize, token }) => {
    var { data } = await GetWithToken({ url: `/api/Registration?PageNumber=${page}&PageSize=${pageSize}`, token: token });
    return data;
});

// export const changePage = createAsyncThunk("blood/fetchRegistration", async ({ page, pageSize, token }) => {
//     var { data } = await GetWithToken({ url: `/api/Registration?PageNumber=${page}&PageSize=${pageSize}`, token: token });
//     return data;
// });

export const updateRegistration = createAsyncThunk('Registration/RegistrationUpdate', async ({ data, token }) => {
    console.log(data);
    var { data } = await PutWithToken({ url: `/api/Registration/${data.id}`, token: token, body: data });
    return data;
});

export const insertRegistration = createAsyncThunk('Registration/RegistrationInsert', async ({ data, token }) => {

    var { data } = await PostWithToken({ url: `/api/Registration/`, token: token, body: data });
    return data;
});

export const deleteRegistration = createAsyncThunk('Registration/RegistrationDelete', async ({ data, token }) => {
    var { data } = await DeleteWithToken({ url: `/api/Registration/${data.id}`, token });
    return data;
})

const RegistrationSlice = createSlice({
    name: 'RegistrationSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegistration.fulfilled, (state, action) => {
            state.loading = false;
            var response = action.payload;
            state.data = response.data;
            state.page = response.pageNumber;
            state.totalPage = response.totalPages;
        })

        builder.addCase(updateRegistration.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Update registration success')
        })
        builder.addCase(updateRegistration.rejected, (state, action) => {
            state.loading = false;
            toast.error('Update registration fail')
        })
        builder.addCase(insertRegistration.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Insert registration success')
            //  state.data.push(action.payload.data)
        })
        builder.addCase(insertRegistration.rejected, (state, action) => {
            state.loading = false;
            toast.error('Insert registration fail')
        })
        builder.addCase(deleteRegistration.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Delete registration success');
            state.data = state.data.filter(e => {
                return e.id != action.payload.data
            })

        })
        builder.addCase(deleteRegistration.rejected, (state, action) => {
            state.loading = false;
            toast.error('Delete registration fail')
        })
    }
});

export default RegistrationSlice.reducer;

