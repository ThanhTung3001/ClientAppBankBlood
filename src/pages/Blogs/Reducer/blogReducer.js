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

export const fetchBlog = createAsyncThunk("Blog/fetchBlog", async ({ page, pageSize, token }) => {

    var { data } = await GetWithToken({ url: `/api/Blog?PageNumber=${page}&PageSize=${pageSize}`, token: token });

    return data;
});

export const updateBlog = createAsyncThunk('Blog/BlogUpdate', async ({ data, token }) => {
    console.log(data);
    var { data } = await PutWithToken({ url: `/api/Blog/${data.id}`, token: token, body: data });
    return data;
});

export const insertBlog = createAsyncThunk('Blog/BlogInsert', async ({ data, token }) => {

    var { data } = await PostWithToken({ url: `/api/Blog/`, token: token, body: data });
    return data;
});

export const deleteBlog = createAsyncThunk('Blog/BlogDelete', async ({ data, token }) => {

    console.log({ data, token });
    var { data } = await DeleteWithToken({ url: `/api/Blog/${data.id}`, token });
    console.log(data);
    return data;
})

const BlogSlice = createSlice({
    name: 'BlogSlice',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBlog.fulfilled, (state, action) => {
            state.loading = false;
            // console.log(action);
            var response = action.payload;
            state.data = response.data;
            state.page = response.pageNumber;
            state.totalPage = response.totalPages;
        })
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Update Blog success')
        })
        builder.addCase(updateBlog.rejected, (state, action) => {
            state.loading = false;
            toast.error('Update Blog fail')
        })
        builder.addCase(insertBlog.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Insert Blog success')
            state.data.push(action.payload.data)
        })
        builder.addCase(insertBlog.rejected, (state, action) => {
            state.loading = false;
            toast.error('Insert Blog fail')
        })
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Delete Blog success');
            state.data = state.data.filter(e => {
                return e.id != action.payload.data
            })
        })
        builder.addCase(deleteBlog.rejected, (state, action) => {
            state.loading = false;
            toast.error('Delete Blog fail')
        })
    }
});

export default BlogSlice.reducer;

export const { changePage } = BlogSlice.actions;