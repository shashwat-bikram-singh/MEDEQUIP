import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import products from "@/data/products.json";

export default function SearchResultsPage() {
  const results = products.slice(0, 4);

  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh" }}>
        <div className="container">
          <h1 style={{ marginBottom: "0.5rem" }}>Search Results</h1>
          <p style={{ marginBottom: "1.5rem" }}>Showing {results.length} products for "mask".</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
            {results.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`} className="card-elevated">
                <h4 style={{ marginBottom: "0.5rem" }}>{product.name}</h4>
                <p style={{ marginBottom: "0.5rem" }}>{product.desc}</p>
                <strong>${product.price.toFixed(2)}</strong>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
