"use client";

import { useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import api from "@/app/lib/api";
import useFetch from "@/app/hooks/useFetch";
import { getToken } from "@/app/lib/auth";
import Button from "../common/Button";

type Message = {
    _id: string;
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    createdAt?: string;
};

const MessageList = () => {
    const { data, isLoading, error, refetch } = useFetch<Message[]>("/contact");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (data) {
            setMessages(data);
        }
    }, [data]);

    const socketUrl = useMemo(() => {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";
        return base.replace(/\/api$/, "");
    }, []);

    useEffect(() => {
        const token = getToken();
        const socket: Socket = io(socketUrl, {
            transports: ["websocket"],
            auth: token ? { token } : undefined,
        });

        socket.on("message:new", (msg: Message) => {
            setMessages((prev) => [msg, ...prev.filter((m) => m._id !== msg._id)]);
        });

        socket.on("message:read", ({ id }: { id: string }) => {
            setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, isRead: true } : m)));
        });

        socket.on("connect_error", (err) => {
            console.error("socket error", err);
        });

        return () => {
            socket.disconnect();
        };
    }, [socketUrl]);

    const markAsRead = async (id: string) => {
        try {
            await api.patch(`/contact/${id}/read`, {});
            // optimistic update
            setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, isRead: true } : m)));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Messages</h2>
                <Button variant="secondary" onClick={() => refetch()} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Refresh"}
                </Button>
            </div>

            {error && (
                <p className="text-sm text-red-600 font-medium mb-4">
                    {error === "Not authorized, token failed" || error === "Not authorized, no token"
                        ? "You need to be logged in to view messages."
                        : error}
                </p>
            )}

            {!isLoading && messages.length === 0 && !error && (
                <p className="text-gray-500">No messages yet.</p>
            )}

            <div className="flex flex-col divide-y divide-gray-100">
                {messages.map((msg) => (
                    <div key={msg._id} className="py-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center gap-3">
                            <div>
                                <p className="font-medium text-gray-700">{msg.name}</p>
                                <p className="text-sm text-gray-500">{msg.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {msg.createdAt && (
                                    <p className="text-sm text-gray-400">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </p>
                                )}
                                {!msg.isRead && (
                                    <Button
                                        variant="secondary"
                                        className="px-3 py-1 text-sm"
                                        onClick={() => markAsRead(msg._id)}
                                        disabled={isLoading}
                                    >
                                        Mark as read
                                    </Button>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-600">{msg.message}</p>
                        {msg.isRead && <p className="text-xs text-green-600 font-semibold">Read</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageList;
