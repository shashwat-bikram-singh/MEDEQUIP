import styles from "./Loader.module.css";

export default function Loader({ text = "Loading secure connection..." }) {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderInner}>
        <div className={styles.spinner}></div>
        {text && <div className={styles.loaderText}>{text}</div>}
      </div>
    </div>
  );
}
