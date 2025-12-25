import ProductInteraction from "@/components/ProductInteraction";
import Image from "next/image";
import { getProduct } from "./metadata";

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const product = await getProduct(id);
    return {
        title: `${product?.name} - LastLegends`,
        description: product?.description,
    };
};

const ProductPage = async ({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ color: string; size: string }>;
}) => {

    const { size, color } = await searchParams;
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) {
        return <div>Product not found</div>;
    }
    const selectedSize = size || (product.sizes[0] as string);
    const selectedColor = color || (product.colors[0] as string);
    return (
        <div className="bg-zinc-900 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">

                    {/* Product Image */}
                    <div className="bg-zinc-800 border border-zinc-700 p-8">
                        <div className="aspect-square relative">
                            <Image
                                src={product?.images[selectedColor]}
                                alt={product?.name}
                                fill
                                className="w-full h-full object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-xs uppercase tracking-wider">
                                {product?.tag}
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <ProductInteraction
                        product={product}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductPage;