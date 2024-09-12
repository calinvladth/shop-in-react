// This might be good for notifications

const CHANNELS = {
    CART: 'CART'
}

const CART_ACTIONS = {
    UPDATE_CART: 'UPDATE_CART'
}

// With this method, you can emit event on the same page
const cartChannel = {
    consumer: new BroadcastChannel(CHANNELS.CART),
    receiver: new BroadcastChannel(CHANNELS.CART)
};

export { cartChannel, CHANNELS, CART_ACTIONS }