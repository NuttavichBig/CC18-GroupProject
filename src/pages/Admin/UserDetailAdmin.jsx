import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";

export default function UserDetailAdmin() {
  const [users, setUsers] = useState([]);
  console.log("users", users);
  const [loading, setLoading] = useState(true);
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${API}/admin/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [API, token]);

  const handleUpdate = async (userId, updatedData) => {
    try {
      await axios.patch(`${API}/admin/user/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, ...updatedData } : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API}/admin/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full text-[#543310]">
      <div>
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          USER INFORMATION
        </p>
        <table className="text-center w-full mt-4 border-collapse border-2 border-[#543310]">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-2 border-[#543310] p-2">ID</th>
              <th className="border-2 border-[#543310] p-2">FIRSTNAME</th>
              <th className="border-2 border-[#543310] p-2">LASTNAME</th>
              <th className="border-2 border-[#543310] p-2">PHONE</th>
              <th className="border-2 border-[#543310] p-2">EMAIL</th>
              <th className="border-2 border-[#543310] p-2">DATE OF BIRTH</th>
              <th className="border-2 border-[#543310] p-2">GENDER</th>
              <th className="border-2 border-[#543310] p-2">ROLE</th>
              <th className="border-2 border-[#543310] p-2">STATUS</th>
              <th className="border-2 border-[#543310] p-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-[#F8F4E1] text-[#543310]">
                <td className="border-2 border-[#543310] p-2">{user.id}</td>
                <td className="border-2 border-[#543310] p-2">
                  {user.firstName}
                </td>
                <td className="border-2 border-[#543310] p-2">
                  {user.lastName}
                </td>
                <td className="border-2 border-[#543310] p-2">{user.phone}</td>
                <td className="border-2 border-[#543310] p-2">{user.email}</td>
                <td className="border-2 border-[#543310] p-2">
                  {user.birthdate}
                </td>
                <td className="border-2 border-[#543310] p-2">{user.gender}</td>
                <td className="border-2 border-[#543310] p-2">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleUpdate(user.id, { role: e.target.value })
                    }
                    className="p-1 rounded border border-[#543310] bg-[#F8F4E1] text-[#543310]"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="PARTNER">PARTNER</option>
                  </select>
                </td>
                <td className="border-2 border-[#543310] p-2">
                  <select
                    value={user.status}
                    onChange={(e) =>
                      handleUpdate(user.id, { status: e.target.value })
                    }
                    className="p-1 rounded border border-[#543310] bg-[#F8F4E1] text-[#543310]"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="BANNED">BANNED</option>
                  </select>
                </td>
                <td className="border-2 border-[#543310] p-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="rounded-lg p-1 border-2 border-[#CD1818] bg-[#F8F4E1] text-[#CD1818] shadow-lg hover:bg-[#CD1818] hover:text-white transition-all duration-100 ease-in-out"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
