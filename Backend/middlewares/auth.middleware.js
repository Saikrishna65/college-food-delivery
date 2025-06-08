const userModel = require("../models/user.model");
const vendorModel = require("../models/vendor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlackListed = await blacklistTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authVendor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.token ||
      (authHeader &&
        authHeader.startsWith("Bearer ") &&
        authHeader.split(" ")[1]);

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided. Unauthorized" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });
    if (isBlackListed) {
      return res
        .status(401)
        .json({ message: "Token is blacklisted. Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await vendorModel.findById(decoded.id).select("-password");

    if (!vendor) {
      return res
        .status(401)
        .json({ message: "Vendor not found. Unauthorized" });
    }

    req.vendor = vendor;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token. Unauthorized" });
  }
};

// const userModel = require("../models/user.model");
// const vendorModel = require("../models/vendor.model");
// const jwt = require("jsonwebtoken");
// const blacklistTokenModel = require("../models/blacklistToken.model");

// module.exports.authUser = async (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized - No token" });
//   }

//   const isBlackListed = await blacklistTokenModel.findOne({ token });
//   if (isBlackListed) {
//     return res.status(401).json({ message: "Token is blacklisted" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await userModel.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user; // makes req.user.id available
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Keep your vendor auth if needed elsewhere
// module.exports.authVendor = async (req, res, next) => {
//   const token =
//     req.cookies.token ||
//     (req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer ") &&
//       req.headers.authorization.split(" ")[1]);

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const isBlackListed = await blacklistTokenModel.findOne({ token });
//   if (isBlackListed) {
//     return res.status(401).json({ message: "Token is blacklisted" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const vendor = await vendorModel.findById(decoded.id).select("-password");

//     if (!vendor) {
//       return res.status(401).json({ message: "Vendor not found" });
//     }

//     req.vendor = vendor;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
