const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Init Middleware
app.use(express.json());

// Connect to database
connectDB();

// Enable CORS
app.use(cors());

//Define Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/friends", require("./routes/friend"));
app.use("/api/wall", require("./routes/wall"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
