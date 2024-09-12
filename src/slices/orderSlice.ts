import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { orderApi, OrderType } from "../api/order"
import { cartActions } from "./cartSlice"
import { ALERT_TYPE } from "../utils/constants"
import { alertActions } from "./alertSlice"
import handleRequestErrors from "../utils/handleRequestErrors"

interface OrderState {
    id: string,
    data: OrderType[],
    isLoading: boolean,
    isError: boolean,
    isAddLoading: boolean,
    isAddError: boolean,
}

const initialState: OrderState = {
    id: '',
    data: [],
    isLoading: false,
    isError: false,
    isAddLoading: false,
    isAddError: false
}

export const getOrders = createAsyncThunk('orders/getOrders', async (userId: string, { dispatch, rejectWithValue }) => {
    try {
        return await orderApi.listOrders(userId)
    } catch (err) {
        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})


export const createOrder = createAsyncThunk('orders/createOrder', async ({ data, cb }: { data: OrderType, cb: () => void }, { dispatch, rejectWithValue }) => {
    try {
        await orderApi.create(data)
        dispatch(cartActions.clearCart(data.user))

        cb()
    } catch (err) {
        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrders.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false

                state.data = payload
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
                state.isError = false

            })
            .addCase(getOrders.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })

        builder
            .addCase(createOrder.fulfilled, (state) => {
                state.isAddLoading = false
                state.isAddError = false
            })
            .addCase(createOrder.pending, (state) => {
                state.isAddLoading = true
                state.isAddError = false
            })
            .addCase(createOrder.rejected, (state) => {
                state.isAddLoading = false
                state.isAddError = true
            })
    }
})

export const selectOrders = (state: { orders: OrderState }) => state.orders

export const ordersActions = {
    getOrders,
    createOrder,
}

export default ordersSlice.reducer