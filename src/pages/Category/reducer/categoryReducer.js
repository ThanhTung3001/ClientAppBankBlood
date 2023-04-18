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

export const fetchCategory = createAsyncThunk("Category/fetchCategory", async ({ page, pageSize, token }) => {

    var { data } = await GetWithToken({ url: `/api/Category?PageNumber=${page}&PageSize=${pageSize}`, token: token });

    return data;
});

export const updateCategory = createAsyncThunk('Category/CategoryUpdate', async ({ data, token }) => {
    console.log(data);
    var { data } = await PutWithToken({ url: `/api/Category/${data.id}`, token: token, body: data });
    return data;
});

export const insertCategory = createAsyncThunk('Category/CategoryInsert', async ({ data, token }) => {

    var { data } = await PostWithToken({ url: `/api/Category/`, token: token, body: data });
    return data;
});

export const deleteCategory = createAsyncThunk('Category/CategoryDelete', async ({ data, token }) => {

    console.log({ data, token });
    var { data } = await DeleteWithToken({ url: `/api/Category/${data.id}`, token });
    console.log(data);
    return data;
})

const CategorySlice = createSlice({
    name: 'CategorySlice',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.loading = false;
            // console.log(action);
            var response = action.payload;
            state.data = response.data;
            state.page = response.pageNumber;
            state.totalPage = response.totalPages;
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Update Category success')
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.loading = false;
            toast.error('Update Category fail')
        })
        builder.addCase(insertCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Insert Category success')
            state.data.push(action.payload.data)
        })
        builder.addCase(insertCategory.rejected, (state, action) => {
            state.loading = false;
            toast.error('Insert Category fail')
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success('Delete Category success');
            state.data = state.data.filter(e => {
                return e.id != action.payload.data
            })
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            toast.error('Delete Category fail')
        })
    }
});

export default CategorySlice.reducer;

export const { changePage } = CategorySlice.actions;