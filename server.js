const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const helmet = require("helmet");

const connectDB = require("./config/db");

const app = express();

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Init Middleware
app.use(express.json());

// Connect to database
connectDB();

//Define Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
