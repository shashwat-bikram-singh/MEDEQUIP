import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export const metadata = { title: "Contact Support | MedSupply Precision" };

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh", backgroundColor: "var(--bg-main)" }}>
        <FadeIn>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>Get in Touch</h1>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: "1.6" }}>
                Our procurement specialists and clinical support teams are available 24/7 to assist with critical supply needs.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>call</span>
                  <div>
                    <strong>Emergency Hotline</strong><br/>
                    <span style={{ color: "var(--text-muted)" }}>1-800-MED-SUPP</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>mail</span>
                  <div>
                    <strong>Email Support</strong><br/>
                    <span style={{ color: "var(--text-muted)" }}>support@medsupply-precision.com</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>location_on</span>
                  <div>
                    <strong>Headquarters</strong><br/>
                    <span style={{ color: "var(--text-muted)" }}>4250 Medical Center Blvd, Chicago, IL 60611</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: "var(--bg-surface)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <h3 style={{ marginBottom: "1.5rem" }}>Send a Message</h3>
              <form>
                <div style={{ marginBottom: "1rem" }}>
                  <input type="text" placeholder="Your Name" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-main)", color: "var(--text-main)" }} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <input type="email" placeholder="Email Address" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-main)", color: "var(--text-main)" }} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <textarea placeholder="How can we help?" rows={5} style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-main)", color: "var(--text-main)", resize: "vertical" }}></textarea>
                </div>
                <button type="button" className="btn btn-primary" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px" }}>Send Message</button>
              </form>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
