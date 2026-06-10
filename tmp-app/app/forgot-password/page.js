"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import styles from "../login/login.module.css";
import Loader from "@/components/Loader";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please provide your email address.");
      return;
    }

    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      toast.success("Verification link sent to your email!");
      router.push("/login");
    }, 1500);
  };

  return (
    <main className={styles.loginPage}>
      {loading && <Loader text="Sending recovery email..." />}
      
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
            <h1>Secure Account Recovery.</h1>
            <p>
              For the protection of sensitive medical data, password resets require email verification and administrative approval.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h2>Reset Password</h2>
          <p className={styles.formSubtitle}>
            Enter your email to receive recovery instructions.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className="input-label" htmlFor="reset-email">Email Address</label>
              <input 
                type="email" 
                id="reset-email" 
                className="input-field" 
                placeholder="you@hospital.org" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "1rem" }} disabled={loading}>
              Reset Password
              <span className="material-symbols-outlined">lock_reset</span>
            </button>
          </form>

          <p className={styles.signupPrompt}>
            Remembered your password?{" "}
            <Link href="/login" className={styles.signupLink}>Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
