"use client"

import PaymentForm from "@/components/PaymentForm"
import ShippingForm from "@/components/ShippingForm"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useCartStore from "@/store/cartStore"
import { ShippingFormInputs } from "@/types"
import { ArrowRight, Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const steps = [
    {
        id: 1,
        label: "Shopping Cart",
        completed: false
    },
    {
        id: 2,
        label: "Shipping Address",
        completed: false
    },
    {
        id: 3,
        label: "Payment Method",
        completed: false
    },
]

const CartPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

    const activeStep = Number.parseInt(searchParams.get("step") || "1");

    const { cart, removeFromCart } = useCartStore();
    return (
        <div className="bg-zinc-900 min-h-screen py-8">
            <div className="container mx-auto px-4">

                {/* Page Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl text-white uppercase tracking-wider mb-3">
                        Your Shopping Cart
                    </h1>
                    <div className="w-16 h-1 bg-red-600 mx-auto" />
                </div>

                {/* Progress Stepper */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step.id == activeStep
                                            ? 'bg-red-600 border-red-600 text-white'
                                            : 'bg-zinc-800 border-zinc-700 text-gray-500'
                                            }`}
                                    >
                                        {step.id}
                                    </div>
                                    <span className={`mt-2 text-xs uppercase tracking-wide ${step.id == activeStep ? 'text-white' : 'text-gray-500'
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`h-0.5 flex-1 ${step.completed ? 'bg-red-600' : 'bg-zinc-700'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {activeStep === 1 ? 
                            cart.length == 0 ? (
                                <div className="bg-zinc-800 border border-zinc-700 p-4">
                                    <p className="text-sm text-gray-500">Your cart is empty.</p>
                                </div>
                            ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id+item.selectedSize+item.selectedColor}
                                    className="bg-zinc-800 border border-zinc-700 p-4"
                                >
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 flex-shrink-0 bg-zinc-900">
                                            <Image
                                                src={item.images[item.selectedColor]}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                                                        {item.band}
                                                    </p>
                                                    <h3 className="text-white uppercase tracking-wide">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        Size: <span className="text-white">{item.selectedSize}</span>
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={() => removeFromCart(item)}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-gray-400 hover:text-red-600 hover:bg-transparent -mt-2 -mr-2 cursor-pointer"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="flex justify-between items-center mt-4">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 border border-zinc-700 bg-zinc-900">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-white w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-xl text-white">
                                                    IDR {(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : activeStep === 2 ? (
                            <ShippingForm setShippingForm={setShippingForm} />
                        ) : activeStep === 3 && shippingForm ? (
                            <PaymentForm />
                        ) : (
                            <p className="text-sm text-gray-500">Please fill in the shipping form to continue.</p>
                        )}
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-zinc-800 border border-zinc-700 p-6 sticky top-24">
                            <h2 className="text-xl text-white uppercase tracking-wider mb-4">
                                Cart Details
                            </h2>
                            <div className="w-12 h-0.5 bg-red-600 mb-6" />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 uppercase tracking-wide text-sm">
                                        Subtotal
                                    </span>
                                    <span className="text-white">
                                        IDR {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 uppercase tracking-wide text-sm">
                                        Discount (10%)
                                    </span>
                                    <span className="text-green-500">
                                        -IDR 10
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 uppercase tracking-wide text-sm">
                                        Shipping Fee
                                    </span>
                                    <span className="text-white">
                                        IDR 10
                                    </span>
                                </div>

                                <Separator className="bg-zinc-700" />

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-white uppercase tracking-wider">
                                        Total
                                    </span>
                                    <span className="text-2xl text-white">
                                        IDR {(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) - 10 + 10).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {activeStep === 1 && <Button onClick={() => router.push("/cart?step=2", { scroll: false })}
                                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white uppercase tracking-wider py-6 cursor-pointer"
                            >
                                Continue <ArrowRight className="w-3 h-3" />
                            </Button>}

                            <Button
                                onClick={() => router.push("/", { scroll: true })}
                                variant="outline"
                                className="w-full mt-3 border-2 border-zinc-700 text-gray-500 hover:bg-zinc-900 hover:text-white uppercase tracking-wider cursor-pointer"
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage