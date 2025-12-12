"use client";

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    date: string;
}

const dummyMessages: Message[] = [
    { id: 1, name: "John Doe", email: "john@example.com", message: "Hello, I need support.", date: "2025-02-12" },
    { id: 2, name: "Sarah Lee", email: "sarah@example.com", message: "Love your gallery!", date: "2025-02-11" },
    { id: 3, name: "Michael Perera", email: "mike@xyz.com", message: "Quick question about uploads.", date: "2025-02-10" },
];

const MessageList = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Messages</h2>

            <div className="flex flex-col divide-y divide-gray-100">
                {dummyMessages.map((msg) => (
                    <div key={msg.id} className="py-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-gray-700">{msg.name}</p>
                            <p className="text-sm text-gray-400">{msg.date}</p>
                        </div>
                        <p className="text-sm text-gray-500">{msg.email}</p>
                        <p className="text-gray-600">{msg.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageList;
