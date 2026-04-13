import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./support.module.css";

export const metadata = {
  title: "Support & Help Center | MedSupply Precision",
  description: "Access documentation, order tracking, and technical specifications for medical-grade supplies.",
};

const helpTopics = [
  { icon: "local_shipping", title: "Tracking High-Priority Shipments", desc: "Monitor the real-time status of your critical medical supply orders." },
  { icon: "call_split", title: "Split-Location Deliveries", desc: "Configure multiple delivery destinations within a single purchase order." },
  { icon: "receipt_long", title: "Downloading Invoices (PDF/CSV)", desc: "Access and export your complete invoicing history in multiple formats." },
  { icon: "autorenew", title: "Recurring Order Scheduling", desc: "Set up automated recurring orders based on consumption patterns." },
];

const certs = [
  { icon: "verified", label: "FDA Certified", desc: "Regulated Medical Standards" },
  { icon: "lock", label: "HIPAA Compliant", desc: "Data Privacy Guaranteed" },
  { icon: "workspace_premium", label: "ISO 13485:2016", desc: "Quality Management System" },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className={styles.supportPage}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <span className="label-kicker">Help Center</span>
            <h1>Support & Help Center</h1>
            <p className={styles.heroDesc}>
              Access high-precision documentation, order tracking, and technical
              specifications for medical-grade supplies.
            </p>
            <div className={styles.heroSearch}>
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search help articles, FAQs, and documentation..." className={styles.heroSearchInput} />
            </div>
          </div>
        </section>

        {/* Order Management */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Order Management</h2>
              <p>Real-time logistics tracking, invoicing, and facility-wide procurement settings.</p>
            </div>
            <div className={styles.topicsGrid}>
              {helpTopics.map((t) => (
                <div key={t.title} className={styles.topicCard}>
                  <div className={styles.topicIcon}>
                    <span className="material-symbols-outlined">{t.icon}</span>
                  </div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical + Returns Row */}
        <section className={`${styles.section} section-alt`}>
          <div className="container">
            <div className={styles.twoCol}>
              <div className={styles.infoCard}>
                <h3>Technical Support</h3>
                <p>Equipment calibration guides and medical device troubleshooting.</p>
                <Link href="/docs" className="btn btn-outline">
                  Browse Docs
                  <span className="material-symbols-outlined">chevron_right</span>
                </Link>
              </div>
              <div className={styles.infoCard}>
                <h3>Returns & Claims</h3>
                <p>Hassle-free return labels and damage claims for sensitive instruments.</p>
                <Link href="/returns" className="btn btn-outline">
                  Start a Return
                  <span className="material-symbols-outlined">chevron_right</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.certsGrid}>
              {certs.map((c) => (
                <div key={c.label} className={styles.certCard}>
                  <div className={styles.certIcon}>
                    <span className="material-symbols-outlined">{c.icon}</span>
                  </div>
                  <h4>{c.label}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className={`${styles.section} section-alt`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Get in Touch</h2>
              <p>Our dedicated support team consists of healthcare supply chain experts available to help your hospital or clinic optimize procurement.</p>
            </div>
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <h4>Live Clinical Chat</h4>
                <p className={styles.contactMeta}>Response time: &lt; 2 minutes</p>
                <button className="btn btn-primary">Start Chat</button>
              </div>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <span className="material-symbols-outlined">call</span>
                </div>
                <h4>Direct Facility Line</h4>
                <p className={styles.contactMeta}>Priority for Surgical Departments</p>
                <p className={styles.phone}>1-800-PRECISION</p>
              </div>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <h4>Email Support</h4>
                <p className={styles.contactMeta}>Response within 4 hours</p>
                <p className={styles.phone}>support@medsupply.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
