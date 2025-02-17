require("dotenv").config({});

const express = require("express");
const ConnectDB = require("./utils/db");
const cors = require('cors');
const userRouter = require("./routes/user.route");

const companyRouter = require("./routes/company.route")
const jobRouter = require("./routes/job.route");
const applicationRouter = require("./routes/application.route");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: 'http://localhost:3000' || 'https://frontend-eta-rosy.vercel.app/',
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/company",companyRouter)
app.use("/api/job",jobRouter)
app.use("/api/application",applicationRouter)

ConnectDB(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });