"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

const mockMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Storage issue",
    message: "I'm running out of storage. Can I upgrade?",
    date: "2025-02-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Bug report",
    message: "Images fail to upload on Safari.",
    date: "2025-02-03",
  },
  {
    id: 3,
    name: "Alex Brown",
    email: "alex@example.com",
    subject: "Feature request",
    message: "Can we download albums as ZIP?",
    date: "2025-02-05",
  },
];

export default function AdminMessagesPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-10 pt-20 pl-56">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>

          <div className="bg-white rounded-2xl shadow border">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className="border-b last:border-none"
              >
                <button
                  onClick={() =>
                    setOpenId(openId === msg.id ? null : msg.id)
                  }
                  className="w-full text-left p-6 hover:bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {msg.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      {msg.name} • {msg.email}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {msg.date}
                  </span>
                </button>

                {openId === msg.id && (
                  <div className="px-6 pb-6 text-gray-700">
                    {msg.message}
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
