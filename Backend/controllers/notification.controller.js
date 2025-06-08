const Vendor = require("../models/vendor.model");

exports.getVendorNotifications = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const vendor = await Vendor.findById(vendorId)
      .populate("notifications.foodItem", "name") // populate foodItem's name
      .select("notifications");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ notifications: vendor.notifications });
  } catch (error) {
    console.error("Fetch Notifications Error:", error.message);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};
