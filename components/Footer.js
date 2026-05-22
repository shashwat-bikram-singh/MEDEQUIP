import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>
                <span className="material-symbols-outlined">medication</span>
              </span>
              <span className={styles.logoText}>
                MedSupply<strong>Precision</strong>
              </span>
            </div>
            <p className={styles.brandDesc}>
              The leading provider of clinical grade medical supplies and
              equipment for healthcare professionals worldwide.
            </p>
            <div className={styles.certBadges}>
              <span className={styles.certBadge}>
                <span className="material-symbols-outlined">verified</span>
                FDA Certified
              </span>
              <span className={styles.certBadge}>
                <span className="material-symbols-outlined">shield</span>
                ISO 13485
              </span>
            </div>
          </div>

          {/* Catalog */}
          <div className={styles.column}>
            <h6 className={styles.colTitle}>Catalog</h6>
            <Link href="/shop" className={styles.footLink}>Gloves & Barriers</Link>
            <Link href="/shop" className={styles.footLink}>Sterilization</Link>
            <Link href="/shop" className={styles.footLink}>Surgical Tools</Link>
            <Link href="/shop" className={styles.footLink}>Diagnostic Gear</Link>
          </div>

          {/* Support */}
          <div className={styles.column}>
            <h6 className={styles.colTitle}>Support</h6>
            <Link href="/support" className={styles.footLink}>Contact Us</Link>
            <Link href="/support" className={styles.footLink}>FAQs</Link>
            <Link href="/support" className={styles.footLink}>Invoicing</Link>
            <Link href="/support" className={styles.footLink}>Billing</Link>
          </div>

          {/* Newsletter */}
          <div className={styles.column}>
            <h6 className={styles.colTitle}>Stay Updated</h6>
            <p className={styles.newsDesc}>
              Get the latest on supply chain availability.
            </p>
            <div className={styles.newsletter}>
              <input
                type="email"
                placeholder="Your email"
                className={styles.newsInput}
                aria-label="Email for newsletter"
              />
              <button className={styles.newsBtn} aria-label="Subscribe">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 MedSupply Precision. All medical devices are FDA certified.
          </p>
          <div className={styles.legal}>
            <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
            <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
