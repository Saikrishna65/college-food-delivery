const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const vendorController = require("../controllers/vendor.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("restaurantName")
      .isLength({ min: 3 })
      .withMessage("Restaurant name must be at least 3 characters long"),
    body("ownerName")
      .isLength({ min: 3 })
      .withMessage("Owner name must be at least 3 characters long"),
    body("contactNumber")
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile number must be 10 digits long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("address")
      .isLength({ min: 10 })
      .withMessage("Address must be at least 10 characters long"),
  ],
  vendorController.registerVendor
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  vendorController.loginVendor
);

router.get(
  "/profile",
  authMiddleware.authVendor,
  vendorController.getVendorProfile
);

router.put(
  "/update",
  authMiddleware.authVendor,
  [
    body("restaurantName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Restaurant name must be at least 3 characters long"),
    body("ownerName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Owner name must be at least 3 characters long"),
    body("contactNumber")
      .optional()
      .isLength({ min: 10, max: 10 })
      .withMessage("Contact number must be 10 digits long"),
    body("address")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Address must be at least 10 characters long"),
    body("profileImage").optional().isURL().withMessage("Invalid image URL"),
  ],
  vendorController.updateVendorProfile
);

router.get(
  "/food-items",
  authMiddleware.authVendor,
  vendorController.getVendorFoodItems
);

router.post(
  "/add-food-item",
  authMiddleware.authVendor,
  [
    body("name").isString().withMessage("Food item name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("description")
      .isString()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("category").isString().withMessage("Category is required"),
    body("image").optional().isURL().withMessage("Invalid image URL"),
  ],
  vendorController.addFoodItem
);

router.get("/logout", authMiddleware.authVendor, vendorController.logoutVendor);

module.exports = router;
