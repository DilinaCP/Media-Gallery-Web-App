"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { useFetch } from "@/app/hooks/useFetch";
import api from "@/app/lib/api";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

function AdminMessagesContent() {
  const { data, isLoading, error, refetch } = useFetch<Message[]>("/contact");
  const [openId, setOpenId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const messages = data ?? [];

  const markRead = async (id: string) => {
    setUpdatingId(id);
    try {
      await api.patch(`/contact/${id}/read`, {});
      await refetch();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900">
      <Sidebar />
      <div className="fixed top-0 left-64 right-0 h-16 bg-gradient-to-r from-slate-900 to-purple-900 border-b border-purple-500/20 shadow-lg z-30">
        <Header />
      </div>
      <div className="ml-64 pt-24 p-8 pb-20">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Messages</h1>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl shadow-2xl border border-purple-500/20">
          {isLoading && (
            <div className="p-4 text-sm text-gray-300">Loading messages...</div>
          )}
          {error && (
            <div className="p-4 text-sm text-red-400">{error}</div>
          )}
          {!isLoading && messages.length === 0 && (
            <div className="p-4 text-sm text-gray-400">No messages found.</div>
          )}

          {messages.map((msg) => (
            <div key={msg._id} className="border-b border-slate-700 last:border-none hover:bg-slate-700/20 transition-colors">
              <button
                onClick={() => setOpenId(openId === msg._id ? null : msg._id)}
                className="w-full text-left p-6 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-200">
                    {msg.name} • {msg.email}
                  </p>
                  <p className="text-sm text-gray-400 truncate max-w-xl">
                    {msg.message}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  {!msg.isRead && (
                    <span className="px-2 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs border border-blue-500/50 font-semibold">
                      New
                    </span>
                  )}
                  {mounted && <span className="whitespace-nowrap">{new Date(msg.createdAt).toLocaleString()}</span>}
                </div>
              </button>

              {openId === msg._id && (
                <div className="px-6 pb-6 text-gray-300 space-y-3 border-t border-slate-700 bg-slate-700/10">
                  <p className="pt-3">{msg.message}</p>
                  {!msg.isRead && (
                    <button
                      className="px-3 py-1 text-xs rounded bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all font-semibold"
                      onClick={() => markRead(msg._id)}
                      disabled={updatingId === msg._id}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminMessagesContent />
    </ProtectedRoute>
  );
}
