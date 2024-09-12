import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { accountApi, AccountType } from "../api/account"
import { alertActions } from "./alertSlice"
import { ALERT_TYPE } from "../utils/constants"
import handleRequestErrors from "../utils/handleRequestErrors"

interface AccountState {
    data: AccountType,
    isLoading: boolean,
    isError: boolean
}

const initialState: AccountState = {
    data: {
        id: '',
        fullName: '',
        phone: '',
        email: '',
        address: ''
    },
    isLoading: false,
    isError: false,
}

export const getProfile = createAsyncThunk('account/getProfile', async (userId: string, { dispatch, rejectWithValue }) => {
    try {
        return await accountApi.getProfile(userId)
    } catch (err) {
        if (err.status === 404) {
            return await accountApi.createProfile(userId)
        }

        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})

export const updateProfile = createAsyncThunk('account/updateProfile', async ({ userId, profileId, data }: { userId: string, profileId: string, data: AccountType }, { dispatch, rejectWithValue }) => {
    try {
        await accountApi.updateProfile({ profileId, data })

        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.SUCCESS, message: 'Profile updated successfully' }))
        dispatch(getProfile(userId))

    } catch (err) {
        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProfile.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false

                state.data = payload
            })
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true
                state.isError = false

            })
            .addCase(getProfile.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })

        builder
            .addCase(updateProfile.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
                state.isError = false

            })
            .addCase(updateProfile.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export const selectAccount = (state: { account: AccountState }) => state.account

export const accountActions = {
    getProfile,
    updateProfile
}

export default accountSlice.reducer