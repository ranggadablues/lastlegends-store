"use client"

import { ProductType } from "@/types"
import Image from "next/image"
// import Link from "next/link"
import { Button } from "./ui/button"
import { Eye, ShoppingCart } from "lucide-react"
import useCartStore from "@/store/cartStore"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const ProductCard = ({ product }: { product: ProductType }) => {
    const router = useRouter();
    const [productTypes] = useState({
        size: product.sizes[0],
        color: product.colors[0],
    })
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: 1,
            selectedSize: productTypes.size,
            selectedColor: productTypes.color,
        })
        toast.success(`${product.name} added to cart`)
    }
    return (
        <div key={product.id} className="group bg-zinc-800 border border-zinc-700 hover:border-red-600 transition-all duration-300">
            <div className="relative overflow-hidden aspect-square">
                <Image src={product.images[product.colors[0]]} alt={product.name} fill className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                {product.tag && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-xs tracking-wider">
                        {product.tag}
                    </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button onClick={handleAddToCart} className="bg-white text-black hover:bg-red-600 hover:text-white cursor-pointer">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Quick Add
                    </Button>
                </div>
            </div>

            <div className="p-4 space-y-2">
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                    {product.band}
                </div>
                <h3 className="text-white uppercase tracking-wide">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between pt-2">
                    <span className="text-xl text-white">
                        IDR {product.price.toLocaleString('id-ID')}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-600 hover:bg-transparent"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                </div>

                {/* Detail Button */}
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full border border-zinc-700 bg-transparent text-gray-400 hover:bg-zinc-900 hover:text-white hover:border-red-600 uppercase tracking-wider text-xs py-2 mt-2 transition-all group/btn"
                    onClick={() => router.push(`/products/${product.id}`)}
                >
                    <Eye className="h-3 w-3 mr-1.5 group-hover/btn:text-red-600 cursor-pointer" />
                    View Details
                </Button>
            </div>
        </div>
    )
}

export default ProductCard