import { Product, products } from "../data/marketplaceData";

const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async (): Promise<Product[]> => {
    await wait(500);
    return products;
};

export const getProductById = async (
    id: string
): Promise<Product | undefined> => {
    await wait(300);
    return products.find((product) => product.id === id);
};
