"use client";

import { useState } from "react";
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

export default function AdminMessagesPage() {
  const { data, isLoading, error, refetch } = useFetch<Message[]>("/contact");
  const [openId, setOpenId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-10 pt-20 pl-56">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>

          <div className="bg-white rounded-2xl shadow border">
            {isLoading && (
              <div className="p-4 text-sm text-gray-500">Loading messages...</div>
            )}
            {error && (
              <div className="p-4 text-sm text-red-600">{error}</div>
            )}
            {!isLoading && messages.length === 0 && (
              <div className="p-4 text-sm text-gray-600">No messages found.</div>
            )}

            {messages.map((msg) => (
              <div key={msg._id} className="border-b last:border-none">
                <button
                  onClick={() => setOpenId(openId === msg._id ? null : msg._id)}
                  className="w-full text-left p-6 hover:bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {msg.name} • {msg.email}
                    </p>
                    <p className="text-sm text-gray-500 truncate max-w-xl">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    {!msg.isRead && (
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                        New
                      </span>
                    )}
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </button>

                {openId === msg._id && (
                  <div className="px-6 pb-6 text-gray-700 space-y-3">
                    <p>{msg.message}</p>
                    {!msg.isRead && (
                      <button
                        className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
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
    </div>
  );
}
