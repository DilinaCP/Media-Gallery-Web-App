"use client";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

const mockUsers = [
  {
    id: 1,
    name: "Dilina Perera",
    email: "dilina@gmail.com",
    role: "Admin",
    status: "Active",
    joined: "2024-12-01",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
    joined: "2025-01-10",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Suspended",
    joined: "2025-01-15",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-10 pt-20 pl-56">
          <h1 className="text-2xl font-bold mb-6">Users</h1>

          <div className="bg-white rounded-2xl shadow border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Joined</th>
                </tr>
              </thead>

              <tbody>
                {mockUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">
                      {user.name}
                    </td>
                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      {user.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
