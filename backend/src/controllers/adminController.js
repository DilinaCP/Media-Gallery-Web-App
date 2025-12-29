import User from "../models/User.js";
import Image from "../models/Image.js";
import Message from "../models/Message.js";

const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  delete obj.resetOtp;
  delete obj.resetOtpExpires;
  return obj;
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users.map(sanitizeUser));
  } catch (error) {
    console.error("getUsers error", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(sanitizeUser(user));
  } catch (error) {
    console.error("updateUserRole error", error);
    res.status(500).json({ message: "Failed to update user role" });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status || !["active", "suspended"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(sanitizeUser(user));
  } catch (error) {
    console.error("updateUserStatus error", error);
    res.status(500).json({ message: "Failed to update user status" });
  }
};

export const getStats = async (req, res) => {
  try {
    const [userCounts, imageCount, messageCounts] = await Promise.all([
      Promise.all([
        User.countDocuments(),
        User.countDocuments({ status: "active" }),
        User.countDocuments({ status: "suspended" }),
        User.countDocuments({ role: "admin" }),
      ]),
      Image.countDocuments(),
      Promise.all([
        Message.countDocuments(),
        Message.countDocuments({ isRead: false }),
      ]),
    ]);

    const [totalUsers, activeUsers, suspendedUsers, adminUsers] = userCounts;
    const [totalMessages, unreadMessages] = messageCounts;

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        suspended: suspendedUsers,
        admins: adminUsers,
      },
      images: {
        total: imageCount,
      },
      messages: {
        total: totalMessages,
        unread: unreadMessages,
      },
    });
  } catch (error) {
    console.error("getStats error", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
