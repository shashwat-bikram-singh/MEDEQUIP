import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Returns & Claims | MedSupply Precision",
};

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "160px 2rem 80px", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", backgroundColor: "var(--bg-main)" }}>
        <FadeIn>
          <span className="material-symbols-outlined" style={{ fontSize: "4rem", color: "var(--primary)", marginBottom: "1rem", opacity: 0.8 }}>replay</span>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>Returns & RMA Portal</h1>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
            The process for issuing new diagnostic device RMAs and medical equipment returns is actively being tested.
          </p>
          <Link href="/support" className="btn btn-primary">Back to Support</Link>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
