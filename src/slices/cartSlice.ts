import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cartApi, CartType } from "../api/cart"
import { alertActions } from "./alertSlice"
import { ALERT_TYPE } from "../utils/constants"
import handleRequestErrors from "../utils/handleRequestErrors"

interface CartState {
    id: string,
    data: CartType,
    total: number,
    isLoading: boolean,
    isError: boolean,
    isAddLoading: boolean,
    isAddError: boolean,
    isRemoveLoading: boolean,
    isRemoveError: boolean
}

const initialState: CartState = {
    data: {
        id: '',
        products: [],
        expand: {
            products: []
        }
    },
    total: 0,
    isLoading: false,
    isError: false,
    isAddLoading: false,
    isAddError: false
}

export const getCart = createAsyncThunk('cart/getCart', async (userId: string, { dispatch, rejectWithValue }) => {
    try {
        return await cartApi.listProducts(userId)
    } catch (err) {
        if (err.status === 404) {
            return await cartApi.create(userId)
        }

        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})

export const clearCart = createAsyncThunk('cart/clearCart', async (userId: string, { getState, dispatch, rejectWithValue }) => {
    try {
        const { cart } = getState()

        const data = {
            ...cart.data,
            isActive: false
        }

        await cartApi.updateCart({ cartId: cart.data.id, data })
        return await cartApi.create(userId)
    } catch (err) {
        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})

export const addProductToCart = createAsyncThunk('cart/addProductToCart', async ({ userId, productId }: { userId: string, productId: string }, { dispatch, getState, rejectWithValue }) => {
    try {
        const { cart } = getState()

        const data = {
            ...cart.data,
            products: [...cart.data.products, productId]
        }

        await cartApi.updateCart({ cartId: cart.data.id, data })

        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.SUCCESS, message: 'Item added from cart' }))
        dispatch(getCart(userId))
    } catch (err) {
        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})

export const removeProductFromCart = createAsyncThunk('cart/removeProductFromCart', async ({ productId, userId }: { productId: string, userId: string }, { getState, dispatch, rejectWithValue }) => {
    try {
        const { cart } = getState()


        const updatedProducts = cart.data.products.filter(
            (id: string) => id !== productId
        );

        const data = {
            ...cart.data,
            products: updatedProducts
        }

        await cartApi.updateCart({
            cartId: cart.data.id, data
        })

        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.WARNING, message: 'Item removed from cart' }))
        dispatch(getCart(userId))
    } catch (err) {
        dispatch(alertActions.handleMessage({ type: ALERT_TYPE.ERROR, message: 'Something went wrong, try again later' }))

        return rejectWithValue(handleRequestErrors(err))
    }
})


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        emptyCart: (state) => {
            state.data = {}
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCart.fulfilled, (state, { payload }) => {
                let total = 0

                state.isLoading = false
                state.isError = false

                state.total = 0

                state.data = payload

                if (payload?.expand?.products) {
                    payload?.expand?.products.forEach(product => {
                        total += product.price
                    });

                }

                state.total = total
            })
            .addCase(getCart.pending, (state) => {
                state.isLoading = true
                state.isError = false

            })
            .addCase(getCart.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })

        builder
            .addCase(clearCart.fulfilled, (state, { payload }) => {
                let total = 0

                state.isLoading = false
                state.isError = false

                state.total = 0

                state.data = payload

                if (payload?.expand?.products) {
                    payload?.expand?.products.forEach(product => {
                        total += product.price
                    });

                }

                state.total = total
            })
            .addCase(clearCart.pending, (state) => {
                state.isLoading = true
                state.isError = false

            })
            .addCase(clearCart.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })

        builder
            .addCase(addProductToCart.fulfilled, (state) => {
                state.isAddLoading = false
                state.isAddError = false
            })
            .addCase(addProductToCart.pending, (state) => {
                state.isAddLoading = true
                state.isAddError = false
            })
            .addCase(addProductToCart.rejected, (state) => {
                state.isAddLoading = false
                state.isAddError = true
            })

        builder
            .addCase(removeProductFromCart.fulfilled, (state) => {
                state.isRemoveLoading = false
                state.isRemoveError = false
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.isRemoveLoading = true
                state.isRemoveError = false
            })
            .addCase(removeProductFromCart.rejected, (state) => {
                state.isRemoveLoading = false
                state.isRemoveError = true
            })
    }
})

export const selectCart = (state: { cart: CartState }) => state.cart


export const cartActions = {
    getCart,
    clearCart,
    addProductToCart,
    removeProductFromCart,
    emptyCart: cartSlice.actions.emptyCart
}

export default cartSlice.reducer