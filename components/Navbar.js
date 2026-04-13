"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <span className="material-symbols-outlined">medication</span>
          </span>
          <span className={styles.logoText}>
            MedSupply<span className={styles.logoBold}>Precision</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Link href="/shop" className={styles.navLink}>Shop</Link>
          <Link href="/b2b" className={styles.navLink}>Hospital Orders</Link>
          <Link href="/support" className={styles.navLink}>Support</Link>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
            <span className="material-symbols-outlined">shopping_cart</span>
            {mounted && count > 0 && (
              <span className={styles.cartBadge}>{count}</span>
            )}
          </Link>
          <Link href="/dashboard" className={styles.iconBtn} aria-label="Account">
            <span className="material-symbols-outlined">person</span>
          </Link>
          <Link href="/login" className={`btn btn-primary btn-sm ${styles.loginBtn}`}>
            Sign In
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/shop" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            Shop
          </Link>
          <Link href="/b2b" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            Hospital Orders
          </Link>
          <Link href="/support" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            Support
          </Link>
          <Link href="/dashboard" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            Dashboard
          </Link>
          <Link href="/login" className={`btn btn-primary ${styles.mobileCta}`} onClick={() => setMobileOpen(false)}>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
