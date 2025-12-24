"use client"

import { Suspense } from "react";
import CartPageContent from "./CartPageContent";

export default function CartPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <CartPageContent />
    </Suspense>
  );
}