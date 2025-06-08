const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  foodItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    orderType: { type: String, required: true },
    payment: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["Processing", "Delivered", "Cancelled"],
      default: "Processing",
    },
    address: { type: String },
    deliveredTime: { type: Date, default: null },
    dineInTime: { type: Date, default: null },
    items: [ItemSchema],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
