import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./dashboard.module.css";

export const metadata = {
  title: "Customer Dashboard | MedSupply Precision",
  description: "Manage your orders, track shipments, and view recommendations.",
};

const recentActivity = [
  { icon: "receipt_long", title: "Invoice Paid", desc: "Order #MSP-99100 • $1,240.00", time: "2 hours ago", color: "#dcfce7" },
  { icon: "verified", title: "License Verified", desc: "DEA License successfully updated", time: "Yesterday", color: "#e3f2fd" },
  { icon: "warning", title: "Low Stock Alert", desc: "Nitrile Gloves (Large) below threshold", time: "2 days ago", color: "#fef3c7" },
];

const recommended = [
  { cat: "Disposable Gear", name: "Premium Nitrile Gloves", price: "$124.50 / case of 10", icon: "back_hand" },
  { cat: "Respiratory", name: "Level 3 Surgical Masks", price: "$89.00 / box of 50", icon: "masks" },
  { cat: "Hospitality", name: "Antibacterial Linens Set", price: "$312.00 / unit", icon: "bed" },
  { cat: "Diagnostics", name: "Precision Thermometer Kit", price: "$245.00 / professional kit", icon: "biotech" },
];

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className={styles.dashPage}>
        <div className={styles.container}>
          <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sideHeader}>
                <span className={styles.sideAvatar}>
                  <span className="material-symbols-outlined">person</span>
                </span>
                <div>
                  <h5>Medical Admin</h5>
                  <p>Hospital Portal</p>
                </div>
              </div>
              <nav className={styles.sideNav}>
                {[
                  { icon: "dashboard", label: "Dashboard", href: "/dashboard", active: true },
                  { icon: "inventory_2", label: "Products", href: "/shop", active: false },
                  { icon: "shopping_bag", label: "Orders", href: "/orders", active: false },
                  { icon: "analytics", label: "Analytics", href: "/analytics", active: false },
                  { icon: "settings", label: "Settings", href: "/settings", active: false },
                  { icon: "help", label: "Help", href: "/support", active: false },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className={`${styles.sideLink} ${item.active ? styles.sideLinkActive : ""}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main */}
            <section className={styles.main}>
              <div className={styles.welcomeBar}>
                <div>
                  <h2>Welcome back, Dr. Martinez</h2>
                  <p>Managing facility procurement and logistics for the Northeast Surgical Wing.</p>
                </div>
              </div>

              {/* Tracking + Activity Row */}
              <div className={styles.topRow}>
                <div className={styles.trackCard}>
                  <h4>
                    <span className="material-symbols-outlined">local_shipping</span>
                    Track My Package
                  </h4>
                  <p className={styles.orderNum}>Order #MSP-99281-XC</p>
                  <div className={styles.trackProgress}>
                    <div className={styles.trackDot} />
                    <div className={styles.trackLine} />
                    <div className={styles.trackDot} />
                    <div className={styles.trackLine} />
                    <div className={`${styles.trackDot} ${styles.trackDotActive}`} />
                    <div className={`${styles.trackLine} ${styles.trackLineInactive}`} />
                    <div className={`${styles.trackDot} ${styles.trackDotInactive}`} />
                  </div>
                  <div className={styles.trackLabels}>
                    <span>Confirmed</span>
                    <span>Processing</span>
                    <span>In Transit</span>
                    <span>Delivered</span>
                  </div>
                  <div className={styles.milestone}>
                    <span className={styles.milestoneLabel}>Latest Milestone</span>
                    <p>Departed Regional Distribution Center - Newark, NJ</p>
                  </div>
                </div>

                <div className={styles.activityCard}>
                  <h4>Recent Activity</h4>
                  <div className={styles.activityList}>
                    {recentActivity.map((a) => (
                      <div key={a.title} className={styles.activityItem}>
                        <div className={styles.activityIcon} style={{ background: a.color }}>
                          <span className="material-symbols-outlined">{a.icon}</span>
                        </div>
                        <div className={styles.activityInfo}>
                          <h5>{a.title}</h5>
                          <p>{a.desc}</p>
                        </div>
                        <span className={styles.activityTime}>{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assistance */}
              <div className={styles.assistCard}>
                <div className={styles.assistIcon}>
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h4>Need Assistance?</h4>
                  <p>Dedicated representative available for clinical equipment consultation.</p>
                </div>
                <Link href="/support" className="btn btn-outline btn-sm">Contact Support</Link>
              </div>

              {/* Recommendations */}
              <section className={styles.recoSection}>
                <div className={styles.recoHeader}>
                  <div>
                    <h3>Recommended for Your Facility</h3>
                    <p>Based on surgical supply consumption patterns in the Northeast Wing.</p>
                  </div>
                  <Link href="/shop" className={styles.shopAll}>
                    Shop All <span className="material-symbols-outlined">chevron_right</span>
                  </Link>
                </div>
                <div className={styles.recoGrid}>
                  {recommended.map((r) => (
                    <Link href={`/shop/nitrile-gloves`} key={r.name} className={styles.recoCard}>
                      <div className={styles.recoImg}>
                        <span className="material-symbols-outlined">{r.icon}</span>
                      </div>
                      <span className={styles.recoCat}>{r.cat}</span>
                      <h5>{r.name}</h5>
                      <span className={styles.recoPrice}>{r.price}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
