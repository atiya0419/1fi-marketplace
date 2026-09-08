import { products } from "../data/products";

export const getProducts = async () => {
    return new Promise<typeof products>((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 1000);
    });
};