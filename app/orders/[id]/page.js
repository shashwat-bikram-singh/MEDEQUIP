import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const allOrders = [
  {
    id: "MSP-20911",
    status: "Delivered",
    date: "Apr 10, 2026",
    address: "St. Jude Medical Center, 124 Clinical Ave, Newark, NJ",
    payment: "Corporate Credit Card",
    items: [
      { name: "Nitrile Examination Gloves", qty: 4, price: "$498.00" },
      { name: "Level 3 Surgical Masks", qty: 2, price: "$136.00" },
      { name: "Non-Contact Infrared Thermometer", qty: 1, price: "$245.00" },
    ],
    total: "$879.00",
  },
];

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  const order = allOrders.find((entry) => entry.id === id) || allOrders[0];

  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh" }}>
        <FadeIn>
          <div className="container">
            <Link href="/orders" className="btn btn-outline btn-sm" style={{ marginBottom: "1rem" }}>
              Back to Orders
            </Link>
            <h1 style={{ marginBottom: "0.75rem" }}>Order Details: {order.id}</h1>
            <p style={{ marginBottom: "1.5rem" }}>
              Ordered on {order.date} ·
              <span className={`badge ${order.status === "Delivered" ? "badge-success" : "badge-warning"}`} style={{ marginLeft: "0.5rem" }}>
                {order.status}
              </span>
            </p>

            <div style={{ background: "var(--surface-container-lowest)", borderRadius: "var(--radius-xl)", padding: "1.5rem", marginBottom: "1rem", boxShadow: "var(--shadow-sm)" }}>
              <h4 style={{ marginBottom: "0.75rem" }}>Shipping Address</h4>
              <p>{order.address}</p>
            </div>

            <div style={{ background: "var(--surface-container-lowest)", borderRadius: "var(--radius-xl)", padding: "1.5rem", marginBottom: "1rem", boxShadow: "var(--shadow-sm)" }}>
              <h4 style={{ marginBottom: "0.75rem" }}>Payment Method</h4>
              <p>{order.payment}</p>
            </div>

            <div style={{ background: "var(--surface-container-lowest)", borderRadius: "var(--radius-xl)", padding: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
              <h4 style={{ marginBottom: "1rem" }}>Ordered Items</h4>
              {order.items.map((item) => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid var(--outline-variant)" }}>
                  <span>{item.name} x{item.qty}</span>
                  <strong>{item.price}</strong>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <span>Total</span>
                <strong>{order.total}</strong>
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
