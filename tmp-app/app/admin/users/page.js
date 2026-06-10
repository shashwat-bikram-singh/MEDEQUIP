import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const users = [
  { name: "Dr. Sarah Jennings", email: "s.jennings@medsupply.com", role: "Admin" },
  { name: "Markus Thon", email: "m.thon@medsupply.com", role: "Manager" },
  { name: "Aisha Khan", email: "a.khan@medsupply.com", role: "Support" },
];

export default function AdminUsersPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh" }}>
        <div className="container">
          <h1 style={{ marginBottom: "1rem" }}>Manage Users</h1>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
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
