import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import skillService from './skillServices';
import tokenService from '../token/tokenService';

const initialState = {
    skill: [],
    page: 1,
    sort: { sort: "skill_name", order: "asc" },
    filterLevel: [],
    search: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

// get user skill info
export const getUserSkillInfo = createAsyncThunk('skill/fetchSkills', async (thunkAPI) => {
    try {
        return await skillService.getSkills()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// create skill
export const createUserSkill = createAsyncThunk('skill/add', async (data, thunkAPI) => {
    try {
        const token = await tokenService.accessToken(data)
        return await skillService.createSkill(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }

})

// update skill
export const updateUserSkill = createAsyncThunk('skill/update', async (data, thunkAPI) => {
    try {
        const token = await tokenService.accessToken(data)
        // console.log(token)
        return await skillService.updateSkill(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// delete skill
export const deleteUserSkill = createAsyncThunk('skill/delete', async (id, thunkAPI) => {
    try {
        const token = await tokenService.accessToken(id)
        return await skillService.deleteSKill(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        },
    },
    extraReducers: (builder) => {
        builder
            // get user skill info
            .addCase(getUserSkillInfo.pending, (state) => {
                state.isError = false
                state.isSuccess = false
                state.isLoading = true
            })
            .addCase(getUserSkillInfo.fulfilled, (state, action) => {
                state.skill = action.payload
                state.isLoading = false
                // state.isSuccess = true
            })
            .addCase(getUserSkillInfo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // create user skill
            .addCase(createUserSkill.pending, (state) => {
                state.isError = false
                state.isSuccess = false
                state.isLoading = true
            })
            .addCase(createUserSkill.fulfilled, (state, action) => {
                state.skill.push(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.message = "Skill added."
            })
            .addCase(createUserSkill.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
            // delete user skill
            .addCase(deleteUserSkill.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUserSkill.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.skill = state.skill.filter((skill) => skill.id !== action.payload.id)
                state.message = "Skill deleted."
            })
            .addCase(deleteUserSkill.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // update user skill
            .addCase(updateUserSkill.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserSkill.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                // state.skill = state.skill.find((skill) => skill.id === action.payload.id)
                if (state.skill && state.skill.length > 0) {
                    const updateSkillIndex = state.skill.findIndex(skill => skill.id === action.payload.id)
                    // console.log(updateSkillIndex)

                    if (updateSkillIndex !== -1) {
                        state.skill[updateSkillIndex] = action.payload
                    }
                }
            })
            .addCase(updateUserSkill.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = skillSlice.actions
export default skillSlice.reducer
