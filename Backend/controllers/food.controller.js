const Food = require("../models/food.model");

exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find()
      .populate({
        path: "vendor",
        match: { isAvailable: true },
        select: "restaurantName email",
      })
      .exec();

    const filtered = foodItems.filter((f) => f.vendor !== null);

    res.status(200).json({ success: true, data: filtered });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getVendorFoodItems = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const foodItems = await Food.find({ vendor: vendorId }).populate(
      "vendor",
      "restaurantName email"
    );
    res.status(200).json({ success: true, data: foodItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vendor's food items",
      error: error.message,
    });
  }
};

exports.toggleFoodAvailability = async (req, res) => {
  const { foodId } = req.body;
  if (!foodId) {
    return res
      .status(400)
      .json({ success: false, message: "Food ID is required" });
  }
  const vendorId = req.vendor.id;

  try {
    const food = await Food.findById(foodId);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    if (food.vendor.toString() !== vendorId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this item",
      });
    }

    food.isAvailable = !food.isAvailable;
    await food.save();

    return res.status(200).json({
      success: true,
      message: `Food item is now ${
        food.isAvailable ? "available" : "unavailable"
      }`,
      data: {
        foodId: food._id,
        isAvailable: food.isAvailable,
      },
    });
  } catch (err) {
    console.error("Toggle food availability error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle food availability",
      error: err.message,
    });
  }
};

exports.updateFoodItem = async (req, res) => {
  const {
    foodId,
    name,
    description,
    price,
    image,
    quantity,
    isAvailable,
    category,
    restaurantAddress,
    tags,
  } = req.body;
  const vendorId = req.vendor.id;

  try {
    const food = await Food.findById(foodId);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    if (food.vendor.toString() !== vendorId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to edit this item" });
    }

    if (name !== undefined) food.name = name;
    if (description !== undefined) food.description = description;
    if (price !== undefined) food.price = price;
    if (image !== undefined) food.image = image;
    if (quantity !== undefined) food.quantity = quantity;
    if (isAvailable !== undefined) food.isAvailable = isAvailable;
    if (category !== undefined) food.category = category;
    if (restaurantAddress !== undefined)
      food.restaurantAddress = restaurantAddress;
    if (tags !== undefined) {
      food.tags = Array.isArray(tags)
        ? tags
        : tags.split(",").map((t) => t.trim());
    }

    const updated = await food.save();

    res.status(200).json({
      success: true,
      data: updated,
      message: "Food item updated successfully",
    });
  } catch (err) {
    console.error("Update food item error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update food item",
      error: err.message,
    });
  }
};
