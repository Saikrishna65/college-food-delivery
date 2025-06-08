const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "vendor"],
      default: "user",
    },
    cart: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    pickupLocation: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("User", userSchema);
