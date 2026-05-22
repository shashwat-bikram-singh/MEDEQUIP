import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const orders = [
  { id: "MSP-20911", customer: "St. Jude Medical Center", total: "$1,240.00", status: "Pending" },
  { id: "MSP-20874", customer: "City Hospital", total: "$890.00", status: "Delivered" },
  { id: "MSP-20822", customer: "Northside Clinic", total: "$14,200.00", status: "Pending" },
];

export default function AdminOrdersPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh" }}>
        <div className="container">
          <h1 style={{ marginBottom: "1rem" }}>Manage Orders</h1>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`badge ${order.status === "Delivered" ? "badge-success" : "badge-warning"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select defaultValue={order.status} style={{ border: "1px solid var(--outline-variant)", borderRadius: "var(--radius-md)", padding: "0.35rem 0.5rem" }}>
                      <option>Pending</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
