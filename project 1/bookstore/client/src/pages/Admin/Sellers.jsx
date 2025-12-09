import React, { useEffect, useState } from "react";
import api from "../../api";

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);

  const load = async () => {
    const { data } = await api.get("/admin/sellers");
    setSellers(data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async id => {
    await api.put(`/admin/users/${id}/toggle`);
    load();
  };

  return (
    <div className="page">
      <h2>Sellers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {sellers.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.isActive ? "Active" : "Blocked"}</td>
              <td>
                <button className="btn-link" onClick={() => toggle(s._id)}>
                  {s.isActive ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSellers;
