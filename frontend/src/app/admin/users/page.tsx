"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
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

function AdminUsersContent() {
  const { data, error, isLoading, refetch } = useFetch<User[]>("/admin/users");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900">
      <Sidebar />
      <div className="fixed top-0 left-64 right-0 h-16 bg-gradient-to-r from-slate-900 to-purple-900 border-b border-purple-500/20 shadow-lg z-30">
        <Header />
      </div>
      <div className="ml-64 pt-24 p-8 pb-20">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Users</h1>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          {isLoading && (
            <div className="p-4 text-sm text-gray-300">Loading users...</div>
          )}
          {error && (
            <div className="p-4 text-sm text-red-400">{error}</div>
          )}
          {!isLoading && users.length === 0 && (
            <div className="p-4 text-sm text-gray-400">No users found.</div>
          )}

          {users.length > 0 && (
            <table className="w-full text-left">
              <thead className="bg-slate-700/50 text-sm border-b border-purple-500/20">
                  <tr>
                    <th className="p-4 text-gray-300 font-semibold">Name</th>
                    <th className="p-4 text-gray-300 font-semibold">Email</th>
                    <th className="p-4 text-gray-300 font-semibold">Role</th>
                    <th className="p-4 text-gray-300 font-semibold">Status</th>
                    <th className="p-4 text-gray-300 font-semibold">Joined</th>
                    <th className="p-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t border-slate-700 hover:bg-slate-700/30 transition-colors">
                      <td className="p-4 font-medium text-gray-200">{user.name}</td>
                      <td className="p-4 text-gray-400">{user.email}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/30 text-purple-300 border border-purple-500/50">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === "active"
                              ? "bg-green-500/30 text-green-300 border border-green-500/50"
                              : "bg-red-500/30 text-red-300 border border-red-500/50"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">
                        {mounted ? new Date(user.createdAt).toLocaleDateString() : ""}
                      </td>
                      <td className="p-4 space-x-2">
                        <button
                          className="px-3 py-1 text-xs rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
                          onClick={() =>
                            handleRole(user._id, user.role === "admin" ? "user" : "admin")
                          }
                          disabled={savingId === user._id}
                        >
                          {user.role === "admin" ? "Make User" : "Make Admin"}
                        </button>
                        <button
                          className="px-3 py-1 text-xs rounded bg-slate-700 text-gray-200 hover:bg-slate-600 disabled:opacity-50 transition-all"
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
  );
}

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminUsersContent />
    </ProtectedRoute>
  );
}
