"use client";

import { useState } from "react";
import api from "@/app/lib/api";
import Button from "../common/Button";

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
            setSuccess(response.message || "Message sent successfully.");
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
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6"
        >
            <h2 className="text-2xl font-semibold text-gray-800">Send a Message</h2>

            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            <textarea
                name="message"
                placeholder="Your Message..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-lg text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
            {success && <p className="text-sm text-green-600 font-medium">{success}</p>}

            <div className="flex justify-end">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
