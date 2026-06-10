import Link from "next/link";
import styles from "./ProductCard.module.css";

export default function ProductCard({ p }) {
  const getIcon = (cat) => {
    switch (cat) {
      case "Respiratory": return "masks";
      case "Diagnostics": return "biotech";
      case "Protective": return "shield";
      case "Hospitality": return "bed";
      default: return "back_hand";
    }
  };

  return (
    <Link href={`/shop/${p.id}`} className={styles.productCard}>
      <div className={styles.productImg}>
        <span className="material-symbols-outlined">{getIcon(p.cat)}</span>
        {p.badge && (
          <span className={`${styles.productBadge} ${p.badge === "New" ? styles.badgeNew : p.badge === "Premium" ? styles.badgePremium : ""}`}>
            {p.badge}
          </span>
        )}
      </div>
      <div className={styles.productBody}>
        {p.brand && <span className={styles.productBrand}>{p.brand}</span>}
        <h4 className={styles.productName}>{p.name}</h4>
        <p className={styles.productDesc}>{p.desc}</p>
        <div className={styles.productFooter}>
          <span className={styles.productPrice}>${p.price.toFixed(2)}</span>
          {p.unit && <span className={styles.productUnit}>/ {p.unit}</span>}
        </div>
      </div>
    </Link>
  );
}
