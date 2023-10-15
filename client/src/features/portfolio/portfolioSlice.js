import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import portfolioService from "./portfolioServices";
import tokenService from "../token/tokenService";
// import tokenService from "../token/tokenService";

const initialState = {
    portfolio: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

// get user portfolio
export const getUserPortfolio = createAsyncThunk('portfolio/fetchPortfolio', async (thunkAPI) => {
    try {
        return await portfolioService.getPortfolios()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// create portfolio
export const createUserPortfolio = createAsyncThunk('portfolio/add', async (data, thunkAPI) => {
    try {
        const token = await tokenService.accessToken(data)
        return await portfolioService.createPortfolio(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// update portfolio
export const updateUserPortfolio = createAsyncThunk('portfolio/update', async (data, thunkAPI) => {
    try {
        const token = await tokenService.accessToken(data)
        return await portfolioService.updatePortfolio(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// delete portfolio
export const deleteUserPortfolio = createAsyncThunk('portfolio/delete', async (id, thunkAPI) => {
    try {
        const token = await tokenService.accessToken(id)
        return await portfolioService.deletePortfolio(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isLoading = true
        }
    },
    extraReducers: (builder) => {
        builder
            // get user portfolio info
            .addCase(getUserPortfolio.pending, (state) => {
                state.isError = false
                state.isSuccess = false
                state.isLoading = true
            })
            .addCase(getUserPortfolio.fulfilled, (state, action) => {
                state.portfolio = action.payload
                state.isLoading = false
            })
            .addCase(getUserPortfolio.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // create user portfolio
            .addCase(createUserPortfolio.pending, (state) => {
                state.isError = false
                state.isSuccess = false
                state.isLoading = true
            })
            .addCase(createUserPortfolio.fulfilled, (state, action) => {
                state.portfolio.push(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.message = "Portfolio Added."
            })
            .addCase(createUserPortfolio.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
            // update user portfolio
            .addCase(updateUserPortfolio.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserPortfolio.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                if (state.portfolio && state.portfolio.length > 0) {
                    const updatePortfolioIndex = state.portfolio.findIndex(portfolio => portfolio.id === action.payload.id)

                    if (updatePortfolioIndex !== -1) {
                        state.portfolio[updatePortfolioIndex] = action.payload
                    }
                }
            })
            .addCase(updateUserPortfolio.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // delete user portfolio
            .addCase(deleteUserPortfolio.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUserPortfolio.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.portfolio = state.portfolio.filter(portfolio => portfolio.id !== action.payload.id)
                state.message = "Portfolio deleted."
            })
            .addCase(deleteUserPortfolio.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = portfolioSlice.actions
export default portfolioSlice.reducer