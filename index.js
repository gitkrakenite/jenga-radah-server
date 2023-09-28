const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const articleRouter = require("./routes/articleRoutes");
const educationRouter = require("./routes/educationRoutes");
const reportRouter = require("./routes/reportRoutes");
const resourceRouter = require("./routes/resourceRoutes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB connection
connectDB();

// routes
app.get("/", (req, res) => res.status(200).send("API WORKING WELL"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/edu", educationRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/resource", resourceRouter);

// listener
app.listen(PORT, console.log(`Server running on port: ${PORT}`));
