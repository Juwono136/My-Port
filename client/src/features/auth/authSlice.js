import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
// import { setToken } from './tokenSlice';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('profile'))

const initialState = {
    user: user ? user : { isLoggedOut: true, user: null },
    isError: false,
    isSuccess: false,
    isLoading: false
}

// signin user
export const signin = createAsyncThunk('auth/signin', async (user, thunkAPI) => {
    try {
        return await authService.signin(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// forgot password
export const forgotPassword = createAsyncThunk('auth/forgot', async (email, thunkAPI) => {
    try {
        return await authService.forgotPassword(email)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// reset password
export const resetPassword = createAsyncThunk('auth/reset', async ({ data, token }, thunkAPI) => {
    try {
        // const token = thunkAPI.getState().auth.user
        // console.log(password)
        return await authService.resetPassword(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
    try {
        return await authService.logout()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.user = { isLoggedOut: true, user: null }
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            // signin builder
            .addCase(signin.pending, (state) => {
                state.isLoading = true
                // state.message = ""
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false
                // state.isLoggedOut = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false
                // state.isLoggedOut = true
                state.isError = true
                state.message = action.payload
            })
            // logout builder
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false
                // state.isLoggedOut = true
                state.user = action.payload
            })
            // forgot password builder
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // reset password builder
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer