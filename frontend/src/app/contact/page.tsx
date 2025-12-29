"use client";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ContactForm from "../components/contact/ContactForm";
import MessageList from "../components/contact/MessageList";

const ContactPage = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col ml-50">
                <Header />

                <div className="flex-1 flex items-center justify-center p-8 bg-linear-to-br from-gray-50 via-white to-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
                        <ContactForm />
                        <MessageList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
