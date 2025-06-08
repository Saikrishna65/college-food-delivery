const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const { authUser, authVendor } = require("../middlewares/auth.middleware");

// User places an order
router.post("/", authUser, orderController.createOrder);

// User gets their orders
router.get("/user", authUser, orderController.getUserOrders);

// Vendor gets their orders
router.get("/vendor", authVendor, orderController.getVendorOrders);

// Vendor updates order status
router.patch("/:orderId/status", authVendor, orderController.updateOrderStatus);

// User cancels their order
router.patch("/:orderId/cancel", authUser, orderController.cancelOrder);

module.exports = router;
