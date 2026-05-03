"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage?.getItem("medsupply_cart");
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("medsupply_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    toast.success(`Added ${qty} ${product.name} to cart`);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const count = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
