"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./cart.module.css";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, tax, total } = useCart();
  const shipping = 0;

  return (
    <>
      <Navbar />
      <main className={styles.cartPage}>
        <div className={styles.container}>
          <h2>Checkout</h2>
          <div className={styles.layout}>
            {/* Left */}
            <div className={styles.left}>
              {/* Cart Items */}
              <section className={styles.section}>
                <h4 className={styles.sectionTitle}>
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Cart Items
                </h4>
                <div className={styles.itemList}>
                  {cartItems.map((item) => (
                    <div key={item.name} className={styles.cartItem}>
                      <div className={styles.itemImg}>
                        <span className="material-symbols-outlined">
                          {item.cat === "Respiratory" ? "masks" :
                           item.cat === "Diagnostics" ? "biotech" :
                           item.cat === "Protective" ? "shield" :
                           item.cat === "Hospitality" ? "bed" :
                           "back_hand"}
                        </span>
                      </div>
                      <div className={styles.itemInfo}>
                        <h5>{item.name}</h5>
                        <p>{item.unit}</p>
                      </div>
                      <div className={styles.itemQty}>
                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.qty - 1)}>−</button>
                        <span>{item.qty}</span>
                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                      </div>
                      <span className={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</span>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Shipping */}
              <section className={styles.section}>
                <h4 className={styles.sectionTitle}>
                  <span className="material-symbols-outlined">local_shipping</span>
                  Shipping Information
                </h4>
                <div className={styles.formGrid}>
                  <div className={styles.fieldFull}>
                    <label className="input-label">Facility Name</label>
                    <input className="input-field" placeholder="St. Mary's Hospital" />
                  </div>
                  <div>
                    <label className="input-label">Department</label>
                    <input className="input-field" placeholder="Surgical Wing" />
                  </div>
                  <div>
                    <label className="input-label">Contact Phone</label>
                    <input className="input-field" placeholder="(555) 123-4567" />
                  </div>
                  <div className={styles.fieldFull}>
                    <label className="input-label">Delivery Address</label>
                    <input className="input-field" placeholder="123 Medical Center Blvd" />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className={styles.section}>
                <h4 className={styles.sectionTitle}>
                  <span className="material-symbols-outlined">credit_card</span>
                  Payment Method
                </h4>
                <div className={styles.paymentOptions}>
                  <label className={styles.payOption}>
                    <input type="radio" name="pay" defaultChecked /> Credit Card
                  </label>
                  <label className={styles.payOption}>
                    <input type="radio" name="pay" /> Purchase Order
                  </label>
                  <label className={styles.payOption}>
                    <input type="radio" name="pay" /> Net-30 Invoice
                  </label>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.fieldFull}>
                    <label className="input-label">Card Number</label>
                    <input className="input-field" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div>
                    <label className="input-label">Expiry</label>
                    <input className="input-field" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="input-label">CVC</label>
                    <input className="input-field" placeholder="123" />
                  </div>
                </div>
              </section>
            </div>

            {/* Right Summary */}
            <aside className={styles.summary}>
              <div className={styles.summaryCard}>
                <h4>Order Summary</h4>
                {cartItems.length === 0 && <p style={{color: "var(--outline)", padding: "1rem 0"}}>Your cart is empty.</p>}
                {cartItems.map((item) => (
                  <div key={item.name} className={styles.summaryItem}>
                    <div>
                      <h5>{item.name}</h5>
                      <p>{item.unit}</p>
                    </div>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div className={styles.summaryLine}>
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryLine}>
                  <span>Shipping</span><span className={styles.freeShip}>FREE</span>
                </div>
                <div className={styles.summaryLine}>
                  <span>Tax</span><span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.summaryTotal}>
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "1rem" }}>
                  Place Order
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <p className={styles.secureNote}>
                  <span className="material-symbols-outlined">lock</span>
                  Secure SSL Encrypted Transaction
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
