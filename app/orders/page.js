import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Order History | MedSupply Precision",
};

export default function OrdersPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "160px 2rem 80px", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", backgroundColor: "var(--bg-main)" }}>
        <FadeIn>
          <span className="material-symbols-outlined" style={{ fontSize: "4rem", color: "var(--primary)", marginBottom: "1rem", opacity: 0.8 }}>local_shipping</span>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>Order Logistics</h1>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
            The extended tracking portal for past and present shipments is currently updating its delivery status feeds.
          </p>
          <Link href="/dashboard" className="btn btn-primary">Return to Dashboard</Link>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
