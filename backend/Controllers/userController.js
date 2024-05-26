const User = require("../models/userModels");

exports.getUsersForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};
