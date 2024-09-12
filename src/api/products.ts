import pb from "../utils/pb"

type ProductType = {
    id: string;
    collectionId: string,
    name: string;
    description: string;
    price: number;
    photos: string[];
}

type ProductsFiltersType = {
    name: string;
    sortBy: string;
}

function list({ name = '', sortBy = '-created' }: ProductsFiltersType): Promise<ProductType[]> {
    return pb.collection('products').getFullList({
        sort: sortBy,
        filter: `name ~ '${name}'`
    });
}

function listById(productId: string): Promise<ProductType> {
    return pb.collection('products').getOne(productId);
}

export type {
    ProductType,
    ProductsFiltersType
}

export const productsApi = {
    list,
    listById
}