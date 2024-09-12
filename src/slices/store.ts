import { combineReducers, configureStore } from '@reduxjs/toolkit'
import accountReducer from './accountSlice'
import productsReducer from './productsSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import ordersReducer from './orderSlice'
import alertReducer from './alertSlice'

const rootReducer = combineReducers({
    account: accountReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
    alert: alertReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch