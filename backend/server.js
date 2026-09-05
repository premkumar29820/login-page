const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Simple users
const users = [
  {
    email: "test@netflix.com",
    password: "password123",
    name: "Test User",
  },
  {
    email: "demo@example.com",
    password: "demo1234",
    name: "Demo User",
  },
];

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Incorrect email or password",
    });
  }
});

// Test API
app.get("/api/health", (req, res) => {
  res.json({
    status: "Backend is working",
  });
});

// Optional root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
