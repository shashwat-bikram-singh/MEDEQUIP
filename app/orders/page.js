import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Order History | MedSupply Precision",
};

export default function OrdersPage() {
  const orders = [
    { id: "MSP-20911", date: "Apr 10, 2026", total: "$1,240.00", items: 6, status: "Delivered" },
    { id: "MSP-20874", date: "Apr 06, 2026", total: "$890.00", items: 3, status: "Pending" },
    { id: "MSP-20822", date: "Mar 29, 2026", total: "$14,200.00", items: 34, status: "Delivered" },
  ];

  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh", backgroundColor: "var(--background)" }}>
        <FadeIn>
          <div className="container">
            <h1 style={{ marginBottom: "0.75rem" }}>My Orders</h1>
            <p style={{ marginBottom: "1.5rem", maxWidth: "680px" }}>
              Review your complete order history and track every shipment in one place.
            </p>

            <div style={{ background: "var(--surface-container-lowest)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>{order.total}</td>
                      <td>
                        <span className={`badge ${order.status === "Delivered" ? "badge-success" : "badge-warning"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <Link href={`/orders/${order.id}`} className="btn btn-outline btn-sm">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
