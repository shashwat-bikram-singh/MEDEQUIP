import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./admin.module.css";

export const metadata = {
  title: "MedSupply Precision - Medical Admin Portal",
  description: "Administrative dashboard for managing medical supply operations.",
};

const inventory = [
  { name: "Level 3 Surgical Masks", variant: "Sterile Box of 50", stock: 2450, status: "In Stock" },
  { name: "Nitrile Gloves (Medium)", variant: "Bulk Case 1000ct", stock: 890, status: "Low Stock" },
  { name: "Digital ICU Monitor", variant: "Unit V-10 Pro", stock: 24, status: "In Stock" },
];

const orders = [
  { id: "#12890", facility: "St. Jude Medical Center", amount: "$14,200.00", status: "Processing" },
  { id: "#12889", facility: "General City Hospital", amount: "$8,750.00", status: "Shipped" },
  { id: "#12888", facility: "Pediatric Specialty Clinic", amount: "$3,100.00", status: "Delivered" },
];

const users = [
  { name: "Sarah Jennings", email: "s.jennings@medsupply.com", role: "Admin" },
  { name: "Markus Thon", email: "m.thon@medsupply.com", role: "Manager" },
];

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className={styles.adminPage}>
        <div className={styles.container}>
          <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sideHeader}>
                <span className={styles.sideIcon}><span className="material-symbols-outlined">admin_panel_settings</span></span>
                <span>Hospital Portal</span>
              </div>
              <nav className={styles.sideNav}>
                {[
                  { icon: "analytics", label: "Analytics", href: "/admin", active: true },
                  { icon: "inventory_2", label: "Products", href: "/shop" },
                  { icon: "shopping_bag", label: "Orders", href: "/orders" },
                  { icon: "group", label: "Users", href: "/users" },
                  { icon: "settings", label: "Settings", href: "/settings" },
                  { icon: "help", label: "Help", href: "/support" },
                ].map((item) => (
                  <Link key={item.label} href={item.href || "#"} className={`${styles.sideLink} ${item.active ? styles.sideLinkActive : ""}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>{item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main */}
            <section className={styles.main}>
              <p className={styles.subtitle}>Institutional performance overview for Q4 2024.</p>

              {/* Stats */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Total Revenue</span>
                  <h2 className={styles.statValue}>$1,248,300</h2>
                  <span className={styles.statChange}>+12.3% from Q3</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Active Medical Facilities</span>
                  <h2 className={styles.statValue}>342</h2>
                  <span className={styles.statChange}>84% Procurement Rate</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Pending Deliveries</span>
                  <h2 className={styles.statValue}>1,894</h2>
                  <span className={`${styles.statChange} ${styles.statHigh}`}>Priority Status: High</span>
                </div>
              </div>

              {/* Inventory + Orders */}
              <div className={styles.midRow}>
                <div className={styles.panel}>
                  <h4>Inventory Management</h4>
                  <table className="data-table">
                    <thead><tr><th>Product</th><th>Stock</th><th>Status</th></tr></thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.name}>
                          <td><strong>{item.name}</strong><br /><small style={{ color: "var(--outline)" }}>{item.variant}</small></td>
                          <td>{item.stock.toLocaleString()}</td>
                          <td><span className={`badge ${item.status === "Low Stock" ? "badge-warning" : "badge-success"}`}>{item.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={styles.panel}>
                  <h4>Recent Orders</h4>
                  <table className="data-table">
                    <thead><tr><th>Order</th><th>Facility</th><th>Status</th></tr></thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id}>
                          <td><strong>{o.id}</strong><br /><small style={{ color: "var(--outline)" }}>{o.amount}</small></td>
                          <td>{o.facility}</td>
                          <td><span className={`badge ${o.status === "Shipped" ? "badge-primary" : o.status === "Delivered" ? "badge-success" : "badge-secondary"}`}>{o.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* User Access */}
              <div className={styles.panel}>
                <h4>User Access Control</h4>
                <div className={styles.userList}>
                  {users.map((u) => (
                    <div key={u.email} className={styles.userRow}>
                      <div className={styles.userAvatar}><span className="material-symbols-outlined">person</span></div>
                      <div className={styles.userInfo}>
                        <h5>{u.name}</h5>
                        <p>{u.email}</p>
                      </div>
                      <span className="badge badge-primary">{u.role}</span>
                      <button className="btn btn-outline btn-sm">Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
