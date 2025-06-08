const {
  getVendorNotifications,
} = require("../controllers/notification.controller");
const { authVendor } = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.get("/notifications", authVendor, getVendorNotifications);

// Export the router
module.exports = router;
