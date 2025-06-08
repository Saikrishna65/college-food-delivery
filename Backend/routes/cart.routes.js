const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.authUser, cartController.getCart);

router.post(
  "/add",
  authMiddleware.authUser,
  [
    body("foodItemId").isMongoId().withMessage("Invalid food item ID"),
    body("quantity")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be greater than 0"),
  ],
  authMiddleware.authUser,
  cartController.addToCart
);
router.put(
  "/update",
  authMiddleware.authUser,
  [
    body("foodItemId").isMongoId().withMessage("Invalid food item ID"),
    body("quantity")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be greater than 0"),
  ],
  authMiddleware.authUser,
  cartController.updateCartItem
);
router.delete(
  "/remove",
  authMiddleware.authUser,
  [body("foodItemId").isMongoId().withMessage("Invalid food item ID")],
  authMiddleware.authUser,
  cartController.removeFromCart
);

module.exports = router;
