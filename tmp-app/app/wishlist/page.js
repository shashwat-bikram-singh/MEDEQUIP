import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import products from "@/data/products.json";

export default function WishlistPage() {
  const wishlistItems = products.slice(2, 6);

  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh" }}>
        <div className="container">
          <h1 style={{ marginBottom: "0.5rem" }}>Wishlist</h1>
          <p style={{ marginBottom: "1.5rem" }}>Saved products you may want to purchase later.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
            {wishlistItems.map((product) => (
              <div key={product.id} className="card-elevated">
                <h4 style={{ marginBottom: "0.5rem" }}>{product.name}</h4>
                <p style={{ marginBottom: "0.75rem" }}>{product.cat}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>${product.price.toFixed(2)}</strong>
                  <Link href={`/shop/${product.id}`} className="btn btn-outline btn-sm">View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
