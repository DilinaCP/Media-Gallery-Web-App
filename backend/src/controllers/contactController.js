import Message from "../models/Message.js";

// PUBLIC – contact form
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    const io = req.app.get("io");
    if (io) {
      io.emit("message:new", newMessage);
    }

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("sendMessage error", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// ADMIN – get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("getMessages error", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// ADMIN – mark as read
export const markAsRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!msg) return res.status(404).json({ message: "Message not found" });

    const io = req.app.get("io");
    if (io) {
      io.emit("message:read", { id: msg._id });
    }

    res.json(msg);
  } catch (error) {
    console.error("markAsRead error", error);
    res.status(500).json({ message: "Failed to update message" });
  }
};
