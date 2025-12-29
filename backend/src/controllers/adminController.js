import User from "../models/User.js";

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
