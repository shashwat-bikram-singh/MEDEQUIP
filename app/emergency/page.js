import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Emergency Supply Portal | MedSupply Precision",
};

export default function EmergencyPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "160px 2rem 80px", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", backgroundColor: "var(--bg-main)" }}>
        <FadeIn>
          <span className="material-symbols-outlined" style={{ fontSize: "4rem", color: "#ef4444", marginBottom: "1rem", opacity: 0.8 }}>crisis_alert</span>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>Emergency Supply Portal</h1>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
            To activate our fast-response strategic reserves during critical shortages, this secure portal requires direct facility authorization. Configuration is ongoing.
          </p>
          <Link href="/b2b" className="btn btn-primary" style={{ backgroundColor: "#ef4444", border: "none", color: "#fff" }}>Return to B2B</Link>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
