import React, { useEffect, useState } from "react";
import api from "../../api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const { data } = await api.get("/admin/users");
    setUsers(data);
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
      <h2>Users</h2>
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
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isActive ? "Active" : "Blocked"}</td>
              <td>
                <button className="btn-link" onClick={() => toggle(u._id)}>
                  {u.isActive ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
