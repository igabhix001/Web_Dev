const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtPassword = "12345678";

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://igabhix0001:8eRyvs5LiBSVwWhp@cluster0.pba1uhh.mongodb.net/userAppnew"
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
}); //schema

app.post("/signup", async function (req, res) {
  const username = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const existingUser = await User.findOne({ email: username });

  if (existingUser) {
    return res.status(400).json({
      msg: "User already exists",
    });
  }
  const user = new User({ name: name, email: username, password: password });

  user.save();
  res.json({
    msg: "User created successfully",
  });
});

async function checkUser(username, password) {
  const checkUser = await User.findOne({ email: username, password: password });
}

app.post("/signin", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;

  if (!checkUser(username, password)) {
    return res.status(403).json({
      msg: "Invalid username or password",
    });
  } else {
    const token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
      token: token,
    });
  }
});

async function verifyUser(username) {
  try {
    const user = await User.findOne({ email: username });
    return user;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
}

app.get("/Users", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      msg: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtPassword);

    if (!decoded) {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }

    const revUsername = decoded.username;

    const user = await verifyUser(revUsername);

    if (user) {
      return res.status(200).json({
        user: user,
      });
    } else {
      return res.status(401).json({
        msg: "Invalid user",
      });
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }
  }
});

// Add a new route to fetch all users
app.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await User.find(); // Query to fetch all users from the database
    res.status(200).json({
      users: allUsers,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({
      msg: "Error fetching all users",
    });
  }
});

// Make sure to handle errors and return appropriate responses

app.listen(3000);

console.log("server is running on port 3000");
