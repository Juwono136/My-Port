import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
import tokenService from '../token/tokenService';

const initialState = {
    user: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

// get user
export const getUserInfor = createAsyncThunk('user/infor', async (data, thunkAPI) => {
    try {
        // const token = await tokenService.accessToken(data)
        // console.log(token)
        return await userService.fetchUser(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// update user
export const updateUser = createAsyncThunk('user/update', async (data, thunkAPI) => {
    try {
        const token = await tokenService.accessToken(data)
        // console.log(token)
        return await userService.updateUser(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            // get user infor
            .addCase(getUserInfor.pending, (state) => {
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getUserInfor.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(getUserInfor.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // update user
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { reset } = userSlice.actions
export default userSlice.reducer