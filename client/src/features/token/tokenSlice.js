import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tokenService from './tokenService';

// access token
export const accessToken = createAsyncThunk('token/refresh_token', async (token, thunkAPI) => {
    try {
        const getToken = await tokenService.accessToken(token)
        // thunkAPI.dispatch(setToken(token))
        return getToken
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: null
    },
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(accessToken.fulfilled, (state, action) => {
                state.value = action.payload
            })
    }
})

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;