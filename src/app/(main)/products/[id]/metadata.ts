import { ProductType } from "@/types"
import { api, ApiResponse } from "@/lib/api"

type GetProductResponse = {
    product: ProductType;
};

// const products: ProductsType = productsData
export async function getProduct(id: string | number): Promise<ProductType | undefined> {
    const res = await api.get<ApiResponse<GetProductResponse>>(`/products/${id}`);
    if (!res.success) {
        throw new Error("Failed to fetch products");
    }

    const product: ProductType = res.data.product;
    return product;
}