import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import app from "./app.js";
import zipRoutes from "./routes/zip.js";
import contactRoutes from "./routes/contact.js";

connectDB();

const server = http.createServer(app);

const allowedOrigin =
  process.env.CLIENT_ORIGIN ||
  process.env.FRONTEND_URL ||
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
  "http://localhost:3000";

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", () => {
  console.log("Socket client connected");
});

app.set("io", io);

app.use("/api/zip", zipRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});