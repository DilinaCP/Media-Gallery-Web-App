"use client";

import { useState } from "react";
import Button from "../common/Button";

const ContactForm = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", form);
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
                className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-gray-500"
            />

            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-gray-500"
            />

            <textarea
                name="message"
                placeholder="Your Message..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="border border-gray-200 p-3 rounded-xl resize-none focus:outline-none focus:border-gray-500"
            />

            <div className="flex justify-end">
                <Button variant="primary" type="submit">
                    Send Message
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
