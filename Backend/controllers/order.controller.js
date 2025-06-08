const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Food = require("../models/food.model");
const User = require("../models/user.model");
const Vendor = require("../models/vendor.model");

// function sendNotificationToVendor(vendorId, notification) {
//   console.log(`Sending notification to vendor ${vendorId}...`);
//   const io = getIo();
//   const vendorNamespace = io.of("/vendors");

//   vendorNamespace
//     .to(vendorId.toString())
//     .emit("new_notification", notification);

//   console.log(`✅ Notification sent to vendor ${vendorId}`);
//   console.log(`Notification details:`, notification);
//   console.log(`Current connected vendors:`, vendorNamespace.sockets.size);
// }

// exports.createOrder = async (req, res) => {

//   const { orderType, payment, address } = req.body;

//   if (!address || typeof address !== "string" || address.trim() === "") {
//     return res.status(400).json({ message: "Address is required" });
//   }

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     // ✅ Load user and cart
//     const user = await User.findById(req.user.id).session(session);
//     if (!user || !Array.isArray(user.cart) || user.cart.length === 0) {
//       throw new Error("Your cart is empty");
//     }

//     let totalAmount = 0;
//     const orderItems = [];

//     for (const { foodItem, quantity } of user.cart) {
//       if (!mongoose.Types.ObjectId.isValid(foodItem)) {
//         throw new Error(`Invalid foodItem: ${foodItem}`);
//       }
//       if (quantity < 1) {
//         throw new Error(`Quantity must be at least 1 for item ${foodItem}`);
//       }

//       const food = await Food.findById(foodItem).session(session);
//       if (!food || !food.isAvailable) {
//         throw new Error(`Item unavailable: ${foodItem}`);
//       }
//       if (food.quantity !== null && food.quantity < quantity) {
//         throw new Error(
//           `Not enough stock for ${food.name}: requested ${quantity}, available ${food.quantity}`
//         );
//       }

//       const prevQty = food.quantity;
//       food.quantity -= quantity;
//       if (food.quantity <= 0) food.isAvailable = false;
//       await food.save({ session });

//       if (prevQty > 10 && food.quantity <= 10) {
//         const vendor = await Vendor.findById(food.vendor).session(session);
//         vendor.notifications.push({
//           foodItem: food._id,
//           message: `Low stock for "${food.name}": only ${food.quantity} left.`,
//         });
//         await vendor.save({ session });
//       }

//       totalAmount += food.price * quantity;
//       orderItems.push({ foodItem: food._id, quantity });
//     }

//     // ✅ Create order with user's name and mobile
//     const order = new Order({
//       user: req.user.id,
//       customerName: user.name,
//       customerPhone: user.mobile,
//       orderType,
//       payment,
//       address,
//       items: orderItems,
//       totalAmount: +totalAmount.toFixed(2),
//     });
//     await order.save({ session });

//     // ✅ Clear cart
//     user.cart = [];
//     await user.save({ session });

//     await session.commitTransaction();
//     session.endSession();

//     res.status(201).json({
//       message: "Order placed",
//       orderId: order._id,
//       customerName: order.customerName,
//       customerPhone: order.customerPhone,
//       totalAmount: order.totalAmount,
//     });
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
//     res.status(400).json({ message: err.message });
//   }
// };

// GET user orders, populating item details and vendor name per item

exports.createOrder = async (req, res) => {
  const { orderType, payment, address } = req.body;

  // 1️⃣ Validate inputs
  if (!address?.trim()) {
    return res.status(400).json({ message: "Address is required" });
  }
  if (!payment?.trim()) {
    return res.status(400).json({ message: "Payment method is required" });
  }

  try {
    // 2️⃣ Load user and cart
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = user.cart || [];
    if (!cart.length) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    // 3️⃣ Process each cart item
    for (const entry of cart) {
      const { foodItem: foodId, quantity } = entry;

      // a) Validate ID & quantity
      if (!mongoose.Types.ObjectId.isValid(foodId)) {
        return res
          .status(400)
          .json({ message: `Invalid food item ID: ${foodId}` });
      }
      if (quantity < 1) {
        return res
          .status(400)
          .json({ message: `Quantity must be at least 1 for item ${foodId}` });
      }

      // b) Load the food
      const food = await Food.findById(foodId);
      if (!food || !food.isAvailable) {
        return res.status(400).json({ message: `Item unavailable: ${foodId}` });
      }
      if (food.quantity != null && food.quantity < quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${food.name}: requested ${quantity}, available ${food.quantity}`,
        });
      }

      // c) Decrement inventory
      const prevQty = food.quantity;
      food.quantity -= quantity;
      if (food.quantity <= 0) food.isAvailable = false;
      await food.save();

      // d) Vendor notification if crossing threshold
      if (prevQty > 10 && food.quantity <= 10) {
        if (food.vendor) {
          const vendor = await Vendor.findById(food.vendor);
          if (vendor) {
            vendor.notifications.push({
              foodItem: food._id,
              message: `Low stock for "${food.name}": only ${food.quantity} left.`,
            });
            await vendor.save();
            // sendNotificationToVendor(vendor._id, {
            //   foodItem: food._id,
            //   message: `Low stock for "${food.name}": only ${food.quantity} left.`,
            // });
          }
        }
      }

      totalAmount += food.price * quantity;
      orderItems.push({ foodItem: food._id, quantity });
    }

    // 4️⃣ Create the order
    const order = new Order({
      user: req.user.id,
      customerName: user.name,
      customerPhone: user.mobile,
      orderType,
      payment,
      address,
      items: orderItems,
      totalAmount: +totalAmount.toFixed(2),
    });
    await order.save();

    // 5️⃣ Clear the cart
    user.cart = [];
    await user.save();

    // 6️⃣ Respond
    res.status(201).json({
      message: "Order placed",
      orderId: order._id,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      totalAmount: order.totalAmount,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    console.log(req.user.id);
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: "items.foodItem",
        select: "name price image rating vendor",
        populate: { path: "vendor", select: "restaurantName" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

// GET vendor orders: find any order containing this vendor’s foods
exports.getVendorOrders = async (req, res) => {
  try {
    // Get all food item IDs that belong to this vendor
    const foods = await Food.find({ vendor: req.vendor.id }).select("_id");
    const foodIds = foods.map((f) => f._id.toString());

    // Find orders that contain at least one of these food items
    const orders = await Order.find({ "items.foodItem": { $in: foodIds } })
      .populate({
        path: "items.foodItem",
        select: "name price vendor",
      })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Now filter each order's items to include only this vendor's items
    const filteredOrders = orders.map((order) => {
      const filteredItems = order.items.filter(
        (item) =>
          item.foodItem && item.foodItem.vendor.toString() === req.vendor.id
      );

      return {
        _id: order._id,
        user: order.user,
        orderType: order.orderType,
        payment: order.payment,
        orderStatus: order.orderStatus,
        address: order.address,
        deliveredTime: order.deliveredTime,
        dineInTime: order.dineInTime,
        totalAmount: filteredItems.reduce(
          (sum, item) => sum + item.foodItem.price * item.quantity,
          0
        ),
        items: filteredItems,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
    });

    res.status(200).json({ orders: filteredOrders });
  } catch (err) {
    console.error("Vendor order fetch error:", err);
    res.status(500).json({
      message: "Failed to fetch vendor orders",
      error: err.message,
    });
  }
};

// UPDATE order status (any vendor; no vendor check for mixed orders)
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;
  const allowed = ["Processing", "Delivered", "Cancelled"];
  if (!allowed.includes(orderStatus)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = orderStatus;
    if (orderStatus === "Delivered") order.deliveredTime = new Date();
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: err.message });
  }
};

// CANCEL order (user only)
exports.cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findOne({ _id: orderId, user: req.user.id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (["Delivered", "Cancelled"].includes(order.orderStatus)) {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }
    order.orderStatus = "Cancelled";
    await order.save();
    res.status(200).json({ message: "Order cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel", error: err.message });
  }
};
