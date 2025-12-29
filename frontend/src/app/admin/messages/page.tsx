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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-purple-900">
      <Sidebar />
      <Header />
      <div className="ml-0 md:ml-64 pt-16 md:pt-24 p-4 sm:p-6 md:p-8 pb-20">
        <h1 className="text-3xl font-bold mb-8 bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Messages</h1>

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
                className="w-full text-left p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-200 break-words">
                    {msg.name} • {msg.email}
                  </p>
                  <p className="text-sm text-gray-400 truncate sm:max-w-xl max-w-full">
                    {msg.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0 self-start sm:self-auto">
                  {!msg.isRead && (
                    <span className="px-2 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs border border-blue-500/50 font-semibold">
                      New
                    </span>
                  )}
                  {mounted && <span className="hidden sm:inline whitespace-nowrap shrink-0">{new Date(msg.createdAt).toLocaleString()}</span>}
                </div>
              </button>

              {openId === msg._id && (
                <div className="px-4 sm:px-6 pb-6 text-gray-300 space-y-3 border-t border-slate-700 bg-slate-700/10">
                  <p className="pt-3 break-words">{msg.message}</p>
                  {!msg.isRead && (
                    <button
                      className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm rounded bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all font-semibold"
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
