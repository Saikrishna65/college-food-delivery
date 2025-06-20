const http = require("http");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Import database connection and services
const connectToDb = require("./db/db");

// Import route handlers
const userRoutes = require("./routes/user.routes");
const cartRoutes = require("./routes/cart.routes");
const vendorRoutes = require("./routes/vendor.routes");
const orderRoutes = require("./routes/order.routes");
const notificationRoutes = require("./routes/notification.routes");
const foodRoutes = require("./routes/food.routes");

// Initialize Express app
const app = express();

// Connect to database
connectToDb();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // ✅ allow cookies to be sent
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("users", userRoutes);
app.use("cart", cartRoutes);
app.use("vendors", vendorRoutes);
app.use("orders", orderRoutes);
app.use("vendors", notificationRoutes);
app.use("food", foodRoutes);

// Create HTTP server
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
