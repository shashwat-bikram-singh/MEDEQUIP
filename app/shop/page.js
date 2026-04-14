import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import products from "@/data/products.json";
import styles from "./shop.module.css";

const categories = [
  { label: "All Products", count: 482 },
  { label: "Personal Protective", count: 156 },
  { label: "Diagnostic Tools", count: 124 },
  { label: "Surgical Instruments", count: 86 },
  { label: "Lab Supplies", count: 210 },
];

export const metadata = {
  title: "Shop | MedSupply Precision",
  description: "Browse FDA-certified medical supplies including gloves, masks, diagnostic tools, and surgical instruments.",
};

export default function ShopPage() {
  const categoriesFromProducts = ["All Products", ...new Set(products.map((p) => p.cat))];
  const inStockCount = products.filter((p) => p.price < 1000).length;

  return (
    <>
      <Navbar />
      <main className={styles.shopPage}>
        <div className={styles.container}>
          {/* Sidebar */}
          <FadeIn className={styles.sidebar} direction="right" delay={0.1}>
            <h5 className={styles.sideTitle}>Categories</h5>
            <ul className={styles.catList}>
              {categoriesFromProducts.map((cat, i) => (
                <li key={cat} className={`${styles.catItem} ${i === 0 ? styles.catActive : ""}`}>
                  <span>{cat}</span>
                </li>
              ))}
            </ul>

            <h5 className={styles.sideTitle}>Availability</h5>
            <div className={styles.filterGroup}>
              <label className={styles.filterOption}>
                <input type="checkbox" defaultChecked />
                <span>In Stock ({inStockCount})</span>
              </label>
              <label className={styles.filterOption}>
                <input type="checkbox" />
                <span>Pre-order</span>
              </label>
            </div>

            <h5 className={styles.sideTitle}>Price Range</h5>
            <div className={styles.priceFilters}>
              {[
                "Under $100",
                "$100 - $500",
                "$500 - $2,000",
                "Above $2,000",
              ].map((range, i) => (
                <label key={range} className={styles.filterOption}>
                  <input type="radio" name="priceRange" defaultChecked={i === 0} />
                  <span>{range}</span>
                </label>
              ))}
            </div>

            <h5 className={styles.sideTitle}>Popular Categories</h5>
            <ul className={styles.catList}>
              {categories.map((c, i) => (
                <li key={c.label} className={`${styles.catItem} ${i === 0 ? styles.catActive : ""}`}>
                  <span>{c.label}</span>
                  <span className={styles.catCount}>{c.count}</span>
                </li>
              ))}
            </ul>

            <div className={styles.promoCard}>
              <div className={styles.promoIcon}>
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <h5>Facility Bundles</h5>
              <p>Complete bundles including masks, sanitizers, and diagnostic tools at wholesale rates.</p>
              <Link href="/b2b" className="btn btn-primary btn-sm">
                View Bundles
              </Link>
            </div>
          </FadeIn>

          {/* Products */}
          <section className={styles.main}>
            <div className={styles.topBar}>
              <p className={styles.resultCount}>Showing 1-8 of 482 medical grade supplies</p>
              <div className={styles.topActions}>
                <div className={styles.searchBar}>
                  <span className="material-symbols-outlined">search</span>
                  <input type="text" placeholder="Search products..." className={styles.searchInput} />
                </div>
                <select className={styles.sortSelect} defaultValue="low-high" aria-label="Sort products">
                  <option value="low-high">Sort: Price (Low to High)</option>
                  <option value="high-low">Sort: Price (High to Low)</option>
                  <option value="popularity">Sort: Popularity</option>
                </select>
              </div>
            </div>

            <div className={styles.grid}>
              {products.map((p, i) => (
                <FadeIn key={p.id} delay={0.1 + (i * 0.1)}>
                  <Link href={`/shop/${p.id}`} className={styles.productCard}>
                  <div className={styles.productImg}>
                    <span className="material-symbols-outlined">{
                      p.cat === "Respiratory" ? "masks" :
                      p.cat === "Diagnostics" ? "biotech" :
                      p.cat === "Protective" ? "shield" :
                      p.cat === "Hospitality" ? "bed" :
                      "back_hand"
                    }</span>
                    {p.badge && (
                      <span className={`${styles.productBadge} ${p.badge === "New" ? styles.badgeNew : p.badge === "Premium" ? styles.badgePremium : ""}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className={styles.productBody}>
                    <span className={styles.productBrand}>{p.brand}</span>
                    <h4 className={styles.productName}>{p.name}</h4>
                    <p className={styles.productDesc}>{p.desc}</p>
                    <div className={styles.productFooter}>
                      <span className={styles.productPrice}>${p.price.toFixed(2)}</span>
                      <span className={styles.productUnit}>/ {p.unit}</span>
                    </div>
                  </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
