"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Modal from "@/components/Modal";
import { useState } from "react";


export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh", backgroundColor: "var(--bg-main)" }}>
        <FadeIn>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "var(--text-main)" }}>My Profile</h1>
            <div style={{ backgroundColor: "var(--bg-surface)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "rgba(0,112,243,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "3rem" }}>person</span>
                </div>
                <div>
                  <h2 style={{ fontSize: "1.8rem", color: "var(--text-main)" }}>Dr. Sarah Jennings</h2>
                  <p style={{ color: "var(--text-muted)" }}>Chief Medical Officer</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Email Address</label>
                  <div style={{ padding: "0.8rem", backgroundColor: "var(--bg-main)", borderRadius: "8px", border: "1px solid var(--border)" }}>s.jennings@medsupply.com</div>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Phone Number</label>
                  <div style={{ padding: "0.8rem", backgroundColor: "var(--bg-main)", borderRadius: "8px", border: "1px solid var(--border)" }}>+1 (555) 123-4567</div>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Hospital / Facility</label>
                  <div style={{ padding: "0.8rem", backgroundColor: "var(--bg-main)", borderRadius: "8px", border: "1px solid var(--border)" }}>St. Jude Medical Center</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Edit Profile</button>
                <button className="btn btn-outline" style={{ backgroundColor: "transparent", border: "1px solid var(--border)", color: "var(--text-main)", padding: "0.8rem 1.5rem", borderRadius: "8px", cursor: "pointer" }}>Change Password</button>
              </div>
            </div>
          </div>
        </FadeIn>
        
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profile Details">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="input-label">Full Name</label>
              <input type="text" className="input-field" defaultValue="Dr. Sarah Jennings" />
            </div>
            <div>
              <label className="input-label">Email Address</label>
              <input type="email" className="input-field" defaultValue="s.jennings@medsupply.com" />
            </div>
            <div>
              <label className="input-label">Phone Number</label>
              <input type="tel" className="input-field" defaultValue="+1 (555) 123-4567" />
            </div>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </Modal>

      </main>
      <Footer />
    </>
  );
}
