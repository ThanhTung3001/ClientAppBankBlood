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

export const fetchEvent = createAsyncThunk("Event/fetchEvent", async ({ page, pageSize,search="", token }) => {

    var { data } = await GetWithToken({ url: `/api/Event?PageNumber=${page}&PageSize=${pageSize}&Keyword=${search}`, token: token });

    return data;
});

export const updateEvent = createAsyncThunk('Event/EventUpdate', async ({ data, token }) => {
    console.log(data);
    var { data } = await PutWithToken({ url: `/api/Event/${data.id}`, token: token, body: data });
    return data;
});

export const insertEvent = createAsyncThunk('Event/EventInsert', async ({ data, token }) => {

    var { data } = await PostWithToken({ url: `/api/Event/`, token: token, body: data });
    return data;
});

export const deleteEvent = createAsyncThunk('Event/EventDelete', async ({ data, token }) => {

    console.log({ data, token });
    var { data } = await DeleteWithToken({ url: `/api/Event/${data.id}`, token });
    console.log(data);
    return data;
})

export const registerEvent = createAsyncThunk('Event/RegisterEvent', async ({ id, token }) => {
    // console.log({ data, token });
    var { data } = await PostWithToken({ url: `/api/Event/Subcribe/${id}`, token: token, body: {} });
    return data;
});

const EventSlice = createSlice({
    name: 'EventSlice',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvent.fulfilled, (state, action) => {
            state.loading = false;
            // console.log(action);
            var response = action.payload;
            state.data = response.data;
            state.page = response.pageNumber;
            state.totalPage = response.totalPages;
        })
        builder.addCase(updateEvent.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Update Event success')
        })
        builder.addCase(updateEvent.rejected, (state, action) => {
            state.loading = false;
            toast.error('Update Event fail')
        })
        builder.addCase(insertEvent.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Insert Event success')
            state.data.push(action.payload.data)
        })
        builder.addCase(insertEvent.rejected, (state, action) => {
            state.loading = false;
            toast.error('Insert Event fail')
        })
        builder.addCase(deleteEvent.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Delete Event success');
            state.data = state.data.filter(e => {
                return e.id != action.payload.data
            })
        })
        builder.addCase(deleteEvent.rejected, (state, action) => {
            state.loading = false;
            toast.error('Delete Event fail')
        })
        builder.addCase(registerEvent.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Register Event success')
            
        })
        builder.addCase(registerEvent.rejected, (state, action) => {
            state.loading = false;
            console.log(action);
            toast.error('Register Event fail')
        })
    }
});

export default EventSlice.reducer;

export const { changePage } = EventSlice.actions;