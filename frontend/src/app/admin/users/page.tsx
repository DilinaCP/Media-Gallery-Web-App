"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { useFetch } from "@/app/hooks/useFetch";
import api from "@/app/lib/api";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  createdAt: string;
};

export default function AdminUsersPage() {
  const { data, error, isLoading, refetch } = useFetch<User[]>("/admin/users");
  const [savingId, setSavingId] = useState<string | null>(null);

  const users = data ?? [];

  const handleRole = async (userId: string, role: User["role"]) => {
    setSavingId(userId);
    try {
      await api.patch(`/admin/users/${userId}/role`, { role });
      await refetch();
    } finally {
      setSavingId(null);
    }
  };

  const handleStatus = async (userId: string, status: User["status"]) => {
    setSavingId(userId);
    try {
      await api.patch(`/admin/users/${userId}/status`, { status });
      await refetch();
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-10 pt-20 pl-56">
          <h1 className="text-2xl font-bold mb-6">Users</h1>

          <div className="bg-white rounded-2xl shadow border overflow-hidden">
            {isLoading && (
              <div className="p-4 text-sm text-gray-500">Loading users...</div>
            )}
            {error && (
              <div className="p-4 text-sm text-red-600">{error}</div>
            )}
            {!isLoading && users.length === 0 && (
              <div className="p-4 text-sm text-gray-600">No users found.</div>
            )}

            {users.length > 0 && (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Joined</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-medium">{user.name}</td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 space-x-2">
                        <button
                          className="px-3 py-1 text-xs rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                          onClick={() =>
                            handleRole(user._id, user.role === "admin" ? "user" : "admin")
                          }
                          disabled={savingId === user._id}
                        >
                          {user.role === "admin" ? "Make User" : "Make Admin"}
                        </button>
                        <button
                          className="px-3 py-1 text-xs rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
                          onClick={() =>
                            handleStatus(
                              user._id,
                              user.status === "active" ? "suspended" : "active"
                            )
                          }
                          disabled={savingId === user._id}
                        >
                          {user.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
