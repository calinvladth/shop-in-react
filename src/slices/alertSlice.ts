import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ALERT_REMOVAL_DELAY } from "../utils/constants"

type AlertType = {
    type: string,
    message: string
}

interface AlertState {
    data: AlertType[],
}

const initialState = {
    data: []
}

// handleMessage = will also remove it after delay
const handleMessage = createAsyncThunk('alert/handleMessage', async ({ type, message }: AlertType, { dispatch }) => {
    let timeoutId = 0
    dispatch(addMessage({ type, message }))

    if (timeoutId !== 0) {
        clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
        dispatch(removeMessage(0))
    }, ALERT_REMOVAL_DELAY)
})

const addMessage = createAsyncThunk('alert/addMessage', async ({ type, message }: AlertType, { getState }) => {
    const { alert } = getState()

    const data = [
        ...alert.data,
        { type, message }
    ]

    return data
})

const removeMessage = createAsyncThunk('alert/removeMessage', async (index: number, { getState }) => {
    const { alert } = getState()

    const data = [
        ...alert.data,
    ]

    data.splice(index, 1)

    return data
})

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addMessage.fulfilled, (state, { payload }) => {
            state.data = payload
        })
        builder.addCase(removeMessage.fulfilled, (state, { payload }) => {
            state.data = payload
        })
    }
})


export const selectAlert = (state: { alert: AlertState }) => state.alert

export const alertActions = { handleMessage, addMessage, removeMessage }

export default alertSlice.reducer