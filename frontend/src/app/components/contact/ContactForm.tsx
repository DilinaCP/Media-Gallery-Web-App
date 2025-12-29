"use client";

import { useState } from "react";
import api from "@/app/lib/api";
import Button from "../common/Button";
import Input from "../common/Input";
import { Mail, User, MessageSquare } from "lucide-react";

const ContactForm = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsSubmitting(true);

        try {
            const response = await api.post<{ message: string }>("/contact", form);
            setSuccess(response.message || "Message sent successfully!");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to send message. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8 flex flex-col gap-6"
        >
            <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Get in Touch
                </h2>
                <p className="text-slate-600">We'd love to hear from you. Send us a message!</p>
            </div>

            <Input
                type="text"
                name="name"
                label="Your Name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                icon={<User size={18} />}
                required
            />

            <Input
                type="email"
                name="email"
                label="Your Email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                icon={<Mail size={18} />}
                required
            />

            <div className="w-full">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message
                </label>
                <textarea
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="
                        w-full px-4 py-2.5
                        bg-slate-50 border border-slate-300
                        rounded-lg
                        text-slate-900 placeholder-slate-500 text-sm
                        transition-all duration-200
                        focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white
                        hover:border-slate-400
                        disabled:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50
                        resize-none
                    "
                />
            </div>

            {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
            )}
            {success && (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <p className="text-sm text-emerald-700 font-medium">{success}</p>
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <Button 
                    variant="secondary" 
                    type="button"
                    onClick={() => setForm({ name: "", email: "", message: "" })}
                >
                    Clear
                </Button>
                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
