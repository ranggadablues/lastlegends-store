import Banner from "@/components/Banner"
import { ProductType } from "@/types"
import ProductList from "@/components/ProductList"
import { api, ApiResponse } from "@/lib/api"

type GetProductsResponse = {
  products: ProductType[];
};

export default async function Homepage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const category =
    typeof searchParams?.category === "string"
      ? searchParams.category
      : "all";

  const res = await api.get<ApiResponse<GetProductsResponse>>("/products");

  if (!res.success) {
    throw new Error("Failed to fetch products");
  }

  const products = res.data.products;

  return (
    <div>
      <Banner />
      <ProductList
        category={category}
        params="homepage"
        products={products}
      />
    </div>
  );
}