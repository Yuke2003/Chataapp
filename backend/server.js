const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Router/authRoutes");
const cors = require("cors");
const compression = require("compression");
const messageRoutes = require("./Router/messageRoutes");
const userRoutes = require("./Router/userRoutes");
const app = require("./Socket/socket");
const path = require("path");
const PORT = process.env.PORT || 8000;

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

app.use(express.json());
app.use(cookieParser());
app.use(compression());

const _dirname = path.resolve("Nodejs", "ChattApp", "frontend");
console.log(_dirname)

app.use(
  cors({
    origin: "http://localhost:3000", // Specify the allowed origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
  })
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection successfully");
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(_dirname,"/frontend/build/index.html")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("app running on the port 8000");
});
