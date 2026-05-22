import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  { name: "N95 High-Efficiency Respirator", category: "Respiratory", price: "$89.00", stock: 520 },
  { name: "Nitrile Examination Gloves", category: "Disposable Gear", price: "$124.50", stock: 980 },
  { name: "Digital ICU Monitor V-10 Pro", category: "Diagnostics", price: "$4,890.00", stock: 24 },
];

export default function AdminProductsPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh" }}>
        <div className="container">
          <h1 style={{ marginBottom: "1rem" }}>Manage Products</h1>
          <div style={{ marginBottom: "1rem" }}>
            <button className="btn btn-primary">Add Product</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="btn btn-outline btn-sm">Edit</button>
                    <button className="btn btn-outline btn-sm">Delete</button>
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
