const mongoose = require("mongoose");
const Vendor = require("../models/vendor.model");
const jwt = require("jsonwebtoken");
const Order = require("../models/order.model");
const Food = require("../models/food.model");
const blackListTokenModel = require("../models/blacklistToken.model");

// 🔐 Generate JWT Token
const generateToken = (vendor) => {
  return jwt.sign(
    { _id: vendor._id, email: vendor.email },
    process.env.JWT_SECRET || "your_jwt_secret_key",
    { expiresIn: "7d" }
  );
};

// ✅ Vendor Register
exports.registerVendor = async (req, res) => {
  try {
    const {
      email,
      password,
      restaurantName,
      ownerName,
      contactNumber,
      address,
    } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor)
      return res.status(400).json({ message: "Email already registered" });

    const vendor = new Vendor({
      email,
      password,
      restaurantName,
      ownerName,
      contactNumber,
      address,
    });
    await vendor.save();

    const token = generateToken(vendor);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ message: "Vendor registered", vendor, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// 🔐 Vendor Login
exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const isMatch = await vendor.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = generateToken(vendor);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful", vendor, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// 🔍 Get Vendor Profile
exports.getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id).select("-password");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.status(200).json(vendor);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
};

// ✏️ Update Vendor Profile
exports.updateVendorProfile = async (req, res) => {
  try {
    const updates = req.body;
    const vendor = await Vendor.findByIdAndUpdate(req.vendor.id, updates, {
      new: true,
    }).select("-password");

    res.status(200).json({ message: "Profile updated", vendor });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update profile", error: err.message });
  }
};

// 🔒 Change Password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const vendor = await Vendor.findById(req.vendor.id);

    const isMatch = await vendor.comparePassword(oldPassword);
    if (!isMatch)
      return res.status(401).json({ message: "Old password incorrect" });

    vendor.password = newPassword;
    await vendor.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Password change failed", error: err.message });
  }
};

// ✅ Toggle Availability
exports.toggleAvailability = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id);
    vendor.isAvailable = !vendor.isAvailable;
    await vendor.save();

    res.status(200).json({
      message: "Availability toggled",
      isAvailable: vendor.isAvailable,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update availability", error: err.message });
  }
};

exports.getVendorStatus = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id).select("isAvailable");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.status(200).json({ isAvailable: vendor.isAvailable });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch vendor status", error: err.message });
  }
};

exports.addFoodItem = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const newFood = new Food({
      ...req.body,
      restaurant: vendor.restaurantName,
      restaurantAddress: vendor.address,
      vendor: vendorId,
    });

    const savedFood = await newFood.save();

    vendor.foodItems.push(savedFood._id);
    await vendor.save();

    res.status(201).json({
      message: "Food item added successfully",
      food: savedFood,
    });
  } catch (error) {
    console.error("Add Food Error:", error.message);
    res.status(500).json({
      message: "Failed to add food item",
      error: error.message,
    });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    // Step 1: Fetch all food items of this vendor
    const vendorFoodItems = await Food.find({ vendor: vendorId });
    const foodMap = new Map(); // foodId -> foodName
    vendorFoodItems.forEach((food) =>
      foodMap.set(food._id.toString(), food.name)
    );
    const foodIds = Array.from(foodMap.keys()).map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Step 2: Fetch orders that include these food items
    const orders = await Order.find({ "items.foodItem": { $in: foodIds } });

    // Step 3: Top ordered items
    const itemQuantities = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const foodId = item.foodItem.toString();
        if (foodMap.has(foodId)) {
          if (!itemQuantities[foodId]) {
            itemQuantities[foodId] = 0;
          }
          itemQuantities[foodId] += item.quantity;
        }
      });
    });

    const topOrderedItems = Object.entries(itemQuantities)
      .map(([foodId, totalQuantity]) => ({
        name: foodMap.get(foodId),
        totalQuantity,
      }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 5);

    // Step 4: Total revenue (Delivered orders only)
    const deliveredOrders = orders.filter(
      (order) => order.orderStatus === "Delivered"
    );

    let totalRevenue = 0;
    deliveredOrders.forEach((order) => {
      order.items.forEach((item) => {
        const foodId = item.foodItem.toString();
        if (foodMap.has(foodId)) {
          const food = vendorFoodItems.find((f) => f._id.toString() === foodId);
          if (food) {
            totalRevenue += food.price * item.quantity;
          }
        }
      });
    });

    // Step 5: Total orders
    const totalOrders = orders.length;

    // Step 6: Processing orders count
    const processingOrders = orders.filter(
      (order) => order.orderStatus === "Processing"
    ).length;

    // Step 7: Total food items
    const totalFoodItems = vendorFoodItems.length;

    // Step 8: Weekly & Monthly Data
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const ordersInWeek = orders.filter(
      (order) => new Date(order.createdAt) >= startOfWeek
    );
    const ordersInMonth = orders.filter(
      (order) => new Date(order.createdAt) >= startOfMonth
    );

    const weeklyData = Array.from({ length: 7 }, (_, i) => ({
      name: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
      completed: 0,
      cancelled: 0,
    }));

    ordersInWeek.forEach((order) => {
      const day = new Date(order.createdAt).getDay();
      if (order.orderStatus === "Delivered") weeklyData[day].completed++;
      else if (order.orderStatus === "Cancelled") weeklyData[day].cancelled++;
    });

    const monthlyData = Array.from({ length: 4 }, (_, i) => ({
      name: `Week ${i + 1}`,
      completed: 0,
      cancelled: 0,
    }));

    ordersInMonth.forEach((order) => {
      const day = new Date(order.createdAt).getDate();
      const weekIndex = Math.min(3, Math.floor((day - 1) / 7));
      if (order.orderStatus === "Delivered") monthlyData[weekIndex].completed++;
      else if (order.orderStatus === "Cancelled")
        monthlyData[weekIndex].cancelled++;
    });

    // Final Response
    res.status(200).json({
      success: true,
      data: {
        topOrderedItems,
        totalRevenue,
        totalOrders,
        totalFoodItems,
        processingOrders,
        weeklyData,
        monthlyData,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

exports.logoutVendor = async (req, res) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (token) {
      await blackListTokenModel.create({ token });
      res.clearCookie("token");
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};
