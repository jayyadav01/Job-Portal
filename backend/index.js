require("dotenv").config({});

const express = require("express");
const ConnectDB = require("./utils/db");
const cors = require('cors');
const userRouter = require("./routes/user.route");

const companyRouter = require("./routes/company.route")
const jobRouter = require("./routes/job.route");
const applicationRouter = require("./routes/application.route");
const cookieParser = require("cookie-parser");
const FRONTEND_URL = process.env.FRONTEND_URL;

console.log("frontend url from live => ", FRONTEND_URL)

const app = express();
const PORT = process.env.PORT || 5000; // Use Vercel's dynamic port

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };

// const corsOptions = {
//   origin: [
//     "https://frontend-eta-rosy.vercel.app", // Deployed frontend
//     "http://localhost:3000", // Local development
//   ],
//   credentials: true, // Required for cookies
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure all methods are allowed
//   allowedHeaders: ["Content-Type", "Authorization"], // Ensure headers are allowed
// };

// app.use("*",cors(corsOptions))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/user", userRouter)
app.use("/api/company", companyRouter)
app.use("/api/job", jobRouter)
app.use("/api/application", applicationRouter)

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the backend API!");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running" });
});

ConnectDB(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });