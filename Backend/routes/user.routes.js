const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("mobile")
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile number must be 10 digits long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userController.loginUser
);

router.patch(
  "/update-profile",
  authMiddleware.authUser,
  userController.updateUserProfile
);

router.post(
  "/add-favorite",
  authMiddleware.authUser,
  userController.addFavourite
);
router.get("/favorites", authMiddleware.authUser, userController.getFavourites);

router.delete(
  "/remove-favorite",
  authMiddleware.authUser,
  userController.removeFavourite
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
