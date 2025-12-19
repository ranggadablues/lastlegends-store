import z from "zod";

export type ProductType = {
    id: string | number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
    tag?: string;
    band?: string;
}

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Invalid email address"),
    phone: z.string().min(7, "Phone number must be between 7 and 15 digits")
        .max(15, "Phone number must be between 7 and 15 digits")
        .regex(/^\d+$/, "Phone number must contain only numbers"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip is required"),
    country: z.string().min(1, "Country is required"),
})

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
    cardHolder: z.string().min(1, "Card Holder is required"),
    cardNumber: z.string().min(16, "Card Number is required").max(16, "Card Number is required"),
    expirationDate: z.string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration Date must be in MM/YY format"),
    cvv: z.string().min(3, "CVV is required").max(3, "CVV is required")
})

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
    cart: CartItemsType;
    hasHydrated: boolean;
}

export type CartStoreActionsType = {
    addToCart: (product: CartItemType) => void;
    removeFromCart: (item: CartItemType) => void;
    clearCart: () => void;
}