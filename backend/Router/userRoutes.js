const express = require("express");
const authController = require("./../Controllers/authController");
const userController = require("./../Controllers/userController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, userController.getUsersForSidebar);


module.exports = router;
