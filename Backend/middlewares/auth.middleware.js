const userModel = require("../models/user.model");
const vendorModel = require("../models/vendor.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");

// 🔐 Auth User Middleware
module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });
    if (isBlackListed) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token blacklisted" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    );
    const user = await userModel.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// 🔐 Auth Vendor Middleware
module.exports.authVendor = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization?.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });
    if (isBlackListed) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token blacklisted" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    );
    const vendor = await vendorModel.findById(decoded._id).select("-password");

    if (!vendor) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Vendor not found" });
    }

    req.vendor = vendor;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
