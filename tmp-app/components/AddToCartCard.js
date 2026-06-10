"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "@/app/shop/[id]/product.module.css";

export default function AddToCartCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleDecrease = () => setQty((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQty((prev) => prev + 1);

  const handleAdd = () => {
    addToCart(product, qty);
  };

  return (
    <>
      <div className={styles.qtyRow}>
        <div className={styles.qtyControl}>
          <button className={styles.qtyBtn} onClick={handleDecrease}>−</button>
          <span className={styles.qtyVal}>{qty}</span>
          <button className={styles.qtyBtn} onClick={handleIncrease}>+</button>
        </div>
        <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={handleAdd}>
          Add to Cart
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>
    </>
  );
}
