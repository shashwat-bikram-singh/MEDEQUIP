import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import products from "@/data/products.json";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* ============ HERO ============ */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <FadeIn className={styles.heroContent} delay={0.1}>
              <span className={styles.kicker}>
                <span className="material-symbols-outlined">verified</span>
                FDA &amp; ISO 13485 Certified
              </span>
              <h1 className={styles.heroTitle}>
                Precision-Engineered
                <br />
                <span className={styles.heroGrad}>Medical Supplies</span>
              </h1>
              <p className={styles.heroDesc}>
                Providing hospitals and private practices with certified medical
                equipment, diagnostic tools, and surgical supplies with
                millisecond accuracy in fulfillment.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/shop" className="btn btn-primary btn-lg">
                  Browse Catalog
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href="/b2b" className="btn btn-outline btn-lg">
                  Hospital Orders
                </Link>
              </div>
            </FadeIn>
            <FadeIn className={styles.heroVisual} direction="left" delay={0.2}>
              <div className={styles.heroCard}>
                <div className={styles.heroCardIcon}>
                  <span className="material-symbols-outlined">ecg_heart</span>
                </div>
                <div>
                  <h4>12,000+</h4>
                  <p>Medical Facilities Supplied</p>
                </div>
              </div>
              <div className={styles.heroFloatA}>
                <span className="material-symbols-outlined">local_shipping</span>
                <span>Priority Shipping</span>
              </div>
              <div className={styles.heroFloatB}>
                <span className="material-symbols-outlined">shield</span>
                <span>Hospital Grade</span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ============ TRUST BAR ============ */}
        <section className={styles.trustBar}>
          <FadeIn className={styles.trustInner} delay={0.3}>
            {[
              { icon: "verified", title: "FDA Certified", desc: "Full compliance guaranteed" },
              { icon: "local_shipping", title: "Fast Delivery", desc: "Priority hospital routing" },
              { icon: "medical_services", title: "Hospital Grade", desc: "Clinical testing approved" },
              { icon: "support_agent", title: "24/7 Support", desc: "Dedicated account managers" },
            ].map((item) => (
              <div key={item.title} className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h5 className={styles.trustTitle}>{item.title}</h5>
                  <p className={styles.trustDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </section>

        {/* ============ CATEGORIES ============ */}
        <section className={styles.categories}>
          <div className="container">
            <FadeIn className={styles.sectionHeader}>
              <span className="label-kicker">Product Categories</span>
              <h2>Specialized equipment for every department.</h2>
              <Link href="/shop" className={styles.browseAll}>
                Browse all categories
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </FadeIn>
            <FadeIn className={styles.catGrid} delay={0.1}>
              {[
                { icon: "back_hand", title: "Gloves", desc: "Latex, Nitrile & Vinyl", color: "#e3f2fd" },
                { icon: "biotech", title: "Diagnostic Tools", desc: "Precision imaging and monitoring", color: "#e8f5e9" },
                { icon: "masks", title: "Respiratory & Masks", desc: "N95, Surgical & Face Shields", color: "#fff3e0" },
                { icon: "precision_manufacturing", title: "Heavy Equipment", desc: "Surgical tables and ventilators", color: "#fce4ec" },
              ].map((cat) => (
                <CategoryCard key={cat.title} cat={cat} />
              ))}
            </FadeIn>
          </div>
        </section>

        <section style={{ padding: "4rem 0" }}>
          <div className="container">
            <FadeIn>
              <span className="label-kicker">Featured Products</span>
              <h2 style={{ margin: "0.5rem 0 1.5rem" }}>Most purchased products this week.</h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem" }}>
              {products.slice(0, 3).map((item) => (
                <FadeIn key={item.id}>
                  <ProductCard p={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "1rem 0 4rem" }}>
          <div className="container">
            <FadeIn>
              <span className="label-kicker">Offers & Discounts</span>
              <h2 style={{ margin: "0.5rem 0 1.5rem" }}>Save more with bulk and seasonal deals.</h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem" }}>
              {[
                { title: "Bulk Masks Offer", detail: "Buy 10 boxes, get 1 free." },
                { title: "Diagnostic Bundle", detail: "Save 15% on selected kits." },
                { title: "Free Delivery", detail: "Orders above $500 ship free." },
              ].map((offer) => (
                <div key={offer.title} className="card-elevated">
                  <h4 style={{ marginBottom: "0.5rem" }}>{offer.title}</h4>
                  <p>{offer.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section className={`${styles.features} section-alt`}>
          <div className="container">
            <FadeIn className={styles.sectionHeader}>
              <span className="label-kicker">Why Choose MedSupply</span>
              <h2>Built for institutional scale.</h2>
            </FadeIn>
            <FadeIn className={styles.featGrid} delay={0.1}>
              <div className={styles.featCard}>
                <div className={styles.featIcon}>
                  <span className="material-symbols-outlined">autorenew</span>
                </div>
                <h4>Automated Re-ordering</h4>
                <p>
                  Intelligent inventory monitoring that predicts shortages
                  before they happen.
                </p>
              </div>
              <div className={styles.featCard}>
                <div className={styles.featIcon}>
                  <span className="material-symbols-outlined">fact_check</span>
                </div>
                <h4>Compliance Tracking</h4>
                <p>
                  Instant access to FDA certification and safety data sheets
                  for all inventory.
                </p>
              </div>
              <div className={styles.featCard}>
                <div className={styles.featIcon}>
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h4>Dedicated Account Teams</h4>
                <p>
                  Specialized consultants who understand the specific needs of
                  large-scale medical systems.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ============ STATS BANNER ============ */}
        <section className={styles.statsBanner}>
          <div className="container">
            <FadeIn className={styles.statsInner} delay={0.2} direction="none">
              <div className={styles.statItem}>
                <h2 className={styles.statNum}>12,000+</h2>
                <p>Medical Facilities</p>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <h2 className={styles.statNum}>482</h2>
                <p>FDA Certified Products</p>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <h2 className={styles.statNum}>99.8%</h2>
                <p>On-Time Delivery</p>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <h2 className={styles.statNum}>24/7</h2>
                <p>Support Available</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2>Ready to optimize your supply chain?</h2>
              <p>
                Join over 12,000 medical facilities who trust MedSupply
                Precision for their procurement needs.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/login" className="btn btn-primary btn-lg">
                  Get Started
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href="/support" className="btn btn-outline btn-lg">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
