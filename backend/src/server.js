import "dotenv/config";
import connectDB from "./config/db.js";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});