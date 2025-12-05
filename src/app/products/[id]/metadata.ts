import { ProductType } from "@/types"
import { api } from "@/lib/api"

// const products: ProductsType = productsData
export async function getProduct(id: string | number): Promise<ProductType | undefined> {
    const res = await api.get(`/products/${id}`);
    if (!res.success) {
        throw new Error("Failed to fetch products");
    }

    const product: ProductType = res.data.product;
    return product;
}