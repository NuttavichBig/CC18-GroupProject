import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";


export default function UserDetailAdmin() {
  const [users, setUsers] = useState([]);
  console.log("users", users);
  const [loading, setLoading] = useState(true);
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  // Fetch users when the component mounts
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

  // Handle user role or status update
  const handleUpdate = async (userId, updatedData) => {
    try {
      await axios.patch(`${API}/admin/user/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle user deletion with confirmation
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
    <div className="w-full text-[#ffffff] ">
      <div>
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          USER INFORMATION
        </p>
        <table className="text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              {/* Column Headers */}
              <th>ID</th>
              <th>FIRSTNAME</th>
              <th>LASTNAME</th>
              <th>PHONE</th>
              <th>EMAIL</th>
              <th>DATE OF BIRTH</th>
              <th>GENDER</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-[#AF8F6F]">
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.birthdate}</td>
                <td>{user.gender}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdate(user.id, { role: e.target.value })}
                    className="bg-[#AF8F6F]"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="PARTNER">PARTNER</option>
                  </select>
                </td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) => handleUpdate(user.id, { status: e.target.value })}
                    className="bg-[#AF8F6F]"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="BANNED">BANNED</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500">
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
