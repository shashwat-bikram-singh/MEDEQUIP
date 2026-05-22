import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "120px 2rem 80px", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "640px" }}>
          <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>404</h1>
          <h3 style={{ marginBottom: "0.75rem" }}>Page Not Found</h3>
          <p style={{ marginBottom: "1.5rem" }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="btn btn-primary">Go to Home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
