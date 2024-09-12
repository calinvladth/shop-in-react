const API = 'http://127.0.0.1:8090/'
const API_FILES = 'http://127.0.0.1:8090/api/files/:collectionId/:itemId/:fileName'

const ROUTES = {
    SHOP: '/',
    PRODUCT: '/product/:id',
    CART: '/cart',
    WISHLIST: '/wishlist',
    CHECKOUT: '/checkout',
    ORDER_SUCCESS: '/order-success',
    ACCOUNT: '/account',
    LOGIN: '/login',
    REGISTER: '/register'
}

const CURRENCY = {
    TEXT: 'EUR',
    SYMBOL: '€'
}

export {
    API,
    API_FILES,
    ROUTES,
    CURRENCY
}