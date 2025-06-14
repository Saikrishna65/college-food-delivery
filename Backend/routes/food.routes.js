const express = require("express");
const router = express.Router();

const { authVendor } = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");

router.get("/items", foodController.getAllFoodItems);
router.get("/vendor-food-items", authVendor, foodController.getVendorFoodItems);
router.patch(
  "/toggle-availability",
  authVendor,
  foodController.toggleFoodAvailability
);
router.patch("/update", authVendor, foodController.updateFoodItem);

module.exports = router;
