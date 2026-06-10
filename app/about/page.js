import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export const metadata = { title: "About Us | MedSupply Precision" };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "160px 2rem 80px", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", backgroundColor: "var(--bg-main)" }}>
        <FadeIn>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "4rem", color: "var(--primary)", marginBottom: "1rem" }}>domain</span>
            <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>Our Mission</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", lineHeight: "1.8", marginBottom: "2rem" }}>
              MedSupply Precision was founded with a singular focus: to ensure healthcare facilities have immediate access to world-class medical equipment and consumables. By streamlining procurement workflows, we empower medical professionals to focus on what truly matters—patient care.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "4rem", textAlign: "left" }}>
              <div style={{ padding: "2rem", backgroundColor: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "2rem", marginBottom: "1rem" }}>verified</span>
                <h3>Quality Assurance</h3>
                <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Every product in our catalog adheres to strict FDA and CE regulatory standards.</p>
              </div>
              <div style={{ padding: "2rem", backgroundColor: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "2rem", marginBottom: "1rem" }}>schedule</span>
                <h3>Rapid Delivery</h3>
                <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Strategic stocking locations enable next-day delivery to major medical centers.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
