import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productsApi, ProductsFiltersType, ProductType } from "../api/products"
import handleRequestErrors from "../utils/handleRequestErrors"

interface ProductsState {
    data: ProductType[],
    isLoading: boolean,
    isError: boolean
}

const initialState: ProductsState = {
    data: [],
    isLoading: false,
    isError: false
}

export const getProducts = createAsyncThunk('products/getProducts', async ({ name = '', sortBy = '-created' }: ProductsFiltersType, { rejectWithValue }) => {
    try {
        return await productsApi.list({ name, sortBy })
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false
                state.data = payload
            })
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getProducts.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export const selectProducts = (state: { products: ProductsState }) => state.products

export const productsActions = {
    getProducts
}

export default productsSlice.reducer