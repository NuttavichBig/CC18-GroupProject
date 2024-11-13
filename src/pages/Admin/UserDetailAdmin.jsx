import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'
import LoadingRainbow from "../../Components/Loading/LoadingRainbow";

export default function UserDetailAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;
  const currentUserEmail = useUserStore((state) => state.user?.email);
  // console.log(currentUserEmail) //myself


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

  // Filter users to exclude the current admin
  const filteredUsers = users.filter((user) => user.email !== currentUserEmail);

  // Handle user role or status update
  const handleUpdate = async (userId, updatedData) => {
    try {
      await axios.patch(`${API}/admin/user/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
      );
      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Update User Success</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "green";
          }
          toast.addEventListener("click", Swal.close);
        },
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      console.error("Error updating user:", error);
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "#f44336";
          }
          toast.addEventListener("click", Swal.close);
        },
      });
    }
  };

<<<<<<< HEAD
  // Handle user deletion
=======

  // Handle user deletion with confirmation
>>>>>>> dev
  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(`${API}/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, status: res.data.user.status } : user))
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open modal to confirm deletion
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    console.log(selectedUserId)
    handleDelete(selectedUserId);
    setIsModalOpen(false);
  };

  if (loading) return <LoadingRainbow />;

  return (
    <div className="w-full bg-gray-100 py-6 px-4">
      <div>
        <p className="bg-gradient-to-r from-[#0088d1] to-[#1E4D8C] text-3xl text-white font-bold rounded-lg p-2 text-center shadow-lg">
          USER INFORMATION
        </p>
        <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-gray-600 border-collapse">
            <thead className="bg-[#0088d1] text-white">
              <tr>
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">FIRSTNAME</th>
                <th className="py-3 px-4 border-b">LASTNAME</th>
                <th className="py-3 px-4 border-b">PHONE</th>
                <th className="py-3 px-4 border-b">EMAIL</th>
                <th className="py-3 px-4 border-b">DATE OF BIRTH</th>
                <th className="py-3 px-4 border-b">GENDER</th>
                <th className="py-3 px-4 border-b">ROLE</th>
                <th className="py-3 px-4 border-b">STATUS</th>
                <th className="py-3 px-4 border-b">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{user.id}</td>
                  <td className="py-3 px-4 border-b">{user.firstName}</td>
                  <td className="py-3 px-4 border-b">{user.lastName}</td>
                  <td className="py-3 px-4 border-b">{user.phone}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.birthdate}</td>
                  <td className="py-3 px-4 border-b">{user.gender}</td>
                  <td className="py-3 px-4 border-b">
                    <select
                      value={user.role}
                      onChange={(e) => handleUpdate(user.id, { role: e.target.value })}
                      className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="PARTNER">PARTNER</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <select
                      value={user.status}
                      onChange={(e) => handleUpdate(user.id, { status: e.target.value })}
                      className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="BANNED">BANNED</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => openDeleteModal(user.id)}
                      className="text-white hover:bg-red-800 transition duration-200 bg-red-500 p-2 rounded-md "
                    >
                      Banned
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to Banned this account?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
