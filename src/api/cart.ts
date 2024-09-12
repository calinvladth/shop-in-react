import pb from "../utils/pb";
import { ProductType } from "./products";

interface CartType {
    collectionId?: string,
    id: string;
    user: string;
    products: string[];
    expand: {
        products: ProductType[]
    };
}

function listProducts(userId: string): Promise<CartType | undefined> {
    return pb.collection('cart').getFirstListItem(`user='${userId}' && isActive=true`, { expand: 'products' })
}

async function updateCart({ cartId, data }: { cartId: string, data: CartType }) {
    await pb.collection('cart').update(cartId, data)
}


function create(userId: string): Promise<CartType> {
    return pb.collection('cart').create({ user: userId, isActive: true })
}

export type {
    CartType
}

export const cartApi = {
    listProducts,
    create,
    updateCart
}