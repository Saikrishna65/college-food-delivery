const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

// ─────────────────────────────── REGISTER ───────────────────────────────
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, mobile, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // send over HTTPS only in production
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({ token, user });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────── LOGIN ───────────────────────────────
module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user || !(await user.comparePasswords(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ token, user });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────── PROFILE ───────────────────────────────
module.exports.getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, mobile } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!name || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name;
    user.mobile = mobile;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────── LOGOUT ───────────────────────────────
module.exports.logoutUser = async (req, res, next) => {
  try {
    // Clear the cookie first
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Get token from header or cookie
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (token) {
      await blackListTokenModel.create({ token });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports.addFavourite = async (req, res, next) => {
  try {
    const { foodItemId } = req.body;

    if (!foodItemId) {
      return res.status(400).json({ message: "Food item ID is required" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favourites.includes(foodItemId)) {
      return res
        .status(400)
        .json({ message: "Food item already in favourites" });
    }

    user.favourites.push(foodItemId);
    await user.save();

    res.status(200).json({
      message: "Food item added to favourites",
      favourites: user.favourites,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.removeFavourite = async (req, res, next) => {
  try {
    const { foodItemId } = req.query;

    if (!foodItemId) {
      return res.status(400).json({ message: "Food item ID is required" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favourites = user.favourites.filter(
      (id) => id.toString() !== foodItemId
    );
    await user.save();

    res.status(200).json({
      message: "Food item removed from favourites",
      favourites: user.favourites,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getFavourites = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id).populate("favourites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ favourites: user.favourites });
  } catch (err) {
    next(err);
  }
};
