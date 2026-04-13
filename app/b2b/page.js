import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./b2b.module.css";

export const metadata = {
  title: "Hospital Orders | MedSupply Precision",
  description: "Streamline your hospital supply chain with verified FDA-grade medical equipment.",
};

const tiers = [
  { name: "Clinic Advantage", desc: "Ideal for private practices and regional clinics seeking reliable weekly restock.", perks: ["10% Discount on Consumables", "Min Order: $2,500"], highlight: false },
  { name: "Regional Hospital", desc: "Comprehensive pricing for multi-department facilities with monthly procurement cycles.", perks: ["18% Tiered Reduction", "Net-30 Invoicing Options", "Min Order: $15,000"], highlight: true },
  { name: "Enterprise Network", desc: "Direct manufacturer-level pricing for national healthcare networks and government entities.", perks: ["Custom Negotiated Rates", "Dedicated Logistic Channels", "Min Order: $100k+"], highlight: false },
];

export default function B2BPage() {
  return (
    <>
      <Navbar />
      <main className={styles.b2bPage}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <span className="label-kicker">Hospital Procurement</span>
            <h1>Hospital Orders (B2B)</h1>
            <p className={styles.heroDesc}>
              Streamline your hospital supply chain with verified FDA-grade
              medical equipment. Benefit from high-volume tiered pricing,
              dedicated account management, and priority regional logistics.
            </p>
            <Link href="#quote-form" className="btn btn-primary btn-lg">
              Initialize Bulk Request
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className={styles.tiersSection}>
          <div className="container">
            <p className={styles.tiersSubhead}>Automated volume discounts for verified medical institutions.</p>
            <div className={styles.tiersGrid}>
              {tiers.map((t) => (
                <div key={t.name} className={`${styles.tierCard} ${t.highlight ? styles.tierHighlight : ""}`}>
                  <h3>{t.name}</h3>
                  <p className={styles.tierDesc}>{t.desc}</p>
                  <ul className={styles.perkList}>
                    {t.perks.map((perk) => (
                      <li key={perk}>
                        <span className="material-symbols-outlined">check_circle</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Link href="#quote-form" className={`btn ${t.highlight ? "btn-primary" : "btn-outline"}`}>
                    Get Quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={`${styles.featSection} section-alt`}>
          <div className="container">
            <div className={styles.featGrid}>
              <div className={styles.featCard}>
                <span className="material-symbols-outlined">verified</span>
                <h4>FDA Certified Supply Chain</h4>
                <p>All products maintain rigorous certification and pass independent quality audits before dispatch.</p>
              </div>
              <div className={styles.featCard}>
                <span className="material-symbols-outlined">schedule</span>
                <h4>Just-In-Time Delivery</h4>
                <p>Minimize on-site storage costs with scheduled delivery windows synchronized to your facility's consumption rates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency */}
        <section className={styles.emergencySection}>
          <div className="container">
            <div className={styles.emergencyCard}>
              <span className="material-symbols-outlined">emergency</span>
              <div>
                <h3>Emergency Supply Portal</h3>
                <p>Urgent shortage? We maintain strategic reserves for verified institutional partners with 24-hour nationwide shipping.</p>
              </div>
              <Link href="/emergency" className="btn btn-primary">Access Emergency Portal</Link>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote-form" className={styles.quoteSection}>
          <div className="container">
            <div className={styles.quoteCard}>
              <h2>Request a Custom Quote</h2>
              <p>Our institutional team responds within 4 business hours with custom pricing sheets and shipping timelines.</p>
              <form className={styles.quoteForm}>
                <div className={styles.formRow}>
                  <div>
                    <label className="input-label">Facility Name</label>
                    <input className="input-field" placeholder="Hospital / Clinic name" />
                  </div>
                  <div>
                    <label className="input-label">Contact Email</label>
                    <input className="input-field" placeholder="procurement@hospital.org" />
                  </div>
                </div>
                <div>
                  <label className="input-label">Supply Requirements</label>
                  <textarea className={`input-field ${styles.textarea}`} rows={4} placeholder="Describe your supply needs, volumes, and delivery schedule..." />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  Submit Request
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
