"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ContactForm from "../components/contact/ContactForm";
import MessageList from "../components/contact/MessageList";
import { useAuth } from "@/app/hooks/useAuth";
import { Mail } from "lucide-react";

const ContactPage = () => {
    const { isAdmin, initializing } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (initializing) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900">
            <Sidebar />

            <div className="ml-64 flex flex-col min-h-screen">
                <Header />

                <div className="flex-1 flex flex-col p-8 pt-24 pb-20">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Get in Touch
                                </h1>
                                <p className="text-slate-400 text-sm">We'd love to hear from you</p>
                            </div>
                        </div>
                    </div>

                    <div className={`grid ${mounted && isAdmin ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-8 max-w-6xl`}>
                        <ContactForm />
                        {mounted && isAdmin && (
                            <div>
                                <MessageList />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
