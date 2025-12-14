import React, { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, Trash2 } from "lucide-react";
import { applicationApi } from "../../../utils/api";

function AppliedUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await applicationApi.getAllApplications();
      if (res.success) setUsers(res.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      const res = await applicationApi.deleteApplication(id);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert(res.message || "Failed to delete application");
      }
    } catch (err) {
      alert("Server error. Try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading applied users...</p>
      </div>
    );

  if (users.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No users have applied yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Applied Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow relative"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(user.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              title="Delete Application"
            >
              <Trash2 size={18} />
            </button>

            <div className="flex items-center mb-4">
              <User size={24} className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">
                {user.personalDetails.name}
              </h3>
            </div>

            <div className="flex items-center text-gray-600 mb-2">
              <Mail size={18} className="mr-2" />
              <span>{user.personalDetails.email}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-2">
              <Phone size={18} className="mr-2" />
              <span>{user.personalDetails.phone}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-2">
              <Calendar size={18} className="mr-2" />
              <span>Age: {user.personalDetails.age}</span>
            </div>

            <div className="text-gray-600 mb-2">
              <span className="font-semibold">Gender:</span>{" "}
              {user.personalDetails.gender}
            </div>

            <div className="text-gray-600 mb-2">
              <span className="font-semibold">Graduated:</span>{" "}
              {user.professionalDetails.isGraduated.toUpperCase()}
              {user.professionalDetails.isGraduated === "yes" && (
                <span> ({user.professionalDetails.graduationType})</span>
              )}
            </div>

            <div className="text-gray-600 mb-2">
              <span className="font-semibold">Experience:</span>{" "}
              {user.professionalDetails.experience}
            </div>

            {user.professionalDetails.message && (
              <div className="mt-2 text-gray-700 italic border-t pt-2">
                "{user.professionalDetails.message}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppliedUser;
