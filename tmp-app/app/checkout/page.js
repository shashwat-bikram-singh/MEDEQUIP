import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export const metadata = { title: "Checkout | MedSupply Precision" };

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh", backgroundColor: "var(--bg-main)" }}>
        <FadeIn>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "var(--text-main)" }}>Secure Checkout</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem" }}>
              <div>
                <div className="panel" style={{ padding: "2rem", marginBottom: "2rem", backgroundColor: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <h3 style={{ marginBottom: "1.5rem" }}>1. Shipping Address</h3>
                  <div style={{ display: "grid", gap: "1rem" }}>
                    <input type="text" placeholder="Full Name" className="form-control" style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)", width: "100%" }} />
                    <input type="text" placeholder="Street Address" className="form-control" style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)", width: "100%" }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <input type="text" placeholder="City" className="form-control" style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)" }} />
                      <input type="text" placeholder="Zip Code" className="form-control" style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)" }} />
                    </div>
                  </div>
                </div>
                <div className="panel" style={{ padding: "2rem", backgroundColor: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <h3 style={{ marginBottom: "1.5rem" }}>2. Payment Method</h3>
                  <div style={{ display: "grid", gap: "1rem" }}>
                    <input type="text" placeholder="Card Number" className="form-control" style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)", width: "100%" }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <input type="text" placeholder="MM/YY" className="form-control" style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)" }} />
                      <input type="text" placeholder="CVC" className="form-control" style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border)" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="panel" style={{ padding: "2rem", backgroundColor: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", position: "sticky", top: "120px" }}>
                  <h3 style={{ marginBottom: "1.5rem" }}>Order Summary</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", color: "var(--text-muted)" }}>
                    <span>Subtotal</span><span>$420.00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", color: "var(--text-muted)" }}>
                    <span>Shipping</span><span>$15.00</span>
                  </div>
                  <hr style={{ borderTop: "1px solid var(--border)", margin: "1rem 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", color: "var(--text-main)", fontWeight: "bold", fontSize: "1.2rem" }}>
                    <span>Total</span><span>$435.00</span>
                  </div>
                  <Link href="/orders" className="btn btn-primary" style={{ width: "100%", textAlign: "center", display: "block", padding: "1rem", borderRadius: "8px" }}>Place Order</Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
