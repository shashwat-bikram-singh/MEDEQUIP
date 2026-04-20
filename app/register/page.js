"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import styles from "../login/login.module.css";
import Loader from "@/components/Loader";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", facility: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.facility) {
      toast.error("Please fill out all fields");
      return;
    }

    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      toast.success("Account request submitted successfully!");
      router.push("/login");
    }, 1500);
  };

  return (
    <main className={styles.loginPage}>
      {loading && <Loader text="Submitting facility details..." />}
      
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
            <h1>Join our procurement network.</h1>
            <p>
              Gain access to direct wholesale pricing, automated re-ordering, 
              and priority hospital routing for your medical facility.
            </p>
          </div>

          <div className={styles.trustCard}>
            <div className={styles.trustBadge}>
              <span className="material-symbols-outlined">shield</span>
              Institutional Grade Access
            </div>
            <p className={styles.trustLabel}>Subject to rigorous verification processes</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h2>Institutional Registration</h2>
          <p className={styles.formSubtitle}>
            Request access for your medical facility.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className="input-label" htmlFor="reg-name">Full Name</label>
              <input 
                type="text" 
                id="reg-name" 
                className="input-field" 
                placeholder="Dr. John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className="input-label" htmlFor="reg-facility">Facility Name</label>
              <input 
                type="text" 
                id="reg-facility" 
                className="input-field" 
                placeholder="Central Hospital Network" 
                value={formData.facility}
                onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className="input-label" htmlFor="reg-email">Work Email</label>
              <input 
                type="email" 
                id="reg-email" 
                className="input-field" 
                placeholder="you@hospital.org" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className="input-label" htmlFor="reg-password">Password</label>
              <input 
                type="password" 
                id="reg-password" 
                className="input-field" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "1rem" }} disabled={loading}>
              Submit Request
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <p className={styles.signupPrompt}>
            Already have an account?{" "}
            <Link href="/login" className={styles.signupLink}>Sign In here</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
