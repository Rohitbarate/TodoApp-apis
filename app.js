const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// testing
app.get("/wistatussaver/shareappimage", (req, res) => {
  res.status(200).send("success").download("./images/shareApp.png");
});

// base url endpoint
// https://{web url}/data/v1

// Routes
app.use("/data/v1/user", userRoute);
app.use("/data/v1/note", noteRoute);

module.exports = app;
