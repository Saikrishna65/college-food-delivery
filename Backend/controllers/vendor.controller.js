const Vendor = require("../models/vendor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Food = require("../models/food.model");
const blackListTokenModel = require("../models/blacklistToken.model");

// 🔐 Generate JWT Token
const generateToken = (vendor) => {
  return jwt.sign(
    { id: vendor._id, email: vendor.email },
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
    res.cookie("token", token);
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
    res.cookie("token", token);
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

// 🍽️ Get Vendor’s Food Items
module.exports.getVendorFoodItems = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id);
    const foods = await Food.find({ restaurant: vendor.restaurantName });

    res.status(200).json({ foodItems: foods });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch food items", error: err.message });
  }
};

module.exports.addFoodItem = async (req, res) => {
  try {
    const vendorId = req.vendor._id; // From authVendor middleware

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const newFood = new Food({
      ...req.body,
      restaurant: vendor.restaurantName,
      restaurantAddress: vendor.address,
      vendor: vendorId, // Important!
    });

    const savedFood = await newFood.save();

    // Optional: Add food to vendor's foodItems list
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

module.exports.logoutVendor = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
};
