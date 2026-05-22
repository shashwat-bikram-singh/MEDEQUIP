import Link from "next/link";
import styles from "./CategoryCard.module.css";

export default function CategoryCard({ cat }) {
  return (
    <Link href="/shop" className={styles.catCard}>
      <div
        className={styles.catIcon}
        style={{ background: cat.color }}
      >
        <span className="material-symbols-outlined">{cat.icon}</span>
      </div>
      <h4>{cat.title}</h4>
      <p>{cat.desc}</p>
      <span className={styles.catArrow}>
        <span className="material-symbols-outlined">arrow_forward</span>
      </span>
    </Link>
  );
}
