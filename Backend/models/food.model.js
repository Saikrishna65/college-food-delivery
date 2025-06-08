const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
      minlength: [3, "Food name must be at least 3 characters long"],
      trim: true,
    },
    restaurant: {
      type: String,
      required: [true, "Restaurant name is required"],
      minlength: [3, "Restaurant name must be at least 3 characters long"],
      trim: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    restaurantAddress: {
      type: String,
      required: [true, "Restaurant address is required"],
      minlength: [5, "Restaurant address must be at least 5 characters long"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      default: null,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Food", foodSchema);
