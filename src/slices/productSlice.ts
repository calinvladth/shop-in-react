import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productsApi, ProductType } from "../api/products"
import { ALERT_TYPE } from "../utils/constants"
import { alertActions } from "./alertSlice"
import handleRequestErrors from "../utils/handleRequestErrors"

interface ProductState {
    data: ProductType,
    isLoading: boolean,
    isError: boolean
}

const initialState: ProductState = {
    data: {
        id: '',
        collectionId: '',
        name: '',
        description: '',
        price: 0,
        photos: []
    },
    isLoading: false,
    isError: false
}

export const getProduct = createAsyncThunk('product/getProduct', async (id: string, { dispatch, rejectWithValue }) => {
    try {
        return await productsApi.listById(id)
    } catch (err) {
        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false
                state.data = payload
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getProduct.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export const selectProduct = (state: { product: ProductState }) => state.product

export const productActions = {
    getProduct
}

export default productSlice.reducer