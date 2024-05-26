const express = require("express");
const messageController = require("./../Controllers/messageController");
const authController = require("./../Controllers/authController");


const router = express.Router();

router.route("/:id").get(authController.protect, messageController.getMessage);


router
  .route("/send/:id")
  .post(authController.protect, messageController.sendMessage);

module.exports = router;
