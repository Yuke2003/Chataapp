const User = require("./../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config({ path: "./../config.env" });

const usertoken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
console.log(process.env.JWT_SECRET)

const createSendToken = (user, statusCode, res) => {
  const token = usertoken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  const boysProfile = `https://avatar.iran.liara.run/public/boy`;
  const girlsProfile = `https://avatar.iran.liara.run/public/girl`;
  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user
    const newUser = await User.create({
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      gender: req.body.gender,
      profilepic: req.body.gender === "male" ? boysProfile : girlsProfile,
    });

    // Send a success response
    createSendToken(newUser, 201, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!username || !isPasswordCorrect) {
      return next(new AppError("please provide a email and password", 400));
    }

    createSendToken(user, 201, res);
  } catch (err) {
    console.log("Error in login controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.logout = (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (err) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
