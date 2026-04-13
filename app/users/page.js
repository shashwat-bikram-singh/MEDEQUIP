import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "User Management | MedSupply Precision",
};

export default function UsersPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "160px 2rem 80px", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", backgroundColor: "var(--bg-main)" }}>
        <FadeIn>
          <span className="material-symbols-outlined" style={{ fontSize: "4rem", color: "var(--primary)", marginBottom: "1rem", opacity: 0.8 }}>group_add</span>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>User Access Control</h1>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
            The hospital and clinical staff user management portal is currently under active deployment.
          </p>
          <Link href="/admin" className="btn btn-primary">Return to Admin Portal</Link>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
