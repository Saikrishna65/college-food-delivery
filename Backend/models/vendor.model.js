const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const NotificationSchema = new mongoose.Schema({
  foodItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const vendorSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      minlength: [3, "Restaurant name must be at least 3 characters long"],
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      minlength: [3, "Owner name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    contactNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Contact number must be 10 digits"],
    },
    address: {
      type: String,
      required: true,
      minlength: [10, "Address must be at least 10 characters long"],
    },
    role: {
      type: String,
      enum: ["vendor", "user"],
      default: "vendor",
    },
    profileImage: {
      type: String,
      default: "https://example.com/default_vendor.png",
    },
    foodItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    notifications: [NotificationSchema],
    // tags: [String], // e.g., ["South Indian", "Fast Food"]
    // category: {
    //   type: String,
    //   enum: ["Veg", "Non-Veg", "Both"],
    //   default: "Both",
    // },
    // location: {
    //   lat: { type: Number, default: 0 },
    //   lng: { type: Number, default: 0 },
    // },
  },
  {
    timestamps: true,
  }
);

vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

vendorSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Vendor", vendorSchema);
