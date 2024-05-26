const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    confirmPassword: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilepic: {
      type: String,
      default: " ",
    },
  },
  //createdAt updatedAt
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password !== this.confirmPassword) {
    res.status(400).json({ error: "Password Dont match" });
  }
  next();
});

userSchema.pre("save", async function (next) {
  // if (!this.isModified(this.password)) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});



const User = mongoose.model("User", userSchema);

module.exports = User;
