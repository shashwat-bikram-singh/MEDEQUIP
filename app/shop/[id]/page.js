import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import products from "@/data/products.json";
import AddToCartCard from "@/components/AddToCartCard";
import styles from "./product.module.css";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = products.find(p => p.id === id) || products[0];

  return (
    <>
      <Navbar />
      <main className={styles.productPage}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/shop">Catalog</Link>
            <span className="material-symbols-outlined">chevron_right</span>
            <Link href="/shop">Gloves</Link>
            <span className="material-symbols-outlined">chevron_right</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </nav>

          {/* Technical Spread Layout */}
          <div className={styles.spread}>
            {/* Left: Image */}
            <div className={styles.imgSection}>
              <div className={styles.imgMain}>
                <span className="material-symbols-outlined">back_hand</span>
              </div>
              <div className={styles.imgThumbs}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.thumb}>
                    <span className="material-symbols-outlined">back_hand</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Specs Card */}
            <div className={styles.specsCard}>
              <span className={styles.brand}>{product.brand}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.sku}>SKU: {product.sku}</p>
              <p className={styles.desc}>{product.desc}</p>

              <div className={styles.badges}>
                {product.badges.map((b) => (
                  <span key={b} className={styles.badge}>
                    <span className="material-symbols-outlined">
                      {b === "FDA Certified" ? "verified" : b === "Express Ship" ? "local_shipping" : "replay"}
                    </span>
                    {b}
                  </span>
                ))}
              </div>

              <div className={styles.priceRow}>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
                <span className={styles.unit}>/ {product.unit}</span>
              </div>

              <AddToCartCard product={product} />

              <p className={styles.reviewCount}>
                <span className="material-symbols-outlined" style={{ color: "var(--secondary-container)", fontSize: "1.125rem" }}>star</span>
                Based on 128 verified institutional purchases
              </p>
            </div>
          </div>

          {/* Use Cases */}
          <section className={styles.useCases}>
            <h3>Application Environments</h3>
            <div className={styles.useGrid}>
              {product.useCases.map((uc) => (
                <div key={uc.title} className={styles.useCard}>
                  <h4>{uc.title}</h4>
                  <p>{uc.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className={styles.reviews}>
            <h3>Institutional Reviews</h3>
            <div className={styles.reviewGrid}>
              {product.reviews.map((r) => (
                <div key={r.name} className={styles.reviewCard}>
                  <div className={styles.reviewQuote}>&ldquo;</div>
                  <p className={styles.reviewText}>{r.text}</p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAvatar}>
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <h5>{r.name}</h5>
                      <p>{r.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
