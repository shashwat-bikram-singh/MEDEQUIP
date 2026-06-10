import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh" }}>
        <div className="container">
          <h1 style={{ marginBottom: "0.75rem" }}>Admin Dashboard</h1>
          <p style={{ marginBottom: "1.5rem" }}>Overview of operations and business performance.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            <div className="card-elevated"><h4>Total Orders</h4><p>3,891</p></div>
            <div className="card-elevated"><h4>Total Revenue</h4><p>$1,248,300</p></div>
            <div className="card-elevated"><h4>Pending Shipments</h4><p>214</p></div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/admin/products" className="btn btn-primary">Manage Products</Link>
            <Link href="/admin/orders" className="btn btn-outline">Manage Orders</Link>
            <Link href="/admin/users" className="btn btn-outline">Manage Users</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
