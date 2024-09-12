import pb from "../utils/pb"

type OrderType = {
    cart: string,
    user: string,
    fullName: string,
    address: string,
    phone: string,
    email: string,
    paymentType: string,
}

function listOrders(userId: string) {
    return pb.collection('order').getFullList({ sort: '-created', filter: `user = '${userId}'` })
}

async function create(data: OrderType) {
    await pb.collection('order').create(data)
}

export type {
    OrderType
}

export const orderApi = {
    listOrders,
    create
}