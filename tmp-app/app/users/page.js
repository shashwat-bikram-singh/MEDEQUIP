"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Loader from "@/components/Loader";

const MOCK_USERS = [
  { id: "USR-001", name: "Dr. Sarah Jennings", role: "Chief Medical Officer", facility: "St. Jude Medical Center", status: "Active" },
  { id: "USR-002", name: "Robert Chen", role: "Procurement Manager", facility: "Mercy General Hospital", status: "Active" },
  { id: "USR-003", name: "Elena Rodriguez", role: "Head Nurse", facility: "Valley Community Clinic", status: "Pending" },
  { id: "USR-004", name: "Dr. James Wilson", role: "Surgeon", facility: "National Orthopedic", status: "Inactive" },
  { id: "USR-005", name: "Anita Boyle", role: "Supply Coordinator", facility: "St. Jude Medical Center", status: "Active" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    setLoading(true);
    setTimeout(() => {
      setUsers(users.filter(u => u.id !== id));
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: "120px 2rem 80px", minHeight: "70vh", backgroundColor: "var(--bg-main)" }}>
        {loading && <Loader text="Updating user records..." />}
        <FadeIn>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "2.5rem", color: "var(--text-main)" }}>User Management</h1>
              <button className="btn btn-primary" onClick={() => alert("Add User modal to be implemented")}>
                <span className="material-symbols-outlined">person_add</span>
                Add New User
              </button>
            </div>
            
            <div className="card-elevated" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>Registered Staff & Admins</h3>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--outline)" }}>search</span>
                  <input type="text" className="input-field" placeholder="Search users..." style={{ paddingLeft: "2.5rem", width: "300px", padding: "0.5rem 0.5rem 0.5rem 2.5rem" }} />
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Facility</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td style={{ fontWeight: 500, color: "var(--primary)" }}>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.facility}</td>
                        <td>
                          <span className={`badge ${user.status === 'Active' ? 'badge-success' : user.status === 'Pending' ? 'badge-warning' : 'badge-secondary'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td style={{ textAlign: "right", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                          <button className="btn-icon" style={{ color: "var(--primary)" }} title="Edit">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button 
                            className="btn-icon" 
                            style={{ color: "var(--error)" }} 
                            title="Delete"
                            onClick={() => handleDelete(user.id)}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "3rem" }}>
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
