"use client";

import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <CartProvider>
      {children}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
    </CartProvider>
  );
}
