const mongoose = require("mongoose");
const User = require("../models/user.model");
const Food = require("../models/food.model");

// ✅ Get cart with food details and total
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.foodItem");

    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItems = user.cart
      .filter((item) => item.foodItem)
      .map((item) => ({
        foodItem: item.foodItem,
        quantity: item.quantity,
        total: +(item.foodItem.price * item.quantity).toFixed(2),
      }));

    const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    res.status(200).json({ cart: cartItems, cartTotal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get cart", error: error.message });
  }
};

// ✅ Add or update item in cart
exports.addToCart = async (req, res) => {
  const { foodItemId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(foodItemId) || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Invalid food item ID or quantity" });
  }

  try {
    const user = await User.findById(req.user.id);
    const food = await Food.findById(foodItemId);

    if (!user || !food || !food.isAvailable) {
      return res
        .status(404)
        .json({ message: "User or food item not found or unavailable" });
    }

    const existingItem = user.cart.find(
      (item) => item.foodItem.toString() === foodItemId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      user.cart.push({ foodItem: foodItemId, quantity: Number(quantity) });
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Item added/updated in cart", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update cart", error: error.message });
  }
};

// ✅ Update quantity of item in cart
exports.updateCartItem = async (req, res) => {
  const { foodItemId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(foodItemId) || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Invalid food item ID or quantity" });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.cart.find(
      (item) => item.foodItem.toString() === foodItemId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    item.quantity = Number(quantity);
    await user.save();

    res.status(200).json({ message: "Cart item updated", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update cart item", error: error.message });
  }
};

// ✅ Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { foodItemId } = req.query;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(foodItemId)) {
    return res.status(400).json({ message: "Invalid food item ID" });
  }

  try {
    // Fetch the user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if item exists in cart
    const itemIndex = user.cart.findIndex(
      (item) => item.foodItem.toString() === foodItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item
    user.cart.splice(itemIndex, 1);
    await user.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error.message);
    res.status(500).json({
      message: "Failed to remove item",
      error: error.message,
    });
  }
};

// ✅ Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to clear cart", error: error.message });
  }
};
