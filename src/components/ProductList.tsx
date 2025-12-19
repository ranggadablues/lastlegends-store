"use client"

import { ProductsType } from "@/types"
import ProductCard from "./ProductCard"
import { Button } from "./ui/button"
import Categories from "./Categories"
import { useRouter } from "next/navigation"
import Filter from "./Filter"

const ProductList = ({ category, params, products }: { category: string, params: "homepage" | "products", products: ProductsType }) => {
    const router = useRouter();

    if (!products || !Array.isArray(products)) {
        return <div className="text-white">No products found.</div>;
    }
      
    return (
        <div className="bg-zinc-900 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-white uppercase tracking-wider mb-3">
                        Shop The Collection
                    </h2>
                    <div className="w-16 h-1 bg-red-600 mx-auto" />
                </div>

                <Categories />
                {params === "products" && <Filter />}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        className="border-2 border-gray-600 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 px-10 py-6 uppercase tracking-wider"
                        onClick={() => router.push(category ? `/products/?category=${category}` : "/products")}
                    >
                        View All Products
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductList