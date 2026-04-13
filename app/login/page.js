"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success(`Welcome back!`);
        router.push(data.redirect);
        router.refresh(); // clear cached layouts to update headers if needed
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className={styles.loginPage}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <span className="material-symbols-outlined">medication</span>
            </span>
            <span className={styles.logoText}>
              MedSupply<strong>Precision</strong>
            </span>
          </Link>

          <div className={styles.heroText}>
            <h1>Excellence in Medical Logistics.</h1>
            <p>
              Precision-engineered supply chain solutions for modern healthcare
              institutions. Trusted by over 500+ clinics and hospitals
              nationwide.
            </p>
          </div>

          <div className={styles.trustCard}>
            <div className={styles.trustBadge}>
              <span className="material-symbols-outlined">verified</span>
              Certified Partner
            </div>
            <p className={styles.trustLabel}>FDA &amp; ISO 13485 Compliant</p>
          </div>

          <div className={styles.testimonial}>
            <p>&ldquo;The integration with our procurement system was seamless. MedSupply is our standard for reliability.&rdquo;</p>
            <span>— St. Jude Medical Group</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h2>Welcome Back</h2>
          <p className={styles.formSubtitle}>
            Access your professional medical dashboard.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className="input-label" htmlFor="login-email">Email Address</label>
              <input 
                type="email" 
                id="login-email" 
                className="input-field" 
                placeholder="you@hospital.org" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className="input-label" htmlFor="login-password">Password</label>
              <input 
                type="password" 
                id="login-password" 
                className="input-field" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.formActions}>
              <Link href="/forgot-password" className={styles.forgotLink}>Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <button className={`btn btn-outline ${styles.socialBtn}`}>
            <span className="material-symbols-outlined">lock</span>
            Continue with SSO
          </button>

          <p className={styles.signupPrompt}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className={styles.signupLink}>Create an account</Link>
          </p>
        </div>

        <footer className={styles.loginFooter}>
          <p>© 2024 MedSupply Precision • FDA Certified</p>
          <div className={styles.footLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/support">Help Center</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
