import Banner from "@/components/Banner"
import ProductList from "@/components/ProductList"
import { api } from "@/lib/api"

const Homepage = async ({ searchParams }: { searchParams: Promise<{ category: string }>; }) => {
  const category = (await searchParams).category;
  const res = await api.get("/products");
  if (!res.success) {
    throw new Error("Failed to fetch products");
  }
  const products = res.data.products;

  return (
    <div className='' >
      <Banner />
      <ProductList category={category} params="homepage" products={products} />
    </div>
  )
}

export default Homepage